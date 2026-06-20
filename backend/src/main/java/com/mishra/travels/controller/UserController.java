package com.mishra.travels.controller;

import com.mishra.travels.model.User;
import com.mishra.travels.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // Get current user profile
    @GetMapping("/profile")
    public ResponseEntity<?> getProfile() {
        String email = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("Error: Profile not found.");
        }
        User user = userOpt.get();
        return ResponseEntity.ok(user);
    }

    // Update profile (Name and Mobile)
    @PutMapping("/profile")
    public ResponseEntity<?> updateProfile(@RequestBody Map<String, String> request) {
        String email = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("Error: Profile not found.");
        }

        User user = userOpt.get();
        String name = request.get("name");
        String mobile = request.get("mobile");

        if (name == null || name.trim().isEmpty() || mobile == null || mobile.trim().isEmpty()) {
            return ResponseEntity.badRequest().body("Error: Name and mobile cannot be empty!");
        }

        // Check if mobile is already used by someone else
        Optional<User> checkMobile = userRepository.findAll().stream()
                .filter(u -> u.getMobile().equals(mobile) && !u.getId().equals(user.getId()))
                .findFirst();
        if (checkMobile.isPresent()) {
            return ResponseEntity.badRequest().body("Error: Mobile number is already taken!");
        }

        user.setName(name);
        user.setMobile(mobile);
        userRepository.save(user);

        return ResponseEntity.ok(user);
    }

    // Change Password
    @PutMapping("/change-password")
    public ResponseEntity<?> changePassword(@RequestBody Map<String, String> request) {
        String email = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("Error: Profile not found.");
        }

        User user = userOpt.get();
        String currentPassword = request.get("currentPassword");
        String newPassword = request.get("newPassword");

        if (currentPassword == null || newPassword == null || newPassword.trim().isEmpty()) {
            return ResponseEntity.badRequest().body("Error: Passwords cannot be empty!");
        }

        if (!passwordEncoder.matches(currentPassword, user.getPassword())) {
            return ResponseEntity.badRequest().body("Error: Current password does not match!");
        }

        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);

        return ResponseEntity.ok("Password updated successfully!");
    }
}
