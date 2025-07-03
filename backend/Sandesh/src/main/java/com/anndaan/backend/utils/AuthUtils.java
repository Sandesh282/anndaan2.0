package com.anndaan.backend.util;

import com.anndaan.backend.model.Role;
import com.anndaan.backend.model.RoleName;
import com.anndaan.backend.model.User;
import com.anndaan.backend.payload.SignUpRequest;
import com.anndaan.backend.repository.RoleRepository;
import com.anndaan.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.Collections;

@Component
public class AuthUtils {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public boolean isUsernameExists(String username) {
        return userRepository.existsByUsername(username);
    }

    public boolean isEmailExists(String email) {
        return userRepository.existsByEmail(email);
    }

    public User createUser(SignUpRequest req) {
        User user = new User(req.getName(), req.getUsername(), req.getEmail(), req.getPassword());
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        Role role = roleRepository.findByName(RoleName.ROLE_USER)
                .orElseThrow(() -> new RuntimeException("User Role not set."));
        user.setRoles(Collections.singleton(role));
        return user;
    }

    public User registerUser(SignUpRequest req) {
        return userRepository.save(createUser(req));
    }

    public URI generateUserUri(String username) {
        return ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/api/users/{username}")
                .buildAndExpand(username)
                .toUri();
    }

    public ValidationResult validate(SignUpRequest req) {
        if (isUsernameExists(req.getUsername()))
            return new ValidationResult(false, "Username already taken!");
        if (isEmailExists(req.getEmail()))
            return new ValidationResult(false, "Email already in use!");
        return new ValidationResult(true, "Valid");
    }

    public static class ValidationResult {
        private final boolean valid;
        private final String message;

        public ValidationResult(boolean valid, String message) {
            this.valid = valid;
            this.message = message;
        }

        public boolean isValid() {
            return valid;
        }

        public String getMessage() {
            return message;
        }
    }
}
