package com.caltracker.calorie_tracker_api.dto;

import com.caltracker.calorie_tracker_api.entity.Recipe;
import java.util.List;
import java.util.stream.Collectors;

public class RecipeSimpleDTO {

    private Long id;
    private String name;
    private List<RecipeProductSimpleDTO> products;

    public static RecipeSimpleDTO fromRecipe(Recipe recipe) {
        RecipeSimpleDTO dto = new RecipeSimpleDTO();
        dto.id = recipe.getId();
        dto.name = recipe.getName();
        if (recipe.getProducts() != null) {
            dto.products = recipe.getProducts().stream()
                    .map(RecipeProductSimpleDTO::fromRecipeProduct)
                    .collect(Collectors.toList());
        }
        return dto;
    }

    // --- Getters ---

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public List<RecipeProductSimpleDTO> getProducts() {
        return products;
    }
}
