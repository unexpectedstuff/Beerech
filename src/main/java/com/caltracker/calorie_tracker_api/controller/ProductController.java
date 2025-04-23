package com.caltracker.calorie_tracker_api.controller;

import com.caltracker.calorie_tracker_api.entity.Product;  // We import the Product class because we will return it in the response
import com.caltracker.calorie_tracker_api.service.ProductService;  // We import the ProductService, which contains the business logic
import org.springframework.web.bind.annotation.*;  // We import annotations for creating REST endpoints

import java.util.List;  // We import List to return a list of products

@RestController  // This annotation makes the class a REST controller, meaning it will handle HTTP requests
@RequestMapping("/products")  // This annotation maps requests that start with /products to this controller
@CrossOrigin  // This allows requests from different domains (useful for front-end and back-end separation)
public class ProductController {

    private final ProductService service;  // Declare a ProductService instance to handle business logic

    // Constructor that injects the ProductService dependency
    // This means the service will be provided automatically by Spring
    public ProductController(ProductService service) {
        this.service = service;
    }

    // This method handles GET requests to /products (get all products)
    @GetMapping  // Handles GET requests
    public List<Product> getAll() {
        // Calls the ProductService to get all products and returns them
        return service.getAll();
    }

    // This method handles POST requests to /products/add (add a new product)
    @PostMapping("/add")  // Handles POST requests to /products/add
    public Product add(@RequestBody Product product) {
        // Receives the product from the request body, calls the ProductService to add it, and returns the added product
        return service.add(product);
    }
}
