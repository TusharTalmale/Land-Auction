package com.group4.auctionsite.utils;

import java.util.List;

public class FrontEndHelper {

    public String ToJson(List<String> list) {
        String ToJson = "[\n";
        for(int i = 0; i < list.size(); i++) {
            ToJson += (list.get(i) + (i == list.size() - 1 ? "" : ", \n"));
        }
        ToJson += "]";
        return ToJson;
    }
}
