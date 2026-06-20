import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ArrowLeft, Calendar, MapPin, MessageSquare, User, Phone, Mail } from 'lucide-react';

const BookingForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Form State (Aapka exact original form state)
  const [formData, setFormData] = useState({
    customerName: '',
    customerMobile: '',
    customerEmail: '',
    pickupLocation: '',
    dropLocation: '',
    pickupDate: '',
    returnDate: '',
    specialRequirements: ''
  });
  
  const [error, setError] = useState('');

  // Autofill user details once loaded (Original safe logic)
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        customerName: user.name || '',
        customerMobile: user.mobile || '',
        customerEmail: user.email || ''
      }));
    }
  }, [user]);

  useEffect(() => {
    fetch(`/api/cars/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Car not found');
        return res.json();
      })
      .then((data) => {
        setCar(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const calculateDays = () => {
    if (!formData.pickupDate || !formData.returnDate) return 0;
    const pDate = new Date(formData.pickupDate);
    const rDate = new Date(formData.returnDate);
    const diffTime = rDate - pDate;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const days = calculateDays();
    if (days <= 0) {
      setError('Return date must be after pickup date!');
      return;
    }

    const today = new Date();
    today.setHours(0,0,0,0);
    const pDate = new Date(formData.pickupDate);
    if (pDate < today) {
      setError('Pickup date cannot be in the past!');
      return;
    }

    // Go to Payment page with booking form data
    const bookingDetails = {
      ...formData,
      carId: car.id,
      carName: car.name,
      pricePerDay: car.pricePerDay,
      totalDays: days,
      totalCost: days * car.pricePerDay,
      advanceAmount: 100.00
    };

    navigate('/payment', { state: { bookingDetails } });
  };

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
        <h2>Selected Car Not Found</h2>
        <Link to="/cars" className="btn btn-primary">Back to Catalog</Link>
      </div>
    );
  }

  const days = calculateDays();
  const totalCost = days * car.pricePerDay;

  // Google Map Search query building based on user typing
  const mapQuery = formData.pickupLocation && formData.dropLocation 
    ? `${formData.pickupLocation} to ${formData.dropLocation}`
    : formData.pickupLocation || formData.dropLocation || "Delhi, India";

  return (
    <div className="container">
      <Link to={`/cars/${id}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', color: 'var(--text-secondary)' }}>
        <ArrowLeft size={16} /> Back to Details
      </Link>

      {/* Main Container Layout Splitted to Forms & Sidemenu */}
      <div className="booking-form-layout" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '2rem', alignItems: 'start' }}>
        
        {/* Left Section: Form + Direct Google Map Card */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          <div className="glass" style={{ padding: '2.5rem' }}>
            <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>Booking Information</h2>
            
            {error && (
              <div className="alert-banner alert-error" style={{ marginBottom: '1.5rem' }}>
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', borderBottom: '1px solid var(--card-border)', paddingBottom: '0.5rem', color: 'var(--accent)' }}>
                1. Customer Information
              </h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label" htmlFor="customerName">Full Name</label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type="text"
                      id="customerName"
                      name="customerName"
                      className="form-input"
                      required
                      value={formData.customerName}
                      onChange={handleChange}
                      style={{ paddingLeft: '2.5rem' }}
                    />
                    <User size={18} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="customerMobile">Mobile Number</label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type="tel"
                      id="customerMobile"
                      name="customerMobile"
                      className="form-input"
                      required
                      pattern="[0-9]{10}"
                      value={formData.customerMobile}
                      onChange={handleChange}
                      style={{ paddingLeft: '2.5rem' }}
                    />
                    <Phone size={18} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="customerEmail">Email Address</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="email"
                    id="customerEmail"
                    name="customerEmail"
                    className="form-input"
                    required
                    value={formData.customerEmail}
                    onChange={handleChange}
                    style={{ paddingLeft: '2.5rem' }}
                  />
                  <Mail size={18} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                </div>
              </div>

              <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', borderBottom: '1px solid var(--card-border)', paddingBottom: '0.5rem', color: 'var(--accent)', marginTop: '2rem' }}>
                2. Trip Information
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label" htmlFor="pickupLocation">Pickup Location</label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type="text"
                      id="pickupLocation"
                      name="pickupLocation"
                      className="form-input"
                      placeholder="E.g. Delhi Airport"
                      required
                      value={formData.pickupLocation}
                      onChange={handleChange}
                      style={{ paddingLeft: '2.5rem' }}
                    />
                    <MapPin size={18} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="dropLocation">Drop Location</label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type="text"
                      id="dropLocation"
                      name="dropLocation"
                      className="form-input"
                      placeholder="E.g. Agra Hotel"
                      required
                      value={formData.dropLocation}
                      onChange={handleChange}
                      style={{ paddingLeft: '2.5rem' }}
                    />
                    <MapPin size={18} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  </div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label" htmlFor="pickupDate">Pickup Date</label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type="date"
                      id="pickupDate"
                      name="pickupDate"
                      className="form-input"
                      required
                      value={formData.pickupDate}
                      onChange={handleChange}
                      style={{ paddingLeft: '2.5rem', color: '#fff' }}
                    />
                    <Calendar size={18} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="returnDate">Return Date</label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type="date"
                      id="returnDate"
                      name="returnDate"
                      className="form-input"
                      required
                      value={formData.returnDate}
                      onChange={handleChange}
                      style={{ paddingLeft: '2.5rem', color: '#fff' }}
                    />
                    <Calendar size={18} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="specialRequirements">Special Requirements / Notes</label>
                <div style={{ position: 'relative' }}>
                  <textarea
                    id="specialRequirements"
                    name="specialRequirements"
                    className="form-input"
                    rows="3"
                    placeholder="E.g. Need child seat, luggage carrier..."
                    value={formData.specialRequirements}
                    onChange={handleChange}
                    style={{ paddingLeft: '2.5rem', resize: 'vertical' }}
                  />
                  <MessageSquare size={18} style={{ position: 'absolute', left: '0.75rem', top: '1rem', color: 'var(--text-muted)' }} />
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: '100%', padding: '1rem', fontSize: '1.1rem', marginTop: '2rem' }}
              >
                Proceed To Payment
              </button>
            </form>
          </div>

          {/* 100% Reliable Official Google Maps Embedded UI Card */}
          <div className="glass" style={{ padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--card-border)' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <MapPin size={18} /> Live Route Preview Map
            </h3>
            <div style={{ width: '100%', height: '350px', borderRadius: '8px', overflow: 'hidden', background: '#1e293b' }}>
              <iframe
                title="Dynamic Google Route Map"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                src={`https://maps.google.com/maps?q=${encodeURIComponent(mapQuery)}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
              ></iframe>
            </div>
          </div>

        </div>

        {/* Right Section: Car Summary Card (Exact original unchanged panel) */}
        <div className="glass sidebar-car-summary" style={{ position: 'sticky', top: '2rem' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: '#fff' }}>Selected Car Details</h3>
          <img
            src={car.imageUrl || 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=600&auto=format&fit=crop'}
            alt={car.name}
            style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '8px', marginBottom: '1rem', border: '1px solid var(--card-border)' }}
          />
          <h4 style={{ fontSize: '1.15rem', marginBottom: '0.5rem' }}>{car.name}</h4>
          
          <div className="summary-row" style={{ borderBottom: '1px solid var(--card-border)', paddingBottom: '0.5rem', marginBottom: '1rem' }}>
            <span>Seating Capacity:</span>
            <span style={{ fontWeight: 600 }}>{car.capacity} Seater</span>
          </div>

          <div className="summary-row">
            <span>Price per Day:</span>
            <span>₹{Math.round(car.pricePerDay)}</span>
          </div>
          <div className="summary-row">
            <span>Rental Duration:</span>
            <span>{days} {days === 1 ? 'Day' : 'Days'}</span>
          </div>

          {days > 0 && (
            <>
              <div className="summary-row summary-total">
                <span>Total Estimations:</span>
                <span style={{ color: 'var(--accent)' }}>₹{Math.round(totalCost)}</span>
              </div>
              <div className="summary-row" style={{ marginTop: '0.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                <span>Booking Advance due now:</span>
                <span style={{ color: 'var(--success)', fontWeight: 600 }}>₹100</span>
              </div>
            </>
          )}
        </div>

      </div>
    </div>
  );
};

export default BookingForm;