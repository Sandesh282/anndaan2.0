package com.anndaan.backend.controller;

import com.anndaan.backend.payload.*;
import com.anndaan.backend.security.CurrentUser;
import com.anndaan.backend.security.UserPrincipal;
import com.anndaan.backend.util.UserUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserUtils userUtils;

    @GetMapping("/user/me")
    @PreAuthorize("hasRole('USER')")
    public UserSummary getCurrentUser(@CurrentUser UserPrincipal currentUser) {
        return userUtils.createUserSummary(currentUser);
    }

    @GetMapping("/user/checkUsernameAvailability")
    public UserIdentityAvailability checkUsernameAvailability(@RequestParam(value = "username") String username) {
        return userUtils.checkUsernameAvailability(username);
    }

    @GetMapping("/user/checkEmailAvailability")
    public UserIdentityAvailability checkEmailAvailability(@RequestParam(value = "email") String email) {
        return userUtils.checkEmailAvailability(email);
    }

    @GetMapping("/users/{username}")
    public UserProfile getUserProfile(@PathVariable(value = "username") String username) {
        return userUtils.getUserProfileByUsername(username);
    }

    @PostMapping("/ngo/profile")
    @PreAuthorize("hasRole('NGO')")
    public ResponseEntity<?> createNGOProfile(@Valid @RequestBody NGOProfileRequest profileRequest,
                                            @CurrentUser UserPrincipal currentUser) {
        userUtils.processNGOProfileCreation(profileRequest, currentUser);
        return ResponseEntity.ok(new ApiResponse(true, "NGO Profile created successfully"));
    }

    @PostMapping("/donor/profile")
    @PreAuthorize("hasRole('DONOR')")
    public ResponseEntity<?> createDonorProfile(@Valid @RequestBody DonorProfileRequest profileRequest,
                                              @CurrentUser UserPrincipal currentUser) {
        userUtils.processDonorProfileCreation(profileRequest, currentUser);
        return ResponseEntity.ok(new ApiResponse(true, "Donor Profile created successfully"));
    }
}