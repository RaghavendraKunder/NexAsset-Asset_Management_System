package com.NexAsset.NexAsset_backend.service.impl;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.NexAsset.NexAsset_backend.dto.LoginRequest;
import com.NexAsset.NexAsset_backend.dto.LoginResponse;
import com.NexAsset.NexAsset_backend.dto.RegisterRequest;
import com.NexAsset.NexAsset_backend.entity.User;
import com.NexAsset.NexAsset_backend.enums.UserRole;
import com.NexAsset.NexAsset_backend.repository.UserRepository;
import com.NexAsset.NexAsset_backend.config.JwtService;
import com.NexAsset.NexAsset_backend.service.AuthService;

@Service
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthServiceImpl(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService,
            AuthenticationManager authenticationManager) {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
    }


    // =========================================================
    // LOGIN
    // =========================================================

    @Override
    public LoginResponse login(LoginRequest request) {

        Authentication authentication =
                authenticationManager.authenticate(
                        new UsernamePasswordAuthenticationToken(
                                request.getEmail(),
                                request.getPassword()
                        )
                );

        UserDetails userDetails =
                (UserDetails) authentication.getPrincipal();

        User user =
                userRepository.findByEmail(request.getEmail())
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "User not found"
                                )
                        );

        String token =
                jwtService.generateToken(userDetails);

        return new LoginResponse(
                token,
                "Bearer",
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRole().name()
        );
    }


    // =========================================================
    // REGISTER
    // =========================================================

    @Override
    public LoginResponse register(RegisterRequest request) {

        // -----------------------------------------------------
        // Check duplicate email
        // -----------------------------------------------------

        if (userRepository.existsByEmail(request.getEmail())) {

            throw new RuntimeException(
                    "Email is already registered"
            );
        }


        // -----------------------------------------------------
        // Check password confirmation
        // -----------------------------------------------------

        if (!request.getPassword()
                .equals(request.getConfirmPassword())) {

            throw new RuntimeException(
                    "Passwords do not match"
            );
        }


        // -----------------------------------------------------
        // Create User
        // -----------------------------------------------------

        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(
                        passwordEncoder.encode(
                                request.getPassword()
                        )
                )
                .role(UserRole.EMPLOYEE)
                .enabled(true)
                .build();


        // -----------------------------------------------------
        // Save User
        // -----------------------------------------------------

        User savedUser =
                userRepository.save(user);


        // -----------------------------------------------------
        // Generate JWT
        // -----------------------------------------------------

        UserDetails userDetails =
                org.springframework.security.core.userdetails.User
                        .withUsername(savedUser.getEmail())
                        .password(savedUser.getPassword())
                        .roles(savedUser.getRole().name())
                        .disabled(!savedUser.getEnabled())
                        .build();

        String token =
                jwtService.generateToken(userDetails);


        // -----------------------------------------------------
        // Return response
        // -----------------------------------------------------

        return new LoginResponse(
                token,
                "Bearer",
                savedUser.getId(),
                savedUser.getName(),
                savedUser.getEmail(),
                savedUser.getRole().name()
        );
    }
}