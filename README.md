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

## Authentication

### POST `/auth/register`

Register a new user.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "SecurePass123",
  "name": "John Doe"
}
```

**Response:**
```json
{
  "token": "eyJhbGci..."
}
```

---

### POST `/auth/login`

Authenticate user and return JWT token.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "SecurePass123"
}
```

**Response:**
```json
{
  "token": "eyJhbGci..."
}
```

---

## User Profile

### GET `/user/profile`

Get the current user's profile. Requires JWT token.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
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

Update the current user's profile.

**Request:**
```json
{
  "age": 30,
  "weight": 75.5,
  "height": 180,
  "gender": "MALE",
  "goal": "MAINTAIN",
  "calorieTarget": 2200
}
```

---

## Meals

### GET `/meals/{date}`

Retrieve meals for a specific date.

**Example:**
```
GET /meals/2024-12-30
```

---

### POST `/meals/{date}/add`

Add a meal entry to a specific date.

**Request:**
```json
{
  "name": "Lunch",
  "products": [
    { "productId": 1, "amount": 150 },
    { "productId": 2, "amount": 200 }
  ]
}
```

---

### GET `/meals/recent`

Retrieve the user's most recently added meals.

---

### POST `/meals/{date}/apply-template`

Apply a saved meal template to a selected date.

**Request:**
```json
{
  "templateId": 1
}
```

---

## Meal Templates

### POST `/meal-templates/save`

Save a new meal template.

**Request:**
```json
{
  "name": "Standard Breakfast",
  "mealEntries": [
    { "productId": 3, "amount": 100 },
    { "productId": 4, "amount": 50 }
  ]
}
```

---

### GET `/meal-templates`

Get all meal templates.

---

### GET `/meal-templates/{template_id}`

Get details for a specific template.

---

### DELETE `/meal-templates/{template_id}`

Delete a specific meal template.

---

## Products

### GET `/products`

List all available products.

---

### GET `/products/{product_id}`

Get details for a specific product.

---

### POST `/products/add`

Add a new product.

**Request:**
```json
{
  "name": "Greek Yogurt",
  "calories": 60,
  "protein": 10,
  "fat": 0.4,
  "carbs": 3.6
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

---

## License

MIT License – free to use and modify.