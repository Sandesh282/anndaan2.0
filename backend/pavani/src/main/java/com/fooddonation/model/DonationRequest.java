package com.fooddonation.model;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public class DonationRequest {
    
    @NotBlank(message = "Full name is required")
    private String fullName;
    
    @NotBlank(message = "Phone number is required")
    @Pattern(regexp = "^[0-9]{10}$", message = "Phone number must be 10 digits")
    private String phoneNumber;
    
    @NotBlank(message = "Address is required")
    private String address;
    
    @NotBlank(message = "Food type is required")
    private String foodType;
    
    @NotBlank(message = "Quantity is required")
    private String quantity;
    
    private String additionalInfo;
    
    // Constructors
    public DonationRequest() {}
    
    public DonationRequest(String fullName, String phoneNumber, String address, 
                          String foodType, String quantity, String additionalInfo) {
        this.fullName = fullName;
        this.phoneNumber = phoneNumber;
        this.address = address;
        this.foodType = foodType;
        this.quantity = quantity;
        this.additionalInfo = additionalInfo;
    }
    
    // Getters and Setters
    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }
    
    public String getPhoneNumber() { return phoneNumber; }
    public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }
    
    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }
    
    public String getFoodType() { return foodType; }
    public void setFoodType(String foodType) { this.foodType = foodType; }
    
    public String getQuantity() { return quantity; }
    public void setQuantity(String quantity) { this.quantity = quantity; }
    
    public String getAdditionalInfo() { return additionalInfo; }
    public void setAdditionalInfo(String additionalInfo) { this.additionalInfo = additionalInfo; }
}