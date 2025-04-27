const API_BASE_URL = window.location.origin;

document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "login.html";
    return;
  }

  const caloriesEl = document.getElementById("calories-value");
  const proteinsEl = document.getElementById("proteins-value");
  const fatsEl = document.getElementById("fats-value");
  const carbsEl = document.getElementById("carbs-value");

  fetch(`${API_BASE_URL}/user/profile`, {
    headers: {
      "Authorization": "Bearer " + token
    }
  })
    .then(res => {
      if (!res.ok) throw new Error("Unauthorized");
      return res.json();
    })
    .then(user => {
      const gender = user.gender;
      const age = Number(user.age);
      const weight = Number(user.weight);
      const height = Number(user.height);
      const goal = user.goal;
      const calorieTarget = Number(user.calorieTarget);

      if (!(gender && age && weight && height && goal && calorieTarget)) {
        caloriesEl.textContent = "—";
        return;
      }

      caloriesEl.textContent = calorieTarget;

      const proteins = Math.round((calorieTarget * 0.3) / 4);
      const fats = Math.round((calorieTarget * 0.3) / 9);
      const carbs = Math.round((calorieTarget * 0.4) / 4);

      proteinsEl.textContent = proteins + "g";
      fatsEl.textContent = fats + "g";
      carbsEl.textContent = carbs + "g";
    })
    .catch(err => {
      console.error("Failed to fetch profile", err);
      localStorage.removeItem("token");
      window.location.href = "login.html";
    });
});