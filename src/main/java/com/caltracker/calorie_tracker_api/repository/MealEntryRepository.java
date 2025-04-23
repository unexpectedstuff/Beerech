package com.caltracker.calorie_tracker_api.repository;

import com.caltracker.calorie_tracker_api.entity.MealEntry;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface MealEntryRepository extends JpaRepository<MealEntry, Long> {
    List<MealEntry> findByDate(LocalDate date);
    List<MealEntry> findTop10ByOrderByDateDesc();
}
