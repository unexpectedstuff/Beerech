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
@CrossOrigin // Allow requests from other websites (not just our server)
public class RecipeController {

    private final RecipeService service;

    public RecipeController(RecipeService service) {
        this.service = service; // Inject the service that does the real work (like talking to the database)
    }

    @GetMapping
    public List<RecipeSimpleDTO> getAllRecipes() {
        // Get all recipes and convert them into simple DTOs for the frontend
        List<Recipe> recipes = service.getAll();
        return recipes.stream()
                .map(RecipeSimpleDTO::fromRecipe) // Change each Recipe into a RecipeSimpleDTO
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<RecipeSimpleDTO> getRecipeById(@PathVariable Long id) {
        // Get one recipe by its ID
        Recipe recipe = service.getById(id);
        if (recipe == null) {
            // If no recipe found, return 404
            return ResponseEntity.notFound().build();
        }
        // If found, return 200 OK and the recipe
        return ResponseEntity.ok(RecipeSimpleDTO.fromRecipe(recipe));
    }

    @PostMapping
    public ResponseEntity<RecipeSimpleDTO> addRecipe(@RequestBody Recipe recipe) {
        // Save a new recipe (sent from frontend) into the database
        Recipe saved = service.add(recipe);
        return ResponseEntity.ok(RecipeSimpleDTO.fromRecipe(saved));
    }

    @PutMapping("/{id}")
    public ResponseEntity<RecipeSimpleDTO> updateRecipe(@PathVariable Long id, @RequestBody Recipe updated) {
        // Update an existing recipe with new data
        Recipe saved = service.updateRecipe(id, updated);
        return ResponseEntity.ok(RecipeSimpleDTO.fromRecipe(saved));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRecipe(@PathVariable Long id) {
        // Delete the recipe with the given ID
        service.deleteRecipe(id);
        // Return 204 No Content (means successful delete, nothing to show back)
        return ResponseEntity.noContent().build();
    }
}
