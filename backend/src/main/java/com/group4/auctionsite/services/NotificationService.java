package com.group4.auctionsite.services;

import com.group4.auctionsite.entities.*;
import com.group4.auctionsite.repositories.AuctionItemRepository;
import com.group4.auctionsite.repositories.BidRepository;
import com.group4.auctionsite.repositories.MessageRepository;
import com.group4.auctionsite.repositories.NotificationRepository;
import com.group4.auctionsite.springSocket.socket.SocketModule;
import com.group4.auctionsite.utils.FrontEndHelper;
import org.aspectj.weaver.ast.Not;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class NotificationService {
    @Autowired
    NotificationRepository notificationRepository;
    @Autowired
    BidRepository bidRepository;
    @Autowired
    AuctionItemRepository auctionItemRepository;
    @Autowired
    SocketModule socketModule;
    @Autowired
    MessageRepository messageRepository;
    @Autowired
    UserService userService;


    FrontEndHelper frontEndHelper = new FrontEndHelper();

    public List<Notification> getAllNotifications() {
        return notificationRepository.findAll();
    }

    public void createNotification(Notification notification) {
        notification = notificationRepository.save(notification);

        String title = auctionItemRepository.findById(notification.getItemId()).get().getTitle();
        Optional<Message> message = messageRepository.findById(notification.getMessageId());

        long correctUserId= message.isEmpty() ? 0L : message.get().getSenderId();

        socketModule.emit2("notification", notification, title, correctUserId);

    }

    public void createNotification(long itemId, long userId) {
        Bid bid = bidRepository.findLatestBidByItemId(itemId);
        if(userId == bid.getUserId()) return;
        List<Notification> notifications = notificationRepository.findAllByItemIdAndUserId(itemId, bid.getUserId());
        if(notifications.size() == 0) {
            createNotification(new Notification(bid.getItemId(), bid.getUserId()));
        }

    }

    public void createNotification(long itemId, long userId , long senderId, long messageId) {

        List<Notification> notifications = notificationRepository.findAllByItemIdAndUserIdAndMessageIdNotNull(itemId,userId);

        boolean bol= true;

        for(Notification notification: notifications){
            if(messageRepository.findById(notification.getMessageId()).get().getSenderId()==senderId){
                bol=false;
                break;
            }
        }
        if(bol){
            createNotification(new Notification(itemId, userId, messageId ));
        }

    }

    public String getAllNotificationsByUserId(long userId) {
        List<Notification> notifications = notificationRepository.findAllByUserId(userId);
        List<String> auctionItems = new ArrayList<>();
        for(Notification n : notifications) {
            if(n.getMessageId() != 0L) {
                AuctionItem ai = auctionItemRepository.findById(n.getItemId()).get();

                Message message =messageRepository.findById(n.getMessageId()).get();

                long correctUserId = message.getSenderId()==userId ? message.getReceiverId(): message.getSenderId();
                System.out.println("correct"+ correctUserId);

                auctionItems.add("{" +
                        "\"title\":\"" + ai.getTitle() + "\"," +
                        "\"itemId\":" + ai.getId() + "," +
                        "\"userId\":" + correctUserId + "," +
                        "\"id\":" + n.getId()+ "," +
                        "\"messageId\":" + n.getMessageId() +
                        "}"
                );
            }
            else {

                AuctionItem ai = auctionItemRepository.findById(n.getItemId()).get();
                int highestBid = bidRepository.findMaxBidByItemId(ai.getId());
                auctionItems.add("{" +
                        "\"title\":\"" + ai.getTitle() + "\"," +
                        "\"itemId\":" + ai.getId() + "," +
                        "\"highestBid\":" + highestBid + "," +
                        "\"id\":" + n.getId() +
                        "}"
                );

            }


        }
        return frontEndHelper.ToJson(auctionItems);
    }

    public void deleteNotification(long id, long userId) {
        Optional<Notification> notification = notificationRepository.findById(id);
        if(notification.isEmpty()) return;
        if(notification.get().getUserId() == userId) notificationRepository.delete(notification.get());
    }

    public void deleteNotifications(String notificationIds, long userId) {
        String[] ids = notificationIds.split(",");
        for(String id : ids) {
            try {
                Optional<Notification> notification = notificationRepository.findById(Long.parseLong(id));
                if(notification.isEmpty()) return;
                if(notification.get().getUserId() == userId) notificationRepository.delete(notification.get());
            } catch (NumberFormatException e) {
                return;
            }
        }
    }
}
