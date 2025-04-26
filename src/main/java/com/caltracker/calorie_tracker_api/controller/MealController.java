package com.caltracker.calorie_tracker_api.controller;

import com.caltracker.calorie_tracker_api.dto.MealEntrySimpleDTO;
import com.caltracker.calorie_tracker_api.entity.MealEntry;
import com.caltracker.calorie_tracker_api.service.MealEntryService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/meals")
@CrossOrigin
public class MealController {

    private final MealEntryService mealService;

    public MealController(MealEntryService mealService) {
        this.mealService = mealService;
    }

    // --- Get meals for a specific date ---
    @GetMapping("/{date}")
    public List<MealEntrySimpleDTO> getMealsByDate(
            @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date
    ) {
        List<MealEntry> meals = mealService.getMealsByDate(date);
        return meals.stream()
                .map(MealEntrySimpleDTO::fromMealEntry)
                .collect(Collectors.toList());
    }

    // --- Get meal summary for a specific date ---
    @GetMapping("/{date}/summary")
    public ResponseEntity<?> getMealSummary(
            @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date
    ) {
        return ResponseEntity.ok(mealService.getSummaryForDate(date));
    }

    // --- Add a new meal ---
    @PostMapping("/{date}/add")
    public ResponseEntity<MealEntrySimpleDTO> addMeal(
            @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date,
            @RequestBody MealEntry mealEntry
    ) {
        mealEntry.setDate(date);
        MealEntry saved = mealService.addMeal(mealEntry);
        return ResponseEntity.ok(MealEntrySimpleDTO.fromMealEntry(saved));
    }

    // --- Get recent meals ---
    @GetMapping("/recent")
    public List<MealEntrySimpleDTO> getRecentMeals() {
        return mealService.getRecentMeals().stream()
                .map(MealEntrySimpleDTO::fromMealEntry)
                .collect(Collectors.toList());
    }

    // --- Delete a meal ---
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMeal(@PathVariable Long id) {
        mealService.deleteMeal(id);
        return ResponseEntity.noContent().build(); // 204 No Content
    }

    // --- Update a meal ---
    @PutMapping("/{id}")
    public ResponseEntity<MealEntrySimpleDTO> updateMeal(
            @PathVariable Long id,
            @RequestBody MealEntry updatedMeal
    ) {
        MealEntry saved = mealService.updateMeal(id, updatedMeal);
        return ResponseEntity.ok(MealEntrySimpleDTO.fromMealEntry(saved));
    }
}
