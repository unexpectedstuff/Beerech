package com.caltracker.calorie_tracker_api.entity;

import jakarta.persistence.*;

import java.util.List;

@Entity
public class Recipe {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String description; // по желанию

    @OneToMany(mappedBy = "recipe", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<RecipeProduct> products;

    public Recipe() {}

    public Recipe(String name, String description, List<RecipeProduct> products) {
        this.name = name;
        this.description = description;
        this.products = products;
        if (products != null) {
            for (RecipeProduct rp : products) {
                rp.setRecipe(this);
            }
        }
    }

    // Getters & Setters
    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public List<RecipeProduct> getProducts() {
        return products;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setProducts(List<RecipeProduct> products) {
        this.products = products;
        if (products != null) {
            for (RecipeProduct rp : products) {
                rp.setRecipe(this);
            }
        }
    }
}
