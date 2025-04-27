let ingredients = [];
let editingId = null;
let editingType = null;

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

function updateTotals() {
  const totals = ingredients.reduce((acc, ing) => {
    acc.weight += ing.weight || 0;
    acc.proteins += ing.proteins || 0;
    acc.fats += ing.fats || 0;
    acc.carbs += ing.carbs || 0;
    acc.kcal += ing.kcal || 0;
    return acc;
  }, { weight: 0, proteins: 0, fats: 0, carbs: 0, kcal: 0 });

  totalWeight.textContent = Math.round(totals.weight);
  totalProteins.textContent = Math.round(totals.proteins);
  totalFats.textContent = Math.round(totals.fats);
  totalCarbs.textContent = Math.round(totals.carbs);
  totalKcal.textContent = Math.round(totals.kcal);

  const divisor = totals.weight || 1;
  per100Proteins.textContent = Math.round((totals.proteins / divisor) * 100);
  per100Fats.textContent = Math.round((totals.fats / divisor) * 100);
  per100Carbs.textContent = Math.round((totals.carbs / divisor) * 100);
  per100Kcal.textContent = Math.round((totals.kcal / divisor) * 100);
}

async function suggestProducts(query) {
  const token = localStorage.getItem('token');
  const response = await fetch(`http://localhost:8080/products?search=${encodeURIComponent(query)}`, {
    headers: { "Authorization": "Bearer " + token }
  });
  if (!response.ok) {
    console.error('Failed to fetch products');
    return [];
  }
  return response.json();
}

function addIngredient() {
  ingredients.push({ name: "", weight: 100, proteins: 0, fats: 0, carbs: 0, kcal: 0 });
  updateIngredientTable();
  updateTotals();
}

function updateIngredientTable() {
  ingredientTableBody.innerHTML = '';

  ingredients.forEach((ing, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
    <td>${index + 1}</td>
    <td style="position:relative;">
      <input 
        value="${ing.name}" 
        oninput="handleIngredientInput(${index}, this)" 
        onchange="updateIngredientName(${index}, this)" 
        onblur="hideSuggestions(${index})"
        autocomplete="off"
        style="width:45px; padding:4px 6px; border:1px solid #ccc; border-radius:4px; font-size:14px;"
      />
      <div class="suggestions" id="suggestions-${index}" 
        style="position:absolute; top:100%; left:0; right:0; background:white; border:1px solid #ccc; z-index:1000; display:none;"></div>
    </td>
    <td><input type="number" value="${ing.weight}" onchange="updateIngredientWeight(${index}, this)"/></td>
    <td><input type="number" value="${ing.proteins}" onchange="updateIngredientProtein(${index}, this)"/></td>
    <td><input type="number" value="${ing.fats}" onchange="updateIngredientFat(${index}, this)"/></td>
    <td><input type="number" value="${ing.carbs}" onchange="updateIngredientCarb(${index}, this)"/></td>
    <td><input type="number" value="${ing.kcal}" onchange="updateIngredientKcal(${index}, this)"/></td>
    <td><button class="remove-btn" onclick="removeIngredient(${index})">✕</button></td>
  `;
    ingredientTableBody.appendChild(row);
  });
}

async function handleIngredientInput(index, input) {
  const query = input.value.trim();
  const suggestionsDiv = document.getElementById(`suggestions-${index}`);

  if (query.length < 2) {
    suggestionsDiv.style.display = 'none';
    return;
  }

  const suggestions = await suggestProducts(query);
  const limited = suggestions.slice(0, 10);

  suggestionsDiv.innerHTML = '';

  if (limited.length === 0) {
    suggestionsDiv.innerHTML = `<div style="padding:8px; color:#777;">Nothing found</div>`;
  } else {
    limited.forEach(product => {
      const option = document.createElement('div');
      option.textContent = product.name;
      option.style.padding = '8px';
      option.style.cursor = 'pointer';
      option.addEventListener('click', () => {
        ingredients[index] = {
          name: product.name,
          weight: 100,
          proteins: product.protein,
          fats: product.fat,
          carbs: product.carbs,
          kcal: product.calories
        };
        updateIngredientTable();
        updateTotals();
      });
      suggestionsDiv.appendChild(option);
    });
  }

  suggestionsDiv.style.display = 'block';
}

function hideSuggestions(index) {
  const suggestionsDiv = document.getElementById(`suggestions-${index}`);
  if (suggestionsDiv) {
    setTimeout(() => suggestionsDiv.style.display = 'none', 200);
  }
}

function updateIngredientName(index, input) { ingredients[index].name = input.value; }
function updateIngredientWeight(index, input) { ingredients[index].weight = parseFloat(input.value) || 0; updateTotals(); }
function updateIngredientProtein(index, input) { ingredients[index].proteins = parseFloat(input.value) || 0; updateTotals(); }
function updateIngredientFat(index, input) { ingredients[index].fats = parseFloat(input.value) || 0; updateTotals(); }
function updateIngredientCarb(index, input) { ingredients[index].carbs = parseFloat(input.value) || 0; updateTotals(); }
function updateIngredientKcal(index, input) { ingredients[index].kcal = parseFloat(input.value) || 0; updateTotals(); }
function removeIngredient(index) { ingredients.splice(index, 1); updateIngredientTable(); updateTotals(); }

function saveMealAndReturn() {
  if (!ingredients.length) {
    alert("Please add at least one ingredient.");
    return;
  }

  const source = localStorage.getItem('navigationSource');

  if (source === 'recipes' || source === 'plans') { // 👈 сюда добавляем plans
    saveAsRecipe();
  } else {
    saveAsMeal();
  }
}


function saveAsRecipe() {
  const token = localStorage.getItem('token');
  const body = {
    name: mealName.value || "Untitled Recipe",
    products: ingredients.map(ing => ({
      product: {
        name: ing.name,
        calories: ing.kcal,
        protein: ing.proteins,
        fat: ing.fats,
        carbs: ing.carbs
      },
      amountInGrams: ing.weight
    }))
  };

  const method = editingId ? 'PUT' : 'POST';
  const url = editingId ? `http://localhost:8080/recipes/${editingId}` : 'http://localhost:8080/recipes';

  fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token
    },
    body: JSON.stringify(body)
  })
    .then(res => {
      if (!res.ok) throw new Error("Failed to save recipe");
      return res.json();
    })
    .then(createdRecipe => { // 💬 createdRecipe - это объект, который сервер вернёт в ответ
      const source = localStorage.getItem('navigationSource');

      if (source === 'plans') {
        // 💬 Сохраняем новый рецепт в localStorage
        localStorage.setItem('newRecipe', JSON.stringify({
          id: createdRecipe.id,
          name: createdRecipe.name,
          products: createdRecipe.products
        }));
      }

      localStorage.removeItem('navigationSource');
      localStorage.removeItem('editItemId');

      if (source === 'plans') {
        window.location.href = 'planconstructor.html';
      } else {
        window.location.href = 'myrecipes.html';
      }
    })
    .catch(err => {
      console.error(err);
      alert("Error saving recipe.");
    });
}

function saveAsMeal() {
  const token = localStorage.getItem('token');
  const selectedDate = localStorage.getItem('selectedDate') || new Date().toISOString().split('T')[0];

  const body = {
    title: mealName.value || "Untitled Meal",
    products: ingredients.map(ing => ({
      product: {
        name: ing.name,
        calories: ing.kcal,
        protein: ing.proteins,
        fat: ing.fats,
        carbs: ing.carbs
      },
      amountInGrams: ing.weight
    }))
  };

  const method = editingId ? 'PUT' : 'POST';
  const url = editingId ? `http://localhost:8080/meals/${editingId}` : `http://localhost:8080/meals/${selectedDate}/add`;

  fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token
    },
    body: JSON.stringify(body)
  })
    .then(res => {
      if (!res.ok) throw new Error("Failed to save meal");
      return res.json();
    })
    .then(() => {
      localStorage.removeItem('navigationSource');
      window.location.href = 'today.html';
    })
    .catch(err => {
      console.error(err);
      alert("Error saving meal.");
    });
}

// --- My Recipes functionality ---
let availableRecipes = [];

function loadFromMyRecipes() {
  const container = document.getElementById('recipe-select-container');
  if (container.style.display === 'none' || container.style.display === '') {
    fetchRecipesForSelector();
    container.style.display = 'block';
  } else {
    container.style.display = 'none';
  }
}

function fetchRecipesForSelector() {
  const token = localStorage.getItem('token');
  fetch('http://localhost:8080/recipes', {
    headers: { "Authorization": "Bearer " + token }
  })
    .then(res => {
      if (!res.ok) throw new Error('Failed to fetch recipes');
      return res.json();
    })
    .then(data => {
      availableRecipes = data.slice(0, 10); // Только первые 10 рецептов
      renderRecipeList(availableRecipes);
    })
    .catch(err => {
      console.error('Error loading recipes:', err);
    });
}

function renderRecipeList(recipes) {
  const recipeList = document.getElementById('recipe-list');
  const recipeSearch = document.getElementById('recipe-search');

  recipeList.innerHTML = '';
  if (!recipes.length) {
    recipeList.innerHTML = '<p style="padding:8px; color:#777;">No recipes found</p>';
    return;
  }

  recipes.forEach(recipe => {
    const item = document.createElement('div');
    item.textContent = recipe.name || 'Untitled Recipe';
    item.classList.add('recipe-item');
    item.style.padding = '8px';
    item.style.cursor = 'pointer';
    item.style.borderBottom = '1px solid #eee';

    item.addEventListener('click', () => {
      loadRecipeIntoConstructor(recipe);
      document.getElementById('recipe-select-container').style.display = 'none'; // Скрываем выбор после выбора
    });

    recipeList.appendChild(item);
  });

  // Добавляем обработчик поиска (только один раз)
  recipeSearch.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    const filtered = availableRecipes.filter(r => (r.name || '').toLowerCase().includes(query));
    renderRecipeList(filtered);
  }, { once: true });
}

function loadRecipeIntoConstructor(recipe) {
  mealName.value = recipe.name || '';
  ingredients = [];

  recipe.products.forEach(item => {
    ingredients.push({
      name: item.product.name,
      weight: item.amountInGrams,
      proteins: item.product.protein,
      fats: item.product.fat,
      carbs: item.product.carbs,
      kcal: item.product.calories
    });
  });

  updateIngredientTable();
  updateTotals();
}


document.addEventListener("DOMContentLoaded", () => {
  editingId = localStorage.getItem('editItemId');
  editingType = localStorage.getItem('navigationSource');

  const editStatusDiv = document.getElementById('edit-status');
  if (editStatusDiv) {
    if (editingId && editingType === 'recipes') {
      editStatusDiv.textContent = 'Editing Recipe';
    } else if (editingId && editingType === 'meals') {
      editStatusDiv.textContent = 'Editing Meal';
    } else {
      editStatusDiv.textContent = 'Create New';
    }
  }

  const token = localStorage.getItem('token');

  if (editingId && editingType && token) {
    let url = '';
    if (editingType === 'recipes') {
      url = `http://localhost:8080/recipes/${editingId}`;
    } else if (editingType === 'meals') {
      url = `http://localhost:8080/meals/${editingId}`;
    } else if (editingType === 'plans') {
      url = `http://localhost:8080/recipes/${editingId}`;
    }

    fetch(url, {
      headers: { "Authorization": "Bearer " + token }
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to load item for editing');
        return res.json();
      })
      .then(data => {
        if (editingType === 'recipes' || editingType === 'plans') {
          mealName.value = data.name || "Untitled Recipe";
        } else if (editingType === 'meals') {
          mealName.value = data.title || "Untitled Meal";
        }

        ingredients = [];

        data.products.forEach(item => {
          ingredients.push({
            name: item.product.name,
            weight: item.amountInGrams,
            proteins: item.product.protein,
            fats: item.product.fat,
            carbs: item.product.carbs,
            kcal: item.product.calories
          });
        });

        updateIngredientTable();
        updateTotals();
      })
      .catch(err => {
        console.error('Error loading item for editing:', err);
        alert('Failed to load item for editing.');
      });

  }
});

