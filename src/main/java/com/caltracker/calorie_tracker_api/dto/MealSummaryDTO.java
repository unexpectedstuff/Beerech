package com.caltracker.calorie_tracker_api.dto;

public class MealSummaryDTO {
    private double totalCalories;
    private double totalProtein;
    private double totalFat;
    private double totalCarbs;

    public MealSummaryDTO(double totalCalories, double totalProtein, double totalFat, double totalCarbs) {
        this.totalCalories = totalCalories;
        this.totalProtein = totalProtein;
        this.totalFat = totalFat;
        this.totalCarbs = totalCarbs;
    }

    public double getTotalCalories() {
        return totalCalories;
    }

    public double getTotalProtein() {
        return totalProtein;
    }

    public double getTotalFat() {
        return totalFat;
    }

    public double getTotalCarbs() {
        return totalCarbs;
    }
}
