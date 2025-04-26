package com.caltracker.calorie_tracker_api.dto;

import com.caltracker.calorie_tracker_api.entity.Product;

public class ProductSimpleDTO {

    private String name;
    private double calories;
    private double protein;
    private double fat;
    private double carbs;

    public static ProductSimpleDTO fromProduct(Product p) {
        ProductSimpleDTO dto = new ProductSimpleDTO();
        dto.name = p.getName();
        dto.calories = p.getCalories();
        dto.protein = p.getProtein();
        dto.fat = p.getFat();
        dto.carbs = p.getCarbs();
        return dto;
    }

    // --- Getters

    public String getName() {
        return name;
    }

    public double getCalories() {
        return calories;
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
}
