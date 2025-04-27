const API_BASE_URL = window.location.origin;

function navigateTo(url) {
  window.location.href = url;
}

function loadMealPlans() {
  const token = localStorage.getItem('token');
  const plansContainer = document.getElementById('plans-container');
  plansContainer.innerHTML = '';

  fetch(`${API_BASE_URL}/meal-plans`, {
    headers: { "Authorization": "Bearer " + token }
  })
    .then(res => {
      if (!res.ok) throw new Error('Failed to load meal plans');
      return res.json();
    })
    .then(plans => {
      if (!plans.length) {
        plansContainer.innerHTML = '<p>No meal plans found.</p>';
        return;
      }

      plans.forEach(plan => {
        const planCard = document.createElement('div');
        planCard.classList.add('plan-card');
        planCard.innerHTML = `
          <div class="plan-first">
            <p class="plan-title">${plan.title || 'Untitled Plan'}</p>
            <div class="meal-actions">
              <img src="images/edit.png" class="icon-btn" title="Edit" onclick="editPlan(${plan.id})" />
              <img src="images/delete.png" class="icon-btn" title="Delete" onclick="deletePlan(${plan.id})" />
            </div>
          </div>
          <div class="plan-second">
            <p class="plan-calories">${plan.recipes.length} recipes</p>
          </div>
        `;
        plansContainer.appendChild(planCard);
      });
    })
    .catch(err => {
      console.error('Error loading meal plans:', err);
      plansContainer.innerHTML = '<p>Error loading meal plans.</p>';
    });
}

function editPlan(planId) {
  localStorage.setItem('editPlanId', planId);
  navigateTo('planconstructor.html');
}

function deletePlan(planId) {
  const confirmDelete = confirm('Are you sure you want to delete this plan?');
  if (!confirmDelete) return;

  const token = localStorage.getItem('token');
  fetch(`${API_BASE_URL}/meal-plans/${planId}`, {
    method: 'DELETE',
    headers: { "Authorization": "Bearer " + token }
  })
    .then(res => {
      if (!res.ok) throw new Error('Failed to delete meal plan');
      loadMealPlans();
    })
    .catch(err => {
      console.error('Error deleting meal plan:', err);
      alert('Failed to delete meal plan.');
    });
}

window.onload = loadMealPlans;
