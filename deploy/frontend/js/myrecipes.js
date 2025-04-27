const API_BASE_URL = window.location.origin;
// Function to navigate to a new page
function navigateTo(url) {
  window.location.href = url;
}

// Function to load and display saved recipes
function loadRecipes() {
  const token = localStorage.getItem('token');
  const recipeContainer = document.getElementById('recipe-container');
  recipeContainer.innerHTML = '';

  fetch(`${API_BASE_URL}/recipes`, {
    headers: { "Authorization": "Bearer " + token }
  })  
    .then(res => {
      if (!res.ok) throw new Error('Failed to load recipes');
      return res.json();
    })
    .then(recipes => {
      if (!recipes.length) {
        recipeContainer.innerHTML = '<p>No recipes found.</p>';
        return;
      }

      recipes.forEach(recipe => {
        let totalCalories = 0;
        let totalProteins = 0;
        let totalFats = 0;
        let totalCarbs = 0;

        recipe.products.forEach(item => {
          const prod = item.product;
          const grams = item.amountInGrams || 100;

          totalCalories += (prod.calories / 100) * grams;
          totalProteins += (prod.protein / 100) * grams;
          totalFats     += (prod.fat / 100) * grams;
          totalCarbs    += (prod.carbs / 100) * grams;
        });

        const recipeCard = document.createElement('div');
        recipeCard.classList.add('recipe-card');
        recipeCard.innerHTML = `
          <div class="meal-first">
            <p class="recipe-title">${recipe.name || 'Untitled Recipe'}</p>
            <div class="meal-actions">
              <img src="images/edit.png" class="icon-btn" title="Edit" onclick="editRecipe(${recipe.id})" />
              <img src="images/delete.png" class="icon-btn" title="Delete" onclick="deleteRecipe(${recipe.id})" />
            </div>
          </div>
          <div class="meal-second">
            <p class="meal-calories">${Math.round(totalCalories)} kcal</p>
          </div>
          <div class="meal-nutrients">
            <span>Proteins: ${Math.round(totalProteins)}g</span>
            <span>Fats: ${Math.round(totalFats)}g</span>
            <span>Carbs: ${Math.round(totalCarbs)}g</span>
          </div>
        `;
        recipeContainer.appendChild(recipeCard);
      });
    })
    .catch(err => {
      console.error('Error loading recipes:', err);
      recipeContainer.innerHTML = '<p>Error loading recipes.</p>';
    });
}

// ✅ Corrected version!
function editRecipe(recipeId) {
  localStorage.setItem('editItemId', recipeId);
  localStorage.setItem('navigationSource', 'recipes');
  navigateTo('mealconstructor.html');
}

// Function to delete a recipe
function deleteRecipe(recipeId) {
  const confirmDelete = confirm('Are you sure you want to delete this recipe?');

  if (!confirmDelete) return;

  const token = localStorage.getItem('token');
  fetch(`${API_BASE_URL}/recipes/${recipeId}`, {
    method: 'DELETE',
    headers: { "Authorization": "Bearer " + token }
  })  
    .then(res => {
      if (!res.ok) throw new Error('Failed to delete recipe');
      loadRecipes();
    })
    .catch(err => {
      console.error('Error deleting recipe:', err);
      alert('Failed to delete recipe.');
    });
}

// When page loads
window.onload = loadRecipes;
