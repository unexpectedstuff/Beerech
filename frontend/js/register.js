// Get references to all input fields and the register button
const regLoginInput = document.getElementById('regLogin');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('regPassword');
const confirmInput = document.getElementById('confirmPassword');
const registerButton = document.getElementById('registerButton');

// Function to enable or disable the register button based on input validation
function toggleRegisterState() {
  // Check if each field is filled (non-empty after trimming)
  const isRegLoginFilled = regLoginInput.value.trim() !== '';
  const isEmailFilled = emailInput.value.trim() !== '';
  const isPasswordFilled = passwordInput.value.trim() !== '';
  const isConfirmFilled = confirmInput.value.trim() !== '';
  // Check if password and confirmation match
  const passwordsMatch = passwordInput.value === confirmInput.value;

  if (isRegLoginFilled && isEmailFilled && isPasswordFilled && isConfirmFilled && passwordsMatch) {
    // If all inputs are valid and passwords match, enable the register button
    registerButton.classList.remove('inactive');
    registerButton.classList.add('active');
  } else {
    // Otherwise, keep the button inactive
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
});