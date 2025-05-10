package com.group4.auctionsite;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.retry.annotation.EnableRetry;

@SpringBootApplication
@EnableRetry
public class AuctionsiteApplication {

	public static void main(String[] args) {
		SpringApplication.run(AuctionsiteApplication.class, args);
	}

}
