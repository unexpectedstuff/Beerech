package com.caltracker.calorie_tracker_api.entity;

import jakarta.persistence.*;
import java.util.List;

@Entity
public class MealPlan {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String title;

	@ManyToMany
	private List<Recipe> recipes;

	@ManyToOne
	private User user; // чтобы видеть только свои планы

	// Getters Setters
	public Long getId() {
		return id;
	}

	public String getTitle() {
		return title;
	}

	public List<Recipe> getRecipes() {
		return recipes;
	}

	public User getUser() {
		return user;
	}

	// Setters

	public void setId(Long id) {
		this.id = id;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public void setRecipes(List<Recipe> recipes) {
		this.recipes = recipes;
	}

	public void setUser(User user) {
		this.user = user;
	}
}
