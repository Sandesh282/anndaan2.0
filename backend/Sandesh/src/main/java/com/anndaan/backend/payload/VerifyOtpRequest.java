package com.anndaan.backend.payload;

public class VerifyOtpRequest {
    private String email;
    private String otp;
    // --- Merged fields for compatibility with all forms ---
    private String phone; // For project
    private String phoneNumber; // For formfoo
    // --- End merged fields ---

    // Getters and Setters
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getOtp() {
        return otp;
    }

    public void setOtp(String otp) {
        this.otp = otp;
    }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
    public String getPhoneNumber() { return phoneNumber; }
    public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }
} 