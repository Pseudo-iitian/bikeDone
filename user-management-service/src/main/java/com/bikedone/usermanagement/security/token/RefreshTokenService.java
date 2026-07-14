package com.bikedone.usermanagement.security.token;

import com.bikedone.usermanagement.entity.RefreshToken;
import com.bikedone.usermanagement.entity.User;

public interface RefreshTokenService {

    RefreshTokenResult createRefreshToken(User user);
}