package com.anndaan.backend.repository;

import com.anndaan.backend.model.Donation;
import com.anndaan.backend.model.DonationStatus;
import com.anndaan.backend.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface DonationRepository extends JpaRepository<Donation, Long> {
    Page<Donation> findByStatus(DonationStatus status, Pageable pageable);
    
    Page<Donation> findByDonor(User donor, Pageable pageable);
    
    Page<Donation> findByNgo(User ngo, Pageable pageable);
    
    List<Donation> findByExpiryDateBeforeAndStatus(LocalDateTime dateTime, DonationStatus status);
    
    Page<Donation> findByLocationContainingAndStatus(String location, DonationStatus status, Pageable pageable);
}
