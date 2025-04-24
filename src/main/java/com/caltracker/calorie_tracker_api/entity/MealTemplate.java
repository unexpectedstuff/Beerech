package com.caltracker.calorie_tracker_api.entity;

import jakarta.persistence.*;

import java.util.List;

@Entity
public class MealTemplate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    // Auto-generated ID (primary key)
    private Long id;

    private String title;  // Template name, like "Keto Lunch" or "Workout Breakfast"

    @OneToMany(mappedBy = "mealTemplate", cascade = CascadeType.ALL, orphanRemoval = true)
    // One template can have many products; when a template is deleted, the products are also removed
    private List<TemplateProduct> products;

    @ManyToOne  // Many templates can belong to one user
    @JoinColumn(name = "user_id")  // Column name in the database that links to the user
    private User user;  // The user who owns this meal template

    public MealTemplate() {}

    public MealTemplate(String title, List<TemplateProduct> products) {
        this.title = title;
        this.products = products;
        if (products != null) {
            for (TemplateProduct tp : products) {
                tp.setMealTemplate(this);  // Set back-reference to this template
            }
        }
    }

    // --- Getters ---

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public List<TemplateProduct> getProducts() {
        return products;
    }

    public User getUser() {
        return user;  // Return the user who owns this template
    }

    // --- Setters ---

    public void setId(Long id) {
        this.id = id;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setProducts(List<TemplateProduct> products) {
        this.products = products;
        if (products != null) {
            for (TemplateProduct tp : products) {
                tp.setMealTemplate(this);  // Link product to this template
            }
        }
    }

    public void setUser(User user) {
        this.user = user;  // Set the user who created/owns this template
    }
}
