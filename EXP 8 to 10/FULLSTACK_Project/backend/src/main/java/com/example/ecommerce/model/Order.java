package com.example.ecommerce.model;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name="orders_table")
public class Order {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String customerName;

    @OneToMany(cascade = CascadeType.ALL)
    private List<OrderItem> items;

    public Order(){}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getCustomerName() { return customerName; }
    public void setCustomerName(String customerName) { this.customerName = customerName; }
    public List<OrderItem> getItems() { return items; }
    public void setItems(List<OrderItem> items) { this.items = items; }
}
