package com.fooddonation.service;

import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;

@Service
public class OtpService {
    
    // In-memory storage for OTPs (for demo purposes)
    // In production, you would use Redis or database with expiration
    private Map<String, String> otpStorage = new HashMap<>();
    private Random random = new Random();
    
    public String generateOtp(String phoneNumber) {
        // Generate 6-digit OTP
        String otp = String.format("%06d", random.nextInt(1000000));
        
        // Store OTP with phone number as key
        otpStorage.put(phoneNumber, otp);
        
        // Log to console for demo purposes
        System.out.println("OTP Generated for " + phoneNumber + ": " + otp);
        
        // In production, you would send SMS here
        // smsService.sendOtp(phoneNumber, otp);
        
        return otp;
    }
    
    public boolean verifyOtp(String phoneNumber, String enteredOtp) {
        String storedOtp = otpStorage.get(phoneNumber);
        
        if (storedOtp != null && storedOtp.equals(enteredOtp)) {
            // Remove OTP after successful verification
            otpStorage.remove(phoneNumber);
            System.out.println("OTP verified successfully for: " + phoneNumber);
            return true;
        }
        
        System.out.println("OTP verification failed for: " + phoneNumber);
        return false;
    }
    
    public void clearOtp(String phoneNumber) {
        otpStorage.remove(phoneNumber);
    }
}