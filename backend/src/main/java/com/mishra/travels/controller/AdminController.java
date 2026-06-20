package com.mishra.travels.controller;

import com.mishra.travels.dto.AdminStatsResponse;
import com.mishra.travels.model.Booking;
import com.mishra.travels.model.User;
import com.mishra.travels.repository.BookingRepository;
import com.mishra.travels.repository.CarRepository;
import com.mishra.travels.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CarRepository carRepository;

    @Autowired
    private BookingRepository bookingRepository;

    // Get statistics
    @GetMapping("/stats")
    public ResponseEntity<AdminStatsResponse> getStats() {
        long totalUsers = userRepository.count();
        long totalCars = carRepository.count();
        long totalBookings = bookingRepository.count();
        Double totalRevenue = bookingRepository.calculateTotalRevenue();

        return ResponseEntity.ok(new AdminStatsResponse(totalUsers, totalCars, totalBookings, totalRevenue));
    }

    // --- MANAGE BOOKINGS ---

    // Get all bookings
    @GetMapping("/bookings")
    public ResponseEntity<List<Booking>> getAllBookings() {
        return ResponseEntity.ok(bookingRepository.findAllByOrderByCreatedAtDesc());
    }

    // Approve Booking
    @PutMapping("/bookings/{id}/approve")
    public ResponseEntity<?> approveBooking(@PathVariable Long id) {
        Optional<Booking> bookingOpt = bookingRepository.findById(id);
        if (bookingOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Booking booking = bookingOpt.get();
        booking.setStatus("Approved");
        bookingRepository.save(booking);

        return ResponseEntity.ok(booking);
    }

    // Reject Booking
    @PutMapping("/bookings/{id}/reject")
    public ResponseEntity<?> rejectBooking(@PathVariable Long id) {
        Optional<Booking> bookingOpt = bookingRepository.findById(id);
        if (bookingOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Booking booking = bookingOpt.get();
        booking.setStatus("Rejected");
        bookingRepository.save(booking);

        return ResponseEntity.ok(booking);
    }

    // --- MANAGE USERS ---

    // Get all users
    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userRepository.findAll());
    }

    // Block/Unblock user
    @PutMapping("/users/{id}/block")
    public ResponseEntity<?> toggleBlockUser(@PathVariable Long id) {
        Optional<User> userOpt = userRepository.findById(id);
        if (userOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        User user = userOpt.get();
        boolean newBlockState = (user.getIsBlocked() == null) || !user.getIsBlocked();
        user.setIsBlocked(newBlockState);
        userRepository.save(user);

        return ResponseEntity.ok(user);
    }

    // Delete user
    @DeleteMapping("/users/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        Optional<User> userOpt = userRepository.findById(id);
        if (userOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        userRepository.delete(userOpt.get());
        return ResponseEntity.ok("User deleted successfully!");
    }
}
