package com.group4.auctionsite.controllers;

import com.group4.auctionsite.services.UploadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@RestController
public class UploadController {

  @Autowired
  private UploadService uploadService;

  @PostMapping("/api/upload")
  public String upload(@RequestParam List<MultipartFile> files) {

    return uploadService.saveFiles(files);
  }

}
