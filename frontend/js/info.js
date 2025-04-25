document.addEventListener("DOMContentLoaded", function () {
  const genderButtons = document.querySelectorAll(".gender-btn");
  const continueButton = document.getElementById("continueButton");

  const ageInput = document.getElementById("age");
  const heightInput = document.getElementById("height");
  const weightInput = document.getElementById("weight");
  const activitySelect = document.getElementById("activity");

  let user = {}; // сюда загрузим текущий профиль

  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "login.html";
    return;
  }

  fetch("http://localhost:8080/user/profile", {
    headers: { "Authorization": "Bearer " + token }
  })
    .then(res => {
      if (!res.ok) throw new Error("Failed to load user profile");
      return res.json();
    })
    .then(data => {
      user = data;

      if (data.age) ageInput.value = data.age;
      if (data.height) heightInput.value = data.height;
      if (data.weight) weightInput.value = data.weight;
      if (data.gender) {
        const btn = document.getElementById(data.gender.toLowerCase());
        if (btn) btn.checked = true;
      }

      validateForm();
    })
    .catch(err => {
      console.error("Error loading user data:", err);
      window.location.href = "login.html";
    });

  genderButtons.forEach(button => {
    button.addEventListener("change", validateForm);
  });

  function getSelectedGender() {
    const selected = document.querySelector('input[name="gender"]:checked');
    return selected ? selected.value.toUpperCase() : null;
  }

  function validateForm() {
    const gender = getSelectedGender();

    const isFormValid =
      ageInput.value.trim() &&
      gender &&
      heightInput.value.trim() &&
      weightInput.value.trim() &&
      activitySelect.value.trim() &&
      isAgeValid(ageInput.value) &&
      isHeightValid(heightInput.value) &&
      isWeightValid(weightInput.value);

    continueButton.classList.toggle("inactive", !isFormValid);
    continueButton.classList.toggle("active", isFormValid);
  }

  function isAgeValid(age) {
    const a = parseInt(age, 10);
    return a >= 18 && a <= 120;
  }

  function isHeightValid(height) {
    const h = parseInt(height, 10);
    return h >= 100 && h <= 250;
  }

  function isWeightValid(weight) {
    const w = parseInt(weight, 10);
    return w >= 30 && w <= 300;
  }

  [ageInput, heightInput, weightInput, activitySelect].forEach(input =>
    input.addEventListener("input", validateForm)
  );

  continueButton.addEventListener("click", function (e) {
    if (this.classList.contains("inactive")) {
      e.preventDefault();
      return;
    }

    const gender = getSelectedGender() || "OTHER";

    const age = parseInt(ageInput.value);
    const height = parseFloat(heightInput.value);
    const weight = parseFloat(weightInput.value);
    const activity = parseFloat(activitySelect.value);

    const updatedUser = {
      name: user.name || "Anonymous",
      email: user.email || "missing@example.com",
      goal: user.goal || "MAINTAIN_WEIGHT",
      age,
      height,
      weight,
      gender,
      calorieTarget: Math.round(
        (10 * weight + 6.25 * height - 5 * age + (gender === "MALE" ? 5 : -161)) * activity
      )
    };

    fetch("http://localhost:8080/user/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      },
      body: JSON.stringify(updatedUser)
    })
      .then(res => {
        if (!res.ok) throw new Error("Failed to update profile");
        window.location.href = "goal.html";
      })
      .catch(err => {
        console.error("Error updating profile:", err);
      });
  });
});
