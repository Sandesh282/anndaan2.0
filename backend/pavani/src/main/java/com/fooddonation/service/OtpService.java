package com.fooddonation.service;

import org.springframework.stereotype.Service;
import java.util.Map;
import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;

@Service
public class OtpService {
    
    private final Map<String, OtpData> otpStorage = new ConcurrentHashMap<>();
    private final Random random = new Random();
    
    public String generateOtp(String phoneNumber) {
        // Generate 6-digit OTP
        String otp = String.format("%06d", random.nextInt(1000000));
        
        // Store OTP with expiration time (5 minutes)
        LocalDateTime expirationTime = LocalDateTime.now().plus(5, ChronoUnit.MINUTES);
        otpStorage.put(phoneNumber, new OtpData(otp, expirationTime));
        
        // Print OTP to console/terminal for testing
        System.out.println("=================================");
        System.out.println("OTP GENERATED FOR: " + phoneNumber);
        System.out.println("OTP CODE: " + otp);
        System.out.println("EXPIRES AT: " + expirationTime);
        System.out.println("=================================");
        
        return otp;
    }
    
    public boolean verifyOtp(String phoneNumber, String otp) {
        OtpData otpData = otpStorage.get(phoneNumber);
        
        if (otpData == null) {
            System.out.println("No OTP found for phone number: " + phoneNumber);
            return false;
        }
        
        if (LocalDateTime.now().isAfter(otpData.getExpirationTime())) {
            otpStorage.remove(phoneNumber);
            System.out.println("OTP expired for phone number: " + phoneNumber);
            return false;
        }
        
        boolean isValid = otpData.getOtp().equals(otp);
        
        if (isValid) {
            otpStorage.remove(phoneNumber); // Remove OTP after successful verification
            System.out.println("OTP verified successfully for: " + phoneNumber);
        } else {
            System.out.println("Invalid OTP for phone number: " + phoneNumber);
        }
        
        return isValid;
    }
    
    // Clean up expired OTPs periodically
    public void cleanupExpiredOtps() {
        LocalDateTime now = LocalDateTime.now();
        otpStorage.entrySet().removeIf(entry -> 
            now.isAfter(entry.getValue().getExpirationTime()));
    }
    
    private static class OtpData {
        private final String otp;
        private final LocalDateTime expirationTime;
        
        public OtpData(String otp, LocalDateTime expirationTime) {
            this.otp = otp;
            this.expirationTime = expirationTime;
        }
        
        public String getOtp() { return otp; }
        public LocalDateTime getExpirationTime() { return expirationTime; }
    }
}