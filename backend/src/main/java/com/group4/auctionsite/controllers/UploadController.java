package com.group4.auctionsite.controllers;

import com.group4.auctionsite.services.UploadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
public class UploadController {

  @Autowired
  private UploadService uploadService;

  @PostMapping("/api/upload")
  public String upload(@RequestPart("files") MultipartFile[] files) {
    return uploadService.saveFiles(List.of(files));
  }

  @PostMapping("/api/profile/image")
  public ResponseEntity<?> uploadProfileImage(@RequestPart("image") MultipartFile file) {
    try {
      String imageUrl = uploadService.saveProfileImage(file);
      // Return the accessible URL in a JSON response
      System.out.println(imageUrl);
      return ResponseEntity.ok(Map.of("imageUrl", imageUrl));
    } catch (IOException e) {

      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", "Failed to upload profile image: " + e.getMessage()));
    } catch (Exception e) {
      // Catch any other unexpected exceptions
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", "An unexpected error occurred during file upload: " + e.getMessage()));
    }
  }

}
