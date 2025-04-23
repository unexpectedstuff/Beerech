// Function to navigate to a new page by changing the window location
function navigateTo(url) {
    window.location.href = url;
  }

// Wait until the entire page content (DOM) is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  
    // Get the container element where all the plan cards will be added
    const plansContainer = document.getElementById("plans-container");
  
    // Retrieve the array of saved plans from localStorage, or use an empty array if none exist
    const plans = JSON.parse(localStorage.getItem("plans")) || [];
  
    // Loop through each plan object in the array
    plans.forEach(plan => {
      
      // Create a new div element to represent the plan card
      const card = document.createElement("div");
      card.classList.add("plan-card"); // Add the CSS class for styling
  
      // Add HTML content to the card using the plan data
      card.innerHTML = `
        <div class="plan-first">
          <p class="plan-title">${plan.name}</p> <!-- Display plan name -->
          <div class="plan-actions">
            <img src="images/edit.png" class="icon-btn" title="Edit" /> <!-- Edit icon (functionality to be added) -->
          </div>
        </div>
        <div class="plan-second">
          <p class="plan-calories">${plan.calories} kcal</p> <!-- Display total calories -->
          <div class="plan-actions">
            <img src="images/delete.png" class="icon-btn" title="Delete" /> <!-- Delete icon (functionality to be added) -->
          </div>
        </div>
        <div class="plan-nutrients">
          <span>Proteins: ${plan.proteins}g</span> <!-- Display proteins -->
          <span>Fats: ${plan.fats}g</span>       <!-- Display fats -->
          <span>Carbs: ${plan.carbs}g</span>     <!-- Display carbohydrates -->
        </div>
      `;
  
      // Add the newly created card to the plans container on the page
      plansContainer.appendChild(card);
    });
  });