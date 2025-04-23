// Get references to the login input, password input, and the enter button elements
const loginInput = document.getElementById('login');
const passwordInput = document.getElementById('password');
const enterButton = document.getElementById('enterButton');

// Function to toggle the button's active/inactive state
function toggleLinkState() {
  
  // Check if both login and password fields are filled (non-empty after trimming)
  const loginFilled = loginInput.value.trim() !== '';
  const passwordFilled = passwordInput.value.trim() !== '';

  if (loginFilled && passwordFilled) {
    // Enable the button by applying the 'active' class and removing 'inactive'
    enterButton.classList.remove('inactive');
    enterButton.classList.add('active');
  } else {
    // Disable the button by applying the 'inactive' class and removing 'active'
    enterButton.classList.add('inactive');
    enterButton.classList.remove('active');
  }
}

// Add event listeners to the input fields to check their content on each keystroke
loginInput.addEventListener('input', toggleLinkState);
passwordInput.addEventListener('input', toggleLinkState);