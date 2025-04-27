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

function loadMealsForDate(dateStr) {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "login.html";
    return;
  }

  fetch(`http://localhost:8080/meals/${dateStr}`, {
    headers: { "Authorization": "Bearer " + token }
  })
    .then(res => {
      if (!res.ok) throw new Error("Failed to load meals for date");
      return res.json();
    })
    .then(meals => {
      mealContainer.innerHTML = "";

      if (!Array.isArray(meals) || meals.length === 0) {
        mealContainer.innerHTML = "<p>No information about this day</p>";
        updateTotals({
          caloriesConsumed: 0,
          proteinConsumed: 0,
          fatConsumed: 0,
          carbsConsumed: 0
        });
        return;
      }

      let consumed = {
        caloriesConsumed: 0,
        proteinConsumed: 0,
        fatConsumed: 0,
        carbsConsumed: 0
      };

      meals.forEach(meal => {
        let mealCalories = 0;
        let mealProteins = 0;
        let mealFats = 0;
        let mealCarbs = 0;

        meal.products.forEach(item => {
          const prod = item.product;
          const grams = item.amountInGrams || 100;

          mealCalories += (prod.calories / 100) * grams;
          mealProteins += (prod.protein / 100) * grams;
          mealFats += (prod.fat / 100) * grams;
          mealCarbs += (prod.carbs / 100) * grams;
        });

        consumed.caloriesConsumed += mealCalories;
        consumed.proteinConsumed += mealProteins;
        consumed.fatConsumed += mealFats;
        consumed.carbsConsumed += mealCarbs;

        const card = document.createElement("div");
        card.classList.add("meal-card");
        card.innerHTML = `
          <div class="meal-first">
            <p class="meal-title">${meal.title || "Untitled Meal"}</p>
            <div class="meal-actions">
              <img src="images/edit.png" class="icon-btn" title="Edit" onclick="editMeal(${meal.id})" />
              <img src="images/delete.png" class="icon-btn" title="Delete" onclick="deleteMeal(${meal.id})" />
            </div>
          </div>
          <div class="meal-second">
            <p class="meal-calories">${Math.round(mealCalories)} kcal</p>
          </div>
          <div class="meal-nutrients">
            <span>Proteins: ${Math.round(mealProteins)}g</span>
            <span>Fats: ${Math.round(mealFats)}g</span>
            <span>Carbs: ${Math.round(mealCarbs)}g</span>
          </div>
        `;        
        mealContainer.appendChild(card);
      });

      updateTotals(consumed);
    })
    .catch(err => {
      console.error("Error loading meals:", err);
      mealContainer.innerHTML = "<p>Error loading meals</p>";
      updateTotals({
        caloriesConsumed: 0,
        proteinConsumed: 0,
        fatConsumed: 0,
        carbsConsumed: 0
      });
    });
}

function deleteMeal(mealId) {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "login.html";
    return;
  }

  const confirmDelete = confirm("Are you sure you want to delete this meal?");
  if (!confirmDelete) return;

  fetch(`http://localhost:8080/meals/${mealId}`, {
    method: "DELETE",
    headers: { "Authorization": "Bearer " + token }
  })
    .then(res => {
      if (res.status === 204) {
        alert("Meal deleted successfully!");
        const selectedDate = localStorage.getItem("selectedDate") || formatDate(today);
        loadMealsForDate(selectedDate);
      } else {
        throw new Error("Failed to delete meal");
      }
    })
    .catch(err => {
      console.error("Error deleting meal:", err);
      alert("Error deleting meal.");
    });
}

function calculatePercentage(consumed, goal) {
  return goal === 0 ? 0 : Math.round((consumed / goal) * 100);
}

function updateTotals(consumedData) {
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const calorieGoal = user.calorieTarget || 2000;

  document.getElementById("calories-percent").textContent = `${calculatePercentage(consumedData.caloriesConsumed, calorieGoal)}%`;
  document.getElementById("protein-percent").textContent = `—`;
  document.getElementById("fat-percent").textContent = `—`;
  document.getElementById("carbs-percent").textContent = `—`;

  document.getElementById("total-info").textContent = `${Math.round(consumedData.caloriesConsumed)} kcal`;
  document.getElementById("proteins-info").textContent = `${Math.round(consumedData.proteinConsumed)}g`;
  document.getElementById("fats-info").textContent = `${Math.round(consumedData.fatConsumed)}g`;
  document.getElementById("carbs-info").textContent = `${Math.round(consumedData.carbsConsumed)}g`;
}

function navigateTo(page) {
  window.location.href = page;
}

function editMeal(mealId) {
  localStorage.setItem('editItemId', mealId);
  localStorage.setItem('navigationSource', 'meals');
  navigateTo('mealconstructor.html');
}


document.addEventListener("DOMContentLoaded", () => {
  generateDateCards();

  const selectedStoredDate = localStorage.getItem("selectedDate");
  const initialDate = selectedStoredDate || formatDate(today);

  loadMealsForDate(initialDate);
});
