package com.group4.auctionsite.repositories;

import com.group4.auctionsite.entities.AuctionItem;
import com.group4.auctionsite.entities.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TagRepository extends JpaRepository<Tag, Long> {
    @Query(value = "SELECT tag_id FROM item_xtag WHERE item_id = :itemId", nativeQuery = true)
    List<Long> findAllTagIdsOnAuctionItem(@Param("itemId") Long itemId);

    List<Tag> findAllByIdIn(List<Long> ids);

    List<Tag> findAllByName(String name);
}
