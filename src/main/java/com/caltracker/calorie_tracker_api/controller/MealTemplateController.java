package com.caltracker.calorie_tracker_api.controller;

import com.caltracker.calorie_tracker_api.entity.MealEntry;
import com.caltracker.calorie_tracker_api.entity.MealTemplate;
import com.caltracker.calorie_tracker_api.service.MealEntryService;
import com.caltracker.calorie_tracker_api.service.MealTemplateService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/meal-templates")
@CrossOrigin
public class MealTemplateController {

    private final MealTemplateService templateService;
    private final MealEntryService mealService;

    public MealTemplateController(MealTemplateService templateService, MealEntryService mealService) {
        this.templateService = templateService;
        this.mealService = mealService;
    }

    @PostMapping("/save")
    public MealTemplate save(@RequestBody MealTemplate template) {
        return templateService.save(template);
    }

    @GetMapping
    public List<MealTemplate> getAll() {
        return templateService.getAll();
    }

    @GetMapping("/{id}")
    public MealTemplate getById(@PathVariable Long id) {
        return templateService.getById(id);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        templateService.delete(id);
    }

    @PostMapping("/apply/{id}/{date}")
    public MealEntry applyTemplateToDate(
            @PathVariable Long id,
            @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date
    ) {
        MealTemplate template = templateService.getById(id);
        MealEntry newMeal = templateService.applyToDate(template, date);
        return mealService.addMeal(newMeal);
    }
}
