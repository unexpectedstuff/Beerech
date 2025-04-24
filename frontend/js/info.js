// Wait until the entire DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
    // Get all gender selection buttons and the hidden input to store selected gender
    const genderButtons = document.querySelectorAll(".gender-btn");
    const genderInput = document.getElementById("gender");
  
    // Add change event listeners to each gender button
    genderButtons.forEach(button => {
        button.addEventListener("change", function () {
            // When a gender is selected, update the hidden input and validate the form
            genderInput.value = this.value;
            validateForm();
        });
    });
  
    // Function to validate the form and toggle the Continue button's state
    function validateForm() {
        const ageInput = document.getElementById("age");
        const heightInput = document.getElementById("height");
        const weightInput = document.getElementById("weight");
        const activitySelect = document.getElementById("activity");
        const continueButton = document.getElementById("continueButton");
  
        // Check if all fields have values (not empty)
        const isFormValid =
            ageInput.value.trim() !== "" &&
            genderInput.value.trim() !== "" &&
            heightInput.value.trim() !== "" &&
            weightInput.value.trim() !== "" &&
            activitySelect.value.trim() !== "" &&
            isAgeValid(ageInput.value) &&
            isHeightValid(heightInput.value) &&
            isWeightValid(weightInput.value);
  
        // Enable or disable the Continue button based on validation
        continueButton.classList.toggle("inactive", !isFormValid);
        continueButton.classList.toggle("active", isFormValid);
    }
  
    // Validate age (must be between 18 and 120)
    function isAgeValid(age) {
      const ageNum = parseInt(age, 10);
      return ageNum >= 18 && ageNum <= 120;
    }
  
    // Validate height (must be between 100 cm and 250 cm)
    function isHeightValid(height) {
      const heightNum = parseInt(height, 10);
      return heightNum >= 100 && heightNum <= 250;
    }
  
    // Validate weight (must be between 30 kg and 300 kg)
    function isWeightValid(weight) {
      const weightNum = parseInt(weight, 10);
      return weightNum >= 30 && weightNum <= 300;
    }
  
    // Collect input elements for live validation
    const inputs = [
        document.getElementById("age"),
        document.getElementById("height"),
        document.getElementById("weight"),
        document.getElementById("activity"),
        genderInput
    ];
  
    // Attach validation listener to all relevant fields
    inputs.forEach(input => {
        input.addEventListener("input", validateForm);
    });
  });
  
  // Handle click on the Continue button
  const continueButton = document.getElementById("continueButton");
  continueButton.addEventListener("click", function (e) {
    // Prevent proceeding if the form is invalid
    if (this.classList.contains("inactive")) {
        e.preventDefault();
    } else {
        // Collect input values
        const age = document.getElementById("age").value;
        const height = document.getElementById("height").value;
        const weight = document.getElementById("weight").value;
        const gender = document.getElementById("gender").value;
        const activity = document.getElementById("activity").value;
  
        // Retrieve existing user data from localStorage, or create a new object
        const user = JSON.parse(localStorage.getItem("user")) || {};
  
        // Add the collected info to the user object
        user.age = age;
        user.height = height;
        user.weight = weight;
        user.gender = gender;
        user.activity = activity;
  
        // Save updated user data back to localStorage
        localStorage.setItem("user", JSON.stringify(user));
  
        // Log confirmation to the console (for development/debugging)
        console.log("User data saved to localStorage");
    }
  });