package com.caltracker.calorie_tracker_api.service;

import com.caltracker.calorie_tracker_api.entity.Product;  // We import the Product class to work with Product objects
import com.caltracker.calorie_tracker_api.entity.User;  // Import the User class so we can filter products by user
import com.caltracker.calorie_tracker_api.repository.ProductRepository;  // We import the ProductRepository to interact with the database
import org.springframework.stereotype.Service;  // We import the @Service annotation to mark this class as a service

import java.util.List;  // We import List to return a list of products

@Service  // This annotation tells Spring that this class is a service and will contain business logic
public class ProductService {

    private final ProductRepository repo;  // Declare a ProductRepository instance to interact with the database

    // Constructor that injects the ProductRepository dependency
    // This means the repository will be provided automatically by Spring
    public ProductService(ProductRepository repo) {
        this.repo = repo;
    }

    // This method gets all products from the database (not filtered)
    public List<Product> getAll() {
        return repo.findAll();
    }

    // This method adds a new product to the database (not tied to a user)
    public Product add(Product product) {
        return repo.save(product);
    }

    // 🔐 This method returns all products that belong to a specific user
    public List<Product> getAllForUser(User user) {
        // We ask the repository to find all products where user = the given user
        return repo.findAllByUser(user);
    }

    // 🔐 This method adds a product and links it to the user who created it
    public Product add(Product product, User user) {
        // We attach the user to the product before saving
        product.setUser(user);
        return repo.save(product);
    }

    // 🔍 This method searches for products by name, but only for a specific user
    public List<Product> search(String query, User user) {
        // Returns products where the name contains the query (case-insensitive) and belongs to the user
        return repo.findByUserAndNameContainingIgnoreCase(user, query);
    }
}
