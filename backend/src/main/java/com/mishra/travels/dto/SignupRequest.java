package com.mishra.travels.dto;

import lombok.Data;

@Data
public class SignupRequest {
    private String name;
    private String mobile;
    private String email;
    private String password;
}
