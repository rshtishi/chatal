package com.github.rshtishi.backend.security;

import org.springframework.context.annotation.Primary;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Primary
@Service
public class InMemoryUserDetailService implements UserDetailsService {

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        List<String> users = Arrays.asList("rando", "ema", "guest");
        if (users.contains(username)) {
            String password = new BCryptPasswordEncoder().encode((CharSequence) "test");
            List<GrantedAuthority> authorities = Arrays.asList(new SimpleGrantedAuthority("USER"));
            return new User(username, password, authorities);
        }
        throw new UsernameNotFoundException("User not found with username: " + username);
    }
}
