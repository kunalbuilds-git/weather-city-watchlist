package com.weatherwatchlist.backend.entity;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class SearchHistoryEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String city;
    private String country;

    @CreationTimestamp
    private LocalDateTime searchedAt;

    public SearchHistoryEntity() {
    }

    public SearchHistoryEntity(String city, String country) {
        this.city = city;
        this.country = country;
    }

    public Long getId() {
        return id;
    }

    public String getCity() {
        return city;
    }

    public String getCountry() {
        return country;
    }

    public LocalDateTime getSearchedAt() {
        return searchedAt;
    }
}