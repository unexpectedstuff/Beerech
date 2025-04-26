package com.caltracker.calorie_tracker_api.service;

import com.caltracker.calorie_tracker_api.entity.Product;
import com.caltracker.calorie_tracker_api.entity.Recipe;
import com.caltracker.calorie_tracker_api.entity.RecipeProduct;
import com.caltracker.calorie_tracker_api.entity.User;
import com.caltracker.calorie_tracker_api.repository.ProductRepository;
import com.caltracker.calorie_tracker_api.repository.RecipeRepository;

import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RecipeService {

    private final RecipeRepository repo;
    private final ProductRepository productRepository;

    public RecipeService(RecipeRepository repo, ProductRepository productRepository) {
        this.repo = repo;
        this.productRepository = productRepository;
    }

    // Save a new recipe to the database
    public Recipe add(Recipe recipe) {
        if (recipe.getProducts() != null) {
            for (RecipeProduct rp : recipe.getProducts()) {
                Product product = rp.getProduct();
                if (product != null && product.getId() == null) {
                    // If the product is new (no ID yet), save it first to the database
                    Product savedProduct = productRepository.save(product);
                    rp.setProduct(savedProduct);
                }
                rp.setRecipe(recipe);
            }
        }
        return repo.save(recipe);
    }

    // Return all recipes in the database
    public List<Recipe> getAll() {
        return repo.findAll();
    }

    // Find one recipe by ID
    public Recipe getById(Long id) {
        return repo.findById(id).orElse(null);
    }

    // Get all recipes created by a specific user
    public List<Recipe> getAllByUser(User user) {
        return repo.findAllByUser(user);
    }

    // Get all recipes that are either public or belong to the user
    public List<Recipe> getVisibleToUser(User user) {
        return repo.findVisibleToUser(user);
    }
    
    // Delete recipe by id
    public void deleteRecipe(Long id) {
        repo.deleteById(id);
    }
    
    // Update recipe by id
    @Transactional
    public Recipe updateRecipe(Long id, Recipe updatedRecipe) {
        Recipe existingRecipe = repo.findById(id)
            .orElseThrow(() -> new RuntimeException("Recipe not found"));

        existingRecipe.setName(updatedRecipe.getName());

        // Delete old products (since it can't edit product, especially once those that doesn't have an id
        existingRecipe.getProducts().clear();
        
        // adding new products
        if (updatedRecipe.getProducts() != null) {
            for (RecipeProduct rp : updatedRecipe.getProducts()) {
                Product product = rp.getProduct();
                if (product != null && product.getId() == null) {
                    // Новый продукт: сначала сохраняем
                    Product savedProduct = productRepository.save(product);
                    rp.setProduct(savedProduct);
                }
                rp.setRecipe(existingRecipe);
                existingRecipe.getProducts().add(rp);
            }
        }

        return repo.save(existingRecipe);
    }
}
