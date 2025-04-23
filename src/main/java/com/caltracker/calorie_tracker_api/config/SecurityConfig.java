package com.caltracker.calorie_tracker_api.config;

import org.springframework.context.annotation.Bean;  // We import Bean to define beans in the Spring context
import org.springframework.context.annotation.Configuration;  // We import Configuration to mark this class as a configuration class
import org.springframework.security.config.annotation.web.builders.HttpSecurity;  // We import HttpSecurity to configure security for HTTP requests
import org.springframework.security.web.SecurityFilterChain;  // We import SecurityFilterChain to define security filters for the application

@Configuration  // This annotation tells Spring that this class contains configuration settings
public class SecurityConfig {

    // This method sets up security rules for the application
    @Bean  // This annotation tells Spring to treat this method as a bean, so it will be used in the application context
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            // Disable CSRF (Cross-Site Request Forgery) protection for simplicity in this example
            .csrf(csrf -> csrf.disable())  
            
            // Set authorization rules for HTTP requests
            .authorizeHttpRequests(auth -> auth
                // Allow all requests without any authentication (for example, public access to all pages)
                .anyRequest().permitAll()  
            );
        // Return the configured SecurityFilterChain
        return http.build();
    }
}
