package com.mishra.travels.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AdminStatsResponse {
    private long totalUsers;
    private long totalCars;
    private long totalBookings;
    private double totalRevenue;
}
