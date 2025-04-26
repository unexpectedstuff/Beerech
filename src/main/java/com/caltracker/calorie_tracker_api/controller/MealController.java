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

@RestController // This class will handle HTTP requests
@RequestMapping("/meals") // Base URL path for all methods in this controller
@CrossOrigin // Allow requests from other domains (for frontend to work)
public class MealController {

    private final MealEntryService mealService;

    public MealController(MealEntryService mealService) {
        this.mealService = mealService;
    }

    @GetMapping("/{date}") // Get all meals for a specific date
    public List<MealEntrySimpleDTO> getMealsByDate(
            @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date
    ) {
        List<MealEntry> meals = mealService.getMealsByDate(date);

        // Convert MealEntry objects to simpler DTOs for frontend
        return meals.stream()
                .map(MealEntrySimpleDTO::fromMealEntry)
                .collect(Collectors.toList());
    }

    @GetMapping("/{date}/summary") // Get total summary (like calories, proteins, etc.) for the day
    public ResponseEntity<?> getMealSummary(
            @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date
    ) {
        // Return the summary as a HTTP response
        return ResponseEntity.ok(mealService.getSummaryForDate(date));
    }

    @PostMapping("/{date}/add")
    public MealEntrySimpleDTO addMeal(
            @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date,
            @RequestBody MealEntry mealEntry // instead of old MealAddRequest
    ) {
        mealEntry.setDate(date); // Set date
        MealEntry saved = mealService.addMeal(mealEntry);
        return MealEntrySimpleDTO.fromMealEntry(saved);
    }



    @GetMapping("/recent") // Get a list of recent meals (like last 10 added)
    public List<MealEntrySimpleDTO> getRecentMeals() {
        return mealService.getRecentMeals().stream()
                .map(MealEntrySimpleDTO::fromMealEntry)
                .collect(Collectors.toList());
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMeal(@PathVariable Long id) {
        mealService.deleteMeal(id);
        return ResponseEntity.noContent().build(); // 204 No Content
    }

}
