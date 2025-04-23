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

    private String title; // Например "Завтрак", "Обед"

    // Пока без пользователя — потом добавим

    @OneToMany(mappedBy = "mealEntry", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<MealProduct> products;

    public MealEntry() {}

    public MealEntry(LocalDate date, String title, List<MealProduct> products) {
        this.date = date;
        this.title = title;
        this.products = products;
        if (products != null) {
            for (MealProduct mp : products) {
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
                mp.setMealEntry(this);
            }
        }
    }
}
