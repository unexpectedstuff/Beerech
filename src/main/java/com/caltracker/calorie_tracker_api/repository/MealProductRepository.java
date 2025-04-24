package com.caltracker.calorie_tracker_api.repository;

import com.caltracker.calorie_tracker_api.entity.MealProduct;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MealProductRepository extends JpaRepository<MealProduct, Long> {
}
