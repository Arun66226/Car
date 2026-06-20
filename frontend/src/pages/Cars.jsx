import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import CarCard from '../components/CarCard';
import { Search } from 'lucide-react';
import { MOCK_CARS } from '../mockData';

const Cars = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQueries = searchParams.get('search') || '';

  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(searchQueries);

  // Filter States
  const [fuelFilter, setFuelFilter] = useState('');
  const [capacityFilter, setCapacityFilter] = useState('');

  useEffect(() => {
    fetch('/api/cars')
      .then((res) => res.json())
      .then((data) => {
        // 👇 YEH rha console.log jo browser mein check karna hai
        console.log("=== BACKEND DATA RECEIVED ===", data);

        const normalizedData = data.map(car => ({
          ...car,
          imageUrl: car.imageUrl || car.image_url
        }));
        setCars(normalizedData);
        setLoading(false);
      })
      .catch((err) => {
        console.warn("Backend offline, using fallback mock data:", err);
        const normalizedMock = MOCK_CARS.map(car => ({
          ...car,
          imageUrl: car.imageUrl || car.image_url
        }));
        setCars(normalizedMock);
        setLoading(false);
      });
  }, []);

  // Update search input when query param changes
  useEffect(() => {
    setSearchTerm(searchQueries);
  }, [searchQueries]);

  // Apply filters and searches
  useEffect(() => {
    let result = cars;

    // Search query filter
    if (searchTerm.trim()) {
      const query = searchTerm.toLowerCase();
      result = result.filter(
        (c) =>
          (c.name && c.name.toLowerCase().includes(query)) ||
          (c.description && c.description.toLowerCase().includes(query)) ||
          (c.features && c.features.toLowerCase().includes(query))
      );
    }

    // Fuel Type filter
    if (fuelFilter) {
      result = result.filter((c) => c.fuelType && c.fuelType.toLowerCase() === fuelFilter.toLowerCase());
    }

    // Capacity filter
    if (capacityFilter) {
      result = result.filter((c) => c.capacity === parseInt(capacityFilter));
    }

    setFilteredCars(result);
  }, [cars, searchTerm, fuelFilter, capacityFilter]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value) {
      setSearchParams({ search: value });
    } else {
      setSearchParams({});
    }
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setFuelFilter('');
    setCapacityFilter('');
    setSearchParams({});
  };

  return (
    <div className="container">
      <div className="section-header" style={{ marginBottom: '3rem' }}>
        <div className="section-title">
          <h2>Our Fleet</h2>
          <p className="section-subtitle">Explore our range of premium cars available for rent</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="glass" style={{ padding: '1.5rem', marginBottom: '2.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1fr 1fr auto', gap: '1rem', alignItems: 'center', position: 'relative', zIndex: 10 }}>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <input
              type="text"
              placeholder="Search cars by name or features..."
              className="form-input"
              value={searchTerm}
              onChange={handleSearchChange}
              style={{ paddingLeft: '2.5rem' }}
            />
            <Search size={18} style={{ position: 'absolute', left: '0.75rem', color: 'var(--text-muted)' }} />
          </div>

          {/* FUEL FILTER DROPDOWN */}
          <div className="form-group" style={{ marginBottom: 0 }}>
            <select
              className="form-input"
              value={fuelFilter}
              onChange={(e) => setFuelFilter(e.target.value)}
              style={{ 
                cursor: 'pointer',
                backgroundColor: '#111827',
                color: '#ffffff',
                border: '1px solid var(--card-border)'
              }}
            >
              <option value="" style={{ backgroundColor: '#111827', color: '#ffffff' }}>All Fuel Types</option>
              <option value="diesel" style={{ backgroundColor: '#111827', color: '#ffffff' }}>Diesel</option>
              <option value="petrol" style={{ backgroundColor: '#111827', color: '#ffffff' }}>Petrol</option>
              <option value="petrol/cng" style={{ backgroundColor: '#111827', color: '#ffffff' }}>CNG</option>
            </select>
          </div>

          {/* CAPACITY FILTER DROPDOWN */}
          <div className="form-group" style={{ marginBottom: 0 }}>
            <select
              className="form-input"
              value={capacityFilter}
              onChange={(e) => setCapacityFilter(e.target.value)}
              style={{ 
                cursor: 'pointer',
                backgroundColor: '#111827',
                color: '#ffffff',
                border: '1px solid var(--card-border)'
              }}
            >
              <option value="" style={{ backgroundColor: '#111827', color: '#ffffff' }}>All Capacities</option>
              <option value="2" style={{ backgroundColor: '#111827', color: '#ffffff' }}>2 Seater</option>
              <option value="4" style={{ backgroundColor: '#111827', color: '#ffffff' }}>4 Seater</option>
              <option value="5" style={{ backgroundColor: '#111827', color: '#ffffff' }}>5 Seater</option>
              <option value="7" style={{ backgroundColor: '#111827', color: '#ffffff' }}>7 Seater</option>
            </select>
          </div>

          <button
            onClick={handleResetFilters}
            className="btn btn-outline"
            style={{ height: '100%', padding: '0.75rem 1.25rem', whiteSpace: 'nowrap' }}
          >
            Reset
          </button>
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '4rem', fontSize: '1.2rem', color: 'var(--text-secondary)' }}>
          Loading cars catalog...
        </div>
      ) : filteredCars.length > 0 ? (
        <div className="cars-grid">
          {filteredCars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '4rem', borderRadius: 'var(--border-radius)', background: 'var(--bg-secondary)', border: '1px solid var(--card-border)' }}>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>No Cars Found</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
            We couldn't find any vehicles matching your search criteria.
          </p>
          <button onClick={handleResetFilters} className="btn btn-primary">
            Clear Search & Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default Cars;