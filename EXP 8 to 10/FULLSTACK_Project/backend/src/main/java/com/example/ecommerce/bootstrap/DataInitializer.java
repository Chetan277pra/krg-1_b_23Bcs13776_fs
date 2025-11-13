package com.example.ecommerce.bootstrap;

import com.example.ecommerce.model.Product;
import com.example.ecommerce.repository.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {
    private final ProductRepository repo;

    public DataInitializer(ProductRepository repo) {
        this.repo = repo;
    }

    @Override
    public void run(String... args) {
        repo.save(new Product("Classic T-Shirt", "Comfortable cotton tee", 499));
        repo.save(new Product("Running Shoes", "Lightweight sneakers", 2499));
        repo.save(new Product("Coffee Mug", "Ceramic mug 350ml", 199));
    }
}
