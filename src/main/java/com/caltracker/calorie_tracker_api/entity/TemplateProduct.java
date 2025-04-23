package com.caltracker.calorie_tracker_api.entity;

import jakarta.persistence.*;

@Entity
public class TemplateProduct {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private double amountInGrams;

    @ManyToOne
    @JoinColumn(name = "template_id")
    private MealTemplate mealTemplate;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    public TemplateProduct() {}

    public TemplateProduct(double amountInGrams, Product product) {
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

    public MealTemplate getMealTemplate() {
        return mealTemplate;
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

    public void setMealTemplate(MealTemplate mealTemplate) {
        this.mealTemplate = mealTemplate;
    }

    public void setProduct(Product product) {
        this.product = product;
    }
}
