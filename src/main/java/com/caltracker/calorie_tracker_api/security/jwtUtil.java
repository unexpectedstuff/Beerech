package com.caltracker.calorie_tracker_api.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {

    private static final long EXPIRATION_MS = 1000 * 60 * 60 * 24; // 24 hours in milliseconds
    // I guess this is the secret key used to sign the token? It's auto-generated here
    private final Key secretKey = Keys.secretKeyFor(SignatureAlgorithm.HS256);

    public String generateToken(String email) {
        return Jwts.builder()
                .setSubject(email) // I think this sets the user's email as the "subject" of the token?
                .setIssuedAt(new Date()) // token creation time
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_MS)) // token expires in 24 hours
                .signWith(secretKey) // sign the token with our secret key
                .compact(); // finish and return the token as a string
    }

    public String extractEmail(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(secretKey) // use the same secret key to validate the token
                .build()
                .parseClaimsJws(token) // this parses and also checks the token's validity
                .getBody()
                .getSubject(); // I think this gets back the email from the token
    }

    public boolean isValid(String token) {
        try {
            Jwts.parserBuilder()
                .setSigningKey(secretKey)
                .build()
                .parseClaimsJws(token); // if this doesn't throw an error, the token is good
            return true;
        } catch (JwtException e) {
            // something went wrong — probably the token is expired or tampered with?
            return false;
        }
    }
}
