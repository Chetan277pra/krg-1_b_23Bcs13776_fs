package com.example.ecommerce.controller;

import com.example.ecommerce.model.Product;
import com.example.ecommerce.repository.ProductRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "*")
public class ProductController {

    private final ProductRepository repo;

    public ProductController(ProductRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<Product> all() {
        return repo.findAll();
    }

    @PostMapping
    public Product create(@RequestBody Product p) {
        if (p.getImageUrl() == null || p.getImageUrl().isBlank()) {
            p.setImageUrl("https://loremflickr.com/600/400/" + p.getName().replace(" ", "-"));
        }
        return repo.save(p);
    }

    @GetMapping("/{id}")
    public Product getById(@PathVariable Long id) {
        return repo.findById(id).orElseThrow(() -> new IllegalArgumentException("Product not found: " + id));
    }


    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        repo.deleteById(id);
    }
}
