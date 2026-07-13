package com.bikedone.usermanagement.service.impl;

import com.bikedone.usermanagement.dto.request.SignupRequest;
import com.bikedone.usermanagement.dto.response.SignupResponse;
import com.bikedone.usermanagement.entity.Role;
import com.bikedone.usermanagement.entity.User;
import com.bikedone.usermanagement.enums.RoleCode;
import com.bikedone.usermanagement.enums.UserStatus;
import com.bikedone.usermanagement.exception.BadRequestException;
import com.bikedone.usermanagement.mapper.UserMapper;
import com.bikedone.usermanagement.repository.RoleRepository;
import com.bikedone.usermanagement.repository.UserRepository;
import com.bikedone.usermanagement.service.AuthService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Transactional
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;

    private final RoleRepository roleRepository;

    private final UserMapper userMapper;

    private final PasswordEncoder passwordEncoder;

    @Override
    public SignupResponse signup(SignupRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new BadRequestException("Email already exists");
        }

        if (userRepository.existsByMobileNumber(request.getMobileNumber())) {
            throw new BadRequestException("Mobile number already exists");
        }

        Role role = roleRepository.findByRoleCode(RoleCode.CUSTOMER)
                .orElseThrow(() -> new BadRequestException("Customer role not found"));

        User user = userMapper.toEntity(request);

        user.setRole(role);

        user.setStatus(UserStatus.ACTIVE);

        user.setEmailVerified(false);

        user.setMobileVerified(false);

        user.setPassword(passwordEncoder.encode(request.getPassword()));

        User savedUser = userRepository.save(user);

        return userMapper.toResponse(savedUser);

    }

}