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
    
      const consumedData = getConsumedDataForDate(card.dataset.date);
      const user = JSON.parse(localStorage.getItem("user")) || {
        caloriesGoal: 2000,
        proteinGoal: 150,
        fatGoal: 70,
        carbsGoal: 300
      };
      updateTotals(consumedData, user);
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
    card.dataset.index = index; // Set the index as dataset attribute for the card
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
function editMeal(index, dateStr) {
  // Get the selected meal data
  const meals = JSON.parse(localStorage.getItem("mealsByDate") || "{}");
  const meal = meals[dateStr][index];

  // Save the current meal data to localStorage for editing
  localStorage.setItem('editMealIndex', index);
  localStorage.setItem('mealTitle', meal.name);
  localStorage.setItem('mealCalories', meal.calories);
  localStorage.setItem('mealProteins', meal.protein);
  localStorage.setItem('mealFats', meal.fat);
  localStorage.setItem('mealCarbs', meal.carbs);

  // Redirect to the meal constructor page to edit
  window.location.href = "mealconstructor.html";
}

// Delete Meal
function deleteMeal(index, dateStr) {
  const meals = JSON.parse(localStorage.getItem("mealsByDate") || "{}");
  meals[dateStr].splice(index, 1); // Remove the meal at the specified index
  localStorage.setItem("mealsByDate", JSON.stringify(meals));
  loadMealsForDate(dateStr); // Reload the meals for the selected date
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
  localStorage.setItem("mealConstructorMode", "addToToday");
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

  generateDateCards();

  const selectedStoredDate = localStorage.getItem("selectedDate");
  const initialDate = selectedStoredDate || formatDate(today);

  loadMealsForDate(initialDate);

  const consumedData = getConsumedDataForDate(initialDate);
  updateTotals(consumedData, user);
});

function getConsumedDataForDate(dateStr) {
  const meals = JSON.parse(localStorage.getItem("mealsByDate") || "{}");
  const mealsForDate = meals[dateStr] || [];

  let caloriesConsumed = 0;
  let proteinConsumed = 0;
  let fatConsumed = 0;
  let carbsConsumed = 0;

  mealsForDate.forEach(meal => {
    caloriesConsumed += parseFloat(meal.calories) || 0;
    proteinConsumed += parseFloat(meal.protein) || 0;
    fatConsumed += parseFloat(meal.fat) || 0;
    carbsConsumed += parseFloat(meal.carbs) || 0;
  });

  return {
    caloriesConsumed,
    proteinConsumed,
    fatConsumed,
    carbsConsumed
  };
}