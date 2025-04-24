package com.caltracker.calorie_tracker_api.entity;

import jakarta.persistence.*;  // JPA import for annotations

@Entity  // This annotation marks the class as a JPA entity, meaning it will be mapped to a table in the database
public class Product {

    @Id  // This annotation marks the field 'id' as the primary key for the database table
    @GeneratedValue(strategy = GenerationType.IDENTITY)  // This tells JPA to auto-generate the 'id' value, using an auto-increment strategy
    private Long id;

    private String name;  // Name of the product
    private double protein;  // Protein content in the product
    private double fat;  // Fat content in the product
    private double carbs;  // Carbohydrates content in the product
    private double calories;  // Calorie content in the product

    @ManyToOne  // Many products can belong to one user
    @JoinColumn(name = "user_id")  // This is the name of the foreign key column in the product table
    private User user;  // The user who created/owns this product

    // No-argument constructor required by JPA for entity classes
    public Product() {
    }

    // Constructor with parameters to initialize all fields (except 'id' which is auto-generated)
    public Product(String name, double protein, double fat, double carbs, double calories) {
        this.name = name;
        this.protein = protein;
        this.fat = fat;
        this.carbs = carbs;
        this.calories = calories;
    }

    // --- Getters ---

    public Long getId() {
        return id;  
    }

    public String getName() {
        return name;  
    }

    public double getProtein() {
        return protein;  
    }

    public double getFat() {
        return fat;  
    }

    public double getCarbs() {
        return carbs;  
    }

    public double getCalories() {
        return calories; 
    }

    public User getUser() {
        return user;  // Return the user associated with this product
    }

    // --- Setters ---

    public void setId(Long id) {
        this.id = id;  // Sets the product ID (useful if the ID is manually set, but probably will be auto-generated I DONT KNOW YET OKAY)
    }

    public void setName(String name) {
        this.name = name;  
    }

    public void setProtein(double protein) {
        this.protein = protein; 
    }

    public void setFat(double fat) {
        this.fat = fat;  
    }

    public void setCarbs(double carbs) {
        this.carbs = carbs; 
    }

    public void setCalories(double calories) {
        this.calories = calories; 
    }

    public void setUser(User user) {
        this.user = user;  // Set the user who owns this product (used to link product to a specific user)
    }
}
