package com.caltracker.calorie_tracker_api.dto;

import com.caltracker.calorie_tracker_api.entity.ActivityLevel;
import com.caltracker.calorie_tracker_api.entity.Gender;
import com.caltracker.calorie_tracker_api.entity.Goal;

public class UserProfileDTO {

    private Long id;
    private String email;
    private String name;
    private Integer age;
    private Double weight;
    private Double height;
    private Gender gender;
    private Goal goal;
    private Integer calorieTarget;
    private ActivityLevel activityLevel;

    public UserProfileDTO(Long id, String email, String name, Integer age, Double weight, Double height,
                          Gender gender, Goal goal, Integer calorieTarget, ActivityLevel activityLevel) {
        this.id = id;
        this.email = email;
        this.name = name;
        this.age = age;
        this.weight = weight;
        this.height = height;
        this.gender = gender;
        this.goal = goal;
        this.calorieTarget = calorieTarget;
        this.activityLevel = activityLevel;
    }

    public Long getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public String getName() {
        return name;
    }

    public Integer getAge() {
        return age;
    }

    public Double getWeight() {
        return weight;
    }

    public Double getHeight() {
        return height;
    }

    public Gender getGender() {
        return gender;
    }

    public Goal getGoal() {
        return goal;
    }

    public Integer getCalorieTarget() {
        return calorieTarget;
    }

    public ActivityLevel getActivityLevel() {
        return activityLevel;
    }
}
