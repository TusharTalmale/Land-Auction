package com.group4.auctionsite.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class BidWithUserInfo {
    private long bidId;
    private int bidAmount;
    private long bidTime;
    private long userId;
    private String username;
    private String fullName;
    private String email;
    private String phone;
    private String websocketId;
}