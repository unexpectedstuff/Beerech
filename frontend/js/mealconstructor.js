function saveMeal() {
    const meal = {
      id: Date.now(),
      title: document.getElementById("meal-title").value,
      calories: Number(document.getElementById("meal-calories").value),
      protein: Number(document.getElementById("meal-protein").value),
      fat: Number(document.getElementById("meal-fat").value),
      carbs: Number(document.getElementById("meal-carbs").value)
    };
  
    const meals = JSON.parse(localStorage.getItem("meals")) || [];
    meals.push(meal);
    localStorage.setItem("meals", JSON.stringify(meals));
  
    window.location.href = 'today.html';
  }
  




  document.addEventListener("DOMContentLoaded", () => {
    const mealToEdit = JSON.parse(localStorage.getItem("mealToEdit"));
  
    if (mealToEdit) {
      // Заполняем форму данными из localStorage
      document.getElementById("meal-name").value = mealToEdit.name;
      document.getElementById("meal-calories").value = mealToEdit.calories;
      document.getElementById("meal-protein").value = mealToEdit.protein;
      document.getElementById("meal-fat").value = mealToEdit.fat;
      document.getElementById("meal-carbs").value = mealToEdit.carbs;
    }
  });





  document.getElementById("meal-form").addEventListener("submit", (e) => {
    e.preventDefault();
  
    const mealToEdit = JSON.parse(localStorage.getItem("mealToEdit"));
    const updatedMeal = {
      name: document.getElementById("meal-name").value,
      calories: document.getElementById("meal-calories").value,
      protein: document.getElementById("meal-protein").value,
      fat: document.getElementById("meal-fat").value,
      carbs: document.getElementById("meal-carbs").value,
    };
  
    // Получаем сохраненные блюда по дате
    const meals = JSON.parse(localStorage.getItem("mealsByDate") || "{}");
    const selectedDate = localStorage.getItem("selectedDate");
  
    // Обновляем данные блюда
    meals[selectedDate][mealToEdit.index] = updatedMeal;
  
    // Сохраняем обновленные блюда
    localStorage.setItem("mealsByDate", JSON.stringify(meals));
  
    // Удаляем mealToEdit, чтобы данные не мешали при следующем редактировании
    localStorage.removeItem("mealToEdit");
  
    // Возвращаемся на страницу с приемами пищи
    window.location.href = "today.html";
  });




  window.addEventListener('DOMContentLoaded', () => {
    const savedData = localStorage.getItem('editRecipe');

    if (savedData) {
        const { title, calories, proteins, fats, carbs } = JSON.parse(savedData);

        document.querySelector('#title-input').value = title || '';
        document.querySelector('#calories-input').value = calories || '';
        document.querySelector('#proteins-input').value = proteins || '';
        document.querySelector('#fats-input').value = fats || '';
        document.querySelector('#carbs-input').value = carbs || '';
    }
});