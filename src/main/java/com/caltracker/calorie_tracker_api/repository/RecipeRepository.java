package com.caltracker.calorie_tracker_api.repository;

import com.caltracker.calorie_tracker_api.entity.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RecipeRepository extends JpaRepository<Recipe, Long> {
}
