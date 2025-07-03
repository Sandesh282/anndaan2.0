package com.anndaan.backend.controller;

import com.anndaan.backend.model.User;
import com.anndaan.backend.payload.ApiResponse;
import com.anndaan.backend.payload.JwtAuthenticationResponse;
import com.anndaan.backend.payload.LoginRequest;
import com.anndaan.backend.payload.SignUpRequest;
import com.anndaan.backend.security.JwtTokenProvider;
import com.anndaan.backend.util.AuthUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.net.URI;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenProvider tokenProvider;

    @Autowired
    private AuthUtils authUtils;

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsernameOrEmail(),
                        loginRequest.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = tokenProvider.generateToken(authentication);
        return ResponseEntity.ok(new JwtAuthenticationResponse(jwt));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignUpRequest signUpRequest) {
        // Validate signup request
        AuthUtils.ValidationResult validationResult = authUtils.validateSignUpRequest(signUpRequest);
        
        if (!validationResult.isValid()) {
            return new ResponseEntity<>(
                new ApiResponse(false, validationResult.getMessage()),
                HttpStatus.BAD_REQUEST
            );
        }

        // Register user
        User result = authUtils.registerUser(signUpRequest);

        // Generate location URI
        URI location = authUtils.generateUserLocationUri(result.getUsername());

        return ResponseEntity.created(location)
                .body(new ApiResponse(true, "User registered successfully"));
    }
}