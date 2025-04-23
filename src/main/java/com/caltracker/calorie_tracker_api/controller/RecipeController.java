package com.caltracker.calorie_tracker_api.controller;

import com.caltracker.calorie_tracker_api.entity.Recipe;
import com.caltracker.calorie_tracker_api.service.RecipeService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/recipes")
@CrossOrigin
public class RecipeController {

    private final RecipeService service;

    public RecipeController(RecipeService service) {
        this.service = service;
    }

    @GetMapping
    public List<Recipe> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public Recipe getById(@PathVariable Long id) {
        return service.getById(id);
    }

    @PostMapping("/add")
    public Recipe add(@RequestBody Recipe recipe) {
        return service.add(recipe);
    }
}
