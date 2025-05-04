package com.group4.auctionsite.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "user")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue
    private long id;

    private String email;
    private String username;
    private String password;
    private String role;
    private String orgName;
    private String orgNr;
    private String websocketId;


    // prevent leaking password to frontend
    @JsonIgnore
    public String getPassword() {
        return password;
    }

    // enable password from frontend when logging in
    @JsonProperty
    public void setPassword(String password) {
        this.password = password;
    }
}
