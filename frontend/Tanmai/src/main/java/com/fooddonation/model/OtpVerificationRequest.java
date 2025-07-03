package com.fooddonation.model;

public class OtpVerificationRequest {
    private String phone;
    private String otp;
    
    // Default constructor
    public OtpVerificationRequest() {}
    
    // Constructor with parameters
    public OtpVerificationRequest(String phone, String otp) {
        this.phone = phone;
        this.otp = otp;
    }
    
    // Getters and Setters
    public String getPhone() {
        return phone;
    }
    
    public void setPhone(String phone) {
        this.phone = phone;
    }
    
    public String getOtp() {
        return otp;
    }
    
    public void setOtp(String otp) {
        this.otp = otp;
    }
}