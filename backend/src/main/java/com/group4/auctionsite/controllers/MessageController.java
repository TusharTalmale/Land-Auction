package com.group4.auctionsite.controllers;

import com.group4.auctionsite.entities.Message;
import com.group4.auctionsite.entities.User;
import com.group4.auctionsite.services.MessageService;
import com.group4.auctionsite.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.security.core.AuctionItemDetails.AuctionItemDetailsService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/rest/conversation")
public class MessageController {
    @Autowired
    private MessageService messageService;

    @Autowired
    private  UserService userService;

    @GetMapping
    public List<Message> getAllMessages() {
        return messageService.getAllMessages();
    }

    @PostMapping
    public ResponseEntity<Message> createMessage(@RequestBody Message message) {
        User user = userService.findCurrentUser();
        if(user == null) return ResponseEntity.status(403).build();
        message.setSenderId(user.getId());
        message.setTimestamp(new Date().getTime());
        return ResponseEntity.ok(messageService.createMessage(message));
    }


    @GetMapping("/{itemId}/{userId}")
    public ResponseEntity<Map<String, Object>> getMessagesByItemIdAndUserId(
            @PathVariable long itemId,
            @PathVariable long userId) {

        Map<String, Object> defaultResponse = new HashMap<>();
        defaultResponse.put("messages", Collections.emptyList());
        defaultResponse.put("title", "");
        defaultResponse.put("username", "");

        try {
            User user = userService.findCurrentUser();
            if (user == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(defaultResponse);
            }
            if (user.getId() == userId) {
                return ResponseEntity.badRequest().body(defaultResponse);
            }

            Map<String, Object> response = messageService.getMessagesByItemIdAndUserId(itemId, userId, user.getId());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(defaultResponse);
        }
    }

    @GetMapping("/my-messages")
    public  String getMessages() {
        User user = userService.findCurrentUser();

        if(user==null) {return null; }

        return messageService.getMyMessages(user.getId());
    }

}
