package com.fooddonation.controller;

import com.fooddonation.model.DonationRequest;
import com.fooddonation.model.OtpVerificationRequest;
import com.fooddonation.service.DonationService;
import com.fooddonation.service.OtpService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class DonationController {

    @Autowired
    private DonationService donationService;

    @Autowired
    private OtpService otpService;

    @PostMapping("/submit-application")
    public ResponseEntity<Map<String, Object>> submitApplication(@RequestBody DonationRequest request) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            // Generate OTP
            String otp = otpService.generateOtp(request.getPhone());
            
            // Log OTP to console (for demo purposes)
            System.out.println("Generated OTP for " + request.getPhone() + ": " + otp);
            
            response.put("success", true);
            response.put("message", "OTP sent successfully");
            response.put("phone", request.getPhone());
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Failed to generate OTP");
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<Map<String, Object>> verifyOtp(@RequestBody OtpVerificationRequest request) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            boolean isValid = otpService.verifyOtp(request.getPhone(), request.getOtp());
            
            if (isValid) {
                response.put("success", true);
                response.put("message", "OTP verified successfully");
            } else {
                response.put("success", false);
                response.put("message", "Invalid OTP");
            }
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "OTP verification failed");
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PostMapping("/save-donation")
    public ResponseEntity<Map<String, Object>> saveDonation(@RequestBody DonationRequest request) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            DonationRequest savedRequest = donationService.saveDonationRequest(request);
            
            response.put("success", true);
            response.put("message", "Donation request saved successfully");
            response.put("data", savedRequest);
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Failed to save donation request");
            return ResponseEntity.badRequest().body(response);
        }
    }
}