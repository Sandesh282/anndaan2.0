package com.codersinfinity.anndaan.controller;

import com.codersinfinity.anndaan.dto.OtpRequest;
import com.codersinfinity.anndaan.dto.VerifyOtpRequest;
import com.codersinfinity.anndaan.service.EmailService;
import com.codersinfinity.anndaan.service.OtpService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/api/register")
public class RegistrationController {

    @Autowired
    private OtpService otpService;

    @Autowired
    private EmailService emailService;

    @PostMapping("/send-otp")
    public ResponseEntity<String> sendOtp(@RequestBody OtpRequest otpRequest) {
        if (otpRequest.getEmail() == null || otpRequest.getEmail().isEmpty()) {
            return ResponseEntity.badRequest().body("Email is required.");
        }
        try {
            String otp = otpService.generateOtp(otpRequest.getEmail());
            emailService.sendOtpEmail(otpRequest.getEmail(), otp);
            return ResponseEntity.ok("OTP sent successfully to " + otpRequest.getEmail());
        } catch (Exception e) {
            // Log the exception e.g., e.printStackTrace(); or using a logger
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error sending OTP: " + e.getMessage());
        }
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<String> verifyOtp(@RequestBody VerifyOtpRequest verifyOtpRequest) {
        if (verifyOtpRequest.getEmail() == null || verifyOtpRequest.getEmail().isEmpty() ||
            verifyOtpRequest.getOtp() == null || verifyOtpRequest.getOtp().isEmpty()) {
            return ResponseEntity.badRequest().body("Email and OTP are required.");
        }
        try {
            boolean isValid = otpService.verifyOtp(verifyOtpRequest.getEmail(), verifyOtpRequest.getOtp());
            if (isValid) {
                // Here you would typically proceed to save the full restaurant registration data.
                // For now, we just confirm OTP verification.
                // Example: restaurantService.registerRestaurant(fullFormData);
                return ResponseEntity.ok("OTP verified successfully. Registration complete for " + verifyOtpRequest.getEmail());
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid OTP or OTP expired.");
            }
        } catch (Exception e) {
            // Log the exception
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error verifying OTP: " + e.getMessage());
        }
    }
} 