package com.group4.auctionsite.services;

import com.group4.auctionsite.entities.Image;
import com.group4.auctionsite.repositories.ImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ImageService {
    @Autowired
    private ImageRepository imageRepository;

    public List<Image> getAllImages(){
        return imageRepository.findAll();
    }

    public Optional<Image> getById(long id) {
        return imageRepository.findById(id);
    }

    public Image createImage(Image image) {
        return imageRepository.save(image);
    }
}
