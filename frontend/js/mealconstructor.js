// Ingredient Database (default)
const INGREDIENT_DB = {
  chicken: { name: 'Chicken Breast', base: { proteins: 22, fats: 3, carbs: 0, kcal: 110 } },
  olive: { name: 'Olive Oil', base: { proteins: 0, fats: 100, carbs: 0, kcal: 900 } },
  rice: { name: 'Rice (Cooked)', base: { proteins: 2.7, fats: 0.3, carbs: 28, kcal: 130 } }
};

// Variables
let ingredients = [];
const mealName = document.getElementById('meal-name');
const ingredientTableBody = document.getElementById('ingredient-body');
const totalWeight = document.getElementById('total-weight');
const totalProteins = document.getElementById('total-proteins');
const totalFats = document.getElementById('total-fats');
const totalCarbs = document.getElementById('total-carbs');
const totalKcal = document.getElementById('total-kcal');
const per100Proteins = document.getElementById('per100-proteins');
const per100Fats = document.getElementById('per100-fats');
const per100Carbs = document.getElementById('per100-carbs');
const per100Kcal = document.getElementById('per100-kcal');

// Add ingredient from dropdown (API-based)
async function loadIngredientsFromAPI() {
  try {
    // Mocking an API response for ingredients
    const response = await fetch('https://example.com/api/ingredients'); // CHANGE FOR THE WORKINK ONE
    const ingredientsFromAPI = await response.json();

    // List of ingredients
    createIngredientSelect(ingredientsFromAPI);
  } catch (error) {
    console.error("Ошибка при загрузке ингредиентов с API:", error);
  }
}

// Dynamic list
function createIngredientSelect(ingredientsFromAPI) {
  const select = document.createElement('select');
  select.id = 'ingredient-select';

  // Options fo every ingredient
  ingredientsFromAPI.forEach(ingredient => {
    const option = document.createElement('option');
    option.value = ingredient.id; // id from API
    option.textContent = ingredient.name; // name from API
    select.appendChild(option);
  });

  const addIngredientBtn = document.querySelector('.add-ingredient-btn');
  addIngredientBtn.before(select);
}

// Add the ingredient
function addIngredient() {
  const select = document.getElementById('ingredient-select');
  const selectedKey = select.value;
  const data = INGREDIENT_DB[selectedKey];
  const weight = 100;

  const ingredient = {
    id: ingredients.length + 1,
    name: data.name,
    weight: weight,
    base: data.base,
    proteins: (data.base.proteins * weight) / 100,
    fats: (data.base.fats * weight) / 100,
    carbs: (data.base.carbs * weight) / 100,
    kcal: (data.base.kcal * weight) / 100,
  };

  ingredients.push(ingredient);
  updateIngredientTable();
  updateTotals();
}

// Update the ingredient
function updateIngredientWeight(index, input) {
  const weight = Number(input.value);
  if (weight <= 0) return;

  const base = ingredients[index].base;
  const updated = {
    weight,
    proteins: (base.proteins * weight) / 100,
    fats: (base.fats * weight) / 100,
    carbs: (base.carbs * weight) / 100,
    kcal: (base.kcal * weight) / 100
  };

  Object.assign(ingredients[index], updated);

  const row = input.closest('tr');
  row.querySelector('.protein-cell').textContent = Math.round(updated.proteins);
  row.querySelector('.fat-cell').textContent = Math.round(updated.fats);
  row.querySelector('.carb-cell').textContent = Math.round(updated.carbs);
  row.querySelector('.kcal-cell').textContent = Math.round(updated.kcal);

  updateTotals();
}

// Delete the ingredient
function removeIngredient(index) {
  ingredients.splice(index, 1);
  updateIngredientTable();
  updateTotals();
}

// Update Nutritions
function getTotalNutrition(data) {
  return data.reduce((totals, ing) => {
    totals.weight += ing.weight;
    totals.proteins += ing.proteins;
    totals.fats += ing.fats;
    totals.carbs += ing.carbs;
    totals.kcal += ing.kcal;
    return totals;
  }, { weight: 0, proteins: 0, fats: 0, carbs: 0, kcal: 0 });
}

// Update
function updateTotals() {
  const totals = getTotalNutrition(ingredients);

  totalWeight.textContent = Math.round(totals.weight);
  totalProteins.textContent = Math.round(totals.proteins);
  totalFats.textContent = Math.round(totals.fats);
  totalCarbs.textContent = Math.round(totals.carbs);
  totalKcal.textContent = Math.round(totals.kcal);

  const divisor = totals.weight || 1; // validation of zero substraction
  per100Proteins.textContent = Math.round((totals.proteins / divisor) * 100);
  per100Fats.textContent = Math.round((totals.fats / divisor) * 100);
  per100Carbs.textContent = Math.round((totals.carbs / divisor) * 100);
  per100Kcal.textContent = Math.round((totals.kcal / divisor) * 100);
}

// Connect to the button
document.querySelector('.add-ingredient-btn').addEventListener('click', loadIngredientsFromAPI);

// Download the recipe
window.addEventListener('DOMContentLoaded', () => {
  const editRecipe = JSON.parse(localStorage.getItem('editRecipe'));
  if (editRecipe) {
    mealName.value = editRecipe.name;
    ingredients = editRecipe.mealData.ingredients;
    updateIngredientTable();
    updateTotals();
  }
});

// Ingredient weight update
function updateIngredientWeight(index, input) {
  const weight = Number(input.value);
  if (weight <= 0) return;

  const base = ingredients[index].base;
  const updated = {
    weight,
    proteins: (base.proteins * weight) / 100,
    fats: (base.fats * weight) / 100,
    carbs: (base.carbs * weight) / 100,
    kcal: (base.kcal * weight) / 100
  };

  Object.assign(ingredients[index], updated);

  const row = input.closest('tr');
  row.querySelector('.protein-cell').textContent = Math.round(updated.proteins);
  row.querySelector('.fat-cell').textContent = Math.round(updated.fats);
  row.querySelector('.carb-cell').textContent = Math.round(updated.carbs);
  row.querySelector('.kcal-cell').textContent = Math.round(updated.kcal);

  updateTotals();
}

// Remove ingredient
function removeIngredient(index) {
  ingredients.splice(index, 1);
  updateIngredientTable();
  updateTotals();
}

// Reusable total nutrition calculator
function getTotalNutrition(data) {
  return data.reduce((totals, ing) => {
    totals.weight += ing.weight;
    totals.proteins += ing.proteins;
    totals.fats += ing.fats;
    totals.carbs += ing.carbs;
    totals.kcal += ing.kcal;
    return totals;
  }, { weight: 0, proteins: 0, fats: 0, carbs: 0, kcal: 0 });
}

// Update totals
function updateTotals() {
  const totals = getTotalNutrition(ingredients);

  totalWeight.textContent = Math.round(totals.weight);
  totalProteins.textContent = Math.round(totals.proteins);
  totalFats.textContent = Math.round(totals.fats);
  totalCarbs.textContent = Math.round(totals.carbs);
  totalKcal.textContent = Math.round(totals.kcal);

  const divisor = totals.weight || 1; // Avoid divide by 0
  per100Proteins.textContent = Math.round((totals.proteins / divisor) * 100);
  per100Fats.textContent = Math.round((totals.fats / divisor) * 100);
  per100Carbs.textContent = Math.round((totals.carbs / divisor) * 100);
  per100Kcal.textContent = Math.round((totals.kcal / divisor) * 100);
}

// Load from API (mocked)
function loadFromAPI() {
  ingredients = [
    {
      name: 'Chicken Breast',
      weight: 150,
      base: INGREDIENT_DB.chicken.base
    },
    {
      name: 'Olive Oil',
      weight: 10,
      base: INGREDIENT_DB.olive.base
    }
  ].map(ing => ({
    ...ing,
    proteins: (ing.base.proteins * ing.weight) / 100,
    fats: (ing.base.fats * ing.weight) / 100,
    carbs: (ing.base.carbs * ing.weight) / 100,
    kcal: (ing.base.kcal * ing.weight) / 100
  }));

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

// Check the previous page
const mode = localStorage.getItem("mealConstructorMode");  

// Function to save the meal and return to the previous page
function saveMealAndReturn() {
  if (!ingredients.length) {
    alert("Please add at least one ingredient.");
    return;
  }
  const selectedDate = localStorage.getItem("selectedDate");
  let meals = JSON.parse(localStorage.getItem("mealsByDate")) || {};

  // Calculate nutrients
  const totalKcal = Math.round(ingredients.reduce((sum, ing) => sum + ing.kcal, 0));
  const totalProteins = Math.round(ingredients.reduce((sum, ing) => sum + ing.proteins, 0));
  const totalFats = Math.round(ingredients.reduce((sum, ing) => sum + ing.fats, 0));
  const totalCarbs = Math.round(ingredients.reduce((sum, ing) => sum + ing.carbs, 0));

  const newMeal = {
    name: mealName.value || "Untitled Meal",
    calories: totalKcal,
    protein: totalProteins,
    fat: totalFats,
    carbs: totalCarbs,
  };

  // Add to mealsByDate if we save for today
  if (mode === "addToToday") {
    if (!meals[selectedDate]) meals[selectedDate] = [];
    meals[selectedDate].push(newMeal);
    localStorage.setItem("mealsByDate", JSON.stringify(meals));
    localStorage.removeItem("mealConstructorMode"); 
    alert("Meal added to today's plan!");
    window.location.href = "today.html";
  } else {
    // fallback — to save to currentMeal
    localStorage.setItem('currentMeal', JSON.stringify(newMeal));
    alert("Meal saved.");
    window.history.back();
  }
}

// Function to save the recipe to "My Recipes"
function saveToMyRecipes() {
  let savedRecipes = JSON.parse(localStorage.getItem('myRecipes')) || [];

  // Counting the nutrients
  let totalW = 0, totalP = 0, totalF = 0, totalC = 0, totalK = 0;
  ingredients.forEach(ingredient => {
    totalW += ingredient.weight;
    totalP += ingredient.proteins;
    totalF += ingredient.fats;
    totalC += ingredient.carbs;
    totalK += ingredient.kcal;
  });

  let newRecipeData = {
    name: mealName.value,
    mealData: {
      name: mealName.value,
      ingredients: ingredients,
      totalWeight: Math.round(totalW),
      totalProteins: Math.round(totalP),
      totalFats: Math.round(totalF),
      totalCarbs: Math.round(totalC),
      totalKcal: Math.round(totalK)
    }
  };

  const editIndex = localStorage.getItem('editRecipeIndex');

  if (editIndex !== null) {
    // Reload the recipe
    savedRecipes[editIndex] = newRecipeData;
    localStorage.removeItem('editRecipe');
    localStorage.removeItem('editRecipeIndex');
    alert('Recipe updated!');
  } else {
    // New recipe
    let recipeName = prompt("Enter a name for your recipe:");
    if (!recipeName) return;
    if (savedRecipes.find(r => r.name === recipeName)) {
      alert("A recipe with this name already exists.");
      return;
    }
    newRecipeData.name = recipeName;
    savedRecipes.push(newRecipeData);
    alert('Recipe saved to My Recipes!');
  }

  localStorage.setItem('myRecipes', JSON.stringify(savedRecipes));
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

// Edit Recipe
window.addEventListener('DOMContentLoaded', () => {
  const editRecipe = JSON.parse(localStorage.getItem('editRecipe'));
  if (editRecipe) {
    mealName.value = editRecipe.name;
    ingredients = editRecipe.mealData.ingredients;
    updateIngredientTable();
    updateTotals();
  }
});

// Function to save meal changes in the constructor
function saveMealChanges() {
  // Get the values from the form fields
  const mealTitle = document.getElementById('mealTitle').value;
  const mealCalories = document.getElementById('mealCalories').value;
  const mealProteins = document.getElementById('mealProteins').value;
  const mealFats = document.getElementById('mealFats').value;
  const mealCarbs = document.getElementById('mealCarbs').value;
  
  // Get the meals data from localStorage, or initialize it if it doesn't exist
  const meals = JSON.parse(localStorage.getItem('mealsByDate')) || {};
  
  // Get the currently selected date
  const selectedDate = localStorage.getItem('selectedDate');

  // Create a new meal object with the updated values
  const newMeal = {
    name: mealTitle,
    calories: mealCalories,
    protein: mealProteins,
    fat: mealFats,
    carbs: mealCarbs,
  };

  // Check if we're editing an existing meal or adding a new one
  if (localStorage.getItem('editMealIndex') !== null) {
    // If we're editing, update the existing meal at the specified index
    const index = localStorage.getItem('editMealIndex');
    meals[selectedDate][index] = newMeal;
    
    // Remove the index from localStorage after editing
    localStorage.removeItem('editMealIndex');
  } else {
    // If it's a new meal, add it to the meals array for the selected date
    if (!meals[selectedDate]) {
      meals[selectedDate] = [];
    }
    meals[selectedDate].push(newMeal);
  }

  // Save the updated meals data back to localStorage
  localStorage.setItem('mealsByDate', JSON.stringify(meals));

  // Redirect back to the 'today.html' page to show the updated meals
  window.location.href = 'today.html';
}
