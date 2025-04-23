package com.caltracker.calorie_tracker_api.entity;

import jakarta.persistence.*;

import java.util.List;

@Entity
public class MealTemplate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @OneToMany(mappedBy = "mealTemplate", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<TemplateProduct> products;

    public MealTemplate() {}

    public MealTemplate(String title, List<TemplateProduct> products) {
        this.title = title;
        this.products = products;
        if (products != null) {
            for (TemplateProduct tp : products) {
                tp.setMealTemplate(this);
            }
        }
    }

    // Getters & Setters

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public List<TemplateProduct> getProducts() {
        return products;
    }

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
                tp.setMealTemplate(this);
            }
        }
    }
}
