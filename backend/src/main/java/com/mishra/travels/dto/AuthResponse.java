package com.mishra.travels.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AuthResponse {
    private String token;
    private String email;
    private String role; // USER or ADMIN
    private String name;
    private Long id;
}
