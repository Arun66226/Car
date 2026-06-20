package com.mishra.travels.controller;

import com.mishra.travels.model.Car;
import com.mishra.travels.repository.CarRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class CarController {

    @Autowired
    private CarRepository carRepository;

    // Public: List all cars or search
    @GetMapping("/cars")
    public ResponseEntity<List<Car>> getAllCars(@RequestParam(value = "search", required = false) String search) {
        if (search != null && !search.trim().isEmpty()) {
            return ResponseEntity.ok(carRepository.searchCars(search));
        }
        return ResponseEntity.ok(carRepository.findAll());
    }

    // Public: View car details
    @GetMapping("/cars/{id}")
    public ResponseEntity<?> getCarById(@PathVariable Long id) {
        Optional<Car> carOpt = carRepository.findById(id);
        if (carOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(carOpt.get());
    }

    // Admin: Add new car
    @PostMapping("/admin/cars")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Car> addCar(@RequestBody Car car) {
        Car savedCar = carRepository.save(car);
        return ResponseEntity.ok(savedCar);
    }

    // Admin: Edit car details
    @PutMapping("/admin/cars/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> editCar(@PathVariable Long id, @RequestBody Car carDetails) {
        Optional<Car> carOpt = carRepository.findById(id);
        if (carOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Car car = carOpt.get();
        car.setName(carDetails.getName());
        car.setPricePerDay(carDetails.getPricePerDay());
        car.setCapacity(carDetails.getCapacity());
        car.setFuelType(carDetails.getFuelType());
        car.setFeatures(carDetails.getFeatures());
        car.setDescription(carDetails.getDescription());
        car.setImageUrl(carDetails.getImageUrl());
        car.setIsAvailable(carDetails.getIsAvailable());

        Car updatedCar = carRepository.save(car);
        return ResponseEntity.ok(updatedCar);
    }

    // Admin: Delete car
    @DeleteMapping("/admin/cars/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteCar(@PathVariable Long id) {
        Optional<Car> carOpt = carRepository.findById(id);
        if (carOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        carRepository.delete(carOpt.get());
        return ResponseEntity.ok("Car deleted successfully!");
    }
}
