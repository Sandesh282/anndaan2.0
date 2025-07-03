package com.anndaan.backend.util;
import com.anndaan.backend.exception.ResourceNotFoundException;
import com.anndaan.backend.model.DonorProfile;
import com.anndaan.backend.model.NGOProfile;
import com.anndaan.backend.model.User;
import com.anndaan.backend.payload.*;
import com.anndaan.backend.repository.DonorProfileRepository;
import com.anndaan.backend.repository.NGOProfileRepository;
import com.anndaan.backend.repository.UserRepository;
import com.anndaan.backend.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class UserUtils {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private NGOProfileRepository ngoProfileRepository;

    @Autowired
    private DonorProfileRepository donorProfileRepository;

    public UserSummary createUserSummary(UserPrincipal currentUser) {
        return new UserSummary(
            currentUser.getId(),
            currentUser.getUsername(),
            currentUser.getName()
        );
    }

    public UserIdentityAvailability checkUsernameAvailability(String username) {
        Boolean isAvailable = !userRepository.existsByUsername(username);
        return new UserIdentityAvailability(isAvailable);
    }

    public UserIdentityAvailability checkEmailAvailability(String email) {
        Boolean isAvailable = !userRepository.existsByEmail(email);
        return new UserIdentityAvailability(isAvailable);
    }

    public UserProfile getUserProfileByUsername(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User", "username", username));

        return new UserProfile(
            user.getId(),
            user.getUsername(),
            user.getName(),
            user.getCreatedAt()
        );
    }

    public User findUserById(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));
    }

    public NGOProfile createNGOProfile(NGOProfileRequest profileRequest, User user) {
        NGOProfile profile = new NGOProfile();
        profile.setUser(user);
        profile.setOrganizationName(profileRequest.getOrganizationName());
        profile.setDescription(profileRequest.getDescription());
        profile.setRegistrationNumber(profileRequest.getRegistrationNumber());
        profile.setVerified(false);
        profile.setAddress(profileRequest.getAddress());
        profile.setContactNumber(profileRequest.getContactNumber());
        profile.setWebsite(profileRequest.getWebsite());
        return profile;
    }

    public DonorProfile createDonorProfile(DonorProfileRequest profileRequest, User user) {
        DonorProfile profile = new DonorProfile();
        profile.setUser(user);
        profile.setOrganizationName(profileRequest.getOrganizationName());
        profile.setDescription(profileRequest.getDescription());
        profile.setAddress(profileRequest.getAddress());
        profile.setContactNumber(profileRequest.getContactNumber());
        profile.setWebsite(profileRequest.getWebsite());
        profile.setOrganization(profileRequest.isOrganization());
        return profile;
    }

    public NGOProfile saveNGOProfile(NGOProfile profile) {
        return ngoProfileRepository.save(profile);
    }

    public DonorProfile saveDonorProfile(DonorProfile profile) {
        return donorProfileRepository.save(profile);
    }

    public NGOProfile processNGOProfileCreation(NGOProfileRequest profileRequest, UserPrincipal currentUser) {
        User user = findUserById(currentUser.getId());
        NGOProfile profile = createNGOProfile(profileRequest, user);
        return saveNGOProfile(profile);
    }

    public DonorProfile processDonorProfileCreation(DonorProfileRequest profileRequest, UserPrincipal currentUser) {
        User user = findUserById(currentUser.getId());
        DonorProfile profile = createDonorProfile(profileRequest, user);
        return saveDonorProfile(profile);
    }

    public boolean userExistsById(Long userId) {
        return userRepository.existsById(userId);
    }

    public boolean userExistsByUsername(String username) {
        return userRepository.existsByUsername(username);
    }

    public boolean userExistsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }
}


