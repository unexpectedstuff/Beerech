package com.caltracker.calorie_tracker_api.dto;

import com.caltracker.calorie_tracker_api.entity.RecipeProduct;

public class RecipeProductSimpleDTO {

    private Long id;
    private double amountInGrams;
    private ProductSimpleDTO product;

    public static RecipeProductSimpleDTO fromRecipeProduct(RecipeProduct rp) {
        RecipeProductSimpleDTO dto = new RecipeProductSimpleDTO();
        dto.id = rp.getId();
        dto.amountInGrams = rp.getAmountInGrams();
        dto.product = ProductSimpleDTO.fromProduct(rp.getProduct());
        return dto;
    }

    // --- Getters ---

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
