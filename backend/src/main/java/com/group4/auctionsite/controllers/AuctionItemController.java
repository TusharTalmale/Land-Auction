package com.group4.auctionsite.controllers;

import antlr.ASTNULLType;
import com.group4.auctionsite.entities.AuctionItem;
import com.group4.auctionsite.entities.User;
import com.group4.auctionsite.repositories.AuctionItemRepository;
import com.group4.auctionsite.services.AuctionItemService;
import com.group4.auctionsite.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import javax.persistence.criteria.CriteriaBuilder;

@RestController
@RequestMapping("/rest/auctionItem")
public class AuctionItemController {
    @Autowired
    private AuctionItemService auctionItemService;
    @Autowired
    private UserService userService;
    @Autowired
    private AuctionItemRepository auctionItemRepository;

    @GetMapping
    public List<AuctionItem> getAllAuctionItems() {
        return auctionItemService.getAllAuctionItems();
    }

    @GetMapping("/{id}")
    public String getAuctionItemById(@PathVariable long id) {
        return auctionItemService.getById(id);
    }

    @GetMapping("/userSelling")
    public ResponseEntity<String> getAuctionItemsByUserId() {
        User user = userService.findCurrentUser();
        if(user == null) return ResponseEntity.status(403).build();
        return ResponseEntity.ok(auctionItemService.getAuctionItemsByUserId(user.getId()));
    }

    @GetMapping("/userBuying")
    public ResponseEntity<String> getAuctionItemsByUserBuying() {
        User user = userService.findCurrentUser();
        if(user == null) return ResponseEntity.status(403).build();
        return ResponseEntity.ok(auctionItemService.getAuctionItemsByUserBuying(user.getId()));
    }

    @PostMapping

    public ResponseEntity<AuctionItem> createAuctionItem(@RequestBody String auctionItem) {
        User user = userService.findCurrentUser();
        if(user == null) return ResponseEntity.status(403).build();
        return ResponseEntity.ok(auctionItemService.createAuctionItem(auctionItem, user.getId()));
    }

    @PostMapping("/s")
    public List<AuctionItem> createAuctionItems(@RequestBody List<AuctionItem> auctionItems) {
        return auctionItemService.createAuctionItems(auctionItems);
    }

    @GetMapping("/filtered/{filter}")
    public String getFilteredAuctionItems(@PathVariable String filter) {
        return auctionItemService.getFilteredAuctionItems(filter);
    }
    @GetMapping("/filter")
    public List<AuctionItem> filterAuctionItems(
            @RequestParam(required = false) String title,
            @RequestParam(required = false) String city,
            @RequestParam(required = false) Optional<String> plotFacing,
            @RequestParam(required = false) Integer minPrice,
            @RequestParam(required = false) Integer maxPrice,
            @RequestParam(required = false) Boolean active // true for active, false for inactive, null for all (unless no other filters)
    ) {
        // Determine if any filter parameters were provided
        boolean anyFilterProvided = (title != null && !title.trim().isEmpty()) ||
                (city != null && !city.trim().isEmpty()) ||
                (plotFacing.isPresent() && !plotFacing.get().trim().isEmpty()) ||
                (minPrice != null) ||
                (maxPrice != null) ||
                (active != null);


        // Build the Specification dynamically
        Specification<AuctionItem> spec = (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();
            long currentTime = new Date().getTime(); // Get current time for comparison

            // --- Apply default filter if no parameters are provided ---
            if (!anyFilterProvided) {
                // If no filters provided, default to showing only active items
                predicates.add(cb.greaterThan(root.get("endTime"), currentTime));
            }
            // --- Apply specific filters if parameters ARE provided ---
            else {
                // Filter by title (case-insensitive, contains)
                if (title != null && !title.trim().isEmpty()) {
                    predicates.add(cb.like(cb.lower(root.get("title")), "%" + title.toLowerCase() + "%"));
                }

                // Filter by city (case-insensitive, contains)
                if (city != null && !city.trim().isEmpty()) {
                    predicates.add(cb.like(cb.lower(root.get("city")), "%" + city.toLowerCase() + "%"));
                }

                // Filter by plot facing (exact match)
                plotFacing.ifPresent(facing -> {
                    if (!facing.trim().isEmpty()) { // Check if the Optional contains a non-empty string
                        predicates.add(cb.equal(root.get("plotFacing"), facing));
                    }
                });

                // Filter by price range
                if (minPrice != null) {
                    predicates.add(cb.greaterThanOrEqualTo(root.get("startPrice"), minPrice));
                }
                if (maxPrice != null) {
                    predicates.add(cb.lessThanOrEqualTo(root.get("startPrice"), maxPrice));
                }

                // Filter by explicit active status parameter (if provided)
                // This overrides the default behavior if 'active' is explicitly set
                if (active != null) {
                    if (active) {
                        // Only include items where end time is in the future
                        predicates.add(cb.greaterThan(root.get("endTime"), currentTime));
                    } else {
                        // Only include items where end time is in the past or exactly now
                        predicates.add(cb.lessThanOrEqualTo(root.get("endTime"), currentTime));
                    }
                }
                // If active is null but other filters were provided, no active/inactive filter is applied
            }


            // Combine all collected predicates using AND.
            // If no predicates were added (e.g., no filters provided and no default applied, which shouldn't happen with the new logic),
            // cb.and() with an empty array results in a 'true' predicate, returning all items.
            // However, the new logic ensures at least one predicate is added if no filters are provided.
            return cb.and(predicates.toArray(new Predicate[0]));
        };

        // Execute the query with the constructed specification
        return auctionItemRepository.findAll(spec);
    }

}