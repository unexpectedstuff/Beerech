package com.caltracker.calorie_tracker_api.entity;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.List;

@Entity
public class MealEntry {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate date;

    private String title; // Like "Breakfast", "Lunch", etc.

    // No user yet — maybe will add later

    @OneToMany(mappedBy = "mealEntry", cascade = CascadeType.ALL, orphanRemoval = true)
    // I think this means a meal has many products, and if I delete a meal, the products go too??
    private List<MealProduct> products;

    public MealEntry() {}

    public MealEntry(LocalDate date, String title, List<MealProduct> products) {
        this.date = date;
        this.title = title;
        this.products = products;
        if (products != null) {
            for (MealProduct mp : products) {
                // Not sure but I think this links each product back to this meal?
                mp.setMealEntry(this);
            }
        }
    }

    // Getters & Setters

    public Long getId() {
        return id;
    }

    public LocalDate getDate() {
        return date;
    }

    public String getTitle() {
        return title;
    }

    public List<MealProduct> getProducts() {
        return products;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setProducts(List<MealProduct> products) {
        this.products = products;
        if (products != null) {
            for (MealProduct mp : products) {
                // again, making sure each product knows which meal it's in??
                mp.setMealEntry(this);
            }
        }
    }
}
