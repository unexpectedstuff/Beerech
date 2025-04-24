package com.caltracker.calorie_tracker_api.controller;

import com.caltracker.calorie_tracker_api.entity.Product;  // We import the Product class because we will return it in the response
import com.caltracker.calorie_tracker_api.entity.User;
import com.caltracker.calorie_tracker_api.service.ProductService;  // We import the ProductService, which contains the business logic
import com.caltracker.calorie_tracker_api.service.UserService;  // Import to get the currently logged-in user
import org.springframework.web.bind.annotation.*;  // We import annotations for creating REST endpoints

import java.util.List;  // We import List to return a list of products

@RestController  // This annotation makes the class a REST controller, meaning it will handle HTTP requests
@RequestMapping("/products")  // This annotation maps requests that start with /products to this controller
@CrossOrigin  // This allows requests from different domains (useful for front-end and back-end separation)
public class ProductController {

    private final ProductService productService;  // Declare a ProductService instance to handle business logic
    private final UserService userService;  // Inject UserService to access the current user

    // Constructor that injects both services
    public ProductController(ProductService productService, UserService userService) {
        this.productService = productService;
        this.userService = userService;
    }

    // 🔍 This method handles GET requests to /products, with optional search
    @GetMapping
    public List<Product> getAll(@RequestParam(required = false) String search) {
        // Get the currently authenticated user
        User user = userService.getCurrentUser();

        // If a search query was provided, return filtered results
        if (search != null) {
            return productService.search(search, user);
        }

        // Otherwise, return all products that belong to the current user
        return productService.getAllForUser(user);
    }

    // ➕ This method handles POST requests to /products/add to add a product for the current user
    @PostMapping("/add")
    public Product add(@RequestBody Product product) {
        // Attach the current user to the product before saving
        return productService.add(product, userService.getCurrentUser());
    }
}
