package com.group4.auctionsite.entities;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "auction_item")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuctionItem {

    @Id
    @GeneratedValue
    private long id;
    private long userId;
    private long categoryId;

    private String title;
    private long startTime;
    private long endTime;
    private int startPrice;
    private Integer buyNowPrice;
    private int currentViews;
    private String imagePath;

    private String plotSize; // Storing as String based on frontend, consider a better type if possible
    private String plotFacing;
    private String address;
    private String city;
    private String state;
    private String pinCode; // Storing as String
    private String landmarks;
    private String ownershipType;
    private Double latitude;
    private Double longitude;


    public boolean isActive(){
        return this.endTime > new Date().getTime();
    }


    public String toJson(int highestBid, int numberOfBids, boolean winner) {
        return "{" +
                "\"id\":\"" + id + "\", " +
                "\"userId\":\"" + userId + "\", " +
                "\"categoryId\":\"" + categoryId + "\", " +
                "\"title\":\"" + title + "\", " +
                "\"startTime\":\"" + startTime + "\", " +
                "\"endTime\":\"" + endTime + "\", " +
                "\"startPrice\":\"" + startPrice + "\", " +
                "\"buyNowPrice\":\"" + buyNowPrice + "\", " +
                "\"currentViews\":\"" + currentViews + "\", " +
                "\"imagePath\":\"" + imagePath + "\", " +
                "\"plotSize\":\"" + plotSize + "\", " +
                "\"plotFacing\":\"" + plotFacing + "\", " +
                "\"address\":\"" + address + "\", " +
                "\"city\":\"" + city + "\", " +
                "\"state\":\"" + state + "\", " +
                "\"pinCode\":\"" + pinCode + "\", " +
                "\"landmarks\":\"" + landmarks + "\", " +
                "\"ownershipType\":\"" + ownershipType + "\", " +
                "\"latitude\":\"" + latitude + "\", " +
                "\"longitude\":\"" + longitude + "\", " +
                "\"highestBid\":\"" + highestBid + "\", " +
                "\"numberOfBids\":\"" + numberOfBids + "\", " +
                "\"winner\":\"" + winner + "\"" +
                "}";
    }


    public String buyingToJson(int highestBid, int userBid) {
        return "{" +
                "\"id\":\""+this.id+"\", " +
                "\"userId\":\""+this.userId+"\", " +
                "\"title\":\""+this.title+"\", " +
                "\"endTime\":\""+this.endTime+"\", " +
                "\"imagePath\":\""+this.imagePath+"\", " +
                "\"highestBid\":\""+highestBid+"\", " +
                "\"userBid\":\""+userBid+"\"" +
                "}";
    }
}
