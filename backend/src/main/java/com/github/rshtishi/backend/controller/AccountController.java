package com.github.rshtishi.backend.controller;

import com.github.rshtishi.backend.dto.AccountDto;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/account")
public class AccountController {

    @RequestMapping("/{user}/details")
    public AccountDto accountDetails(@PathVariable String user) {
        return AccountDto.builder().username(user).firstname(user).lastname(user).build();
    }
}
