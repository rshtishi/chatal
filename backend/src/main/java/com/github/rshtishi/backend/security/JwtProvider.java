package com.github.rshtishi.backend.security;

import com.github.rshtishi.backend.exceptions.ChatalException;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.io.InputStream;
import java.security.*;
import java.security.cert.CertificateException;
import java.time.Instant;
import java.util.Date;


@Service
public class JwtProvider {

    private KeyStore keyStore;
    @Getter
    @Value("${jwt.expiration.time}")
    private Long jwtExpirationInMillis;

    @PostConstruct
    public void init() {
        try {
            keyStore = KeyStore.getInstance("JKS");
            InputStream resourceAsStream = getClass().getResourceAsStream("/chatal.jks");
            keyStore.load(resourceAsStream, "changeit".toCharArray());
        } catch (KeyStoreException | IOException | NoSuchAlgorithmException | CertificateException e) {
            e.printStackTrace();
        }
    }

    private PrivateKey getPrivateKey() {
        try {
            return (PrivateKey) keyStore.getKey("chatal-alias", "changeit".toCharArray());
        } catch (KeyStoreException | NoSuchAlgorithmException | UnrecoverableKeyException e) {
            throw new ChatalException("Exception occured while retrieving private key from keystore", e);
        }
    }

    private PublicKey getPublicKey() {
        try {
            return keyStore.getCertificate("chatal-alias").getPublicKey();
        } catch (KeyStoreException e) {
            throw new ChatalException("Exception occured while retrieving public key from keystore", e);
        }
    }

    public boolean validateJwtToken(String jwtToken) {
        Jwts.parser().setSigningKey(getPublicKey()).parseClaimsJwt(jwtToken);
        return true;
    }

    public String getUsernameFromJwtToken(String jwtToken) {
        Claims claims = Jwts.parser().setSigningKey(getPublicKey()).parseClaimsJwt(jwtToken).getBody();
        return claims.getSubject();
    }

    public String generateToken(Authentication authentication) {
        User principal = (User) authentication.getPrincipal();
        return generateToken(principal.getUsername());
    }

    public String generateToken(String username) {
        return Jwts.builder().setSubject(username)
                .setIssuedAt(Date.from(Instant.now()))
                .signWith(getPrivateKey())
                .setExpiration(Date.from(Instant.now().plusMillis(jwtExpirationInMillis))).compact();
    }
}
