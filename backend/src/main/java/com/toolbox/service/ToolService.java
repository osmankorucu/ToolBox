package com.toolbox.service;

import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class ToolService {

    public String formatJson(String json) {
        try {
            Object obj = new com.fasterxml.jackson.databind.ObjectMapper().readValue(json, Object.class);
            return new com.fasterxml.jackson.databind.ObjectMapper().writerWithDefaultPrettyPrinter().writeValueAsString(obj);
        } catch (Exception e) {
            throw new RuntimeException("Invalid JSON: " + e.getMessage());
        }
    }

    public String minifyJson(String json) {
        try {
            Object obj = new com.fasterxml.jackson.databind.ObjectMapper().readValue(json, Object.class);
            return new com.fasterxml.jackson.databind.ObjectMapper().writeValueAsString(obj);
        } catch (Exception e) {
            throw new RuntimeException("Invalid JSON: " + e.getMessage());
        }
    }

    public String encodeBase64(String input) {
        return java.util.Base64.getEncoder().encodeToString(input.getBytes());
    }

    public String decodeBase64(String input) {
        return new String(java.util.Base64.getDecoder().decode(input));
    }

    public String generateUuid() {
        return UUID.randomUUID().toString();
    }

    public String generateMultipleUuids(int count) {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < count; i++) {
            if (i > 0) sb.append("\n");
            sb.append(UUID.randomUUID().toString());
        }
        return sb.toString();
    }

    public String generatePassword(int length, boolean includeUppercase, boolean includeLowercase, boolean includeNumbers, boolean includeSpecial) {
        String chars = "";
        if (includeUppercase) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        if (includeLowercase) chars += "abcdefghijklmnopqrstuvwxyz";
        if (includeNumbers) chars += "0123456789";
        if (includeSpecial) chars += "!@#$%^&*()_+-=[]{}|;:,.<>?";
        
        if (chars.isEmpty()) chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        
        java.security.SecureRandom random = new java.security.SecureRandom();
        StringBuilder password = new StringBuilder();
        for (int i = 0; i < length; i++) {
            password.append(chars.charAt(random.nextInt(chars.length())));
        }
        return password.toString();
    }
}
