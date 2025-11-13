package com.example.ecommerce.model;

import jakarta.persistence.*;

@Entity
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String description;
    private double price;
    private String imageUrl;

    public Product() {}

    public Product(String name, String description, double price) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.imageUrl = generateLoremFlickrImage(name);
    }

    private String generateLoremFlickrImage(String name) {
        return "https://loremflickr.com/600/400/" + name.replace(" ", "-");
    }

    public Long getId() { return id; }

    public String getName() { return name; }

    public void setName(String name) {
        this.name = name;
        if (this.imageUrl == null || this.imageUrl.isBlank()) {
            this.imageUrl = generateLoremFlickrImage(name);
        }
    }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
}
