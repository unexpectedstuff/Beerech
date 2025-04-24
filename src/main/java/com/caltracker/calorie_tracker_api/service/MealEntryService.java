package com.caltracker.calorie_tracker_api.service;

import com.caltracker.calorie_tracker_api.dto.MealSummaryDTO;
import com.caltracker.calorie_tracker_api.entity.MealEntry;
import com.caltracker.calorie_tracker_api.entity.MealProduct;
import com.caltracker.calorie_tracker_api.entity.Product;
import com.caltracker.calorie_tracker_api.repository.MealEntryRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class MealEntryService {

    private final MealEntryRepository mealRepo;

    public MealEntryService(MealEntryRepository mealRepo) {
        this.mealRepo = mealRepo;
    }

    public List<MealEntry> getMealsByDate(LocalDate date) {
        return mealRepo.findByDate(date);
    }

    public MealEntry addMeal(MealEntry entry) {
        // Set MealEntry reference in each MealProduct
        if (entry.getProducts() != null) {
            for (MealProduct mp : entry.getProducts()) {
                mp.setMealEntry(entry);
            }
        }
        return mealRepo.save(entry);
    }

    public List<MealEntry> getRecentMeals() {
        return mealRepo.findTop10ByOrderByDateDesc();
    }

    public double calculateTotalCalories(MealEntry entry) {
        return entry.getProducts().stream()
                .mapToDouble(mp -> {
                    Product p = mp.getProduct();
                    return (p.getCalories() / 100.0) * mp.getAmountInGrams();
                })
                .sum();
    }

    // 🔢 Summarize nutrition for a specific day (all meals)
    public MealSummaryDTO getSummaryForDate(LocalDate date) {
        List<MealEntry> meals = getMealsByDate(date);

        double totalCalories = 0;
        double totalProtein = 0;
        double totalFat = 0;
        double totalCarbs = 0;

        // Go through each meal and sum all nutrient values
        for (MealEntry meal : meals) {
            for (MealProduct mp : meal.getProducts()) {
                Product p = mp.getProduct();
                double grams = mp.getAmountInGrams();

                // Convert per-100g nutritional values to actual by multiplying with grams
                totalCalories += (p.getCalories() / 100.0) * grams;
                totalProtein += (p.getProtein() / 100.0) * grams;
                totalFat     += (p.getFat() / 100.0) * grams;
                totalCarbs   += (p.getCarbs() / 100.0) * grams;
            }
        }

        // Round each result to 1 decimal place and return as DTO
        return new MealSummaryDTO(
                Math.round(totalCalories * 10.0) / 10.0,
                Math.round(totalProtein * 10.0) / 10.0,
                Math.round(totalFat * 10.0) / 10.0,
                Math.round(totalCarbs * 10.0) / 10.0
        );
    }
}
