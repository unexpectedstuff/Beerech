// Function to navigate to a new page by changing the window location 
function navigateTo(url) {
    window.location.href = url;
  }
  
  // Function to load and display saved recipes
  function loadRecipes() {
    const savedRecipes = JSON.parse(localStorage.getItem('myRecipes')) || [];
    const recipeContainer = document.getElementById('recipe-container');
    recipeContainer.innerHTML = '';
  
    savedRecipes.forEach((recipe, index) => {
      const kcal = recipe.mealData?.totalKcal ?? 0;
      const proteins = recipe.mealData?.totalProteins ?? 0;
      const fats = recipe.mealData?.totalFats ?? 0;
      const carbs = recipe.mealData?.totalCarbs ?? 0;
  
      const recipeCard = document.createElement('div');
      recipeCard.classList.add('recipe-card');
      recipeCard.innerHTML = `
        <div class="meal-first">
          <p class="recipe-title">${recipe.name}</p>
          <div class="meal-actions">
            <img src="images/edit.png" class="icon-btn" title="Edit" onclick="editRecipe(${index})" />
            <img src="images/delete.png" class="icon-btn" title="Delete" onclick="deleteRecipe(${index})" />
          </div>
        </div>
        <div class="meal-second">
          <p class="meal-calories">${kcal} kcal</p>
        </div>
        <div class="meal-nutrients">
          <span>Proteins: ${proteins}g</span>
          <span>Fats: ${fats}g</span>
          <span>Carbs: ${carbs}g</span>
        </div>
      `;
      recipeContainer.appendChild(recipeCard);
    });
  }
  
  // Save the recipe
  function editRecipe(index) {
    const savedRecipes = JSON.parse(localStorage.getItem('myRecipes')) || [];
    const recipeToEdit = savedRecipes[index];
  
    // Save the recipe and index to localStorage
    localStorage.setItem('editRecipe', JSON.stringify(recipeToEdit));
    localStorage.setItem('editRecipeIndex', index); // запомним индекс для замены
  
    window.location.href = 'mealconstructor.html';
  }
  
  // Delete the recipe
  function deleteRecipe(index) {
    let savedRecipes = JSON.parse(localStorage.getItem('myRecipes')) || [];
    const confirmDelete = confirm(`Delete the recipe: ${savedRecipes[index].name}?`);
  
    if (confirmDelete) {
      savedRecipes.splice(index, 1);
      localStorage.setItem('myRecipes', JSON.stringify(savedRecipes));
      loadRecipes(); 
    }
  }
  
  // Download the recipe
  window.onload = loadRecipes;