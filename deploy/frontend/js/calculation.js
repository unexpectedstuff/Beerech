const API_BASE_URL = '/api'; 

document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");
  
  if (!token) {
    window.location.href = "login.html"; // Если нет токена — на логин
    return;
  }

  const user = JSON.parse(localStorage.getItem("user"));

  if (user && user.calorieTarget && user.activityLevel) {
    // Если уже есть нормальный пользователь в localStorage
    calculateAndDisplay(user);
  } else {
    // Иначе запросим его с сервера
    fetch(`${API_BASE_URL}/user/profile`, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
    .then(res => {
      if (!res.ok) throw new Error('Failed to load user profile');
      return res.json();
    })
    .then(fetchedUser => {
      localStorage.setItem('user', JSON.stringify(fetchedUser));
      calculateAndDisplay(fetchedUser);
    })
    .catch(err => {
      console.error('Error fetching user profile:', err);
    });
  }
});

function calculateAndDisplay(user) {
  const gender = user.gender;
  const age = Number(user.age);
  const weight = Number(user.weight);
  const height = Number(user.height);
  const activityLevel = user.activityLevel;
  const goal = user.goal;

  const caloriesEl = document.getElementById("calories-value");
  const proteinsEl = document.getElementById("proteins-value");
  const fatsEl = document.getElementById("fats-value");
  const carbsEl = document.getElementById("carbs-value");

  if (!(gender && age && weight && height && activityLevel && goal)) {
    if (caloriesEl) caloriesEl.textContent = "—";
    if (proteinsEl) proteinsEl.textContent = "—";
    if (fatsEl) fatsEl.textContent = "—";
    if (carbsEl) carbsEl.textContent = "—";
    return;
  }

  // Calculate BMR
  let bmr;
  if (gender === "MALE") {
    bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  }

  // Activity multiplier
 // Activity multiplier
let activityMultiplier = 1.2;
switch (activityLevel) {
  case "RARELY": activityMultiplier = 1.2; break;
  case "ONE_TO_TWO_TIMES": activityMultiplier = 1.375; break;
  case "THREE_TO_FIVE_TIMES": activityMultiplier = 1.55; break;
  case "SIX_TO_SEVEN_TIMES": activityMultiplier = 1.725; break;
  case "DAILY_INTENSE": activityMultiplier = 1.9; break;
}

// TDEE
let tdee = bmr * activityMultiplier;

// Correct for goal
if (goal === "LOSE_WEIGHT") {
  tdee -= 500;
} else if (goal === "GAIN_MUSCLE") {
  tdee += 500;
}


  const finalCalories = Math.round(tdee);
  const proteins = Math.round((finalCalories * 0.3) / 4);
  const fats = Math.round((finalCalories * 0.3) / 9);
  const carbs = Math.round((finalCalories * 0.4) / 4);

  if (caloriesEl) animateValue(caloriesEl, finalCalories);
  if (proteinsEl) animateValueWithSuffix(proteinsEl, proteins, "g");
  if (fatsEl) animateValueWithSuffix(fatsEl, fats, "g");
  if (carbsEl) animateValueWithSuffix(carbsEl, carbs, "g");
}

// Animate number (no suffix)
function animateValue(element, targetValue, duration = 1000) {
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const currentValue = Math.round(progress * targetValue);
    element.textContent = currentValue;

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

// Animate number with suffix
function animateValueWithSuffix(element, targetValue, suffix, duration = 1000) {
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const currentValue = Math.round(progress * targetValue);
    element.textContent = currentValue + suffix;

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}
