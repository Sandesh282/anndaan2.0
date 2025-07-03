package com.fooddonation.service;

import com.fooddonation.model.DonationRequest;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;

@Service
public class DonationService {
    
    private final List<DonationRequest> donations = new ArrayList<>();
    
    public void saveDonation(DonationRequest donation) {
        donations.add(donation);
        System.out.println("=================================");
        System.out.println("DONATION SAVED SUCCESSFULLY!");
        System.out.println("Donor: " + donation.getFullName());
        System.out.println("Phone: " + donation.getPhoneNumber());
        System.out.println("Food Type: " + donation.getFoodType());
        System.out.println("Quantity: " + donation.getQuantity());
        System.out.println("Address: " + donation.getAddress());
        if (donation.getAdditionalInfo() != null && !donation.getAdditionalInfo().isEmpty()) {
            System.out.println("Additional Info: " + donation.getAdditionalInfo());
        }
        System.out.println("Total Donations: " + donations.size());
        System.out.println("=================================");
    }
    
    public List<DonationRequest> getAllDonations() {
        return new ArrayList<>(donations);
    }
}