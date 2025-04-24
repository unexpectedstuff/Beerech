package com.caltracker.calorie_tracker_api.service;

import com.caltracker.calorie_tracker_api.entity.User;
import com.caltracker.calorie_tracker_api.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;  // For assertions like assertTrue, assertNotNull
import static org.mockito.Mockito.*;  // For mocking behavior with when(...).thenReturn(...)

public class UserServiceTest {

    @Test
    public void testRegisterAndPasswordCheck() {
        // Create a mock of the UserRepository
        UserRepository repo = mock(UserRepository.class);

        // Use a real password encoder (for checking hashing works properly)
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

        // Create the service with mocked repository and real encoder
        UserService service = new UserService(repo, encoder);

        // Input values for the test
        String email = "test@example.com";
        String password = "secure123";
        String name = "Test User";

        // Prepare a fake saved user with hashed password
        User saved = new User(email, encoder.encode(password), name);

        // Mock the behavior of saving and finding a user in the repository
        when(repo.save(any(User.class))).thenReturn(saved);
        when(repo.findByEmail(email)).thenReturn(Optional.of(saved));

        // Act: Register a user with the service
        User registered = service.registerUser(email, password, name, 25, 70.0, 175.0, null, null);

        // Assert: Make sure a user was returned and password can be checked correctly
        assertNotNull(registered);  // Ensure registration didn't return null
        assertTrue(service.checkPassword(registered, password));  // Ensure password check passes
    }
}
