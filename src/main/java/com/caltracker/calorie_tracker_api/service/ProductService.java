package com.caltracker.calorie_tracker_api.service;

import com.caltracker.calorie_tracker_api.entity.Product;  // We import the Product class to work with Product objects
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

    // This method gets all products from the database
    public List<Product> getAll() {
        // Calls the repo (repository) to get all products and returns them
        return repo.findAll();
    }

    // This method adds a new product to the database
    public Product add(Product product) {
        // Calls the repo (repository) to save the new product and returns the saved product
        return repo.save(product);
    }
}
