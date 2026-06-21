import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Users, Fuel, Shield, CircleCheck, ArrowLeft, Star, Disc, Map, Gauge, Settings } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { MOCK_CARS } from '../mockData';

// ✅ Backend URL
const BASE_URL = "https://car-backend-4qfy.onrender.com";

const CarDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState('');
  const [galleryImages, setGalleryImages] = useState([]);

  useEffect(() => {
    // ✅ Updated fetch call with BASE_URL
    fetch(`${BASE_URL}/api/cars/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Car not found');
        return res.json();
      })
      .then((data) => {
        setCar(data);
        setActiveImage(data.imageUrl);
        
        const mainImg = data.imageUrl;
        const fallbackGallery = [
          mainImg,
          'https://images.unsplash.com/photo-1617469767053-d3b508a0d84d?q=80&w=600&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=600&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=600&auto=format&fit=crop'
        ];
        setGalleryImages(fallbackGallery);
        setLoading(false);
      })
      .catch((err) => {
        console.warn("Backend error, using mock data:", err);
        const mockCar = MOCK_CARS.find(c => c.id === parseInt(id));
        if (mockCar) {
          setCar(mockCar);
          setActiveImage(mockCar.imageUrl);
          setGalleryImages([
            mockCar.imageUrl,
            'https://images.unsplash.com/photo-1617469767053-d3b508a0d84d?q=80&w=600&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=600&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=600&auto=format&fit=crop'
          ]);
        }
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="container" style={{ textAlign: 'center', padding: '5rem' }}>
        Loading vehicle details...
      </div>
    );
  }

  if (!car) {
    return (
      <div className="container" style={{ textAlign: 'center', padding: '5rem' }}>
        <h2 style={{ marginBottom: '1rem' }}>Vehicle Not Found</h2>
        <Link to="/cars" className="btn btn-primary">
          <ArrowLeft size={16} /> Back to Catalog
        </Link>
      </div>
    );
  }

  const featuresList = car.features ? car.features.split(',') : [];

  const handleBookNow = () => {
    if (!user) {
      navigate('/login', { state: { from: { pathname: `/book/${id}` } } });
    } else {
      navigate(`/book/${id}`);
    }
  };

  const getFeatureIcon = (feature) => {
    const name = feature.toLowerCase().trim();
    if (name.includes('ac') || name.includes('air conditioning')) return <Disc size={18} />;
    if (name.includes('music') || name.includes('audio')) return <Disc size={18} />;
    if (name.includes('gps') || name.includes('navigation')) return <Map size={18} />;
    if (name.includes('steering') || name.includes('drive')) return <Settings size={18} />;
    return <CircleCheck size={18} />;
  };

  return (
    <div className="container">
      <Link to="/cars" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', color: 'var(--text-secondary)' }}>
        <ArrowLeft size={16} /> Back to Cars
      </Link>

      <div className="car-details-layout">
        <div className="car-gallery">
          <img src={activeImage} alt={car.name} className="main-gallery-img" />
          <div className="gallery-thumbs">
            {galleryImages.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`Thumbnail ${idx + 1}`}
                className={`gallery-thumb ${activeImage === img ? 'active' : ''}`}
                onClick={() => setActiveImage(img)}
              />
            ))}
          </div>
        </div>

        <div className="glass" style={{ padding: '2.5rem' }}>
          <span style={{ fontSize: '0.85rem', color: car.isAvailable ? 'var(--success)' : 'var(--danger)', fontWeight: 700, textTransform: 'uppercase' }}>
            {car.isAvailable ? '● Instantly Available' : '● Currently Reserved'}
          </span>
          <h1 style={{ fontSize: '2.5rem', margin: '0.5rem 0 0.25rem' }}>{car.name}</h1>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--accent)', marginBottom: '1.5rem' }}>
            ₹{Math.round(car.pricePerDay)}<span style={{ fontSize: '1rem', color: 'var(--text-secondary)', fontWeight: 400 }}>/day</span>
          </div>

          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: '1.7' }}>
            {car.description || 'No description available for this premium vehicle.'}
          </p>

          <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', fontFamily: 'var(--font-heading)' }}>Specifications</h3>
          <div className="car-specs">
            <div className="spec-item">
              <span className="spec-label">Capacity</span>
              <span className="spec-val"><Users size={18} /> {car.capacity} Seater</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Fuel Type</span>
              <span className="spec-val"><Fuel size={18} /> {car.fuelType}</span>
            </div>
          </div>

          <button
            onClick={handleBookNow}
            className="btn btn-primary"
            style={{ width: '100%', padding: '1rem', fontSize: '1.1rem', marginTop: '2rem' }}
            disabled={!car.isAvailable}
          >
            {car.isAvailable ? 'Book This Car' : 'Currently Unavailable'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;