package com.group4.auctionsite.services;

import com.group4.auctionsite.entities.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.UUID;

@Service
public class UploadService {

  public String saveFiles(List<MultipartFile> files) {

    String cwd = System.getProperty("user.dir");
    String uploadFolder = cwd + "/src/main/resources/static/uploads/";
    String generatedString = generateString();

    for (var file : files) {
      String fileName = generatedString + file.getOriginalFilename();
      File toSave = new File(uploadFolder + fileName);
      try {
        file.transferTo(toSave);

      } catch (Exception e) {
        e.printStackTrace();
      }

    }

    return "{\"generatedString\":\"" + generatedString + "\"}";
  }

  // New method to save a single profile image
  public String saveProfileImage(MultipartFile file) throws IOException {
    if (file.isEmpty()) {
      throw new IOException("Failed to store empty file.");
    }

    String cwd = System.getProperty("user.dir");

    String profileUploadFolder = cwd + "/src/main/resources/static/profile/";

    // Ensure the profile upload directory exists
    File directory = new File(profileUploadFolder);
    if (!directory.exists()) {
      Files.createDirectories(Paths.get(profileUploadFolder));
    }

    // Generate a unique filename using UUID to avoid conflicts
    String originalFilename = file.getOriginalFilename();
    String fileExtension = "";
    if (originalFilename != null && originalFilename.contains(".")) {
      fileExtension = originalFilename.substring(originalFilename.lastIndexOf("."));
    }
    String uniqueFileName = UUID.randomUUID().toString() + fileExtension;

    // Create the destination file
    File destinationFile = new File(profileUploadFolder + uniqueFileName);

    try {
      // Transfer the uploaded file to the destination
      file.transferTo(destinationFile);

      return "/profile/" + uniqueFileName;
    } catch (IOException e) {
      System.err.println("Error saving profile image: " + uniqueFileName);
      e.printStackTrace();
      throw new IOException("Failed to store profile image.", e); // Re-throw with context
    } catch (Exception e) {
      System.err.println("An unexpected error occurred while saving profile image: " + uniqueFileName);
      e.printStackTrace();
      throw new IOException("An unexpected error occurred while storing profile image.", e);
    }
  }

  private String generateString() {
    int leftLimit = 48; // numeral '0'
    int rightLimit = 122; // letter 'z'
    int targetStringLength = 10;
    Random random = new Random();

    return random.ints(leftLimit, rightLimit + 1)
            .filter(i -> (i <= 57 || i >= 65) && (i <= 90 || i >= 97))
            .limit(targetStringLength)
            .collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append)
            .toString();
  }

}
