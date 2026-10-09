package com.weatherwatchlist.backend.repository;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.weatherwatchlist.backend.entity.WatchlistEntity;

public interface WatchlistRepository extends JpaRepository<WatchlistEntity, Long> {

    @Query("SELECT w FROM WatchlistEntity w WHERE LOWER(w.city) = LOWER(:city)")
    Optional<WatchlistEntity> findByCity(@Param("city") String city);

    @Query("SELECT w FROM WatchlistEntity w ORDER BY w.createdAt DESC")
    Page<WatchlistEntity> findAllPaginated(Pageable pageable);
}