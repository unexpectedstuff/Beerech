// Wait until the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Retrieve user data from localStorage, or use an empty object if not found
  const user = JSON.parse(localStorage.getItem("user")) || {};

  // Display the user's username and email in the profile section
  document.getElementById("username").textContent = user.username || "No username";
  document.getElementById("email").textContent = user.email || "No email";

  // Set the profile avatar image based on user's gender
  const avatar = document.getElementById("user-avatar");
  if (user.gender === "female") {
      avatar.src = "images/femaleAccount.png";
  } else if (user.gender === "male") {
      avatar.src = "images/maleAccount.png";
  } else {
      avatar.src = "images/defaultAvatar.png"; // Fallback if gender is not specified
  }
});

// Function to navigate to a different page
function navigateTo(page) {
  window.location.href = page;
}

// Function to confirm logout action
function confirmLogout() {
  const confirmed = confirm("Are you sure you want to log out?");
  if (confirmed) {
      // Clear all user data from localStorage
      localStorage.clear();
      // Redirect to the login page
      window.location.href = "1index.html";
  }
}

