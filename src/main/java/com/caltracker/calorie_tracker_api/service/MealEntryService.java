package com.caltracker.calorie_tracker_api.service;

import com.caltracker.calorie_tracker_api.dto.MealSummaryDTO;
import com.caltracker.calorie_tracker_api.entity.MealEntry;
import com.caltracker.calorie_tracker_api.entity.MealProduct;
import com.caltracker.calorie_tracker_api.entity.Product;
import com.caltracker.calorie_tracker_api.repository.MealEntryRepository;
import com.caltracker.calorie_tracker_api.repository.ProductRepository;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import java.time.LocalDate;
import java.util.List;

@Service
public class MealEntryService {

    private final MealEntryRepository mealRepo;
    private final ProductRepository productRepository;

    public MealEntryService(MealEntryRepository mealRepo, ProductRepository productRepository) {
        this.mealRepo = mealRepo;
        this.productRepository = productRepository;
    }

    // Get all meals for a given date
    public List<MealEntry> getMealsByDate(LocalDate date) {
        return mealRepo.findByDate(date);
    }

    // Add a new meal
    public MealEntry addMeal(MealEntry entry) {
        if (entry.getProducts() != null) {
            for (MealProduct mp : entry.getProducts()) {
                Product product = mp.getProduct();
                // If product is new (no ID), we save it first
                if (product != null && product.getId() == null) {
                    Product savedProduct = productRepository.save(product);
                    mp.setProduct(savedProduct);
                }
                // Link the meal entry to the product
                mp.setMealEntry(entry);
            }
        }
        return mealRepo.save(entry);
    }

    // Get 10 most recent meals
    public List<MealEntry> getRecentMeals() {
        return mealRepo.findTop10ByOrderByDateDesc();
    }

    // Calculate total calories for one meal
    public double calculateTotalCalories(MealEntry entry) {
        return entry.getProducts().stream()
                .mapToDouble(mp -> (mp.getProduct().getCalories() / 100.0) * mp.getAmountInGrams())
                .sum();
    }

    // Get daily summary (calories, protein, fat, carbs)
    public MealSummaryDTO getSummaryForDate(LocalDate date) {
        List<MealEntry> meals = getMealsByDate(date);

        double totalCalories = 0;
        double totalProtein = 0;
        double totalFat = 0;
        double totalCarbs = 0;

        for (MealEntry meal : meals) {
            for (MealProduct mp : meal.getProducts()) {
                Product p = mp.getProduct();
                double grams = mp.getAmountInGrams();

                totalCalories += (p.getCalories() / 100.0) * grams;
                totalProtein += (p.getProtein() / 100.0) * grams;
                totalFat     += (p.getFat() / 100.0) * grams;
                totalCarbs   += (p.getCarbs() / 100.0) * grams;
            }
        }

        // Round results to 1 decimal place
        return new MealSummaryDTO(
                Math.round(totalCalories * 10.0) / 10.0,
                Math.round(totalProtein * 10.0) / 10.0,
                Math.round(totalFat * 10.0) / 10.0,
                Math.round(totalCarbs * 10.0) / 10.0
        );
    }

    // Delete a meal by ID
    public void deleteMeal(Long id) {
        mealRepo.deleteById(id);
    }

    // Update an existing meal
    @Transactional
    public MealEntry updateMeal(Long id, MealEntry updatedMeal) {
        MealEntry existingMeal = mealRepo.findById(id) //findinf existing meal
            .orElseThrow(() -> new RuntimeException("Meal not found"));

        existingMeal.setTitle(updatedMeal.getTitle());
//        existingMeal.setDate(updatedMeal.getDate()); - not messing up the date

        // Delete old products, because we can't edit those
        existingMeal.getProducts().clear();

        if (updatedMeal.getProducts() != null) {
            for (MealProduct mp : updatedMeal.getProducts()) {
                Product product = mp.getProduct();
                if (product != null && product.getId() == null) {
                    // if new product - save to the base
                    Product savedProduct = productRepository.save(product);
                    mp.setProduct(savedProduct);
                }
                mp.setMealEntry(existingMeal); //connecting
                existingMeal.getProducts().add(mp);
            }
        }

        return mealRepo.save(existingMeal);
    }

}
