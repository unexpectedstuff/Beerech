const API_BASE_URL = '/api'; 

document.addEventListener("DOMContentLoaded", () => {
  const radioButtons = document.querySelectorAll('input[name="goal"]');
  const continueBtn = document.getElementById("continueButton");

  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "login.html"; // если нет токена, отправляем на логин
    return;
  }

  radioButtons.forEach((radio) => {
    radio.addEventListener("change", () => {
      continueBtn.classList.remove("inactive");

      const goal = radio.value;
      const user = JSON.parse(localStorage.getItem("user")) || {};

      user.goal = goal;
      localStorage.setItem("user", JSON.stringify(user));

       fetch(`${API_BASE_URL}/user/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(user)
      })
      .then(res => {
        if (!res.ok) throw new Error('Failed to update goal on server');
        console.log('Goal successfully updated on server');
        window.location.href = "calories.html"; // ✅ после успеха отправляем на today.html
      })
      .catch(err => {
        console.error('Error updating goal on server:', err);
      });
    });
  });
});
