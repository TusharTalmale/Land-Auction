package com.group4.auctionsite.controllers;

import com.group4.auctionsite.entities.User;
import com.group4.auctionsite.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api")
public class LoginController {
  
  @Autowired
  private UserService userService;
  
  @PostMapping("/login")
  public User login(@RequestBody User user, HttpServletRequest req) {
    return userService.login(user, req);
  }
  
  @PostMapping("/register")
  public User register(@RequestBody User user) {
    return userService.createUser(user);
  }
  
  @GetMapping("/whoami")
  public User whoAmI() {
    return userService.findCurrentUser();
  }
}
