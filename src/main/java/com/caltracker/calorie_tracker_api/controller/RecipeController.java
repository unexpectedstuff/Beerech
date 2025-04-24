package com.caltracker.calorie_tracker_api.controller;

import com.caltracker.calorie_tracker_api.entity.Recipe;
import com.caltracker.calorie_tracker_api.service.RecipeService;
import com.caltracker.calorie_tracker_api.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/recipes")
@CrossOrigin  // Allow frontend requests from another origin (like localhost:3000)
public class RecipeController {

    private final RecipeService recipeService;
    private final UserService userService;

    public RecipeController(RecipeService recipeService, UserService userService) {
        this.recipeService = recipeService;
        this.userService = userService;
    }

    // 🔓 This method returns only recipes visible to the current user
    @GetMapping
    public List<Recipe> getAll() {
        return recipeService.getVisibleToUser(userService.getCurrentUser());
    }

    // 🔍 Get a single recipe by its ID
    @GetMapping("/{id}")
    public Recipe getById(@PathVariable Long id) {
        return recipeService.getById(id);
    }

    // ➕ Add a new recipe (assumes user is already attached in the request body)
    @PostMapping("/add")
    public Recipe add(@RequestBody Recipe recipe) {
        return recipeService.add(recipe);
    }
}
