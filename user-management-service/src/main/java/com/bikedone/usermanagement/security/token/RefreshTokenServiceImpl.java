package com.bikedone.usermanagement.security.token;

import com.bikedone.usermanagement.common.datetime.DateTimeProvider;
import com.bikedone.usermanagement.config.JwtProperties;
import com.bikedone.usermanagement.entity.RefreshToken;
import com.bikedone.usermanagement.entity.User;
import com.bikedone.usermanagement.exception.BadRequestException;
import com.bikedone.usermanagement.repository.RefreshTokenRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Clock;
import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class RefreshTokenServiceImpl implements RefreshTokenService {

    private final RefreshTokenRepository refreshTokenRepository;

    private final RefreshTokenGenerator refreshTokenGenerator;

    private final TokenHasher tokenHasher;

    private final JwtProperties jwtProperties;
    private final Clock appClock;
    private final DateTimeProvider dateTimeProvider;

    @Override
    public RefreshTokenResult createRefreshToken(User user) {

        // Generate raw refresh token
        String rawToken = refreshTokenGenerator.generate();

        // Hash before storing
        String tokenHash = tokenHasher.hash(rawToken);

        RefreshToken refreshToken = new RefreshToken();
        refreshToken.setUser(user);
        refreshToken.setTokenHash(tokenHash);
        refreshToken.setRevoked(false);

        // Expiry from application.yml
        refreshToken.setExpiresAt(
                dateTimeProvider.now()
                        .plusSeconds(jwtProperties.getRefreshTokenExpiration() / 1000)
        );

        RefreshToken savedToken = refreshTokenRepository.save(refreshToken);

        return new RefreshTokenResult(
                rawToken,
                savedToken
        );
    }

    @Override
    public RefreshToken validateRefreshToken(String rawToken) {

        String tokenHash = tokenHasher.hash(rawToken);

        RefreshToken refreshToken = refreshTokenRepository
                .findByTokenHashAndRevokedFalse(tokenHash)
                .orElseThrow(() ->
                        new BadRequestException("Invalid refresh token."));

        if (refreshToken.isExpired(LocalDateTime.now(appClock))) {
            throw new BadRequestException("Refresh token has expired.");
        }

        refreshToken.markAsUsed(LocalDateTime.now(appClock));

        return refreshTokenRepository.save(refreshToken);
    }

    @Override
    public void revokeToken(RefreshToken refreshToken) {

        refreshToken.revoke(LocalDateTime.now(appClock));

        refreshTokenRepository.save(refreshToken);
    }

    @Override
    public void revokeAllUserTokens(UUID userId) {

        refreshTokenRepository
                .findAllByUser_IdAndRevokedFalse(userId)
                .forEach(token -> {

                    token.revoke(LocalDateTime.now(appClock));

                    refreshTokenRepository.save(token);

                });
    }
}