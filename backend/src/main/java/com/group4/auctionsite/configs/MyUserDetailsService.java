package com.group4.auctionsite.configs;

import com.group4.auctionsite.entities.User;
import com.group4.auctionsite.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import javax.annotation.PostConstruct;

@Configuration
public class MyUserDetailsService implements UserDetailsService {

    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
    public BCryptPasswordEncoder getEncoder() { return encoder; }

    @Autowired
    private UserRepository userRepo;

    // remove default user in production
    @PostConstruct
    private void createDefaultUsers(){
        if (userRepo.findByEmail("jack@gmail.com") == null) {
            User user = User.builder()
                    .email("jack@gmail.com")
                    .username("jack")
                    .password("123")
                    .role("private")
                    .build();
            addUser(user);
        }
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepo.findByEmail(email);
        if (user == null) {
            throw new UsernameNotFoundException("User not found by name: " + email);
        }
        return toUserDetails(user);
    }

    public User addUser(User user){
        user.setPassword(encoder.encode(user.getPassword()));
        try {
            return userRepo.save(user);
        } catch (Exception ex) {
            System.out.println("Whats this?..");
            // try to get the error later
            ex.getCause();
            ex.printStackTrace();
        }
        return null;
    }

    private UserDetails toUserDetails(User user) {
        // If you have a User entity you have to
        // use the userdetails User for this to work
        return org.springframework.security.core.userdetails.User
                .withUsername(user.getEmail())
                .password(user.getPassword())
                .roles("USER").build();
    }
}