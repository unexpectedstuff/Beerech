package com.caltracker.calorie_tracker_api.controller;

import com.caltracker.calorie_tracker_api.dto.MealPlanSimpleDTO;
import com.caltracker.calorie_tracker_api.entity.MealPlan;
import com.caltracker.calorie_tracker_api.entity.MealProduct;
import com.caltracker.calorie_tracker_api.entity.MealEntry;
import com.caltracker.calorie_tracker_api.service.MealEntryService;
import com.caltracker.calorie_tracker_api.service.MealPlanService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/meal-plans")
@CrossOrigin
public class MealPlanController {

    private final MealPlanService planService;
    private final MealEntryService mealService;

    public MealPlanController(MealPlanService planService, MealEntryService mealService) {
        this.planService = planService;
        this.mealService = mealService;
    }

    @PostMapping("/save")
    public MealPlan save(@RequestBody MealPlan plan) {
        return planService.save(plan);
    }

    @GetMapping
    public List<MealPlanSimpleDTO> getAll() {
        return planService.getAll(null).stream()
                .map(MealPlanSimpleDTO::fromMealPlan)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public MealPlanSimpleDTO getById(@PathVariable Long id) {
        return MealPlanSimpleDTO.fromMealPlan(planService.getById(id));
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        planService.delete(id);
    }

    @PostMapping("/apply/{id}/{date}")
    public void applyPlanToDate(
            @PathVariable Long id,
            @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date
    ) {
        MealPlan plan = planService.getById(id);
        if (plan != null) {
            for (var recipe : plan.getRecipes()) {
                MealEntry mealEntry = new MealEntry();
                mealEntry.setTitle(recipe.getName());
                mealEntry.setDate(date);
                mealEntry.setProducts(recipe.getProducts().stream().map(rp -> {
                    var mealProduct = new MealProduct();
                    mealProduct.setProduct(rp.getProduct());
                    mealProduct.setAmountInGrams(rp.getAmountInGrams());
                    mealProduct.setMealEntry(mealEntry);
                    return mealProduct;
                }).collect(Collectors.toList()));
                mealService.addMeal(mealEntry);
            }
        }
    }
}
