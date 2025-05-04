package com.group4.auctionsite.controllers;

import com.group4.auctionsite.entities.API;
import com.group4.auctionsite.services.APIService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("rest/API")
public class APIController {
    @Autowired
    private APIService apiService;

    @GetMapping
    public HashMap getAllAPIs() {
        return apiService.getAllAPIs();
    }

}