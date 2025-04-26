package com.caltracker.calorie_tracker_api.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    private String name;
    private Double height;
    private Integer age;
    private Double weight;

    @Column(nullable = true) //for testing purposes, but may be needed
    private Integer calorieTarget;


    @Enumerated(EnumType.STRING) 
    private Goal goal;
    
    @Enumerated(EnumType.STRING)
    private Gender gender;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = true)
    private ActivityLevel activityLevel;

    public User() {}

    public User(String email, String password, String name) {
        this.email = email;
        this.password = password;
        this.name = name;
    }

    // --- Getters ---

    public Long getId() {
        return id;
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

    public Goal getGoal() { 
        return goal;
    }

    public Double getHeight() {
        return height;
    }
    
    public Integer getCalorieTarget() {
        return calorieTarget;
    }
    
    public Gender getGender() {
        return gender;
    }
    
    public ActivityLevel getActivityLevel() {
        return activityLevel;
    }

    // --- Setters ---

    public void setId(Long id) {
        this.id = id;
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

    public void setGoal(Goal goal) {
        this.goal = goal;
    }

    public void setHeight(Double height) {
        this.height = height;
    }
    
    public void setCalorieTarget(Integer calorieTarget) {
        this.calorieTarget = calorieTarget;
    }
    
    public void setGender(Gender gender) {
        this.gender = gender;
    }
    
    public void setActivityLevel(ActivityLevel activityLevel) {
        this.activityLevel = activityLevel;
    }

}
