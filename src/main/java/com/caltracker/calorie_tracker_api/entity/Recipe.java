package com.caltracker.calorie_tracker_api.entity;

import jakarta.persistence.*;

import java.util.List;

@Entity
public class Recipe {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    // Primary key with auto-increment
    private Long id;

    private String name;

    private String description; // Optional recipe description

    @OneToMany(mappedBy = "recipe", cascade = CascadeType.ALL, orphanRemoval = true)
    // One recipe can have many products (ingredients), and if recipe is deleted, the products are too
    private List<RecipeProduct> products;

    @ManyToOne  // Many recipes can belong to one user
    @JoinColumn(name = "user_id")  // This specifies the foreign key column in the 'recipe' table
    private User user;  // The user who created or owns this recipe

    @Column(nullable = false)
    // This field determines whether the recipe is public (visible to other users or not)
    private boolean isPublic = false;  // Default to false — recipes are private unless made public

    public Recipe() {}

    public Recipe(String name, String description, List<RecipeProduct> products) {
        this.name = name;
        this.description = description;
        this.products = products;
        if (products != null) {
            for (RecipeProduct rp : products) {
                rp.setRecipe(this);  // Link each product back to this recipe
            }
        }
    }

    // --- Getters ---

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public List<RecipeProduct> getProducts() {
        return products;
    }

    public User getUser() {
        return user;  // Return the user who owns this recipe
    }

    public boolean isPublic() {
        return isPublic;  // Return whether this recipe is marked as public
    }

    // --- Setters ---

    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setProducts(List<RecipeProduct> products) {
        this.products = products;
        if (products != null) {
            for (RecipeProduct rp : products) {
                rp.setRecipe(this);  // Link each product back to this recipe again (for consistency)
            }
        }
    }

    public void setUser(User user) {
        this.user = user;  // Set the user who owns this recipe
    }

    public void setPublic(boolean aPublic) {
        this.isPublic = aPublic;  // Set whether this recipe should be visible to everyone
    }
}
