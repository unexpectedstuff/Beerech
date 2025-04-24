package com.caltracker.calorie_tracker_api.repository;

import com.caltracker.calorie_tracker_api.entity.Recipe;
import com.caltracker.calorie_tracker_api.entity.User;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface RecipeRepository extends JpaRepository<Recipe, Long> {
	
    // All user recepies
    List<Recipe> findAllByUser(User user);

    // Public and user recipies query
    @Query("SELECT r FROM Recipe r WHERE r.isPublic = true OR r.user = :user")
    List<Recipe> findVisibleToUser(@Param("user") User user);
}
