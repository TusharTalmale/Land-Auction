package com.group4.auctionsite.entities;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "notification")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Notification {

    @Id
    @GeneratedValue
    private long id;

    private long itemId;
    private long messageId;
    private long userId;

    public Notification(long itemId, long userId) {
        this.itemId = itemId;
        this.userId = userId;
    }

    public Notification(long itemId, long userId, long messageId) {
        this.itemId = itemId;
        this.userId = userId;
        this.messageId= messageId;
    }

}
