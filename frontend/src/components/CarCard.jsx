import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Fuel, Sparkles } from 'lucide-react';

const CarCard = ({ car }) => {
  const { id, name, pricePerDay, capacity, fuelType, imageUrl, isAvailable } = car;

  // Fallback default image agar real image crash ho jaye toh
  const defaultImage = 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=600&auto=format&fit=crop';

  const handleImageError = (e) => {
    // Agar link broken hua, toh ye function image ko default image se replace kar dega
    e.target.src = defaultImage;
  };

  return (
    <div className="car-card glass">
      <div className="car-img-wrapper">
        <img 
          src={imageUrl && imageUrl.trim() !== "" ? imageUrl : defaultImage} 
          alt={name} 
          className="car-img" 
          onError={handleImageError} // 👈 FIX: Link galat hone par crash nahi hoga, backup image chalegi
        />
        <div className="car-price-badge">
          ₹{Math.round(pricePerDay)}/day
        </div>
      </div>

      <div className="car-details-content">
        <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>{name}</h3>
        
        <div className="car-meta">
          <div className="car-meta-item">
            <Users size={16} />
            <span>{capacity} Seater</span>
          </div>
          <div className="car-meta-item">
            <Fuel size={16} />
            <span>{fuelType}</span>
          </div>
        </div>

        <div className="car-card-actions" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
          <span style={{ fontSize: '0.8rem', color: isAvailable ? 'var(--success)' : 'var(--danger)', fontWeight: 600 }}>
            {isAvailable ? '● Available' : '● Booked'}
          </span>
          <Link to={`/cars/${id}`} className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CarCard;