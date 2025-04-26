package com.caltracker.calorie_tracker_api.service;

import com.caltracker.calorie_tracker_api.entity.MealPlan;
import com.caltracker.calorie_tracker_api.entity.User;
import com.caltracker.calorie_tracker_api.repository.MealPlanRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MealPlanService {

    private final MealPlanRepository repo;

    public MealPlanService(MealPlanRepository repo) {
        this.repo = repo;
    }

    public MealPlan save(MealPlan plan) {
        return repo.save(plan);
    }

    public List<MealPlan> getAll(User user) {
        return repo.findAllByUser(user);
    }

    public MealPlan getById(Long id) {
        return repo.findById(id).orElse(null);
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }
}
