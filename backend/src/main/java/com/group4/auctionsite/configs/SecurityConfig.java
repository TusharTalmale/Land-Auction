package com.group4.auctionsite.configs;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
  
  @Autowired
  private MyUserDetailsService myUserDetailsService;
  
  @Override
  protected void configure(HttpSecurity http) throws Exception {
    http
        .csrf().disable()
        .authorizeRequests()
        .antMatchers(HttpMethod.GET, "/", "/rest/**").permitAll()
        .antMatchers(HttpMethod.POST, "/login").permitAll().antMatchers(HttpMethod.POST, "/api/login", "/rest/user").permitAll() // Allow registration and login
// doesn't require login
        .antMatchers("/auth/**").permitAll()     // doesn't require login
        .antMatchers("/rest/**").permitAll()
            .antMatchers("/api/admin/**").hasRole("ADMIN")

            .antMatchers(HttpMethod.OPTIONS, "/**").permitAll() // Allow CORS preflight requests
            .anyRequest().authenticated() // All other requests need authentication
            .and()
            .formLogin().disable() // We are using a custom login endpoint
            .httpBasic().disable()
        //.antMatchers("/buying").authenticated() // user is logged in
    ;
  }
  
  @Override
  public void configure(AuthenticationManagerBuilder auth) throws Exception {
    auth
        .userDetailsService(myUserDetailsService)
        .passwordEncoder(myUserDetailsService.getEncoder());
  }
  
  // if using custom login:
  @Bean("authenticationManager")
  @Override
  public AuthenticationManager authenticationManagerBean() throws Exception {
    return super.authenticationManagerBean();
  }
}