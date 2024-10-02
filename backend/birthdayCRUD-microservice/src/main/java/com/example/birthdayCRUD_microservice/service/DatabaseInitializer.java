package com.example.birthdayCRUD_microservice.service;

import com.example.birthdayCRUD_microservice.model.Birthday;
import com.example.birthdayCRUD_microservice.repositories.BirthdayRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class DatabaseInitializer {

    @Autowired
    private BirthdayRepository birthdayRepository;

    @PostConstruct
    public void init() {
        try {
            if (birthdayRepository.count() == 0) {
                Birthday birthday1 = new Birthday("Jonhy Velasquez", LocalDate.of(2020, 2, 10));
                Birthday birthday2 = new Birthday("Mom", LocalDate.of(2021, 2, 10));
                Birthday birthday3 = new Birthday("Alice Mango", LocalDate.of(1995, 3, 22));
                Birthday birthday4 = new Birthday("Shrek from far away land", LocalDate.of(1988, 7, 5));
                Birthday birthday5 = new Birthday("Mickey Mouse", LocalDate.of(2000, 12, 15));

                birthdayRepository.saveAll(List.of(birthday1, birthday2, birthday3, birthday4, birthday5));
                System.out.println("Default birthdays have been created.");
            }
        } catch (Exception e) {
            System.err.println("Error during database initialization: " + e.getMessage());
            e.printStackTrace();
        }
    }

}
