package com.group4.auctionsite.services;

import com.group4.auctionsite.controllers.UserController;
import com.group4.auctionsite.entities.AuctionItem;
import com.group4.auctionsite.entities.Message;
import com.group4.auctionsite.entities.User;
import com.group4.auctionsite.repositories.AuctionItemRepository;
import com.group4.auctionsite.repositories.MessageRepository;
import com.group4.auctionsite.repositories.UserRepository;
import com.group4.auctionsite.springSocket.socket.SocketModule;
import com.group4.auctionsite.utils.FrontEndHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class MessageService {
    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private AuctionItemRepository auctionItemRepository;

    @Autowired
    private SocketModule socketModule;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private NotificationService notificationService;

    FrontEndHelper frontEndHelper = new FrontEndHelper();

    public List<Message> getAllMessages(){
        return messageRepository.findAll();
    }

    public Optional<Message> getById(long id) {
        return messageRepository.findById(id);
    }

    public Message createMessage(Message message) {
        socketModule.emit("messageUp", message);

        message = messageRepository.save(message);

        notificationService.createNotification(message.getItemId(),message.getReceiverId(),message.getSenderId(),message.getId());

        return message;
    }


    public String getMyMessages(long userId) {

        List<String> messages =new ArrayList<>();
        List<Message>  updateList= messageRepository.findMessagesBySenderIdOrReceiverId(userId);

        for(Message message: updateList){
            var a= auctionItemRepository.findById(message.getItemId()).get();
            var u=userRepository.findById(userId== message.getSenderId()?message.getReceiverId() :message.getSenderId()).get().getUsername();

            messages.add(message.toJson(a,u));
        }


        return frontEndHelper.ToJson(messages);
    }
    // In your service method
    public Map<String, Object> getMessagesByItemIdAndUserId(long itemId, long userId, long currentUserId) {
        Map<String, Object> response = new HashMap<>();
        response.put("messages", Collections.emptyList());
        response.put("title", "");
        response.put("username", "");

        // Add null checks for repositories
        AuctionItem item = auctionItemRepository.findById(itemId).orElse(null);
        User otherUser = userRepository.findById(userId).orElse(null);

        if (item != null) response.put("title", item.getTitle());
        if (otherUser != null) response.put("username", otherUser.getUsername());

        List<Message> messages = messageRepository.findMessageByItemIdAndUserIdAndCurrentUserId(itemId, userId, currentUserId);
        response.put("messages", messages);

        return response;
    }
}
