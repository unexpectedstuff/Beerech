package com.caltracker.calorie_tracker_api.repository;

import com.caltracker.calorie_tracker_api.entity.Product;  // We import the Product class because this repository works with products
import org.springframework.data.jpa.repository.JpaRepository;  // We import JpaRepository, which helps us talk to the database

// This is the Product repository
// A repository is like a helper that lets us work with data in the database
// Instead of writing a lot of code, we use this to add, find, or delete products easily
public interface ProductRepository extends JpaRepository<Product, Long> {

    // We don’t need to write any special methods for saving, finding, or deleting products
    // JpaRepository automatically gives us methods like:
    // - save() to save or update a product
    // - findById() to get a product by its ID
    // - findAll() to get all products
    // - deleteById() to delete a product by its ID
    // (i snatched this from the guide)
    // This makes it much easier to work with the database. Jpa is awesome, man
}
