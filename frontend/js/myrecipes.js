
// Function to navigate to a new page by changing the window location
function navigateTo(url) {
    window.location.href = url;
}

// Add New Recipe 
document.getElementById("addButton").addEventListener("click", () => {
    const selectedDate = document.querySelector(".date-card.selected")?.dataset.date || formatDate(today);
    localStorage.setItem("selectedDate", selectedDate);
    window.location.href = "mealconstructor.html";
  });



// Edit Recipe
function editRecipe(el) {
    const card = el.closest('.recipe-card');

    const title = card.querySelector('.recipe-title').textContent;
    const calories = card.querySelector('.meal-calories').textContent.replace(' kcal', '');
    const nutrients = card.querySelectorAll('.meal-nutrients span');

    const proteins = nutrients[0].textContent.replace('Proteins: ', '').replace('g', '');
    const fats = nutrients[1].textContent.replace('Fats: ', '').replace('g', '');
    const carbs = nutrients[2].textContent.replace('Carbs: ', '').replace('g', '');

    const recipeData = {
        title,
        calories,
        proteins,
        fats,
        carbs
    };

    localStorage.setItem('editRecipe', JSON.stringify(recipeData));

    window.location.href = 'mealconstructor.html';
}

// Delete Recipe
function deleteRecipe(el) {
    const card = el.closest('.recipe-card');
    const title = card.querySelector('.recipe-title').textContent;
    const confirmDelete = confirm(`Delete the recipe: ${title}?`);
    
    if (confirmDelete) {
        card.remove();
    }
}