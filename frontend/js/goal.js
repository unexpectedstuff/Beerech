// Wait for the DOM to fully load before running the script
document.addEventListener("DOMContentLoaded", () => {
  // Get all radio buttons for goal selection
  const radioButtons = document.querySelectorAll('input[name="goal"]');
  // Get reference to the Continue button
  const continueBtn = document.getElementById("continueButton");

  // Add a change event listener to each goal radio button
  radioButtons.forEach((radio) => {
      radio.addEventListener("change", () => {
          // Enable the Continue button when a goal is selected
          continueBtn.classList.remove("inactive");

          // Get the selected goal value
          const goal = radio.value;
          // Retrieve existing user data from localStorage, or create a new object
          const user = JSON.parse(localStorage.getItem("user")) || {};
          // Save the selected goal into the user object
          user.goal = goal;
          // Update the user data in localStorage
          localStorage.setItem("user", JSON.stringify(user));
      });
  });
});