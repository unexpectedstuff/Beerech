// Get references to all input fields and the register button
const regLoginInput = document.getElementById('regLogin');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('regPassword');
const confirmInput = document.getElementById('confirmPassword');
const registerButton = document.getElementById('registerButton');

// Function to validate email format
function validateEmail(email) {
  return email.includes('@') && email.includes('.');
}

// Function to validate username (only English letters and digits, minimum length of 3)
function validateRegLogin(username) {
  const loginPattern = /^[A-Za-z0-9]{3,}$/; // Only English letters and digits, minimum 3 characters
  return loginPattern.test(username);
}

// Function to validate password strength
function validatePassword(password) {
  const passwordPattern = /^[A-Za-z0-9]{6,}$/; // Only letters and digits, minimum 6 characters
  return passwordPattern.test(password);
}

// Function to enable or disable the register button based on input validation
function toggleRegisterState() {
  // Check if each field is filled (non-empty after trimming)
  const isRegLoginFilled = regLoginInput.value.trim() !== '';
  const isEmailFilled = emailInput.value.trim() !== '';
  const isPasswordFilled = passwordInput.value.trim() !== '';
  const isConfirmFilled = confirmInput.value.trim() !== '';

  // Check if email, regLogin, password and confirmation are valid
  const isEmailValid = validateEmail(emailInput.value.trim());
  const isRegLoginValid = validateRegLogin(regLoginInput.value.trim());
  const isPasswordValid = validatePassword(passwordInput.value.trim());
  const passwordsMatch = passwordInput.value === confirmInput.value;

  // Enable register button only if all inputs are valid and passwords match
  if (isRegLoginFilled && isEmailFilled && isPasswordFilled && isConfirmFilled && isEmailValid && isRegLoginValid && isPasswordValid && passwordsMatch) {
    registerButton.classList.remove('inactive');
    registerButton.classList.add('active');
  } else {
    registerButton.classList.add('inactive');
    registerButton.classList.remove('active');
  }
}

// Add event listeners to update button state in real-time as user types
regLoginInput.addEventListener('input', toggleRegisterState);
emailInput.addEventListener('input', toggleRegisterState);
passwordInput.addEventListener('input', toggleRegisterState);
confirmInput.addEventListener('input', toggleRegisterState);

// Handle register button click
registerButton.addEventListener('click', function (e) {
  // Only proceed if the button is active
  const isActive = registerButton.classList.contains('active');

  if (!isActive) {
    // Prevent form submission and show alert if inputs are invalid
    e.preventDefault();
    alert("Please fill in the form correctly.");
    return;
  }

  // Create a user object from input values
  const user = {
    username: regLoginInput.value.trim(),
    email: emailInput.value.trim(),
    gender: null // gender is not yet collected in the form
  };

  // Store user data in localStorage
  localStorage.setItem("user", JSON.stringify(user));

  // You can also proceed to send data to a backend server here
  // Example: fetch("/register", { method: "POST", body: JSON.stringify(user) });

  alert("Registration successful!");
});