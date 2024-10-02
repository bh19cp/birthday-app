package com.example.birthdayCRUD_microservice.model;

import jakarta.annotation.PostConstruct;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.time.Period;
import java.time.temporal.ChronoUnit;

@Document(collection = "birthdays")
public class Birthday {
    @Id
    private String birthdayId;
    private String name;
    private LocalDate date;
    @Transient
    private int currentAge;
    @Transient
    private int daysUntilBirthday;

    public Birthday(String name, LocalDate date) {
        this.name = name;
        this.date = date;
        this.currentAge = calculateAge(date);
        this.daysUntilBirthday = calculateDaysUntilBirthday(date);
    }

    @PostConstruct
    public void init() {
        this.currentAge = calculateAge(date);
        this.daysUntilBirthday = calculateDaysUntilBirthday(date);
    }

    private int calculateDaysUntilBirthday(LocalDate date) {

        LocalDate today = LocalDate.now();
        LocalDate nextBirthday = date.withYear(today.getYear());

        if (nextBirthday.isBefore(today) || nextBirthday.isEqual(today)) {
            nextBirthday = nextBirthday.plusYears(1);
        }

        return (int) ChronoUnit.DAYS.between(today, nextBirthday);
    }

    private int calculateAge(LocalDate birthDate) {
        LocalDate currentDate = LocalDate.now();
        if (birthDate != null) {
            return Period.between(birthDate, currentDate).getYears();
        } else {
            return 100;
        }
    }

    public String getBirthdayId() {
        return birthdayId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public LocalDate getDate() {
        return date;
    }

    public int getCurrentAge() {
        return currentAge;
    }

    public int getDaysUntilBirthday() {
        return daysUntilBirthday;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    @Override
    public String toString() {
        return "Birthday{" +
                "birthdayId='" + birthdayId + '\'' +
                ", name='" + name + '\'' +
                ", date=" + date +
                ", currentAge=" + currentAge +
                ", daysUntilBirthday=" + daysUntilBirthday +
                '}';
    }

}
