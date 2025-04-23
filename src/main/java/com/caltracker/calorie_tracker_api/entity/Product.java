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

    // Getters and Setters for all fields

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
    // Setters for setting values of the fields

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
}
