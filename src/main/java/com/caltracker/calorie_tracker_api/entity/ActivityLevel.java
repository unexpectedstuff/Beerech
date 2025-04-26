package com.caltracker.calorie_tracker_api.entity;

public enum ActivityLevel {
    RARELY(1.2, "Rarely"),
    ONE_TO_TWO_TIMES(1.375, "1-2 times per week"),
    THREE_TO_FIVE_TIMES(1.55, "3-5 times per week"),
    SIX_TO_SEVEN_TIMES(1.725, "6-7 times per week"),
    DAILY_INTENSE(1.9, "Daily intense");

    private final double value;
    private final String description;

    ActivityLevel(double value, String description) {
        this.value = value;
        this.description = description;
    }

    public double getValue() {
        return value;
    }

    public String getDescription() {
        return description;
    }

    @Override
    public String toString() {
        return description;
    }
}