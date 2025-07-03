package com.anndaan.backend.controller;

import com.anndaan.backend.model.Donation;
import com.anndaan.backend.model.DonationStatus;
import com.anndaan.backend.payload.ApiResponse;
import com.anndaan.backend.payload.DonationRequest;
import com.anndaan.backend.payload.PagedResponse;
import com.anndaan.backend.security.CurrentUser;
import com.anndaan.backend.security.UserPrincipal;
import com.anndaan.backend.service.DonationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/donations")
public class DonationController {

    @Autowired
    private DonationService donationService;

    @Autowired
    private com.anndaan.backend.service.OtpService mergedOtpService;

    @GetMapping
    public PagedResponse<Donation> getDonations(
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size) {
        return donationService.getAllDonations(page, size);
    }

    @GetMapping("/location")
    public PagedResponse<Donation> getDonationsByLocation(
            @RequestParam(value = "location") String location,
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size) {
        return donationService.getDonationsByLocation(location, page, size);
    }

    @GetMapping("/{donationId}")
    public Donation getDonationById(@PathVariable Long donationId) {
        return donationService.getDonationById(donationId);
    }

    @PostMapping
    @PreAuthorize("hasRole('DONOR')")
    public ResponseEntity<?> createDonation(@Valid @RequestBody DonationRequest donationRequest,
                                          @CurrentUser UserPrincipal currentUser) {
        Donation donation = donationService.createDonation(donationRequest, currentUser);

        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest().path("/{donationId}")
                .buildAndExpand(donation.getId()).toUri();

        return ResponseEntity.created(location)
                .body(new ApiResponse(true, "Donation Created Successfully"));
    }

    @PutMapping("/{donationId}")
    @PreAuthorize("hasRole('DONOR')")
    public Donation updateDonation(@PathVariable Long donationId,
                                 @Valid @RequestBody DonationRequest donationRequest,
                                 @CurrentUser UserPrincipal currentUser) {
        return donationService.updateDonation(donationId, donationRequest, currentUser);
    }

    @DeleteMapping("/{donationId}")
    @PreAuthorize("hasRole('DONOR') or hasRole('ADMIN')")
    public ResponseEntity<?> deleteDonation(@PathVariable Long donationId,
                                          @CurrentUser UserPrincipal currentUser) {
        donationService.deleteDonation(donationId, currentUser);
        return ResponseEntity.ok()
                .body(new ApiResponse(true, "Donation Deleted Successfully"));
    }

    @PostMapping("/{donationId}/reserve")
    @PreAuthorize("hasRole('NGO')")
    public Donation reserveDonation(@PathVariable Long donationId,
                                  @CurrentUser UserPrincipal currentUser) {
        return donationService.reserveDonation(donationId, currentUser);
    }

    @PutMapping("/{donationId}/status")
    @PreAuthorize("hasAnyRole('DONOR', 'NGO', 'ADMIN')")
    public Donation updateDonationStatus(@PathVariable Long donationId,
                                       @RequestParam DonationStatus status,
                                       @CurrentUser UserPrincipal currentUser) {
        return donationService.updateDonationStatus(donationId, status, currentUser);
    }

    @PostMapping("/submit-application")
    public ResponseEntity<Map<String, Object>> submitApplication(@RequestBody com.anndaan.backend.payload.DonationRequest request) {
        Map<String, Object> response = new HashMap<>();
        try {
            String otp = mergedOtpService.generateOtp(request.getPhone());
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
    public ResponseEntity<Map<String, Object>> verifyOtp(@RequestBody com.anndaan.backend.payload.VerifyOtpRequest request) {
        Map<String, Object> response = new HashMap<>();
        try {
            boolean isValid = mergedOtpService.verifyOtp(request.getPhone(), request.getOtp());
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
    public ResponseEntity<Map<String, Object>> saveDonation(@RequestBody com.anndaan.backend.payload.DonationRequest request) {
        Map<String, Object> response = new HashMap<>();
        try {
            com.anndaan.backend.model.Donation savedRequest = donationService.createDonation(request, null);
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

    @GetMapping("/all")
    public ResponseEntity<Map<String, Object>> getAllDonationsSimple() {
        Map<String, Object> response = new HashMap<>();
        var allDonations = donationService.getAllDonations(0, Integer.MAX_VALUE).getContent();
        response.put("donations", allDonations);
        response.put("total", allDonations.size());
        return ResponseEntity.ok(response);
    }
}
