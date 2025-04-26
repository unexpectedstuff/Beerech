package com.caltracker.calorie_tracker_api.dto;

import com.caltracker.calorie_tracker_api.entity.MealProduct;
import com.caltracker.calorie_tracker_api.entity.Product;

public class MealProductSimpleDTO {

    private Long id;
    private double amountInGrams;
    private ProductSimpleDTO product;

    public static MealProductSimpleDTO fromMealProduct(MealProduct mp) {
        MealProductSimpleDTO dto = new MealProductSimpleDTO();
        dto.id = mp.getId();
        dto.amountInGrams = mp.getAmountInGrams();
        dto.product = ProductSimpleDTO.fromProduct(mp.getProduct());
        return dto;
    }

    // --- Getters (если нужно)

    public Long getId() {
        return id;
    }

    public double getAmountInGrams() {
        return amountInGrams;
    }

    public ProductSimpleDTO getProduct() {
        return product;
    }
}
