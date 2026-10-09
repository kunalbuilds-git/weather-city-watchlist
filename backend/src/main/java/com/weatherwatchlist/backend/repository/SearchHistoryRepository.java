package com.weatherwatchlist.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.weatherwatchlist.backend.entity.SearchHistoryEntity;

public interface SearchHistoryRepository extends JpaRepository<SearchHistoryEntity, Long> {

    @Query(value = "SELECT * FROM search_history_entity ORDER BY searched_at DESC LIMIT 10", 
           nativeQuery = true)
    List<SearchHistoryEntity> findRecentSearches();
}