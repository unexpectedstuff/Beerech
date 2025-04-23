package com.caltracker.calorie_tracker_api.service;

import com.caltracker.calorie_tracker_api.entity.Recipe;
import com.caltracker.calorie_tracker_api.repository.RecipeRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RecipeService {

    private final RecipeRepository repo;

    public RecipeService(RecipeRepository repo) {
        this.repo = repo;
    }

    public Recipe add(Recipe recipe) {
        return repo.save(recipe);
    }

    public List<Recipe> getAll() {
        return repo.findAll();
    }

    public Recipe getById(Long id) {
        return repo.findById(id).orElse(null);
    }
}
