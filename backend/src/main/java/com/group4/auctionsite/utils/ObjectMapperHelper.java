package com.group4.auctionsite.utils;

import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;

public class ObjectMapperHelper {

    public Object objectMapper(String obj) {
        Object object = null;
        try {
            object = new ObjectMapper().readValue(obj, Object.class);
        } catch (IOException e) {
            System.out.println(e);
        }
        return object;
    }
}
