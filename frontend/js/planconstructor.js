document.addEventListener("DOMContentLoaded", () => { 
    setupEditableTitle(); // Initialize the editable plan title
    updateTotalNutrition(); // Calculate and update the total nutrition info at the bottom of the page
    applyEditedMeal(); // Apply the updated meal data if returning from mealconstructor
  });
  
  // Makes the plan title editable on click
  function setupEditableTitle() {
    const titleEl = document.getElementById("planTitle");
    const currentPlanName = localStorage.getItem("currentPlanName") || "Plan 1";
    titleEl.textContent = currentPlanName;
  
    titleEl.addEventListener("click", () => {
      const input = document.createElement("input");
      input.type = "text";
      input.value = titleEl.textContent;
      input.className = "planconstructor-input";
  
      titleEl.replaceWith(input);
      input.focus();
  
      const saveTitle = () => {
        const newTitle = input.value.trim() || "Plan 1";
        localStorage.setItem("currentPlanName", newTitle);
  
        const newTitleEl = document.createElement("p");
        newTitleEl.id = "planTitle";
        newTitleEl.className = "planconstructor-title";
        newTitleEl.textContent = newTitle;
        input.replaceWith(newTitleEl);
        setupEditableTitle(); // Re-bind click listener
      };
  
      input.addEventListener("blur", saveTitle);
      input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") saveTitle();
      });
    });
  }
  
  // Calculates and updates total nutrition info at the bottom of the page
  function updateTotalNutrition() {
    const cards = document.querySelectorAll('.planconstructor-card');
  
    let totalCalories = 0, totalProteins = 0, totalFats = 0, totalCarbs = 0;
  
    cards.forEach(card => {
      totalCalories += parseInt(card.querySelector('.planconstructor-calories').textContent) || 0;
  
      const nutrients = card.querySelectorAll('.planconstructor-nutrients span');
      totalProteins += parseInt(nutrients[0].textContent.replace(/\D/g, '')) || 0;
      totalFats += parseInt(nutrients[1].textContent.replace(/\D/g, '')) || 0;
      totalCarbs += parseInt(nutrients[2].textContent.replace(/\D/g, '')) || 0;
    });
  
    // Update text on total info card
    document.getElementById('planconstructortotal-info').textContent = `${totalCalories} kcal`;
    document.getElementById('planconstructorproteins-info').textContent = `${totalProteins}g`;
    document.getElementById('planconstructorfats-info').textContent = `${totalFats}g`;
    document.getElementById('planconstructorcarbs-info').textContent = `${totalCarbs}g`;
  
    // Calculate percentage based on user calorie target
    const user = JSON.parse(localStorage.getItem('user')) || {};
    const target = Number(user?.calories || 2000);
  
    document.getElementById('planconstructorcalories-percent').textContent = `${Math.round((totalCalories / target) * 100)}%`;
    document.getElementById('planconstructorprotein-percent').textContent = `${Math.round((totalProteins * 4 / target) * 100)}%`;
    document.getElementById('planconstructorfat-percent').textContent = `${Math.round((totalFats * 9 / target) * 100)}%`;
    document.getElementById('planconstructorcarbs-percent').textContent = `${Math.round((totalCarbs * 4 / target) * 100)}%`;
  }
  
  // Collects plan data and saves it in localStorage
  function savePlan() {
    const name = document.getElementById('planTitle')?.textContent || "Plan 1";
    const cards = document.querySelectorAll('.planconstructor-card');
  
    const meals = [...cards].map(card => {
      return {
        title: card.querySelector('.planconstructor-title').textContent,
        calories: card.querySelector('.planconstructor-calories').textContent.replace(/\D/g, ''),
        proteins: card.querySelector('.planconstructor-nutrients span:nth-child(1)').textContent.replace(/\D/g, ''),
        fats: card.querySelector('.planconstructor-nutrients span:nth-child(2)').textContent.replace(/\D/g, ''),
        carbs: card.querySelector('.planconstructor-nutrients span:nth-child(3)').textContent.replace(/\D/g, '')
      };
    });
  
    let totalCalories = 0, totalProteins = 0, totalFats = 0, totalCarbs = 0;
    meals.forEach(meal => {
      totalCalories += Number(meal.calories);
      totalProteins += Number(meal.proteins);
      totalFats += Number(meal.fats);
      totalCarbs += Number(meal.carbs);
    });
  
    const plan = {
      name,
      calories: totalCalories,
      proteins: totalProteins,
      fats: totalFats,
      carbs: totalCarbs,
      meals
    };
  
    const plans = JSON.parse(localStorage.getItem("plans")) || [];
    plans.push(plan);
    localStorage.setItem("plans", JSON.stringify(plans));
  
    window.location.href = "plans.html"; // Redirect after saving
  }
  
  // Edit meal: Save selected meal to localStorage and redirect to mealconstructor
  function editPlanConstructor(icon) {
    const card = icon.closest(".planconstructor-card");
  
    // Make sure the card exists before proceeding
    if (!card) {
      console.error("No meal card found for editing.");
      return;
    }
  
    // Get the data from the selected meal card
    const meal = {
      title: card.querySelector(".planconstructor-title").textContent,
      calories: card.querySelector(".planconstructor-calories").textContent.replace(/\D/g, ''),
      proteins: card.querySelector(".planconstructor-nutrients span:nth-child(1)").textContent.replace(/\D/g, ''),
      fats: card.querySelector(".planconstructor-nutrients span:nth-child(2)").textContent.replace(/\D/g, ''),
      carbs: card.querySelector(".planconstructor-nutrients span:nth-child(3)").textContent.replace(/\D/g, ''),
      index: [...document.querySelectorAll(".planconstructor-card")].indexOf(card), // Capture the index of the card for later
    };
  
    // Save the meal data in localStorage (to be used on the mealconstructor page)
    localStorage.setItem("editingMeal", JSON.stringify(meal));
  
    // Redirect to the meal constructor page
    window.location.href = "mealconstructor.html";
  }
  
  // Delete meal: Remove selected meal from the plan
  function deletePlanConstructor(icon) {
    const card = icon.closest(".planconstructor-card");
  
    // Make sure the card exists before proceeding
    if (!card) {
      console.error("No meal card found for deletion.");
      return;
    }
  
    // Remove the selected meal card from the DOM
    card.remove();
  
    // Update the total nutrition info after deletion
    updateTotalNutrition();
  }
  
  // Navigate to a different page (used by "Back" and "Add" buttons)
  function navigateTo(url) {
    window.location.href = url;
  }
  
  // Apply updated meal data when returning from mealconstructor
  function applyEditedMeal() {
    const editedMeal = JSON.parse(localStorage.getItem("editedMeal"));
    
    if (editedMeal) {
      // Find the card with the same title and update its details
      const cards = document.querySelectorAll(".planconstructor-card");
      cards.forEach(card => {
        const titleEl = card.querySelector(".planconstructor-title");
        if (titleEl.textContent === editedMeal.title) {
          card.querySelector(".planconstructor-calories").textContent = `${editedMeal.calories} kcal`;
          card.querySelector(".planconstructor-nutrients span:nth-child(1)").textContent = `Proteins: ${editedMeal.proteins}g`;
          card.querySelector(".planconstructor-nutrients span:nth-child(2)").textContent = `Fats: ${editedMeal.fats}g`;
          card.querySelector(".planconstructor-nutrients span:nth-child(3)").textContent = `Carbs: ${editedMeal.carbs}g`;
        }
      });
  
      // Remove the edited meal from localStorage after applying
      localStorage.removeItem("editedMeal");
    }
  }