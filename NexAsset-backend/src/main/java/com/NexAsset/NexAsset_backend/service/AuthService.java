package com.NexAsset.NexAsset_backend.service;

import com.NexAsset.NexAsset_backend.dto.LoginRequest;
import com.NexAsset.NexAsset_backend.dto.LoginResponse;
import com.NexAsset.NexAsset_backend.dto.RegisterRequest;

public interface AuthService {

    LoginResponse login(LoginRequest request);

    LoginResponse register(RegisterRequest request);
}