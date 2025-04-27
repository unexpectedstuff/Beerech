# Calorie Tracker API

This is a Spring Boot based RESTful API for a calorie tracking application. It supports user authentication, meal and product tracking, and nutrition goal setting.

---

## Technologies Used

- Java 21
- Spring Boot 3
- Spring Security with JWT
- PostgreSQL
- Maven

---

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/calorie-tracker-api.git
   ```

2. Configure `application.properties`:
   ```
   spring.datasource.url=jdbc:postgresql://localhost:5432/caloriedb
   spring.datasource.username=youruser
   spring.datasource.password=yourpass
   jwt.secret=your_jwt_secret
   ```

3. Run the app:
   ```bash
   ./mvnw spring-boot:run
   ```

---

# API Endpoints

## Authentication

### POST `/auth/register`
**Description:** Register a new user.

**Request Example:**
```json
{
  "email": "user@example.com",
  "password": "SecurePass123",
  "name": "John Doe"
}
```

**Response Example:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### POST `/auth/login`
**Description:** Login with email and password.

**Request Example:**
```json
{
  "email": "user@example.com",
  "password": "SecurePass123"
}
```

**Response Example:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

## User Profile

### GET `/user/profile`
**Description:** Get current user profile.

**Response Example:**
```json
{
  "id": 1,
  "email": "user@example.com",
  "name": "John Doe",
  "age": 30,
  "weight": 75.5,
  "height": 180,
  "gender": "MALE",
  "goal": "MAINTAIN",
  "calorieTarget": 2200
}
```

---

### PUT `/user/profile`
**Description:** Update user profile.

**Request Example:**
```json
{
  "age": 31,
  "weight": 76,
  "height": 181,
  "gender": "MALE",
  "goal": "LOSE",
  "calorieTarget": 2000
}
```

**Response Example:** `200 OK`

---

## Meals

### GET `/meals/{date}`
**Description:** Get meals for a specific date.

**Example Request:**
```
GET /meals/2025-04-27
```

**Response Example:**
```json
[
  {
    "id": 1,
    "title": "Lunch",
    "products": [
      {
        "id": 1,
        "amountInGrams": 200,
        "product": {
          "name": "Chicken Breast",
          "calories": 165,
          "protein": 31,
          "fat": 3.6,
          "carbs": 0
        }
      }
    ]
  }
]
```

---

### POST `/meals/{date}/add`
**Description:** Add a meal for a specific date.

**Request Example:**
```json
{
  "title": "Dinner",
  "products": [
    {
      "product": {
        "name": "Salmon",
        "calories": 208,
        "protein": 20,
        "fat": 13,
        "carbs": 0
      },
      "amountInGrams": 150
    }
  ]
}
```

**Response Example:**
```json
{
  "id": 5,
  "title": "Dinner",
  "date": "2025-04-27",
  "products": [...]
}
```

---

## Meal Plans

### GET `/meal-plans`
**Description:** Get all meal plans.

**Response Example:**
```json
[
  {
    "id": 1,
    "title": "Weekly Plan",
    "recipes": [
      { "id": 1, "name": "Breakfast Sandwich" },
      { "id": 2, "name": "Chicken Salad" }
    ]
  }
]
```

---

### POST `/meal-plans/add`
**Description:** Create a new meal plan.

**Request Example:**
```json
{
  "title": "Test Plan",
  "recipes": [
    { "id": 1 },
    { "id": 3 }
  ]
}
```

**Response Example:**
```json
{
  "id": 2,
  "title": "Test Plan",
  "recipes": [
    { "id": 1, "name": "Apple Sandwich" },
    { "id": 3, "name": "Banana Oatmeal" }
  ]
}
```

---

### PUT `/meal-plans/{id}`
**Description:** Update an existing meal plan.

**Request Example:**
```json
{
  "title": "Updated Plan",
  "recipes": [
    { "id": 1 },
    { "id": 4 }
  ]
}
```

**Response Example:** `200 OK`

---

### DELETE `/meal-plans/{id}`
**Description:** Delete a meal plan.

**Example Request:**
```
DELETE /meal-plans/2
```

**Response Example:** `204 No Content`

---

### POST `/meal-plans/apply/{id}/{date}`
**Description:** Apply a meal plan to a date.

**Example Request:**
```
POST /meal-plans/apply/2/2025-05-01
```

**Response Example:**
```json
{
  "status": "success"
}
```

---

## Products

### GET `/products`
**Description:** List all products.

**Response Example:**
```json
[
  {
    "id": 1,
    "name": "Chicken Breast",
    "calories": 165,
    "protein": 31,
    "fat": 3.6,
    "carbs": 0
  },
  ...
]
```

### GET `/products/{id}`
**Description:** Get a specific product.

**Response Example:**
```json
{
  "id": 1,
  "name": "Chicken Breast",
  "calories": 165,
  "protein": 31,
  "fat": 3.6,
  "carbs": 0
}
```

### POST `/products/add`
**Description:** Add a new product.

**Request Example:**
```json
{
  "name": "Almonds",
  "calories": 579,
  "protein": 21,
  "fat": 50,
  "carbs": 22
}
```

**Response Example:**
```json
{
  "id": 7,
  "name": "Almonds",
  "calories": 579,
  "protein": 21,
  "fat": 50,
  "carbs": 22
}
```

---

<!-- ## Barcode Scanning

### POST `/barcode/scan`

Look up a product by barcode. -->

<!-- **Request:**
```json
{
  "barcode": "1234567890123"
}
``` -->

---

## Notes

- All secured endpoints require a valid JWT in the `Authorization` header.
- Static frontend is assumed to interact with this API.
- Some features like CSV export or analytics are planned for future versions.

---

## Sample Token Use in Postman

Set JWT token in the header:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6...
```

# 🥦 Calorie Tracker — Frontend

This is a static frontend for a calorie and nutrition tracking app. It works together with the backend on Spring Boot.
Features

The app is designed for mobile-first experience and contains the following screens:

## 1. Login and Registration
    
    Users log in or register using their email and password.
    
    Basic validation and token storage in localStorage.

    

    
## 2. Profile (profile.html)
    
    Displays user information: name, email, gender, age, height, weight, goal, and calorie target.
    
    The avatar is selected based on gender.
    
    Options:
    
    ```
     View daily report
    
     View future plans
    
     Check personal nutrition target
    
     View recipes
    
     Log out
    
    ```

![Profile Screen](images/profile.jpg)
    
## 3. Tell me about yourself (info.html)
    
    User fills in age, gender, height, weight, and activity level.
    
    The data is sent to the backend to update the profile.
    
    This step is required for calorie target calculation.
![Profile Screen](images/profile.jpg)

    
## 4. Set goal (goal.html)
    
    User selects a goal:
    
    ```
     Lose weight
    
     Gain weight
    
     Maintain weight
    
    ```
    
    This updates the profile and recalculates daily needs.

![Profile Screen](images/profile.jpg)
    

5. Daily target (target.html)
    
    Based on user data, the backend calculates:
    
    ```
     Total daily calories
    
     Macronutrients: protein, fat, and carbs
    
    ```
    
    Displayed in a styled UI with values and grams.

![Target](images/target.png)
    
6. Today’s Meals (today.html)
    
    Displays meals for the current day (e.g., breakfast, lunch, dinner).
    
    Each meal shows:
    
    ```
     Calories
    
     Macronutrient breakdown
    
    ```
    
    Meals can be edited or deleted.
    
    Button to add a new meal.

![Main](images/main.jpg)
    
7. Recipe constructor (addmeal.html)
    
    User can create a meal by selecting ingredients and specifying amounts.
    
    Automatically calculates total nutrition per meal and per 100g.
    
    User can save the meal to personal recipes.

![Target](images/meal.jpg)
    
8. My Recipes (myrecipes.html)
    
    Displays a list of previously saved recipes.
    
    Recipes show kcal and macros.
    
    Recipes can be edited or deleted.

![Recipes](images/recipes.jpg)
    
9. My Plans (plans.html)
    
    User can create meal plans.
    
    Each plan is a group of meals with total nutrition.
    
    Editable and deletable.

![plans](images/plans.jpg)








---

## License

MIT License – free to use and modify.