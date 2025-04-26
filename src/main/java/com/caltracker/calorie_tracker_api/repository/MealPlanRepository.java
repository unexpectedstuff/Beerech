package com.caltracker.calorie_tracker_api.repository;

import com.caltracker.calorie_tracker_api.entity.MealPlan;
import com.caltracker.calorie_tracker_api.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface MealPlanRepository extends JpaRepository<MealPlan, Long> {
    List<MealPlan> findAllByUser(User user);
}
