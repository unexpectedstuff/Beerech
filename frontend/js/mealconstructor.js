// Initialize variables
let ingredients = [];
let mealName = document.getElementById('meal-name');
let ingredientTableBody = document.getElementById('ingredient-body');
let totalWeight = document.getElementById('total-weight');
let totalProteins = document.getElementById('total-proteins');
let totalFats = document.getElementById('total-fats');
let totalCarbs = document.getElementById('total-carbs');
let totalKcal = document.getElementById('total-kcal');
let per100Proteins = document.getElementById('per100-proteins');
let per100Fats = document.getElementById('per100-fats');
let per100Carbs = document.getElementById('per100-carbs');
let per100Kcal = document.getElementById('per100-kcal');

// Function to add an ingredient
function addIngredient() {
  // Static example ingredient (you can fetch from an API)
  let ingredient = {
    id: ingredients.length + 1,
    name: 'Chicken Breast',
    weight: 100,
    base: { proteins: 22, fats: 3, carbs: 0, kcal: 110 },  // Base values per 100g
    proteins: 22,
    fats: 3,
    carbs: 0,
    kcal: 110,
  };

  // Add ingredient to the list
  ingredients.push(ingredient);

  // Update the ingredients table
  updateIngredientTable();
  updateTotals();
}

// Function to update the ingredients table
function updateIngredientTable() {
  ingredientTableBody.innerHTML = '';

  ingredients.forEach((ingredient, index) => {
    const row = document.createElement('tr');
    
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${ingredient.name}</td>
      <td>
        <input 
          class="weight-input" 
          type="number" 
          value="${ingredient.weight}" 
          min="1" 
          onchange="updateIngredientWeight(${index}, this)" 
          oninput="updateIngredientWeight(${index}, this)" />
      </td>
      <td class="protein-cell">${Math.round(ingredient.proteins)}</td>
      <td class="fat-cell">${Math.round(ingredient.fats)}</td>
      <td class="carb-cell">${Math.round(ingredient.carbs)}</td>
      <td class="kcal-cell">${Math.round(ingredient.kcal)}</td>
      <td><button class="remove-btn" onclick="removeIngredient(${index})">✕</button></td>
    `;

    ingredientTableBody.appendChild(row);
  });
}

// Function to update the weight of an ingredient
function updateIngredientWeight(index, input) {
  const weight = Number(input.value);
  if (weight <= 0) return;

  const row = input.closest('tr');
  const base = ingredients[index].base;

  // Update nutrient values based on new weight
  ingredients[index].weight = weight;
  ingredients[index].proteins = (base.proteins * weight) / 100;
  ingredients[index].fats = (base.fats * weight) / 100;
  ingredients[index].carbs = (base.carbs * weight) / 100;
  ingredients[index].kcal = (base.kcal * weight) / 100;

  // Update the corresponding row with new values
  row.querySelector('.protein-cell').textContent = Math.round(ingredients[index].proteins);
  row.querySelector('.fat-cell').textContent = Math.round(ingredients[index].fats);
  row.querySelector('.carb-cell').textContent = Math.round(ingredients[index].carbs);
  row.querySelector('.kcal-cell').textContent = Math.round(ingredients[index].kcal);

  // Update total values
  updateTotals();
}

// Function to remove an ingredient
function removeIngredient(index) {
  ingredients.splice(index, 1);
  updateIngredientTable();
  updateTotals();
}

// Function to recalculate total values
function updateTotals() {
  let totalW = 0, totalP = 0, totalF = 0, totalC = 0, totalK = 0;

  ingredients.forEach(ingredient => {
    totalW += ingredient.weight;
    totalP += ingredient.proteins;
    totalF += ingredient.fats;
    totalC += ingredient.carbs;
    totalK += ingredient.kcal;
  });

  totalWeight.innerText = Math.round(totalW);
  totalProteins.innerText = Math.round(totalP);
  totalFats.innerText = Math.round(totalF);
  totalCarbs.innerText = Math.round(totalC);
  totalKcal.innerText = Math.round(totalK);

  // Calculate values per 100g
  if (totalW > 0) {
    per100Proteins.innerText = Math.round((totalP / totalW) * 100);
    per100Fats.innerText = Math.round((totalF / totalW) * 100);
    per100Carbs.innerText = Math.round((totalC / totalW) * 100);
    per100Kcal.innerText = Math.round((totalK / totalW) * 100);
  } else {
    per100Proteins.innerText = 0;
    per100Fats.innerText = 0;
    per100Carbs.innerText = 0;
    per100Kcal.innerText = 0;
  }
}

// Function to save the meal and return to the previous page
function saveMealAndReturn() {
  let mealData = {
    name: mealName.value,
    ingredients: ingredients,
  };

  // Save meal to localStorage
  localStorage.setItem('currentMeal', JSON.stringify(mealData));

  alert('Meal saved! Returning to previous page...');
  // Navigate back to previous page
  window.history.back();
}

// Function to save the recipe to "My Recipes"
function saveToMyRecipes() {
  let recipeName = prompt("Enter a name for your recipe:");
  if (recipeName) {
    let savedRecipes = JSON.parse(localStorage.getItem('myRecipes')) || [];
    
    // Check for duplicate recipe name
    if (savedRecipes.find(recipe => recipe.name === recipeName)) {
      alert("A recipe with this name already exists.");
    } else {
      let newRecipe = {
        name: recipeName,
        mealData: {
          name: mealName.value,
          ingredients: ingredients,
        },
      };
      savedRecipes.push(newRecipe);
      localStorage.setItem('myRecipes', JSON.stringify(savedRecipes));
      alert('Recipe saved to My Recipes!');
    }
  }
}

// Placeholder: Load a recipe from API
function loadFromAPI() {
  // Example static data, normally you would fetch from an API
  let apiIngredients = [
    { name: 'Chicken Breast', weight: 150, proteins: 22, fats: 3, carbs: 0, kcal: 110 },
    { name: 'Olive Oil', weight: 10, proteins: 0, fats: 10, carbs: 0, kcal: 90 },
  ];

  ingredients = apiIngredients;
  updateIngredientTable();
  updateTotals();
}

// Load a saved recipe from "My Recipes"
function loadFromMyRecipes() {
  let savedRecipes = JSON.parse(localStorage.getItem('myRecipes')) || [];
  if (savedRecipes.length > 0) {
    let recipe = savedRecipes[0]; // Load the first recipe for now
    mealName.value = recipe.mealData.name;
    ingredients = recipe.mealData.ingredients;
    updateIngredientTable();
    updateTotals();
  } else {
    alert('No recipes found.');
  }
}
