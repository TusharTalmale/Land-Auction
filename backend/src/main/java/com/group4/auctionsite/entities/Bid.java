package com.group4.auctionsite.entities;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "bid")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Bid {

    @Id
    @GeneratedValue
    private long id;
    private long itemId;
    private long userId;
    private int bid;
    @Column(name = "curr_time")
    private Long currTime;

    public Bid(long itemId, long userId, int bid) {
        this.itemId = itemId;
        this.userId = userId;
        this.bid = bid;
        this.currTime = System.currentTimeMillis();
    }
    public Bid(long itemId, long userId, int bid,long currTime) {
        this.itemId = itemId;
        this.userId = userId;
        this.bid = bid;
        this.currTime = currTime;
    }

}