package com.anndaan.backend.payload;

import lombok.Data;

@Data
public class OtpRequest {
    private String email;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
} 