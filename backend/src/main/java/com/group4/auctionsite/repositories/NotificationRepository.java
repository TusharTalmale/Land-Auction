package com.group4.auctionsite.repositories;

import com.group4.auctionsite.entities.AuctionItem;
import com.group4.auctionsite.entities.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {

    List<Notification> findAllByUserId(long userId);

    List<Notification> findAllByItemIdAndUserId(long itemId, long userId);

    List<Notification> findAllByItemIdAndUserIdAndMessageIdNotNull(long itemId, long userId);



}
