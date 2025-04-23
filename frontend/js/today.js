// Get a readable string like "Apr 22, Mon"
function formatDate(date) {
  return date.toISOString().split('T')[0];
}

function getReadableDate(date) {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    weekday: "short",
  });
}

// Date Card Generation
const today = new Date();
const daysToShow = 7;
const dateScroll = document.getElementById("date-scroll") || document.getElementById("date-list");
const mealContainer = document.getElementById("meal-container");

function generateDateCards() {
  for (let i = -daysToShow; i <= daysToShow; i++) {
    const date = new Date();
    date.setDate(today.getDate() + i);

    const card = document.createElement("div");
    card.classList.add("date-card");
    card.dataset.date = formatDate(date);
    card.textContent = getReadableDate(date);

    if (formatDate(date) === formatDate(today)) {
      card.classList.add("selected");
      setTimeout(() => {
        card.scrollIntoView({ behavior: "smooth", inline: "center" });
      }, 100);
    }

    card.addEventListener("click", () => {
      document.querySelector(".date-card.selected")?.classList.remove("selected");
      card.classList.add("selected");
      localStorage.setItem("selectedDate", card.dataset.date);
      loadMealsForDate(card.dataset.date);
    });

    dateScroll.appendChild(card);
  }
}

// Meals by Date
function loadMealsForDate(dateStr) {
    const meals = JSON.parse(localStorage.getItem("mealsByDate") || "{}");
    const mealsForDate = meals[dateStr] || [];
  
    mealContainer.innerHTML = "";
  
    if (mealsForDate.length === 0) {
      mealContainer.innerHTML = "<p>No information about this day</p>";
      return;
    }
  
    mealsForDate.forEach((meal, index) => {
      const card = document.createElement("div");
      card.classList.add("meal-card");
      card.dataset.index = index;
      card.innerHTML = `
        <div class="meal-first">
          <p class="meal-title">${meal.name}</p>
          <div class="meal-actions">
            <img src="images/edit.png" class="icon-btn" title="Edit" onclick="editMeal(${index}, '${dateStr}')" />
            <img src="images/delete.png" class="icon-btn" title="Delete" onclick="deleteMeal(${index}, '${dateStr}')" />
          </div>
        </div>
        <div class="meal-second">
          <p class="meal-calories">${meal.calories} kcal</p>
        </div>
        <div class="meal-nutrients">
          <span>Proteins: ${meal.protein}g</span>
          <span>Fats: ${meal.fat}g</span>
          <span>Carbs: ${meal.carbs}g</span>
        </div>
      `;
      mealContainer.appendChild(card);
    });
  }

// Edit Meal
function editMeal(button) {
    const mealCard = button.closest('.meal-card');
    
    if (!mealCard) {
        console.log('Meal card not found!');
        return;
    }
    
    const mealTitle = mealCard.querySelector('.meal-title').textContent;
    const mealCalories = mealCard.querySelector('.meal-calories').textContent;
    const mealProteins = mealCard.querySelector('.meal-nutrients span:nth-child(1)').textContent.split(': ')[1];
    const mealFats = mealCard.querySelector('.meal-nutrients span:nth-child(2)').textContent.split(': ')[1];
    const mealCarbs = mealCard.querySelector('.meal-nutrients span:nth-child(3)').textContent.split(': ')[1];

    localStorage.setItem('mealTitle', mealTitle);
    localStorage.setItem('mealCalories', mealCalories);
    localStorage.setItem('mealProteins', mealProteins);
    localStorage.setItem('mealFats', mealFats);
    localStorage.setItem('mealCarbs', mealCarbs);

    window.location.href = "mealconstructor.html";
}

// Delete Meal
function deleteMeal(index, dateStr) {
  const meals = JSON.parse(localStorage.getItem("mealsByDate") || "{}");
  meals[dateStr].splice(index, 1);
  localStorage.setItem("mealsByDate", JSON.stringify(meals));
  loadMealsForDate(dateStr);
}

// Add a meal for the selected date
document.getElementById("addButton").addEventListener("click", () => {
  const selectedDate = document.querySelector(".date-card.selected")?.dataset.date || formatDate(today);
  localStorage.setItem("selectedDate", selectedDate);
  window.location.href = "mealconstructor.html";
});

// Navigate to specific page
function navigateTo(page) {
  const selectedDate = document.querySelector(".date-card.selected")?.dataset.date || formatDate(today);
  localStorage.setItem("selectedDate", selectedDate);
  window.location.href = page;
}

// Calculate percentage (e.g., for nutrition progress)
function calculatePercentage(consumed, goal) {
  return goal === 0 ? 0 : Math.round((consumed / goal) * 100);
}

// Nutrition Summary
function updateTotals(consumedData, userGoals) {
  document.getElementById("calories-percent").textContent = `${calculatePercentage(consumedData.caloriesConsumed, userGoals.caloriesGoal)}%`;
  document.getElementById("protein-percent").textContent = `${calculatePercentage(consumedData.proteinConsumed, userGoals.proteinGoal)}%`;
  document.getElementById("fat-percent").textContent = `${calculatePercentage(consumedData.fatConsumed, userGoals.fatGoal)}%`;
  document.getElementById("carbs-percent").textContent = `${calculatePercentage(consumedData.carbsConsumed, userGoals.carbsGoal)}%`;

  document.getElementById("total-info").textContent = `${consumedData.caloriesConsumed} kcal`;
  document.getElementById("proteins-info").textContent = `${consumedData.proteinConsumed}g`;
  document.getElementById("fats-info").textContent = `${consumedData.fatConsumed}g`;
  document.getElementById("carbs-info").textContent = `${consumedData.carbsConsumed}g`;
}

// Fallback user goals (in case there's no saved user data)
document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("user")) || {
    caloriesGoal: 2000,
    proteinGoal: 150,
    fatGoal: 70,
    carbsGoal: 300
  };

  const consumedData = {
    caloriesConsumed: 1200,
    proteinConsumed: 90,
    fatConsumed: 50,
    carbsConsumed: 150
  };

  generateDateCards();

  const selectedStoredDate = localStorage.getItem("selectedDate");
  const initialDate = selectedStoredDate || formatDate(today);
  loadMealsForDate(initialDate);

  updateTotals(consumedData, user);
});

