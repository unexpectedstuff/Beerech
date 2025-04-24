package com.caltracker.calorie_tracker_api.dto;

import jakarta.validation.constraints.*;

import com.caltracker.calorie_tracker_api.entity.Gender;
import com.caltracker.calorie_tracker_api.entity.Goal;

public class UpdateProfileRequest {

	@NotBlank(message = "Name cannot be blank")
	private String name;

	@NotNull(message = "Age is required")
	@Min(value = 10, message = "Minimum age is 10")
	@Max(value = 120, message = "Maximum age is 120")
	private Integer age;

	@NotNull(message = "Weight is required")
	@Min(value = 30, message = "Minimum weight is 30 kg")
	@Max(value = 300, message = "Maximum weight is 300 kg")
	private Double weight;

	@NotNull(message = "Height is required")
	@Min(value = 100, message = "Minimum height is 100 cm")
	@Max(value = 250, message = "Maximum height is 250 cm")
	private Double height;

	@NotNull(message = "Goal is required")
	private Goal goal;

	@NotNull(message = "Gender is required")
	private Gender gender;

	@Min(value = 800, message = "Calorie target must be at least 800")
	@Max(value = 6000, message = "Calorie target must be less than 6000")
	private Integer calorieTarget;

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

	public Integer getCalorieTarget() {
		return calorieTarget;
	}

	public Gender getGender() {
		return gender;
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

	public void setCalorieTarget(Integer calorieTarget) {
		this.calorieTarget = calorieTarget;
	}

	public void setGender(Gender gender) {
		this.gender = gender;
	}
}
