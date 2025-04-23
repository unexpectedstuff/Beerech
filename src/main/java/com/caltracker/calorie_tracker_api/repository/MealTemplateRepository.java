package com.caltracker.calorie_tracker_api.repository;

import com.caltracker.calorie_tracker_api.entity.MealTemplate;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MealTemplateRepository extends JpaRepository<MealTemplate, Long> {
}
