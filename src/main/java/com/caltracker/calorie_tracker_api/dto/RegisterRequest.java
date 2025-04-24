package com.caltracker.calorie_tracker_api.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Max;

import com.caltracker.calorie_tracker_api.entity.Goal;

public class RegisterRequest {

    @NotBlank
    @Email
    private String email;

    @NotBlank
    @Size(min = 6)
    private String password;

    @NotBlank
    private String name;

    @Min(10)
    @Max(120)
    private Integer age;

    @Min(30)
    @Max(300)
    private Double weight;

    @Min(100)
    @Max(250)
    private Double height;

    private Goal goal;

    public RegisterRequest() {}

    public RegisterRequest(String email, String password, String name,
                           Integer age, Double weight, Double height, Goal goal) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.age = age;
        this.weight = weight;
        this.height = height;
        this.goal = goal;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
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

    public Goal getGoal() {
        return goal;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
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
