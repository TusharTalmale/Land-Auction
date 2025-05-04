package com.group4.auctionsite.controllers;

import com.group4.auctionsite.entities.Tag;
import com.group4.auctionsite.services.TagService;
import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.security.core.AuctionItemDetails.AuctionItemDetailsService;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/rest/tag")
public class TagController {
    @Autowired
    private TagService tagService;

    @GetMapping
    public List<Tag> getAllTags() {
        return tagService.getAllTags();
    }

    @PostMapping
    public Tag createTag(@RequestBody Tag tag) {
        return tagService.createTag(tag);
    }

    @GetMapping("/{itemId}")
    public List<Tag> getAllTagsOnAuctionItem(@PathVariable Long itemId) {
        List<Long> tagIds = tagService.getAllTagIdsOnAuctionItem(itemId);
        return tagService.getAllTagsByIds(tagIds);
    }

}
