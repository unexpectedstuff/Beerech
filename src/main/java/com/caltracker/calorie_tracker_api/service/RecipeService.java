package com.caltracker.calorie_tracker_api.service;

import com.caltracker.calorie_tracker_api.entity.Recipe;
import com.caltracker.calorie_tracker_api.entity.User;
import com.caltracker.calorie_tracker_api.repository.RecipeRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RecipeService {

    private final RecipeRepository repo;

    public RecipeService(RecipeRepository repo) {
        this.repo = repo;
    }

    // Save a new recipe to the database
    public Recipe add(Recipe recipe) {
        return repo.save(recipe);
    }

    // Return all recipes in the database (admin/debug only?)
    public List<Recipe> getAll() {
        return repo.findAll();
    }

    // Find one recipe by ID or return null if not found
    public Recipe getById(Long id) {
        return repo.findById(id).orElse(null);
    }

    // 🔐 Get all recipes created by a specific user
    public List<Recipe> getAllByUser(User user) {
        return repo.findAllByUser(user);
    }

    // 🔓 Get all recipes that are either public or belong to the user
    public List<Recipe> getVisibleToUser(User user) {
        return repo.findVisibleToUser(user);
    }
}
