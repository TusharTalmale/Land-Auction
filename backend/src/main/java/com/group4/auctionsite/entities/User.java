package com.group4.auctionsite.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

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


    // --- New Profile Fields from Frontend ---
    private String fullName;
    private String phone;
    private String gender;
    private Integer age; // Use Integer to allow null
    private String occupation;
    private String maritalStatus;
    private String fatherName;
    private String motherName;

    private String street;
    private String city;
    private String state;
    private String postalCode;
    private String country;


    private String profileImageUrl;

    // Bio
    @Column(columnDefinition = "TEXT") // Use TEXT for potentially longer bios
    private String bio;

    public void updateProfileFields(User source) {
        this.fullName = source.fullName;
        this.phone = source.phone;
        this.gender = source.gender;
        this.age = source.age;
        this.occupation = source.occupation;
        this.maritalStatus = source.maritalStatus;
        this.fatherName = source.fatherName;
        this.motherName = source.motherName;
        this.street = source.street;
        this.city = source.city;
        this.state = source.state;
        this.postalCode = source.postalCode;
        this.country = source.country;

        if (source.profileImageUrl != null) {
            this.profileImageUrl = source.profileImageUrl;
        }
        this.bio = source.bio;


    }


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
