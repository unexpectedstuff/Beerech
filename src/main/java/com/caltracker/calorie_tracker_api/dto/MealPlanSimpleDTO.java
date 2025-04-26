package com.caltracker.calorie_tracker_api.dto;

import com.caltracker.calorie_tracker_api.entity.MealPlan;
import java.util.List;
import java.util.stream.Collectors;

public class MealPlanSimpleDTO {

    private Long id;
    private String title;
    private List<RecipeSimpleDTO> recipes;

    public static MealPlanSimpleDTO fromMealPlan(MealPlan plan) {
        MealPlanSimpleDTO dto = new MealPlanSimpleDTO();
        dto.id = plan.getId();
        dto.title = plan.getTitle();
        dto.recipes = plan.getRecipes().stream()
                .map(RecipeSimpleDTO::fromRecipe)
                .collect(Collectors.toList());
        return dto;
    }

    // --- Getters
    public Long getId() { return id; }
    public String getTitle() { return title; }
    public List<RecipeSimpleDTO> getRecipes() { return recipes; }
}
