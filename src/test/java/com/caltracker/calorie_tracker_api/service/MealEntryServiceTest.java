package com.caltracker.calorie_tracker_api.service;

import com.caltracker.calorie_tracker_api.entity.MealEntry;
import com.caltracker.calorie_tracker_api.entity.MealProduct;
import com.caltracker.calorie_tracker_api.entity.Product;
import com.caltracker.calorie_tracker_api.repository.MealEntryRepository;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;

public class MealEntryServiceTest {

    @Test
    public void testCalorieCalculation() {
        MealEntryRepository repo = mock(MealEntryRepository.class);
        MealEntryService service = new MealEntryService(repo);

        Product apple = new Product();
        apple.setCalories(52);

        MealProduct mp = new MealProduct();
        mp.setProduct(apple);
        mp.setAmountInGrams(150);

        MealEntry entry = new MealEntry();
        entry.setProducts(List.of(mp));

        double result = service.calculateTotalCalories(entry);
        assertEquals(78.0, result, 0.5); // (52 / 100) * 150 = 78
    }
}
