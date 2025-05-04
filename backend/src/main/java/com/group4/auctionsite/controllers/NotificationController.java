package com.group4.auctionsite.controllers;

import com.group4.auctionsite.entities.Notification;
import com.group4.auctionsite.entities.User;
import com.group4.auctionsite.services.NotificationService;
import com.group4.auctionsite.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.security.core.AuctionItemDetails.AuctionItemDetailsService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/rest/notification")
public class NotificationController {
    @Autowired
    private NotificationService notificationService;
    @Autowired
    private UserService userService;

    @GetMapping
    public List<Notification> getAllNotifications() {
        return notificationService.getAllNotifications();
    }

    @GetMapping("/me")
    public ResponseEntity<String> getAllNotificationsByUserId() {
        User user = userService.findCurrentUser();
        if(user == null) return ResponseEntity.status(401).build();
        return ResponseEntity.ok(notificationService.getAllNotificationsByUserId(user.getId()));
    }

    @PostMapping
    public void createNotification(@RequestBody Notification notification) {
        notificationService.createNotification(notification);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteNotification(@PathVariable long id) {
        User user = userService.findCurrentUser();
        if(user == null) return;
        notificationService.deleteNotification(id, user.getId());
    }

    @DeleteMapping("/deleteAll/{ids}")
    public void deleteNotifications(@PathVariable String ids) {
        User user = userService.findCurrentUser();
        if(user == null) return;
        notificationService.deleteNotifications(ids, user.getId());
    }

}
