package com.fooddonation.model;

import jakarta.persistence.*;

@Entity
@Table(name = "donation_requests")
public class DonationRequest {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String name;
    
    @Column(nullable = false)
    private String phone;
    
    @Column(nullable = false)
    private String address;
    
    @Column(name = "food_choice", nullable = false)
    private String foodChoice;
    
    @Column(nullable = false)
    private Integer quantity;
    
    @Column(columnDefinition = "TEXT")
    private String message;
    
    @Column(name = "created_at")
    private java.time.LocalDateTime createdAt;
    
    // Default constructor
    public DonationRequest() {
        this.createdAt = java.time.LocalDateTime.now();
    }
    
    // Constructor with parameters
    public DonationRequest(String name, String phone, String address, String foodChoice, Integer quantity, String message) {
        this.name = name;
        this.phone = phone;
        this.address = address;
        this.foodChoice = foodChoice;
        this.quantity = quantity;
        this.message = message;
        this.createdAt = java.time.LocalDateTime.now();
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    public String getPhone() {
        return phone;
    }
    
    public void setPhone(String phone) {
        this.phone = phone;
    }
    
    public String getAddress() {
        return address;
    }
    
    public void setAddress(String address) {
        this.address = address;
    }
    
    public String getFoodChoice() {
        return foodChoice;
    }
    
    public void setFoodChoice(String foodChoice) {
        this.foodChoice = foodChoice;
    }
    
    public Integer getQuantity() {
        return quantity;
    }
    
    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }
    
    public String getMessage() {
        return message;
    }
    
    public void setMessage(String message) {
        this.message = message;
    }
    
    public java.time.LocalDateTime getCreatedAt() {
        return createdAt;
    }
    
    public void setCreatedAt(java.time.LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}