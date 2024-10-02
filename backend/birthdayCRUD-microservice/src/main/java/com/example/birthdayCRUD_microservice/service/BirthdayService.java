package com.example.birthdayCRUD_microservice.service;

import com.example.birthdayCRUD_microservice.model.Birthday;
import com.example.birthdayCRUD_microservice.repositories.BirthdayRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BirthdayService {

    @Autowired
    private BirthdayRepository birthdayRepository;

    public Birthday addBirthday(Birthday birthday) {
        return birthdayRepository.save(birthday);
    }

    public List<Birthday> getAllBirthdays() {
        return birthdayRepository.findAll();
    }

    public Birthday updateBirthday(String id, Birthday birthday) {
        Optional<Birthday> existingBirthday = birthdayRepository.findById(id);
        if (existingBirthday.isPresent()) {
            Birthday updatedBirthday = existingBirthday.get();
            updatedBirthday.setName(birthday.getName());
            updatedBirthday.setDate(birthday.getDate());
            return birthdayRepository.save(updatedBirthday);
        }
        return null;
    }

    public void deleteBirthday(String id) {
        birthdayRepository.deleteById(id);
    }
}

