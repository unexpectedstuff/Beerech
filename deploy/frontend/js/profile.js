const API_BASE_URL = '/api'; 
document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "login.html";
    return;
  }

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
      // Заполнение всех доступных полей
      document.getElementById("username").textContent = user.name || "No name";
      document.getElementById("email").textContent = user.email || "No email";
      document.getElementById("age").textContent = user.age !== null ? `Age: ${user.age}` : "Age: -";
      document.getElementById("weight").textContent = user.weight !== null ? `Weight: ${user.weight} kg` : "Weight: -";
      document.getElementById("height").textContent = user.height !== null ? `Height: ${user.height} cm` : "Height: -";
      document.getElementById("gender").textContent = user.gender ? `Gender: ${user.gender.toLowerCase()}` : "Gender: -";
      document.getElementById("goal").textContent = user.goal ? `Goal: ${user.goal.toLowerCase().replace('_', ' ')}` : "Goal: -";
      document.getElementById("calorieTarget").textContent = user.calorieTarget !== null ? `Calories/day: ${user.calorieTarget}` : "Calories/day: -";

      // Аватар
      const avatar = document.getElementById("user-avatar");
      if (user.gender === "FEMALE") {
        avatar.src = "images/femaleAccount.png";
      } else if (user.gender === "MALE") {
        avatar.src = "images/maleAccount.png";
      } else {
        avatar.src = "images/defaultAvatar.png";
      }
    })
    .catch(err => {
      console.error("Failed to fetch profile", err);
      localStorage.removeItem("token");
      // window.location.href = "login.html";
    });
});

function navigateTo(page) {
  window.location.href = page;
}

function confirmLogout() {
  if (confirm("Are you sure you want to log out?")) {
    // localStorage.clear();
    window.location.href = "login.html";
  }
}
