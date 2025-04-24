package com.caltracker.calorie_tracker_api.service;

import com.caltracker.calorie_tracker_api.entity.User;
import com.caltracker.calorie_tracker_api.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class UserServiceTest {

    @Test
    public void testRegisterAndPasswordCheck() {
        UserRepository repo = mock(UserRepository.class);
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        UserService service = new UserService(repo, encoder);

        String email = "test@example.com";
        String password = "secure123";
        String name = "Test User";

        User saved = new User(email, encoder.encode(password), name);
        when(repo.save(any(User.class))).thenReturn(saved);
        when(repo.findByEmail(email)).thenReturn(Optional.of(saved));

        User registered = service.registerUser(email, password, name, 25, 70.0, 175.0, null);

        assertNotNull(registered);
        assertTrue(service.checkPassword(registered, password));
    }
}
