const loginInput = document.getElementById('login');
const passwordInput = document.getElementById('password');
const enterButton = document.getElementById('enterButton');
const errorBox = document.getElementById('error-message'); // элемент для вывода ошибок

function toggleLinkState() {
  const loginFilled = loginInput.value.trim() !== '';
  const passwordFilled = passwordInput.value.trim() !== '';

  if (loginFilled && passwordFilled) {
    enterButton.classList.remove('inactive');
    enterButton.classList.add('active');
    enterButton.disabled = false;
  } else {
    enterButton.classList.add('inactive');
    enterButton.classList.remove('active');
    enterButton.disabled = true;
  }
}

loginInput.addEventListener('input', toggleLinkState);
passwordInput.addEventListener('input', toggleLinkState);

// Fetch on click
enterButton.addEventListener('click', function () {
  const email = loginInput.value.trim();
  const password = passwordInput.value.trim();

  fetch('http://localhost:8080/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
    .then(res => {
      if (!res.ok) {
        throw new Error("Login failed");
      }
      return res.json();
    })
    .then(data => {
      localStorage.setItem("token", data.token);
      window.location.href = 'profile.html';
    })
    .catch(err => {
      if (errorBox) {
        errorBox.textContent = 'Login failed. Please check your credentials.';
        errorBox.style.display = 'block';
      } else {
        alert("Login failed.");
      }
    });
});
