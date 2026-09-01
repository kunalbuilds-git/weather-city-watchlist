package com.weatherwatchlist.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.weatherwatchlist.backend.entity.WatchlistEntity;

public interface WatchlistRepository extends JpaRepository<WatchlistEntity, Long> {

}