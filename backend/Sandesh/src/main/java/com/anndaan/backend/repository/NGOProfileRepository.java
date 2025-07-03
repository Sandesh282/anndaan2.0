package com.anndaan.backend.repository;

import com.anndaan.backend.model.NGOProfile;
import com.anndaan.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface NGOProfileRepository extends JpaRepository<NGOProfile, Long> {
    Optional<NGOProfile> findByUser(User user);
    
    Optional<NGOProfile> findByOrganizationName(String organizationName);
    
    boolean existsByRegistrationNumber(String registrationNumber);
}
