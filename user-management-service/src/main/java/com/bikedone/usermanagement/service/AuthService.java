package com.bikedone.usermanagement.service;

import com.bikedone.usermanagement.dto.request.SignupRequest;
import com.bikedone.usermanagement.dto.response.SignupResponse;

public interface AuthService {

    SignupResponse signup(SignupRequest request);

}