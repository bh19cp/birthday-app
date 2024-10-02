package com.example.birthdayCRUD_microservice.controller;

import com.example.birthdayCRUD_microservice.model.Birthday;
import com.example.birthdayCRUD_microservice.service.BirthdayService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/birthdays")
@CrossOrigin(origins = "http://localhost:3000")
public class BirthdayController {
    @Autowired
    private BirthdayService birthdayService;

    @PostMapping
    public ResponseEntity<Birthday> addBirthday(@RequestBody Birthday birthday) {
        Birthday savedBirthday = birthdayService.addBirthday(birthday);
        return ResponseEntity.ok(savedBirthday);
    }
    @GetMapping
    public ResponseEntity<List<Birthday>> getBirthdays() {
        return ResponseEntity.ok(birthdayService.getAllBirthdays());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Birthday> updateBirthday(@PathVariable String id, @RequestBody Birthday birthday) {
        Birthday updatedBirthday = birthdayService.updateBirthday(id, birthday);
        return ResponseEntity.ok(updatedBirthday);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBirthday(@PathVariable String id) {
        birthdayService.deleteBirthday(id);
        return ResponseEntity.noContent().build();
    }
}
