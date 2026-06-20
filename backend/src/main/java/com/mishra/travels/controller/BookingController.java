package com.mishra.travels.controller;

import com.mishra.travels.dto.BookingRequest;
import com.mishra.travels.model.Booking;
import com.mishra.travels.model.Car;
import com.mishra.travels.model.Payment;
import com.mishra.travels.model.User;
import com.mishra.travels.repository.BookingRepository;
import com.mishra.travels.repository.CarRepository;
import com.mishra.travels.repository.PaymentRepository;
import com.mishra.travels.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CarRepository carRepository;

    @Autowired
    private PaymentRepository paymentRepository;

    // Create a new booking + payment
    @PostMapping
    public ResponseEntity<?> createBooking(@RequestBody BookingRequest request) {
        String email = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("Error: Authenticated user not found!");
        }

        Optional<Car> carOpt = carRepository.findById(request.getCarId());
        if (carOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("Error: Selected car not found!");
        }

        Car car = carOpt.get();
        if (!car.getIsAvailable()) {
            return ResponseEntity.badRequest().body("Error: Selected car is currently unavailable!");
        }

        // Generate Booking ID (Format: MTTXXXX)
        String bookingId = "MTT" + (1000 + (int)(Math.random() * 9000));
        while (bookingRepository.findByBookingId(bookingId).isPresent()) {
            bookingId = "MTT" + (1000 + (int)(Math.random() * 9000));
        }

        User user = userOpt.get();
        
        Booking booking = Booking.builder()
                .bookingId(bookingId)
                .user(user)
                .car(car)
                .customerName(request.getCustomerName())
                .customerMobile(request.getCustomerMobile())
                .customerEmail(request.getCustomerEmail())
                .pickupLocation(request.getPickupLocation())
                .dropLocation(request.getDropLocation())
                .pickupDate(request.getPickupDate())
                .returnDate(request.getReturnDate())
                .specialRequirements(request.getSpecialRequirements())
                .advanceAmount(100.00)
                .status("Pending")
                .build();

        Booking savedBooking = bookingRepository.save(booking);

        // Record Payment
        Payment payment = Payment.builder()
                .bookingId(bookingId)
                .amount(100.00)
                .paymentMethod(request.getPaymentMethod())
                .transactionId(request.getTransactionId())
                .status("Success")
                .build();

        paymentRepository.save(payment);

        return ResponseEntity.ok(savedBooking);
    }

    // List bookings of the logged-in user
    @GetMapping("/my")
    public ResponseEntity<?> getMyBookings() {
        String email = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("Error: Authenticated user not found!");
        }

        List<Booking> bookings = bookingRepository.findByUserIdOrderByCreatedAtDesc(userOpt.get().getId());
        return ResponseEntity.ok(bookings);
    }

    // View specific booking details
    @GetMapping("/{bookingId}")
    public ResponseEntity<?> getBookingDetails(@PathVariable String bookingId) {
        Optional<Booking> bookingOpt = bookingRepository.findByBookingId(bookingId);
        if (bookingOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(bookingOpt.get());
    }
}
