package com.anndaan.backend.service;

import com.anndaan.backend.exception.ResourceNotFoundException;
import com.anndaan.backend.model.Donation;
import com.anndaan.backend.model.DonationStatus;
import com.anndaan.backend.model.User;
import com.anndaan.backend.payload.DonationRequest;
import com.anndaan.backend.payload.PagedResponse;
import com.anndaan.backend.repository.DonationRepository;
import com.anndaan.backend.repository.UserRepository;
import com.anndaan.backend.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;

@Service
public class DonationService {

    @Autowired
    private DonationRepository donationRepository;

    @Autowired
    private UserRepository userRepository;

    public Donation createDonation(DonationRequest donationRequest, UserPrincipal currentUser) {
        User user = null;
        if (currentUser != null) {
            user = userRepository.findById(currentUser.getId())
                    .orElseThrow(() -> new ResourceNotFoundException("User", "id", currentUser.getId()));
        }
        Donation donation = new Donation();
        donation.setTitle(donationRequest.getTitle());
        donation.setDescription(donationRequest.getDescription());
        donation.setFoodType(donationRequest.getFoodType());
        donation.setQuantity(donationRequest.getQuantity());
        donation.setLocation(donationRequest.getLocation());
        donation.setExpiryDate(donationRequest.getExpiryDate());
        donation.setStatus(DonationStatus.AVAILABLE);
        if (user != null) {
            donation.setDonor(user);
        }
        return donationRepository.save(donation);
    }

    public PagedResponse<Donation> getAllDonations(int page, int size) {
        validatePageNumberAndSize(page, size);

        // Retrieve Donations
        Pageable pageable = PageRequest.of(page, size, Sort.Direction.DESC, "createdAt");
        Page<Donation> donations = donationRepository.findByStatus(DonationStatus.AVAILABLE, pageable);

        if (donations.getNumberOfElements() == 0) {
            return new PagedResponse<>(Collections.emptyList(), donations.getNumber(),
                    donations.getSize(), donations.getTotalElements(), donations.getTotalPages(), donations.isLast());
        }

        return new PagedResponse<>(donations.getContent(), donations.getNumber(),
                donations.getSize(), donations.getTotalElements(), donations.getTotalPages(), donations.isLast());
    }

    public PagedResponse<Donation> getDonationsByLocation(String location, int page, int size) {
        validatePageNumberAndSize(page, size);

        // Retrieve Donations by location
        Pageable pageable = PageRequest.of(page, size, Sort.Direction.DESC, "createdAt");
        Page<Donation> donations = donationRepository.findByLocationContainingAndStatus(
                location, DonationStatus.AVAILABLE, pageable);

        if (donations.getNumberOfElements() == 0) {
            return new PagedResponse<>(Collections.emptyList(), donations.getNumber(),
                    donations.getSize(), donations.getTotalElements(), donations.getTotalPages(), donations.isLast());
        }

        return new PagedResponse<>(donations.getContent(), donations.getNumber(),
                donations.getSize(), donations.getTotalElements(), donations.getTotalPages(), donations.isLast());
    }

    public Donation getDonationById(Long donationId) {
        return donationRepository.findById(donationId)
                .orElseThrow(() -> new ResourceNotFoundException("Donation", "id", donationId));
    }

    public Donation updateDonation(Long donationId, DonationRequest donationRequest, UserPrincipal currentUser) {
        Donation donation = donationRepository.findById(donationId)
                .orElseThrow(() -> new ResourceNotFoundException("Donation", "id", donationId));

        // Check if the donation belongs to the current user
        if (donation.getDonor().getId().equals(currentUser.getId())) {
            donation.setTitle(donationRequest.getTitle());
            donation.setDescription(donationRequest.getDescription());
            donation.setFoodType(donationRequest.getFoodType());
            donation.setQuantity(donationRequest.getQuantity());
            donation.setLocation(donationRequest.getLocation());
            donation.setExpiryDate(donationRequest.getExpiryDate());

            return donationRepository.save(donation);
        }

        throw new RuntimeException("You don't have permission to update this donation");
    }

    public void deleteDonation(Long donationId, UserPrincipal currentUser) {
        Donation donation = donationRepository.findById(donationId)
                .orElseThrow(() -> new ResourceNotFoundException("Donation", "id", donationId));

        // Check if the donation belongs to the current user or user is admin
        if (donation.getDonor().getId().equals(currentUser.getId()) || 
                currentUser.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"))) {
            donationRepository.delete(donation);
        } else {
            throw new RuntimeException("You don't have permission to delete this donation");
        }
    }

    public Donation reserveDonation(Long donationId, UserPrincipal currentUser) {
        Donation donation = donationRepository.findById(donationId)
                .orElseThrow(() -> new ResourceNotFoundException("Donation", "id", donationId));

        User ngo = userRepository.findById(currentUser.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", currentUser.getId()));

        if (donation.getStatus() != DonationStatus.AVAILABLE) {
            throw new RuntimeException("This donation is not available for reservation");
        }

        donation.setStatus(DonationStatus.RESERVED);
        donation.setNgo(ngo);

        return donationRepository.save(donation);
    }

    public Donation updateDonationStatus(Long donationId, DonationStatus status, UserPrincipal currentUser) {
        Donation donation = donationRepository.findById(donationId)
                .orElseThrow(() -> new ResourceNotFoundException("Donation", "id", donationId));

        // Check if the user has permission to update the status
        if (donation.getDonor().getId().equals(currentUser.getId()) || 
                (donation.getNgo() != null && donation.getNgo().getId().equals(currentUser.getId())) ||
                currentUser.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"))) {
            
            donation.setStatus(status);
            return donationRepository.save(donation);
        }

        throw new RuntimeException("You don't have permission to update this donation status");
    }

    @Scheduled(fixedRate = 3600000) // Run every hour
    public void checkExpiredDonations() {
        List<Donation> expiredDonations = donationRepository.findByExpiryDateBeforeAndStatus(
                LocalDateTime.now(), DonationStatus.AVAILABLE);
        
        for (Donation donation : expiredDonations) {
            donation.setStatus(DonationStatus.EXPIRED);
            donationRepository.save(donation);
        }
    }

    public List<Donation> getAllDonationsList() {
        return donationRepository.findAll();
    }

    private void validatePageNumberAndSize(int page, int size) {
        if (page < 0) {
            throw new RuntimeException("Page number cannot be less than zero.");
        }

        if (size > 100) {
            throw new RuntimeException("Page size must not be greater than 100");
        }
    }
}
