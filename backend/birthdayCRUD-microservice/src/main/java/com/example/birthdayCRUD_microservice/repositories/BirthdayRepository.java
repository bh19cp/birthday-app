package com.example.birthdayCRUD_microservice.repositories;

import com.example.birthdayCRUD_microservice.model.Birthday;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface BirthdayRepository extends MongoRepository<Birthday, String> {
}