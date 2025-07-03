package com.fooddonation.service;

import com.fooddonation.model.DonationRequest;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class DonationService {
    
    // In-memory storage for demo purposes
    // In production, you would use a database repository
    private List<DonationRequest> donationRequests = new ArrayList<>();
    private Long idCounter = 1L;
    
    public DonationRequest saveDonationRequest(DonationRequest request) {
        request.setId(idCounter++);
        request.setCreatedAt(java.time.LocalDateTime.now());
        donationRequests.add(request);
        
        System.out.println("Donation request saved: " + request.getName() + " - " + request.getPhone());
        
        return request;
    }
    
    public List<DonationRequest> getAllDonationRequests() {
        return new ArrayList<>(donationRequests);
    }
    
    public DonationRequest getDonationRequestById(Long id) {
        return donationRequests.stream()
                .filter(request -> request.getId().equals(id))
                .findFirst()
                .orElse(null);
    }
}