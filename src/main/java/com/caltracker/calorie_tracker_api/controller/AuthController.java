package com.caltracker.calorie_tracker_api.controller;

import com.caltracker.calorie_tracker_api.dto.LoginRequest;
import com.caltracker.calorie_tracker_api.dto.RegisterRequest;
import com.caltracker.calorie_tracker_api.entity.User;
import com.caltracker.calorie_tracker_api.security.JwtUtil;
import com.caltracker.calorie_tracker_api.service.UserService;

import jakarta.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;

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
	public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest request) {
	    if (userService.findByEmail(request.getEmail()).isPresent()) {
	        return ResponseEntity.badRequest().body("User already exists");
	    }
	    User user = userService.registerUser(
	        request.getEmail(),
	        request.getPassword(),
	        request.getName(),
	        request.getAge(),
	        request.getWeight(),
	        request.getHeight(),
	        request.getGender(),   
	        request.getGoal()
	    );
	    String token = jwtUtil.generateToken(user.getEmail());
	    return ResponseEntity.ok(Collections.singletonMap("token", token));
	}

	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody LoginRequest request) {
		return userService.findByEmail(request.getEmail())
				// Check if user exists and password is correct
				// If not, skip to orElse below
				.filter(user -> userService.checkPassword(user, request.getPassword()))

				// If user exists and password is OK → create token and send it back
				.map(user -> {
					String token = jwtUtil.generateToken(user.getEmail()); // generate JWT token
					return ResponseEntity.ok(Collections.singletonMap("token", token)); // return token in response body
				})

				// If user not found OR password wrong → return 401 Unauthorized
				.orElse(ResponseEntity.status(401).body(Collections.singletonMap("error", "Invalid credentials")));
	}
}
