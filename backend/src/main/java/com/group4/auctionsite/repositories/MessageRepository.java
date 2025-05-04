package com.group4.auctionsite.repositories;

import com.group4.auctionsite.entities.AuctionItem;
import com.group4.auctionsite.entities.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {


    List<Message> findAllByReceiverIdOrSenderId(long receiverId, long senderId);

    @Query(value = "SELECT * FROM message " +
            "WHERE (sender_id IS ?3 OR receiver_id IS ?3) " +
            "AND item_id = ?1 " +
            "AND (sender_id IS ?2 OR receiver_id IS ?2) ", nativeQuery = true)
    List<Message> findMessageByItemIdAndUserIdAndCurrentUserId(long itemId, long userId, long currentUserId);



    @Query(value = "select * from message where (sender_id IS ?1 OR receiver_id IS ?1) " +
            "and id in (select max(id) from message " +
            "group by (sender_id * receiver_id * item_id)+ (sender_id + receiver_id + item_id)) " +
            "order by id desc", nativeQuery = true)
    List<Message>  findMessagesBySenderIdOrReceiverId(long currentUserId);


}
