package com.group4.auctionsite.repositories;

import com.group4.auctionsite.entities.AuctionItem;
import com.group4.auctionsite.entities.Bid;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface BidRepository extends JpaRepository<Bid, Long> {

    @Query(value = "SELECT MAX(bid) FROM bid WHERE item_id = ?1", nativeQuery = true)
    int findMaxBidByItemId(long itemId);

    @Query(value = "SELECT * FROM bid WHERE item_id = ?1 AND bid = (SELECT MAX(bid) FROM bid WHERE item_id = ?1)", nativeQuery = true)
    Bid findLatestBidByItemId(long itemId);

    @Query(value = "SELECT COUNT(bid)-1 FROM bid WHERE item_id = ?1", nativeQuery = true)
    int numberOfBidsByItemId(long itemId);

    @Query(value = "SELECT bid FROM bid WHERE user_id = ?1 AND item_id = ?2 AND bid > 0 ORDER BY bid DESC LIMIT 1", nativeQuery = true)
    int findMaxBidByUserId(long userId, long itemId);

}
