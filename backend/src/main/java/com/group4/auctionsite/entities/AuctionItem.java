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
    private String description;
    private String title;
    private long startTime;
    private long endTime;
    private int startPrice;
    private Integer buyNowPrice;
    private int currentViews;
    private String imagePath;


    private boolean isActive(){
        return this.endTime > new Date().getTime();
    }

    public String toJson(int highestBid, int numberOfBids, boolean winner) {
        return "{" +
                "\"id\":\""+this.id+"\", " +
                "\"userId\":\""+this.userId+"\", " +
                "\"categoryId\":\""+this.categoryId+"\", " +
                "\"description\":\""+this.description+"\", " +
                "\"title\":\""+this.title+"\", " +
                "\"startTime\":\""+this.startTime+"\", " +
                "\"endTime\":\""+this.endTime+"\", " +
                "\"startPrice\":\""+this.startPrice+"\", " +
                "\"buyNowPrice\":\""+this.buyNowPrice+"\", " +
                "\"currentViews\":\""+this.currentViews+"\", " +
                "\"imagePath\":\""+this.imagePath+"\", " +
                "\"highestBid\":\""+highestBid+"\", " +
                "\"numberOfBids\":\""+numberOfBids+"\", " +
                "\"winner\":\""+winner+"\"" +
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
