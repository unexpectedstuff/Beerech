package com.caltracker.calorie_tracker_api.entity;

import jakarta.persistence.*;

@Entity
public class RecipeProduct {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private double amountInGrams;

    @ManyToOne
    @JoinColumn(name = "recipe_id")
    private Recipe recipe;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    public RecipeProduct() {}

    public RecipeProduct(double amountInGrams, Product product) {
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

    public Recipe getRecipe() {
        return recipe;
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

    public void setRecipe(Recipe recipe) {
        this.recipe = recipe;
    }

    public void setProduct(Product product) {
        this.product = product;
    }
}
