package com.mishra.travels.dto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class BookingRequest {
    private Long carId;
    private String customerName;
    private String customerMobile;
    private String customerEmail;
    private String pickupLocation;
    private String dropLocation;
    private LocalDate pickupDate;
    private LocalDate returnDate;
    private String specialRequirements;
    
    // Payment details submitted with booking
    private String paymentMethod;
    private String transactionId;
}
