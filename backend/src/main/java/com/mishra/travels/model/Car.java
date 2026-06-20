package com.mishra.travels.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "cars")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Car {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, length = 100)
    private String name;
    
    @Column(name = "price_per_day", nullable = false)
    private Double pricePerDay;
    
    @Column(nullable = false)
    private Integer capacity;
    
    @Column(name = "fuel_type", nullable = false, length = 50)
    private String fuelType;
    
    @Column(columnDefinition = "TEXT")
    private String features; // Comma-separated features, e.g., "Air Conditioning,Music System"
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    @Column(name = "image_url", length = 500)
    private String imageUrl;
    
    @Column(name = "is_available")
    @Builder.Default
    private Boolean isAvailable = true;
}
