package com.caltracker.calorie_tracker_api.dto;

import com.caltracker.calorie_tracker_api.entity.MealEntry;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

public class MealEntrySimpleDTO {

    private Long id;
    private LocalDate date;
    private String title;
    private List<MealProductSimpleDTO> products;

    public static MealEntrySimpleDTO fromMealEntry(MealEntry meal) {
        MealEntrySimpleDTO dto = new MealEntrySimpleDTO();
        dto.id = meal.getId();
        dto.date = meal.getDate();
        dto.title = meal.getTitle();
        if (meal.getProducts() != null) {
            dto.products = meal.getProducts().stream()
                    .map(MealProductSimpleDTO::fromMealProduct)
                    .collect(Collectors.toList());
        }
        return dto;
    }

    // --- Getters

    public Long getId() {
        return id;
    }

    public LocalDate getDate() {
        return date;
    }

    public String getTitle() {
        return title;
    }

    public List<MealProductSimpleDTO> getProducts() {
        return products;
    }
}
