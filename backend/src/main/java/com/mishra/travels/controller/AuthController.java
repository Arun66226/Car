package com.mishra.travels.controller;

import com.mishra.travels.dto.AuthResponse;
import com.mishra.travels.dto.LoginRequest;
import com.mishra.travels.dto.SignupRequest;
import com.mishra.travels.model.Admin;
import com.mishra.travels.model.User;
import com.mishra.travels.repository.AdminRepository;
import com.mishra.travels.repository.UserRepository;
import com.mishra.travels.security.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtils jwtUtils;

    @PostMapping("/user/signup")
    public ResponseEntity<?> signup(@RequestBody SignupRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            return ResponseEntity.badRequest().body("Error: Email is already in use!");
        }
        if (userRepository.existsByMobile(request.getMobile())) {
            return ResponseEntity.badRequest().body("Error: Mobile number is already in use!");
        }

        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .mobile(request.getMobile())
                .password(passwordEncoder.encode(request.getPassword()))
                .build();

        userRepository.save(user);
        return ResponseEntity.ok("User registered successfully!");
    }

    @PostMapping("/user/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest request) {
        Optional<User> userOpt = userRepository.findByEmail(request.getEmail());
        if (userOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("Error: Invalid email or password!");
        }

        User user = userOpt.get();
        if (user.getIsBlocked() != null && user.getIsBlocked()) {
            return ResponseEntity.badRequest().body("Error: This account has been blocked by an administrator.");
        }
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            return ResponseEntity.badRequest().body("Error: Invalid email or password!");
        }

        String token = jwtUtils.generateToken(user.getEmail(), "USER");
        return ResponseEntity.ok(new AuthResponse(token, user.getEmail(), "USER", user.getName(), user.getId()));
    }

    @PostMapping("/admin/login")
    public ResponseEntity<?> loginAdmin(@RequestBody LoginRequest request) {
        // 👇 BYPASS RULE: Agar yeh email aur password hai toh direct success token
        // generate hoga
        if ("admin@mishratravels.com".equals(request.getEmail()) && "admin@123".equals(request.getPassword())) {
            String token = jwtUtils.generateToken(request.getEmail(), "ADMIN");
            return ResponseEntity.ok(new AuthResponse(token, request.getEmail(), "ADMIN", "Administrator", 1L));
        }

        // Agar details badalni hon toh yeh backup check database se match karega
        Optional<Admin> adminOpt = adminRepository.findByEmail(request.getEmail());
        if (adminOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("Error: Invalid admin email or password!");
        }

        Admin admin = adminOpt.get();
        if (!passwordEncoder.matches(request.getPassword(), admin.getPassword())) {
            return ResponseEntity.badRequest().body("Error: Invalid admin email or password!");
        }

        String token = jwtUtils.generateToken(admin.getEmail(), "ADMIN");
        return ResponseEntity.ok(new AuthResponse(token, admin.getEmail(), "ADMIN", "Administrator", admin.getId()));
    }
}