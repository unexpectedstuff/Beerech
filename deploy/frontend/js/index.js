document.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    if (token && user) {
        // Check if calorieTarget and activityLevel exist
        const hasProfileData = user.calorieTarget != null && user.activityLevel != null;

        if (hasProfileData) {
            window.location.href = "today.html"; // Full profile -> go to today
        } else {
            window.location.href = "target.html"; // Only basic info -> go to target
        }
    }
    // Else do nothing, stay on welcome page
});
