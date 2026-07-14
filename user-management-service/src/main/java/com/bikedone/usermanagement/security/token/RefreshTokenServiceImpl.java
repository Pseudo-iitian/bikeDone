package com.bikedone.usermanagement.security.token;

import com.bikedone.usermanagement.config.JwtProperties;
import com.bikedone.usermanagement.entity.RefreshToken;
import com.bikedone.usermanagement.entity.User;
import com.bikedone.usermanagement.repository.RefreshTokenRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class RefreshTokenServiceImpl implements RefreshTokenService {

    private final RefreshTokenRepository refreshTokenRepository;

    private final RefreshTokenGenerator refreshTokenGenerator;

    private final TokenHasher tokenHasher;

    private final JwtProperties jwtProperties;

    @Override
    public RefreshTokenResult createRefreshToken(User user) {

        // Generate raw refresh token
        String rawToken = refreshTokenGenerator.generate();

        // Hash the token before storing in DB
        String tokenHash = tokenHasher.hash(rawToken);

        // Create entity
        RefreshToken refreshToken = new RefreshToken();
        refreshToken.setUser(user);
        refreshToken.setTokenHash(tokenHash);
        refreshToken.setRevoked(false);

        // Expiry from configuration (milliseconds -> seconds)
        refreshToken.setExpiresAt(
                LocalDateTime.now().plusSeconds(
                        jwtProperties.getRefreshTokenExpiration() / 1000
                )
        );

        // Save hashed token
        refreshTokenRepository.save(refreshToken);

        // Return raw token to client + entity
        return new RefreshTokenResult(
                rawToken,
                refreshToken
        );
    }
}