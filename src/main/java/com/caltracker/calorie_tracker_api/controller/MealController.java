package com.caltracker.calorie_tracker_api.controller;

import com.caltracker.calorie_tracker_api.entity.MealEntry;
import com.caltracker.calorie_tracker_api.service.MealEntryService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/meals")
@CrossOrigin
public class MealController {

    private final MealEntryService mealService;

    public MealController(MealEntryService mealService) {
        this.mealService = mealService;
    }

    @GetMapping("/{date}")
    public List<MealEntry> getMealsByDate(
            @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date
    ) {
        return mealService.getMealsByDate(date);
    }

    @PostMapping("/{date}/add")
    public MealEntry addMeal(
            @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date,
            @RequestBody MealEntry mealEntry
    ) {
        mealEntry.setDate(date);
        return mealService.addMeal(mealEntry);
    }

    @GetMapping("/recent")
    public List<MealEntry> getRecentMeals() {
        return mealService.getRecentMeals();
    }
}
