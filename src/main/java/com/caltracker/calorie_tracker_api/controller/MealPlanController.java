package com.caltracker.calorie_tracker_api.controller;

import com.caltracker.calorie_tracker_api.dto.MealPlanSimpleDTO;
import com.caltracker.calorie_tracker_api.entity.MealEntry;
import com.caltracker.calorie_tracker_api.entity.MealPlan;
import com.caltracker.calorie_tracker_api.entity.MealProduct;
import com.caltracker.calorie_tracker_api.service.MealEntryService;
import com.caltracker.calorie_tracker_api.service.MealPlanService;
import com.caltracker.calorie_tracker_api.service.RecipeService;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/meal-plans") // All endpoints here will start with /meal-plans
@CrossOrigin // Allow frontend apps from other domains to use this API
public class MealPlanController {

	private final MealPlanService planService;
	private final MealEntryService mealService;
	private final RecipeService recipeService; 

	public MealPlanController(MealPlanService planService, MealEntryService mealService, RecipeService recipeService) {
	    this.planService = planService;
	    this.mealService = mealService;
	    this.recipeService = recipeService;
	}


    @GetMapping
    public List<MealPlanSimpleDTO> getAllMealPlans() {
        // Get all meal plans from the database and convert them into simpler DTOs
        return planService.getAll(null).stream()
                .map(MealPlanSimpleDTO::fromMealPlan)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public MealPlanSimpleDTO getMealPlanById(@PathVariable Long id) {
        // Get a specific meal plan by its ID
        return MealPlanSimpleDTO.fromMealPlan(planService.getById(id));
    }

    @PostMapping
    public ResponseEntity<?> addMealPlan(@RequestBody MealPlan plan) {
        if (plan.getRecipes() != null) {
            for (var recipe : plan.getRecipes()) {
                if (recipe.getId() == null || recipeService.getById(recipe.getId()) == null) {
                    return ResponseEntity.badRequest()
                            .body("Recipe with id " + recipe.getId() + " not found.");
                }
            }
        }

        MealPlan saved = planService.save(plan);
        return ResponseEntity.ok(saved);
    }


    @PutMapping("/{id}")
    public MealPlanSimpleDTO updateMealPlan(@PathVariable Long id, @RequestBody MealPlan updatedPlan) {
        MealPlan existingPlan = planService.getById(id);

        existingPlan.setTitle(updatedPlan.getTitle());
        existingPlan.getRecipes().clear();

        if (updatedPlan.getRecipes() != null) {
            existingPlan.getRecipes().addAll(updatedPlan.getRecipes());
        }

        MealPlan saved = planService.save(existingPlan);
        return MealPlanSimpleDTO.fromMealPlan(saved); 
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMealPlan(@PathVariable Long id) {
        // Delete the meal plan by its ID
        planService.delete(id);
        return ResponseEntity.noContent().build(); // 204 No Content means successful delete
    }

    @PostMapping("/{id}/apply/{date}")
    public ResponseEntity<Void> applyMealPlanToDate(
            @PathVariable Long id,
            @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date
    ) {
        MealPlan plan = planService.getById(id);
        if (plan != null) {
            // For each recipe in the plan, create a new meal entry for the selected date
            for (var recipe : plan.getRecipes()) {
                MealEntry mealEntry = new MealEntry();
                mealEntry.setTitle(recipe.getName());
                mealEntry.setDate(date);

                // Copy the products from the recipe into the new meal entry
                mealEntry.setProducts(recipe.getProducts().stream().map(rp -> {
                    var mealProduct = new MealProduct();
                    mealProduct.setProduct(rp.getProduct());
                    mealProduct.setAmountInGrams(rp.getAmountInGrams());
                    mealProduct.setMealEntry(mealEntry); // Set the relationship back to mealEntry
                    return mealProduct;
                }).collect(Collectors.toList()));

                mealService.addMeal(mealEntry); // Save the meal entry
            }
        }
        return ResponseEntity.ok().build(); // Return 200 OK
    }
}
