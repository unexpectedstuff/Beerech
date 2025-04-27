const API_BASE_URL = '/api'; 

// Wait until the DOM is fully loaded before running the script
document.addEventListener("DOMContentLoaded", () => {
  // Retrieve user data from localStorage, or use an empty object if not found
  const user = JSON.parse(localStorage.getItem("user")) || {};

  // Extract necessary user data and convert them to numbers
  const gender = user.gender;
  const age = Number(user.age);
  const weight = Number(user.weight);
  const height = Number(user.height);
  const activity = Number(user.activity);
  const goal = user.goal;

  // Get references to the elements where calorie and nutrient values will be displayed
  const caloriesEl = document.getElementById("calories-value");
  const proteinsEl = document.getElementById("proteins-value");
  const fatsEl = document.getElementById("fats-value");
  const carbsEl = document.getElementById("carbs-value");

  // If any essential data is missing, display a placeholder ("—") and exit the function
  if (!(gender && age && weight && height && activity && goal)) {
    caloriesEl.textContent = "—";
    return;
  }

  // Calculate Basal Metabolic Rate (BMR) based on gender, weight, height, and age
  let bmr;
  if (gender === "male") {
    // Formula for male BMR
    bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    // Formula for female BMR
    bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  }

  // Calculate Total Daily Energy Expenditure (TDEE) based on activity level
  let tdee = bmr * activity;

  // Adjust TDEE based on the user's goal (lose, maintain, or gain weight)
  if (goal === "lose") {
    tdee -= 500; // Decrease calories for weight loss
  } else if (goal === "gain") {
    tdee += 500; // Increase calories for weight gain
  }

  // Round the final calories to the nearest integer
  const finalCalories = Math.round(tdee);

  // Calculate macronutrient values based on the final calories
  const proteins = Math.round((finalCalories * 0.3) / 4); // 30% protein, divided by 4 (calories per gram of protein)
  const fats = Math.round((finalCalories * 0.3) / 9); // 30% fat, divided by 9 (calories per gram of fat)
  const carbs = Math.round((finalCalories * 0.4) / 4); // 40% carbs, divided by 4 (calories per gram of carbs)

  // Display the calculated values in the corresponding elements
  caloriesEl.textContent = finalCalories;
  proteinsEl.textContent = proteins + "g";
  fatsEl.textContent = fats + "g";
  carbsEl.textContent = carbs + "g";
});