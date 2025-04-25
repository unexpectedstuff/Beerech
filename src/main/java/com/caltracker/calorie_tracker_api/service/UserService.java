package com.caltracker.calorie_tracker_api.service;

import com.caltracker.calorie_tracker_api.dto.UpdateProfileRequest;
import com.caltracker.calorie_tracker_api.entity.Gender;
import com.caltracker.calorie_tracker_api.entity.Goal;
import com.caltracker.calorie_tracker_api.entity.User;
import com.caltracker.calorie_tracker_api.repository.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;

	public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
		this.userRepository = userRepository;
		this.passwordEncoder = passwordEncoder;
	}

	public Optional<User> findByEmail(String email) {
		// Look up user by email in the database
		return userRepository.findByEmail(email);
	}

	public User registerUser(String email, String rawPassword, String name) {
	    // Hash the password before saving (for security purposes)
	    String hashedPassword = passwordEncoder.encode(rawPassword);

	    // Create a new user with email, hashed password, and name
	    User user = new User(email, hashedPassword, name);

	    // Other profile fields (age, weight, goal, gender, etc.) 
	    // can be filled in later through profile updates

	    // Save the user to the database
	    return userRepository.save(user);
	}

	//override in case we will have signup with complete profile
	public User registerUser(String email, String rawPassword, String name, Integer age, Double weight, Double height,
			Gender gender, Goal goal) {
		// Encode (hash) the password before saving it
		String hashedPassword = passwordEncoder.encode(rawPassword);

		// Create a new user with basic data
		User user = new User(email, hashedPassword, name);

		// Set optional fields
		user.setAge(age);
		user.setWeight(weight);
		user.setHeight(height);
		user.setGoal(goal);
		user.setGender(gender);

		// Save the user in the database
		return userRepository.save(user);
	}

	public boolean checkPassword(User user, String rawPassword) {
		// Compare raw password with the hashed one stored in the database
		return passwordEncoder.matches(rawPassword, user.getPassword());
	}

	public User getCurrentUser() {
		// Get authentication object from Spring Security context
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();

		// If there's no logged-in user or the object is not a User instance, return null
		if (auth == null || !(auth.getPrincipal() instanceof User)) {
			return null;
		}

		// Cast and return the logged-in user
		return (User) auth.getPrincipal();
	}

	// ✅ New method to update user's profile info
	public User updateUserProfile(UpdateProfileRequest request) {
		User user = getCurrentUser();
		if (user == null) {
			// If no one is logged in, return null
			return null;
		}


	    // debug - delete this
	    System.out.println("⬇️ Incoming profile update request:");
	    System.out.println("Name: " + request.getName());
	    System.out.println("Gender: " + request.getGender());
	    System.out.println("Goal: " + request.getGoal());
	    System.out.println("Age: " + request.getAge());
	    System.out.println("Weight: " + request.getWeight());
	    System.out.println("Height: " + request.getHeight());
		
		// Update user's profile data from the request DTO
		user.setName(request.getName());
		user.setAge(request.getAge());
		user.setWeight(request.getWeight());
		user.setHeight(request.getHeight());
		user.setGoal(request.getGoal());
		user.setGender(request.getGender());
		user.setCalorieTarget(request.getCalorieTarget());


	    // debug before save
	    System.out.println("⬇️ Final user entity before saving:");
	    System.out.println("Gender in User: " + user.getGender());
	    System.out.println("Goal in User: " + user.getGoal());
	    
		
		// Save changes to the database
		return userRepository.save(user);
	}
}
