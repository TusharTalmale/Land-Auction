package com.group4.auctionsite.services;


import com.group4.auctionsite.entities.Bid;
import com.group4.auctionsite.repositories.BidRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.*;
@Service
public class BidService {
    @Autowired
    BidRepository bidRepository;

    public List<Bid> getAllBids() {
        return bidRepository.findAll();
    }

    public Bid createBid(Bid bid) {
        return bidRepository.save(bid);
    }

}
