package com.caltracker.calorie_tracker_api.controller;

import com.caltracker.calorie_tracker_api.dto.LoginRequest;
import com.caltracker.calorie_tracker_api.dto.RegisterRequest;
import com.caltracker.calorie_tracker_api.entity.User;
import com.caltracker.calorie_tracker_api.security.JwtUtil;
import com.caltracker.calorie_tracker_api.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin
public class AuthController {

    private final UserService userService;
    private final JwtUtil jwtUtil;

    public AuthController(UserService userService, JwtUtil jwtUtil) {
        this.userService = userService;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        if (userService.findByEmail(request.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("User already exists");
        }

        User user = userService.registerUser(request.getEmail(), request.getPassword(), request.getName());
        String token = jwtUtil.generateToken(user.getEmail());
        return ResponseEntity.ok().body(token);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        return userService.findByEmail(request.getEmail())
                .filter(user -> userService.checkPassword(user, request.getPassword()))
                .map(user -> ResponseEntity.ok().body(jwtUtil.generateToken(user.getEmail())))
                .orElse(ResponseEntity.status(401).body("Invalid credentials"));
    }
}
