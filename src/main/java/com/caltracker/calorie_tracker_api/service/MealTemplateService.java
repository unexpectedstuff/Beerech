package com.caltracker.calorie_tracker_api.service;

import com.caltracker.calorie_tracker_api.entity.MealEntry;
import com.caltracker.calorie_tracker_api.entity.MealProduct;
import com.caltracker.calorie_tracker_api.entity.MealTemplate;
import com.caltracker.calorie_tracker_api.entity.TemplateProduct;
import com.caltracker.calorie_tracker_api.repository.MealTemplateRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class MealTemplateService {

    private final MealTemplateRepository repo;

    public MealTemplateService(MealTemplateRepository repo) {
        this.repo = repo;
    }

    public MealTemplate save(MealTemplate template) {
        return repo.save(template);
    }

    public List<MealTemplate> getAll() {
        return repo.findAll();
    }

    public MealTemplate getById(Long id) {
        return repo.findById(id).orElse(null);
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }

    public MealEntry applyToDate(MealTemplate template, LocalDate date) {
        List<MealProduct> mealProducts = new ArrayList<>();

        for (TemplateProduct tp : template.getProducts()) {
            MealProduct mp = new MealProduct(tp.getAmountInGrams(), tp.getProduct());
            mealProducts.add(mp);
        }

        return new MealEntry(date, template.getTitle(), mealProducts);
    }
}
