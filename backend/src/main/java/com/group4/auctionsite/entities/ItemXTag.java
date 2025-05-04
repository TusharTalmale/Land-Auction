package com.group4.auctionsite.entities;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "item_xtag")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ItemXTag {


    @Id
    @GeneratedValue
    private long id;

    private long itemId;
    private long tagId;

    public ItemXTag(long tagId, long itemId) {
        this.tagId = tagId;
        this.itemId = itemId;
    }
}

