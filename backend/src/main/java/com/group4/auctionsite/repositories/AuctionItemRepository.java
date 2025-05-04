package com.group4.auctionsite.repositories;

import com.group4.auctionsite.entities.AuctionItem;
import com.group4.auctionsite.entities.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AuctionItemRepository extends JpaRepository<AuctionItem, Long> {

    AuctionItem save(AuctionItem auctionItem);

    List<AuctionItem> findAllByUserId(long userId);

    @Query(value = "SELECT i.*, (SELECT MAX(bid) FROM bid WHERE item_id = i.id) AS highest_bid, (SELECT COUNT(item_id) FROM bid WHERE item_id = i.id) AS number_of_bids FROM auction_item AS i, tag AS t, item_xtag AS x " +
            "WHERE (x.item_id = i.id AND x.tag_id = t.id) " +
            "AND LOWER(t.name) = LOWER(:search) " +
            "AND category_id BETWEEN :categoryId AND :categoryId2 " +
            "AND (SELECT MAX(bid) FROM bid WHERE item_id = i.id) BETWEEN :priceFrom AND :priceTo " +
            "UNION " +
            "SELECT i.*,(SELECT MAX(bid) FROM bid WHERE item_id = i.id) AS highest_bid, (SELECT COUNT(item_id) FROM bid WHERE item_id = i.id) AS number_of_bids FROM auction_item AS i " +
            "WHERE LOWER(title) LIKE LOWER(:search2) " +
            "AND category_id BETWEEN :categoryId AND :categoryId2 " +
            "AND (SELECT MAX(bid) FROM bid WHERE item_id = i.id) BETWEEN :priceFrom AND :priceTo " +
            "AND end_time > :now " +
            "ORDER BY number_of_bids DESC " +
            "LIMIT :limit OFFSET (:limit * :offset)" , nativeQuery = true)
    List<AuctionItem> getFilteredPopularAuctionItems(@Param("search") String search,
                                                     @Param("search2") String search2,
                                                     @Param("categoryId") int categoryId,
                                                     @Param("categoryId2") int categoryId2,
                                                     @Param("priceFrom") int priceFrom,
                                                     @Param("priceTo") int priceTo,
                                                     @Param("now") long now,
                                                     @Param("limit") int limit,
                                                     @Param("offset") int offset);

    @Query(value = "SELECT i.*, (SELECT MAX(bid) FROM bid WHERE item_id = i.id) AS highest_bid, (SELECT COUNT(item_id) FROM bid WHERE item_id = i.id) AS number_of_bids FROM auction_item AS i, tag AS t, item_xtag AS x " +
            "WHERE (x.item_id = i.id AND x.tag_id = t.id) " +
            "AND LOWER(t.name) = LOWER(:search) " +
            "AND category_id BETWEEN :categoryId AND :categoryId2 " +
            "AND (SELECT MAX(bid) FROM bid WHERE item_id = i.id) BETWEEN :priceFrom AND :priceTo " +
            "UNION " +
            "SELECT i.*,(SELECT MAX(bid) FROM bid WHERE item_id = i.id) AS highest_bid, (SELECT COUNT(item_id) FROM bid WHERE item_id = i.id) AS number_of_bids FROM auction_item AS i " +
            "WHERE LOWER(title) LIKE LOWER(:search2) " +
            "AND category_id BETWEEN :categoryId AND :categoryId2 " +
            "AND (SELECT MAX(bid) FROM bid WHERE item_id = i.id) BETWEEN :priceFrom AND :priceTo " +
            "AND end_time > :now " +
            "ORDER BY start_time DESC " +
            "LIMIT :limit OFFSET (:limit * :offset)" , nativeQuery = true)
    List<AuctionItem> getFilteredLatestAuctionItems(@Param("search") String search,
                                                    @Param("search2") String search2,
                                                    @Param("categoryId") int categoryId,
                                                    @Param("categoryId2") int categoryId2,
                                                    @Param("priceFrom") int priceFrom,
                                                    @Param("priceTo") int priceTo,
                                                    @Param("now") long now,
                                                    @Param("limit") int limit,
                                                    @Param("offset") int offset);

    @Query(value = "SELECT i.*, (SELECT MAX(bid) FROM bid WHERE item_id = i.id) AS highest_bid, (SELECT COUNT(item_id) FROM bid WHERE item_id = i.id) AS number_of_bids FROM auction_item AS i, tag AS t, item_xtag AS x " +
            "WHERE (x.item_id = i.id AND x.tag_id = t.id) " +
            "AND LOWER(t.name) = LOWER(:search) " +
            "AND category_id BETWEEN :categoryId AND :categoryId2 " +
            "AND (SELECT MAX(bid) FROM bid WHERE item_id = i.id) BETWEEN :priceFrom AND :priceTo " +
            "UNION " +
            "SELECT i.*,(SELECT MAX(bid) FROM bid WHERE item_id = i.id) AS highest_bid, (SELECT COUNT(item_id) FROM bid WHERE item_id = i.id) AS number_of_bids FROM auction_item AS i " +
            "WHERE LOWER(title) LIKE LOWER(:search2) " +
            "AND category_id BETWEEN :categoryId AND :categoryId2 " +
            "AND (SELECT MAX(bid) FROM bid WHERE item_id = i.id) BETWEEN :priceFrom AND :priceTo " +
            "AND end_time > :now " +
            "ORDER BY end_time ASC " +
            "LIMIT :limit OFFSET (:limit * :offset)" , nativeQuery = true)
    List<AuctionItem> getFilteredAuctionItems(@Param("search") String search,
                                              @Param("search2") String search2,
                                              @Param("categoryId") int categoryId,
                                              @Param("categoryId2") int categoryId2,
                                              @Param("priceFrom") int priceFrom,
                                              @Param("priceTo") int priceTo,
                                              @Param("now") long now,
                                              @Param("limit") int limit,
                                              @Param("offset") int offset);

    @Query(value = "SELECT auction_item.* FROM auction_item, bid WHERE NOT auction_item.user_id =?1 AND (item_id = auction_item.id AND bid.user_id = ?1 AND bid > 0)Group BY auction_item.id"
    , nativeQuery = true)
    List<AuctionItem> findByUserBuying(long userId);
}
