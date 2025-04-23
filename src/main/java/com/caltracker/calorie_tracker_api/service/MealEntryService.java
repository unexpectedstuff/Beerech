package com.caltracker.calorie_tracker_api.service;

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
        // Устанавливаем обратную связь
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
