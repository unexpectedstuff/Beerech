package com.caltracker.calorie_tracker_api.entity;

import jakarta.persistence.*;

@Entity
public class MealProduct {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private double amountInGrams;

    @ManyToOne
    @JoinColumn(name = "meal_entry_id")
    private MealEntry mealEntry;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    public MealProduct() {}

    public MealProduct(double amountInGrams, Product product) {
        this.amountInGrams = amountInGrams;
        this.product = product;
    }

    // Getters & Setters

    public Long getId() {
        return id;
    }

    public double getAmountInGrams() {
        return amountInGrams;
    }

    public MealEntry getMealEntry() {
        return mealEntry;
    }

    public Product getProduct() {
        return product;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setAmountInGrams(double amountInGrams) {
        this.amountInGrams = amountInGrams;
    }

    public void setMealEntry(MealEntry mealEntry) {
        this.mealEntry = mealEntry;
    }

    public void setProduct(Product product) {
        this.product = product;
    }
}
