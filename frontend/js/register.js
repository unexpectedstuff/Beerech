const emailInput = document.getElementById('email');
const nameInput = document.getElementById('name');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirm-password');
const registerButton = document.getElementById('registerButton');
const errorBox = document.getElementById('register-error');

function toggleRegisterButton() {
  const filled =
    emailInput.value.trim() &&
    nameInput.value.trim() &&
    passwordInput.value.trim() &&
    confirmPasswordInput.value.trim();

  if (filled && passwordInput.value === confirmPasswordInput.value) {
    registerButton.classList.add('active');
    registerButton.classList.remove('inactive');
    registerButton.disabled = false;
  } else {
    registerButton.classList.add('inactive');
    registerButton.classList.remove('active');
    registerButton.disabled = true;
  }
}

emailInput.addEventListener('input', toggleRegisterButton);
nameInput.addEventListener('input', toggleRegisterButton);
passwordInput.addEventListener('input', toggleRegisterButton);
confirmPasswordInput.addEventListener('input', toggleRegisterButton);

registerButton.addEventListener('click', () => {
  const body = {
    email: emailInput.value.trim(),
    name: nameInput.value.trim(),
    password: passwordInput.value.trim()
  };

  fetch("http://localhost:8080/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  })
    .then(res => {
      if (!res.ok) {
        throw new Error("Registration failed");
      }
      return res.json();
    })
    .then(data => {
      // Сохраняем только сам токен
      localStorage.setItem("token", data.token);
      window.location.href = "profile.html";
    })
    .catch(err => {
      errorBox.textContent = "Registration failed. Please check your input.";
      errorBox.style.display = "block";
    });
});
