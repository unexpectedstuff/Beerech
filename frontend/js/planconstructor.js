let selectedRecipes = [];
let editingPlanId = null;

function updateRecipeList() {
  const recipesContainer = document.getElementById('planconstructor-container');
  recipesContainer.innerHTML = '';

  selectedRecipes.forEach((recipe, index) => {
    const recipeCard = document.createElement('div');
    recipeCard.classList.add('planconstructor-card');

    recipeCard.innerHTML = `
      <div class="meal-first">
        <p class="plancons-title">${recipe.name || 'Unnamed Recipe'}</p>
        <div class="meal-actions">
          <img src="images/edit.png" class="icon-btn edit-btn" title="Edit" data-id="${recipe.id}" />
        </div>
      </div>
      <div class="meal-second">
        <p class="plancons-calories">${Math.round(calculateTotalCalories(recipe))} kcal</p>
        <div class="meal-actions">
          <img src="images/delete.png" class="icon-btn delete-btn" title="Delete" data-index="${index}" />
        </div>
      </div>
      <div class="meal-nutrients">
        <span>Proteins: ${Math.round(calculateTotal(recipe, 'protein'))}g</span>
        <span>Fats: ${Math.round(calculateTotal(recipe, 'fat'))}g</span>
        <span>Carbs: ${Math.round(calculateTotal(recipe, 'carbs'))}g</span>
      </div>
    `;

    recipesContainer.appendChild(recipeCard);
  });

  attachEventListeners();
}

function attachEventListeners() {
  document.querySelectorAll('.edit-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const recipeId = btn.getAttribute('data-id');
      editRecipe(recipeId);
    });
  });

  document.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const index = btn.getAttribute('data-index');
      removeRecipe(index);
    });
  });
}

function removeRecipe(index) {
  selectedRecipes.splice(index, 1);
  updateRecipeList();
}

function editRecipe(recipeId) {
  localStorage.setItem('editItemId', recipeId);
  localStorage.setItem('navigationSource', 'plans');
  window.location.href = 'mealconstructor.html';
}

function savePlan() {
  let planTitle = "Untitled Plan";

  const inputTitle = document.querySelector('input.planconstructor-input');
  const planTitleElement = document.getElementById('planTitle');

  if (inputTitle) {
    // If user edits the name - we use input
    planTitle = inputTitle.value.trim() || "Untitled Plan";
  } else if (planTitleElement) {
    // Or take as usuall
    planTitle = planTitleElement.textContent.trim() || "Untitled Plan";
  }

  const token = localStorage.getItem('token');
  const planData = {
    title: planTitle,
    recipes: selectedRecipes.map(r => ({ id: r.id }))
  };

  const method = editingPlanId ? 'PUT' : 'POST';
  const url = editingPlanId ? `http://localhost:8080/meal-plans/${editingPlanId}` : 'http://localhost:8080/meal-plans/add';

  fetch(url, {
    method,
    headers: {
      "Authorization": "Bearer " + token,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(planData)
  })
    .then(res => {
      if (!res.ok) throw new Error('Failed to save plan');
      localStorage.removeItem('editPlanId');
      window.location.href = 'plans.html';
    })
    .catch(err => {
      console.error('Error saving plan:', err);
      alert('Failed to save plan.');
    });
}


function loadAvailableRecipes() {
  const token = localStorage.getItem('token');
  fetch('http://localhost:8080/recipes', {
    headers: { "Authorization": "Bearer " + token }
  })
    .then(res => res.json())
    .then(recipes => {
      const select = document.getElementById('recipe-select');
      if (select) {
        select.innerHTML = '<option value="">Select recipe...</option>';
        recipes.forEach(recipe => {
          const option = document.createElement('option');
          option.value = recipe.id;
          option.textContent = recipe.name;
          select.appendChild(option);
        });

        select.addEventListener('change', () => {
          const selectedId = select.value;
          const selectedRecipe = recipes.find(r => r.id == selectedId);
          if (selectedRecipe) {
            selectedRecipes.push(selectedRecipe);
            updateRecipeList();
          }
        });
      }
    })
    .catch(err => console.error('Error loading recipes:', err));
}

function calculateTotal(recipe, field) {
  return recipe.products?.reduce((acc, prod) => {
    return acc + (prod.product?.[field] || 0) * (prod.amountInGrams || 0) / 100;
  }, 0) || 0;
}

function calculateTotalCalories(recipe) {
  return calculateTotal(recipe, 'calories');
}

function handleTitleClick() {
  const planTitleElement = document.getElementById('planTitle');
  const currentTitle = planTitleElement.textContent.trim();
  const input = document.createElement('input');
  input.type = 'text';
  input.value = currentTitle;
  input.className = 'planconstructor-input';
  input.style.width = '100%';
  input.style.fontSize = '30px';
  input.style.textAlign = 'center';
  input.style.fontWeight = '600';
  input.style.border = 'none';
  input.style.outline = 'none';
  input.style.backgroundColor = 'transparent';

  planTitleElement.replaceWith(input);
  input.focus();

  function saveTitle() {
    const newTitle = input.value.trim() || 'Untitled Plan';
    const newPlanTitle = document.createElement('p');
    newPlanTitle.id = 'planTitle';
    newPlanTitle.className = 'planconstructor-title';
    newPlanTitle.textContent = newTitle;

    input.replaceWith(newPlanTitle);
    newPlanTitle.addEventListener('click', handleTitleClick);
  }

  input.addEventListener('blur', saveTitle);
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      saveTitle();
    }
  });
}

function navigateTo(page) {
  if (page === 'mealconstructor.html') {
    localStorage.setItem('navigationSource', 'plans');
  }
  window.location.href = page;
}



document.addEventListener('DOMContentLoaded', () => {
  const navigationSource = localStorage.getItem('navigationSource');
  const editedRecipeId = localStorage.getItem('editItemId');

  if (navigationSource === 'plans' && editedRecipeId) {
    // Здесь можно подгружать обновлённые данные рецепта если нужно
    localStorage.removeItem('editItemId');
    localStorage.removeItem('navigationSource');
  }

  editingPlanId = localStorage.getItem('editPlanId');

  if (editingPlanId) {
    const token = localStorage.getItem('token');
    fetch(`http://localhost:8080/meal-plans/${editingPlanId}`, {
      headers: { "Authorization": "Bearer " + token }
    })
      .then(res => res.json())
      .then(plan => {
        const planTitleInput = document.getElementById('planTitle');
        planTitleInput.textContent = plan.title || "Untitled Plan";
        selectedRecipes = plan.recipes || [];
        updateRecipeList();
      })
      .catch(err => {
        console.error('Error loading plan:', err);
        alert('Failed to load plan.');
      });
  }

  const planTitleElement = document.getElementById('planTitle');
  if (planTitleElement) {
    planTitleElement.addEventListener('click', handleTitleClick);
  }

  document.querySelector('.save-btn').addEventListener('click', savePlan);

  loadAvailableRecipes();
});
