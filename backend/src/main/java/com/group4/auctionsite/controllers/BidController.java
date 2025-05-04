package com.group4.auctionsite.controllers;

import com.group4.auctionsite.entities.AuctionItem;
import com.group4.auctionsite.entities.User;
import com.group4.auctionsite.services.AuctionItemService;
import com.group4.auctionsite.services.BidService;
import com.group4.auctionsite.services.UserService;
import com.group4.auctionsite.springSocket.socket.SocketModule;
import com.group4.auctionsite.utils.ObjectMapperHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bid")
public class BidController {

    @Autowired
    private BidService bidService;
    @Autowired
    private AuctionItemService auctionItemService;
    @Autowired
    private UserService userService;
    @Autowired
    private SocketModule socketModule;
    ObjectMapperHelper omh = new ObjectMapperHelper();

    @PostMapping("/placeBid")
    public ResponseEntity<String> placeBid(@RequestBody String bid) {
        User user = userService.findCurrentUser();
        if(user == null) return ResponseEntity.status(401).build();
        String res = auctionItemService.placeBid(bid, user.getId());
        if(!(res.contains("itemId") || res.contains("highestBid"))) {
            System.out.println("fail");
            return ResponseEntity.status(400).build();
        }
        else if(res.contains("itemId")){
            socketModule.emit("bidUpdate",omh.objectMapper(res));
            System.out.println("bid  after the emit "+bid+ "this is res : " + res);
        }
        return ResponseEntity.ok(res);

    }
    }
