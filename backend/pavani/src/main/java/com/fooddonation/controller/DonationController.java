package com.fooddonation.controller;

import com.fooddonation.model.DonationRequest;
import com.fooddonation.model.OtpVerificationRequest;
import com.fooddonation.service.DonationService;
import com.fooddonation.service.OtpService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/donations")
@CrossOrigin(origins = "http://localhost:3000")
public class DonationController {
    
    @Autowired
    private DonationService donationService;
    
    @Autowired
    private OtpService otpService;
    
    // Store pending donations temporarily
    private final Map<String, DonationRequest> pendingDonations = new HashMap<>();
    
    @PostMapping("/submit")
    public ResponseEntity<Map<String, String>> submitDonation(@Valid @RequestBody DonationRequest donation) {
        Map<String, String> response = new HashMap<>();
        
        try {
            // Store donation temporarily
            pendingDonations.put(donation.getPhoneNumber(), donation);
            
            // Generate and send OTP
            String otp = otpService.generateOtp(donation.getPhoneNumber());
            
            response.put("message", "OTP sent successfully");
            response.put("status", "success");
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            response.put("message", "Error processing donation");
            response.put("status", "error");
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    @PostMapping("/verify-otp")
    public ResponseEntity<Map<String, String>> verifyOtp(@Valid @RequestBody OtpVerificationRequest otpRequest) {
        Map<String, String> response = new HashMap<>();
        
        try {
            boolean isValidOtp = otpService.verifyOtp(otpRequest.getPhoneNumber(), otpRequest.getOtp());
            
            if (isValidOtp) {
                // Get pending donation
                DonationRequest donation = pendingDonations.get(otpRequest.getPhoneNumber());
                
                if (donation != null) {
                    // Save the donation
                    donationService.saveDonation(donation);
                    
                    // Remove from pending donations
                    pendingDonations.remove(otpRequest.getPhoneNumber());
                    
                    response.put("message", "Donation submitted successfully");
                    response.put("status", "success");
                    
                    return ResponseEntity.ok(response);
                } else {
                    response.put("message", "Donation data not found");
                    response.put("status", "error");
                    return ResponseEntity.badRequest().body(response);
                }
            } else {
                response.put("message", "Invalid OTP");
                response.put("status", "error");
                return ResponseEntity.badRequest().body(response);
            }
            
        } catch (Exception e) {
            response.put("message", "Error verifying OTP");
            response.put("status", "error");
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    @GetMapping("/all")
    public ResponseEntity<Map<String, Object>> getAllDonations() {
        Map<String, Object> response = new HashMap<>();
        response.put("donations", donationService.getAllDonations());
        response.put("total", donationService.getAllDonations().size());
        return ResponseEntity.ok(response);
    }
}