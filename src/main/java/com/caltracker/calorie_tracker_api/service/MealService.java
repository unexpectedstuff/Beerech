package com.caltracker.calorie_tracker_api.service;

import com.caltracker.calorie_tracker_api.entity.MealEntry;
import com.caltracker.calorie_tracker_api.repository.MealEntryRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class MealService {

    private final MealEntryRepository mealRepo;

    public MealService(MealEntryRepository mealRepo) {
        this.mealRepo = mealRepo;
    }

    public List<MealEntry> getMealsByDate(LocalDate date) {
        return mealRepo.findByDate(date);
    }

    public MealEntry addMeal(MealEntry mealEntry) {
        return mealRepo.save(mealEntry);
    }

    public List<MealEntry> getRecentMeals() {
        return mealRepo.findTop10ByOrderByDateDesc();
    }
}
