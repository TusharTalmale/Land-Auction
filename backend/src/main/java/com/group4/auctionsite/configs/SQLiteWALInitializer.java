package com.group4.auctionsite.configs;
 // Or your preferred package for configuration/initialization

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;

@Component
public class SQLiteWALInitializer implements CommandLineRunner {

    private final DataSource dataSource;
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public SQLiteWALInitializer(DataSource dataSource, JdbcTemplate jdbcTemplate) {
        this.dataSource = dataSource;
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public void run(String... args) throws Exception {
        try {
            jdbcTemplate.execute("PRAGMA journal_mode=WAL;");
            String journalMode = jdbcTemplate.queryForObject("PRAGMA journal_mode;", String.class);
            System.out.println("SQLite journal mode is set to: " + journalMode);
        } catch (Exception e) {
            System.err.println("Error setting SQLite journal mode to WAL: " + e.getMessage());
        }
    }
}