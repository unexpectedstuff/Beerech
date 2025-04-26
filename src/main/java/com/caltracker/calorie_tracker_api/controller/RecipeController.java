package com.caltracker.calorie_tracker_api.controller;

import com.caltracker.calorie_tracker_api.dto.RecipeSimpleDTO;
import com.caltracker.calorie_tracker_api.entity.Recipe;
import com.caltracker.calorie_tracker_api.service.RecipeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/recipes")
@CrossOrigin  // Allow requests from other domains (for frontend apps)
public class RecipeController {

    private final RecipeService recipeService;

    // Constructor to inject the RecipeService
    public RecipeController(RecipeService recipeService) {
        this.recipeService = recipeService;
    }

    @PostMapping("/add")
    public ResponseEntity<RecipeSimpleDTO> addRecipe(@RequestBody Recipe recipe) {
        // Save a new recipe that comes from the client
        Recipe savedRecipe = recipeService.add(recipe);
        // Return the saved recipe back to the client
        // return ResponseEntity.ok(savedRecipe); - this used to give recursive json, my bad
        return ResponseEntity.ok(RecipeSimpleDTO.fromRecipe(savedRecipe)); // this is esoteric and probably needs another structure
    }

    @GetMapping
    public ResponseEntity<?> getAllRecipes() {
        // Return a list of all recipes
        List<RecipeSimpleDTO> recipes = recipeService.getAll().stream()
                .map(RecipeSimpleDTO::fromRecipe)
                .collect(Collectors.toList());
        return ResponseEntity.ok(recipes);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getRecipeById(@PathVariable Long id) {
        // Try to find a recipe by its ID
        Recipe recipe = recipeService.getById(id);
        if (recipe == null) {
            // If no recipe is found, return 404 Not Found
            return ResponseEntity.notFound().build();
        }
        // Otherwise, return the recipe
        return ResponseEntity.ok(RecipeSimpleDTO.fromRecipe(recipe));
    }
}
