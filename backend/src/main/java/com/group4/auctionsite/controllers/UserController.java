package com.group4.auctionsite.controllers;
import com.group4.auctionsite.entities.User;
import com.group4.auctionsite.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("rest/user")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/{id}")
    public Optional<User> getUserById(@PathVariable long id) {
        return userService.getById(id);
    }

    @PostMapping
    public User createUser(@RequestBody User user) {
        return userService.createUser(user);
    }

    @PutMapping("/profile")
    public ResponseEntity<User> updateCurrentUserProfile(@RequestBody User updatedUser) {
        try {

            User savedUser = userService.updateCurrentUserProfile(updatedUser);
            System.out.println(updatedUser);

            return ResponseEntity.ok(savedUser);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        } catch (Exception e) {
            System.err.println("Error updating user profile: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

}
