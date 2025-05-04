package com.group4.auctionsite.entities;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "api")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class API {

    @Id
    @GeneratedValue
    private long id;

    private String entity;
    private String method;
    private String url;
    private String template;

}
