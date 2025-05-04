package com.group4.auctionsite.services;
import com.group4.auctionsite.configs.MyUserDetailsService;


import com.group4.auctionsite.entities.User;
import com.group4.auctionsite.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;


import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.List;
import java.util.Optional;

import static org.springframework.security.web.context.HttpSessionSecurityContextRepository.SPRING_SECURITY_CONTEXT_KEY;

@Service
public class UserService {
   @Autowired
   private UserRepository userRepository;
    @Autowired
    private MyUserDetailsService myUserDetailsService;

    public List<User> getAllUsers(){
        return userRepository.findAll();
    }

    public Optional<User> getById(long id) {
        return userRepository.findById(id);
    }

   // public User createUser(User user) {
   //     return userRepository.save(user);
   // }




    // bean from your SecurityConfig
    @Resource(name="authenticationManager")
    private AuthenticationManager authManager;

    public User findCurrentUser() {
        // the login session is stored between page reloads,
        // and we can access the current authenticated user with this
        String userEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        System.out.println("findCurrentUser(): " + userEmail);
        return userRepository.findByEmail(userEmail);
    }

    public User createUser(User user) {
        // user userDetailsService to save new user
        // because we encrypt the password here
        return myUserDetailsService.addUser(user);
    }

    public User login(User user, HttpServletRequest req) {
        System.out.println("login(): " + user.getEmail());
        try {
            // Let Spring Security handle authentication of credentials
            UsernamePasswordAuthenticationToken authReq
                    = new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword());
            Authentication auth = authManager.authenticate(authReq);

            // Add logged in user to sessions
            SecurityContext sc = SecurityContextHolder.getContext();
            sc.setAuthentication(auth);

            // Set cookie to remember logged in user
            HttpSession session = req.getSession(true);
            session.setAttribute(SPRING_SECURITY_CONTEXT_KEY, sc);

        } catch(BadCredentialsException err) {
            // throw error on bad credentials
            throw new BadCredentialsException("Bad Credentials");
        }

        return findCurrentUser();
    }
}
