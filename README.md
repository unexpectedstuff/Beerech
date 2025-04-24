# Untitled

# Calorie Tracker API

This is a backend API for a calorie tracking app.

It is made with Java, Spring Boot, and uses PostgreSQL for the database.

Users can register, log in, and keep track of their meals, calories, and nutrition.

Each user only sees their own data.

---

## Features

- User registration and login (with JWT token)
- Add meals with products and nutrition info
- Create recipes (a mix of products)
- Save meal templates to reuse later
- View daily nutrition summary
- Set your calorie goal
- Public recipes (shared with everyone)

---

## Tech Stack

- Java 21
- Spring Boot 3
- PostgreSQL
- JWT (JSON Web Token) for authentication
- Maven for project build

---

## How to run

1. Make sure you have Java 21 and PostgreSQL installed
2. Clone the project:

git clone [https://github.com/your-username/calorie-tracker-api.git](https://github.com/your-username/calorie-tracker-api.git)

1. Create a PostgreSQL database, for example:

CREATE DATABASE calorie_tracker;

1. Set up `application-secret.properties` file (in `src/main/resources`):

DB_USER=your_db_user DB_PASSWORD=your_db_password JWT_SECRET=your_super_secret_key

1. Start the app (for example in your IDE or using Maven):

mvn spring-boot:run

The app will run on `http://localhost:8080`

---

## Example API Endpoints

### Auth

POST /auth/register POST /auth/login GET /user/profile PUT /user/profile

### Products

GET /products POST /products/add

### Meals

GET /meals/2025-04-24 POST /meals/2025-04-24/add GET /meals/2025-04-24/summary

### Recipes

GET /recipes POST /recipes/add

---

## Notes

- You need to include the JWT token in all requests after login
Example header:

Authorization: Bearer your_jwt_token

- Each user has their own meals, recipes, and products
- Public recipes are shared between users

---

## Status

This is a basic version and still in development.

Pull requests and suggestions are welcome.