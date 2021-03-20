package com.github.rshtishi.backend.service;

import com.github.rshtishi.backend.dto.AuthenticationRequest;
import com.github.rshtishi.backend.dto.AuthenticationResponse;
import com.github.rshtishi.backend.dto.RefreshTokenRequest;
import com.github.rshtishi.backend.security.JwtProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.Instant;

@Service
public class AuthenticationService {

    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtProvider jwtProvider;

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = jwtProvider.generateToken(authentication);
        return AuthenticationResponse.builder()
                .authenticationToken(token)
                .username(request.getUsername())
                //.refreshToken(refreshTokenService.generateRefreshToken().getToken)
                .expireAt(Instant.now().plusMillis(jwtProvider.getJwtExpirationInMillis())).build();
    }

    public AuthenticationResponse refreshToken(RefreshTokenRequest request) {
        throw new UnsupportedOperationException("Not implemented");
    }

    public boolean isLoggedIn() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return !(authentication instanceof AnonymousAuthenticationToken) && authentication.isAuthenticated();
    }
}
