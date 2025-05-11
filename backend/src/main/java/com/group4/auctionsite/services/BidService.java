package com.group4.auctionsite.services;


import com.group4.auctionsite.dto.BidWithUserInfo;
import com.group4.auctionsite.entities.Bid;
import com.group4.auctionsite.entities.User;
import com.group4.auctionsite.repositories.BidRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.*;
import java.util.stream.Collectors;

@Service
public class BidService {

    private final BidRepository bidRepository;
    private final UserService userService;

    public BidService(BidRepository bidRepository, UserService userService) {
        this.bidRepository = bidRepository;
        this.userService = userService;
    }

    public List<Bid> getAllBids() {
        return bidRepository.findAll();
    }

    public Bid createBid(Bid bid) {
        return bidRepository.save(bid);
    }

    public List<Bid> getBidsByItemIdSorted(long itemId) {
        List<Bid> bids = bidRepository.findByItemId(itemId);

        // Sort by bid amount descending, then by currTime ascending (earlier bids first)
        return bids.stream()
                .sorted(Comparator.comparingInt(Bid::getBid).reversed()
                        .thenComparingLong(Bid::getCurrTime))
                .collect(Collectors.toList());
    }

//    public List<BidWithUserInfo> getBidsByItemIdWithUserInfo(long itemId) {
//        List<Bid> bids = bidRepository.findByItemId(itemId);
//
//        return bids.stream()
//                .sorted(Comparator
//                        .comparingInt(Bid::getBid).reversed()
//                        .thenComparing(b ->
//                                        b.getCurrTime() != null ? b.getCurrTime() : Long.MAX_VALUE,
//                                Comparator.nullsLast(Comparator.naturalOrder())
//                        )
//                )
//                .map(bid -> {
//                    Optional<User> userOptional = userService.getById(bid.getUserId());
//                    return userOptional.map(user -> BidWithUserInfo.builder()
//                                    .bidId(bid.getId())
//                                    .bidAmount(bid.getBid())
//                                    .bidTime(bid.getCurrTime())
//                                    .userId(user.getId())
//                                    .username(user.getUsername())
//                                    .fullName(user.getFullName())
//                                    .email(user.getEmail())
//                                    .phone(user.getPhone())
//                                    .websocketId(user.getWebsocketId())
//                                    .build())
//                            .orElse(null); // Handle case where user not found
//                })
//                .filter(bidWithUserInfo -> bidWithUserInfo != null) // Filter out null entries
//                .collect(Collectors.toList());
//    }
public List<BidWithUserInfo> getBidsByItemIdWithUserInfo(long itemId) {
    List<Bid> bids = bidRepository.findByItemId(itemId);

    return bids.stream()
            .filter(Objects::nonNull) // Ensure Bid itself is not null
            .sorted(Comparator
                    .comparing(Bid::getBid, Comparator.nullsLast(Comparator.reverseOrder()))
                    .thenComparing(Bid::getCurrTime, Comparator.nullsLast(Comparator.naturalOrder()))
            )
            .map(bid -> {
                Optional<User> userOptional = userService.getById(bid.getUserId());
                if (userOptional.isPresent()) {
                    User user = userOptional.get();
                    return BidWithUserInfo.builder()
                            .bidId(bid.getId())
                            .bidAmount(bid.getBid())
                            .bidTime(bid.getCurrTime() != null ? bid.getCurrTime() : 0L)
                            .userId(user.getId())
                            .username(user.getUsername() != null ? user.getUsername() : "N/A")
                            .fullName(user.getFullName() != null ? user.getFullName() : "N/A")
                            .email(user.getEmail() != null ? user.getEmail() : "N/A")
                            .phone(user.getPhone() != null ? user.getPhone() : "N/A")
                            .websocketId(user.getWebsocketId() != null ? user.getWebsocketId() : "N/A")
                            .build();
                } else {
                    return null;
                }
            })
            .filter(Objects::nonNull)
            .collect(Collectors.toList());
}

}