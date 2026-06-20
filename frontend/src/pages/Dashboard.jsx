import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import CarCard from '../components/CarCard';
import { Search, Shield, Clock, IndianRupee, HeartHandshake, ChevronRight, Star } from 'lucide-react';
import { MOCK_CARS } from '../mockData';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [featuredCars, setFeaturedCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch featured cars
    fetch('/api/cars')
      .then((res) => res.json())
      .then((data) => {
        // Filter a few popular cars for display
        const popular = data.filter(c => 
          ['Thar', 'Fortuner', 'Innova Crysta', 'Lamborghini Huracan'].includes(c.name)
        );
        setFeaturedCars(popular.length > 0 ? popular : data.slice(0, 4));
        setLoading(false);
      })
      .catch((err) => {
        console.warn("Backend offline, using fallback mock data:", err);
        const popular = MOCK_CARS.filter(c => 
          ['Thar', 'Fortuner', 'Innova Crysta', 'Lamborghini Huracan'].includes(c.name)
        );
        setFeaturedCars(popular.length > 0 ? popular : MOCK_CARS.slice(0, 4));
        setLoading(false);
      });
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/cars?search=${encodeURIComponent(searchQuery)}`);
    } else {
      navigate('/cars');
    }
  };

  const reviews = [
    { name: 'Arun Mishra', rating: 5, comment: 'Excellent service! The Thar was in brand new condition, and the booking process took less than 2 minutes. Highly recommended!' },
    { name: 'Priya Sharma', rating: 5, comment: 'Booked an Innova for a family trip. The driver was highly professional, and the car was clean and comfortable.' },
    { name: 'Rohan Verma', rating: 4, comment: 'Affordable pricing and fantastic customer support. Had a minor booking issue which was resolved instantly by support.' }
  ];

  return (
    <div className="container">
      {/* Hero / Welcome Message */}
      <section className="hero">
        <h1 className="hero-title">
          {user ? `Welcome Back, ${user.name}!` : 'Mishra Tour & Travels'}
          <br />
          <span>Book Your Dream Ride Today</span>
        </h1>
        <p className="hero-subtitle">
          Experience premium car rental services across India with absolute ease, professional drivers, and 24/7 support.
        </p>

        {/* Search Car Feature */}
        <div className="search-box glass">
          <form onSubmit={handleSearchSubmit} className="search-form">
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <input
                type="text"
                placeholder="Search by car name, type, features..."
                className="form-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ paddingLeft: '2.5rem' }}
              />
              <Search size={18} style={{ position: 'absolute', left: '0.75rem', color: 'var(--text-muted)' }} />
            </div>
            <button type="submit" className="btn btn-primary">
              Search Cars
            </button>
            <Link to="/cars" className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              Browse All
            </Link>
          </form>
        </div>
      </section>

      {/* Featured Cars Section */}
      <section style={{ margin: '4rem 0' }}>
        <div className="section-header">
          <div className="section-title">
            <h2>Our Featured Fleet</h2>
            <p className="section-subtitle">Choose from our handpicked luxury and adventure cars</p>
          </div>
          <Link to="/cars" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--accent)', fontWeight: 600 }}>
            View All Cars <ChevronRight size={16} />
          </Link>
        </div>

        {loading ? (
          <div style={{ textAlignment: 'center', padding: '2rem' }}>Loading featured fleet...</div>
        ) : (
          <div className="cars-grid">
            {featuredCars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        )}
      </section>

      {/* Why Choose Us? */}
      <section style={{ margin: '4rem 0', padding: '3rem 1.5rem', borderRadius: 'var(--border-radius)', background: 'var(--bg-secondary)', border: '1px solid var(--card-border)' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2.2rem', marginBottom: '0.5rem' }}>Why Choose Us?</h2>
          <p style={{ color: 'var(--text-secondary)' }}>We offer an unmatched travel experience across the country</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2rem' }}>
          <div style={{ textAlign: 'center', padding: '1rem' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: 'rgba(59, 130, 246, 0.1)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem' }}>
              <Shield size={28} />
            </div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Professional Drivers</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Licensed, highly experienced, and English-speaking drivers for a safe journey.</p>
          </div>

          <div style={{ textAlign: 'center', padding: '1rem' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem' }}>
              <Clock size={28} />
            </div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>24/7 Customer Support</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Our support team is always active to assist you through your trip bookings.</p>
          </div>

          <div style={{ textAlign: 'center', padding: '1rem' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: 'rgba(245, 158, 11, 0.1)', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem' }}>
              <IndianRupee size={28} />
            </div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Affordable Pricing</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Honest, transparent pricing with no hidden charges. Advance payment is just ₹100.</p>
          </div>

          <div style={{ textAlign: 'center', padding: '1rem' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: 'rgba(139, 92, 246, 0.1)', color: '#8b5cf6', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem' }}>
              <HeartHandshake size={28} />
            </div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Safe Travel Experience</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Clean, sanitized, and GPS-tracked vehicles ensuring total safety for your family.</p>
          </div>
        </div>
      </section>

      {/* Latest Offers & Reviews Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.8fr', gap: '3rem', margin: '4rem 0' }}>
        {/* Offers */}
        <section className="glass" style={{ padding: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Latest Offers</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ padding: '1rem', borderRadius: '8px', borderLeft: '4px solid var(--accent)', background: 'rgba(255, 255, 255, 0.01)' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase' }}>Monsoon Deal</span>
              <h4 style={{ fontSize: '1rem', margin: '0.25rem 0' }}>Get 15% Off Outstation Trips</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Use code <b>RAIN15</b> on outstation bookings. Valid till July 31st.</p>
            </div>
            <div style={{ padding: '1rem', borderRadius: '8px', borderLeft: '4px solid var(--primary)', background: 'rgba(255, 255, 255, 0.01)' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase' }}>First Ride Offer</span>
              <h4 style={{ fontSize: '1rem', margin: '0.25rem 0' }}>Flat ₹500 Cashback</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>First-time users get instant cashback in bookings. Automatically applied.</p>
            </div>
          </div>
        </section>

        {/* Reviews */}
        <section>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', position: 'relative', display: 'inline-block' }}>
            Customer Reviews
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {reviews.map((rev, idx) => (
              <div key={idx} className="glass" style={{ padding: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <h4 style={{ fontSize: '1rem' }}>{rev.name}</h4>
                  <div style={{ display: 'flex', color: 'var(--accent)', gap: '0.1rem' }}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={14} fill={i < rev.rating ? 'var(--accent)' : 'transparent'} />
                    ))}
                  </div>
                </div>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontStyle: 'italic' }}>
                  "{rev.comment}"
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
