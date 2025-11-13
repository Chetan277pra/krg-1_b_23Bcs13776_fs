package com.example.ecommerce.controller;

import com.example.ecommerce.model.CartItem;
import com.example.ecommerce.model.Product;
import com.example.ecommerce.repository.CartRepository;
import com.example.ecommerce.repository.ProductRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "*")
public class CartController {

    private final CartRepository cartRepo;
    private final ProductRepository productRepo;

    public CartController(CartRepository cartRepo, ProductRepository productRepo) {
        this.cartRepo = cartRepo;
        this.productRepo = productRepo;
    }

    // Get all items in cart
    @GetMapping
    public List<CartItem> getCart() {
        return cartRepo.findAll();
    }

    // Add item to cart (if same product exists, increase quantity)
    @PostMapping
    public CartItem addToCart(@RequestBody CartItem incoming) {
        // incoming should contain productId and quantity (>=1)
        if (incoming.getProductId() == null) {
            throw new IllegalArgumentException("productId is required");
        }
        // find product snapshot
        Optional<Product> prodOpt = productRepo.findById(incoming.getProductId());
        if (prodOpt.isEmpty()) {
            throw new IllegalArgumentException("Product not found: " + incoming.getProductId());
        }
        Product p = prodOpt.get();

        // check existing cart item with same productId
        List<CartItem> all = cartRepo.findAll();
        for (CartItem ci : all) {
            if (ci.getProductId().equals(p.getId())) {
                // update quantity
                ci.setQuantity(ci.getQuantity() + Math.max(1, incoming.getQuantity()));
                return cartRepo.save(ci);
            }
        }
        // create new cart item (snapshot product data)
        CartItem newItem = new CartItem(
                p.getId(),
                p.getName(),
                p.getDescription(),
                p.getPrice(),
                p.getImageUrl(),
                Math.max(1, incoming.getQuantity())
        );
        return cartRepo.save(newItem);
    }

    // Update cart item quantity
    @PutMapping("/{id}")
    public CartItem updateQuantity(@PathVariable Long id, @RequestBody CartItem incoming) {
        CartItem item = cartRepo.findById(id).orElseThrow(() -> new IllegalArgumentException("CartItem not found"));
        if (incoming.getQuantity() <= 0) {
            // if quantity <= 0, remove the item
            cartRepo.deleteById(id);
            return null;
        }
        item.setQuantity(incoming.getQuantity());
        return cartRepo.save(item);
    }

    // Delete single item
    @DeleteMapping("/{id}")
    public void deleteItem(@PathVariable Long id) {
        cartRepo.deleteById(id);
    }

    // Clear entire cart
    @DeleteMapping
    public void clearCart() {
        cartRepo.deleteAll();
    }
}
