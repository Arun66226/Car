package com.mishra.travels.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "bookings")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Booking {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "booking_id", nullable = false, unique = true, length = 50)
    private String bookingId; // E.g., MTT1001
    
    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;
    
    @ManyToOne
    @JoinColumn(name = "car_id", referencedColumnName = "id")
    private Car car;
    
    @Column(name = "customer_name", nullable = false, length = 100)
    private String customerName;
    
    @Column(name = "customer_mobile", nullable = false, length = 15)
    private String customerMobile;
    
    @Column(name = "customer_email", nullable = false, length = 100)
    private String customerEmail;
    
    @Column(name = "pickup_location", nullable = false)
    private String pickupLocation;
    
    @Column(name = "drop_location", nullable = false)
    private String dropLocation;
    
    @Column(name = "pickup_date", nullable = false)
    private LocalDate pickupDate;
    
    @Column(name = "return_date", nullable = false)
    private LocalDate returnDate;
    
    @Column(name = "special_requirements", columnDefinition = "TEXT")
    private String specialRequirements;
    
    @Column(name = "advance_amount", nullable = false)
    @Builder.Default
    private Double advanceAmount = 100.00;
    
    @Column(nullable = false, length = 50)
    @Builder.Default
    private String status = "Pending"; // Pending, Approved, Rejected
    
    @Column(name = "created_at", insertable = false, updatable = false)
    private LocalDateTime createdAt;
}
