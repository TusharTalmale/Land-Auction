package com.group4.auctionsite.repositories;

import com.group4.auctionsite.entities.API;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface APIRepository extends JpaRepository<API, Long> {

    @Query(value = "SELECT entity FROM api group by entity", nativeQuery = true)
    List<String> findAllEntities();
}
