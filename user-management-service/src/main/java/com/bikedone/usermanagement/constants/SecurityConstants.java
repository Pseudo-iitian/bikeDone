package com.bikedone.usermanagement.constants;

public final class SecurityConstants {

    private SecurityConstants() {}

    public static final String[] PUBLIC_URLS = {
            "/api/v1/auth/**",
            "/swagger-ui/**",
            "/swagger-ui.html",
            "/v3/api-docs/**",
            "/actuator/**"
    };
}