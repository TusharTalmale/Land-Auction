package com.group4.auctionsite.entities;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "message")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Message {

    @Id
    @GeneratedValue
    private long id;

    private long senderId;
    private long receiverId;
    private long timestamp;
    private long itemId;
    private String messageContent;


    public String toJson(AuctionItem obj, String username){

        return "{" +
                "\"id\":\""+this.id+"\", " +
                "\"receiverId\":\""+this.receiverId+"\", " +
                "\"senderId\":\""+this.senderId+"\", " +
                "\"timestamp\":"+this.timestamp+", " +
                "\"itemId\":\""+this.itemId+"\", " +
                "\"messageContent\":\""+this.messageContent+"\", " +
                "\"title\":\""+obj.getTitle()+"\", " +
                "\"imagePath\":\""+obj.getImagePath()+"\", " +
                "\"username\":\""+username+"\" " +
                "}";

    };


}
