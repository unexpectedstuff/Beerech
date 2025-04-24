package com.caltracker.calorie_tracker_api.dto;

import com.caltracker.calorie_tracker_api.entity.Goal;

public class UpdateProfileRequest {
    private String name;
    private Integer age;
    private Double weight;
    private Double height;
    private Goal goal;

    public UpdateProfileRequest() {}

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

    public Goal getGoal() {
        return goal;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public void setWeight(Double weight) {
        this.weight = weight;
    }

    public void setHeight(Double height) {
        this.height = height;
    }

    public void setGoal(Goal goal) {
        this.goal = goal;
    }
}
