package com.mishra.travels.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "payments")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Payment {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "booking_id", nullable = false, length = 50)
    private String bookingId;
    
    @Column(nullable = false)
    private Double amount;
    
    @Column(name = "payment_method", nullable = false, length = 50)
    private String paymentMethod; // UPI, Google Pay, PhonePe, Paytm
    
    @Column(name = "transaction_id", nullable = false, unique = true, length = 100)
    private String transactionId;
    
    @Column(nullable = false, length = 50)
    @Builder.Default
    private String status = "Success";
    
    @Column(name = "payment_date", insertable = false, updatable = false)
    private LocalDateTime paymentDate;
}
