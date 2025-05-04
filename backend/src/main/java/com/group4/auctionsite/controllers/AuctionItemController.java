package com.group4.auctionsite.controllers;

import com.group4.auctionsite.entities.AuctionItem;
import com.group4.auctionsite.entities.User;
import com.group4.auctionsite.services.AuctionItemService;
import com.group4.auctionsite.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// import org.springframework.security.core.AuctionItemDetails.AuctionItemDetailsService;

@RestController
@RequestMapping("/rest/auctionItem")
public class AuctionItemController {
    @Autowired
    private AuctionItemService auctionItemService;
    @Autowired
    private UserService userService;

    @GetMapping
    public List<AuctionItem> getAllAuctionItems() {
        return auctionItemService.getAllAuctionItems();
    }

    @GetMapping("/{id}")
    public String getAuctionItemById(@PathVariable long id) {
        return auctionItemService.getById(id);
    }

    @GetMapping("/userSelling")
    public ResponseEntity<String> getAuctionItemsByUserId() {
        User user = userService.findCurrentUser();
        if(user == null) return ResponseEntity.status(403).build();
        return ResponseEntity.ok(auctionItemService.getAuctionItemsByUserId(user.getId()));
    }

    @GetMapping("/userBuying")
    public ResponseEntity<String> getAuctionItemsByUserBuying() {
        User user = userService.findCurrentUser();
        if(user == null) return ResponseEntity.status(403).build();
        return ResponseEntity.ok(auctionItemService.getAuctionItemsByUserBuying(user.getId()));
    }

    @PostMapping

    public ResponseEntity<AuctionItem> createAuctionItem(@RequestBody String auctionItem) {
        User user = userService.findCurrentUser();
        if(user == null) return ResponseEntity.status(403).build();
        return ResponseEntity.ok(auctionItemService.createAuctionItem(auctionItem, user.getId()));
    }

    @PostMapping("/s")
    public List<AuctionItem> createAuctionItems(@RequestBody List<AuctionItem> auctionItems) {
        return auctionItemService.createAuctionItems(auctionItems);
    }

    @GetMapping("/filtered/{filter}")
    public String getFilteredAuctionItems(@PathVariable String filter) {
        return auctionItemService.getFilteredAuctionItems(filter);
    }
}