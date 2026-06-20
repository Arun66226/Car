package com.mishra.travels.repository;

import com.mishra.travels.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByUserIdOrderByCreatedAtDesc(Long userId);
    Optional<Booking> findByBookingId(String bookingId);
    List<Booking> findAllByOrderByCreatedAtDesc();
    
    @Query("SELECT COALESCE(SUM(b.advanceAmount), 0.0) FROM Booking b WHERE b.status = 'Approved'")
    Double calculateTotalRevenue();
}
