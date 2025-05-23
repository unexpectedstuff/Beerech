package com.caltracker.calorie_tracker_api.controller;

import com.caltracker.calorie_tracker_api.dto.UpdateProfileRequest;
import com.caltracker.calorie_tracker_api.dto.UserProfileDTO;
import com.caltracker.calorie_tracker_api.entity.User;
import com.caltracker.calorie_tracker_api.service.UserService;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@CrossOrigin
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PutMapping("/profile")
    public ResponseEntity<?> updateProfile(@Valid @RequestBody UpdateProfileRequest request) {
        User updated = userService.updateUserProfile(request);
        if (updated == null) {
            return ResponseEntity.status(401).body("Unauthorized");
        }
        return ResponseEntity.ok().body("Profile updated successfully");
    }

    @GetMapping("/profile")
    public ResponseEntity<?> getProfile() {
        User currentUser = userService.getCurrentUser();
        if (currentUser == null) {
            return ResponseEntity.status(401).body("Unauthorized");
        }

        return ResponseEntity.ok().body(new UserProfileDTO(
                currentUser.getId(),
                currentUser.getEmail(),
                currentUser.getName(),
                currentUser.getAge(),
                currentUser.getWeight(),
                currentUser.getHeight(),
                currentUser.getGender(),
                currentUser.getGoal(),
                currentUser.getCalorieTarget(),
                currentUser.getActivityLevel()
        ));
    }
}
