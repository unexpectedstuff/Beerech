package com.caltracker.calorie_tracker_api.service;

import com.caltracker.calorie_tracker_api.dto.MealSummaryDTO;
import com.caltracker.calorie_tracker_api.entity.MealEntry;
import com.caltracker.calorie_tracker_api.entity.MealProduct;
import com.caltracker.calorie_tracker_api.entity.Product;
import com.caltracker.calorie_tracker_api.repository.MealEntryRepository;
import com.caltracker.calorie_tracker_api.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service  // This annotation tells Spring that this class is a service
public class MealEntryService {

    private final MealEntryRepository mealRepo;
    private final ProductRepository productRepository;

    // Constructor to inject repositories (MealEntry and Product)
    public MealEntryService(MealEntryRepository mealRepo, ProductRepository productRepository) {
        this.mealRepo = mealRepo;
        this.productRepository = productRepository;
    }

    // --- Normal operations ---

    // Get meals by a specific date
    public List<MealEntry> getMealsByDate(LocalDate date) {
        return mealRepo.findByDate(date);
    }

    // Add a new meal (and save new products if they don't exist yet)
    public MealEntry addMeal(MealEntry entry) {
        if (entry.getProducts() != null) {
            for (MealProduct mp : entry.getProducts()) {
                Product product = mp.getProduct();
                if (product != null && product.getId() == null) {
                    // If the product has no ID, it is new -> save it to the database first
                    Product savedProduct = productRepository.save(product);
                    mp.setProduct(savedProduct); // Update meal product with saved product (with ID now)
                }
                mp.setMealEntry(entry); // Link each MealProduct back to its MealEntry
            }
        }
        // Save the meal entry with its products
        return mealRepo.save(entry);
    }

    // Get the 10 most recent meals
    public List<MealEntry> getRecentMeals() {
        return mealRepo.findTop10ByOrderByDateDesc();
    }

    // Calculate total calories for a meal entry
    public double calculateTotalCalories(MealEntry entry) {
        return entry.getProducts().stream()
                .mapToDouble(mp -> {
                    Product p = mp.getProduct();
                    return (p.getCalories() / 100.0) * mp.getAmountInGrams();
                })
                .sum();
    }

    // --- Summarize nutrition for a specific day ---
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

        // Return the rounded totals
        return new MealSummaryDTO(
                Math.round(totalCalories * 10.0) / 10.0,
                Math.round(totalProtein * 10.0) / 10.0,
                Math.round(totalFat * 10.0) / 10.0,
                Math.round(totalCarbs * 10.0) / 10.0
        );
    }
    
    public void deleteMeal(Long id) {
        mealRepo.deleteById(id);
    }

}