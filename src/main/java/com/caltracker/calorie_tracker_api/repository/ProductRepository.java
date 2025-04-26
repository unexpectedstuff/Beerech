package com.caltracker.calorie_tracker_api.repository;

import com.caltracker.calorie_tracker_api.entity.Product;  
import com.caltracker.calorie_tracker_api.entity.User;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;  // We import JpaRepository, which helps us talk to the database
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

// This is the Product repository
// A repository is like a helper that lets us work with data in the database
// Instead of writing a lot of code, we use this to add, find, or delete products easily
public interface ProductRepository extends JpaRepository<Product, Long> {
	List<Product> findAllByUser(User user);
	List<Product> findByUserAndNameContainingIgnoreCase(User user, String name);
	List<Product> findByUserIsNullOrUser(User user);

	// this is product search
	@Query("SELECT p FROM Product p WHERE LOWER(TRIM(p.name)) LIKE LOWER(CONCAT(:name, '%')) AND p.user IS NULL")
	List<Product> searchPublicProducts(@Param("name") String name);

	@Query("SELECT p FROM Product p WHERE LOWER(TRIM(p.name)) LIKE LOWER(CONCAT(:name, '%')) AND p.user = :user")
	List<Product> searchUserProducts(@Param("name") String name, @Param("user") User user);
	
	// Find a product by exact name (case-insensitive)
	Product findByNameIgnoreCase(String name);

    // We don’t need to write any special methods for saving, finding, or deleting products
    // JpaRepository automatically gives us methods like:
    // - save() to save or update a product
    // - findById() to get a product by its ID
    // - findAll() to get all products
    // - deleteById() to delete a product by its ID
    // (i snatched this from the guide)
    // This makes it much easier to work with the database. Jpa is awesome, man
}
