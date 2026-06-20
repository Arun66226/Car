import React from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { Check, Calendar, AlertCircle } from 'lucide-react';

const Confirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const booking = location.state?.booking;

  if (!booking) {
    return (
      <div className="container" style={{ textAlign: 'center', padding: '5rem' }}>
        <h2>No Booking Confirmed</h2>
        <Link to="/cars" className="btn btn-primary" style={{ marginTop: '1rem' }}>Browse Fleet</Link>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="glass confirmation-container">
        <div className="success-icon">
          <Check size={40} />
        </div>

        <h1 style={{ fontSize: '2.2rem', marginBottom: '0.5rem' }}>Booking Confirmed!</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', maxWidth: '450px' }}>
          Your payment of ₹{Math.round(booking.advanceAmount)} was processed successfully. Your vehicle has been reserved!
        </p>

        {/* Booking Details Card */}
        <div className="glass" style={{ width: '100%', padding: '1.5rem', marginBottom: '2.5rem', background: 'var(--bg-secondary)', textAlign: 'left' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', borderBottom: '1px solid var(--card-border)', paddingBottom: '0.5rem', color: '#fff' }}>
            Reservation Details
          </h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.95rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Booking ID:</span>
              <span style={{ fontWeight: 700, color: 'var(--accent)' }}>{booking.bookingId}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Selected Car:</span>
              <span style={{ fontWeight: 600 }}>{booking.car?.name || 'Selected Ride'}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Advance Paid:</span>
              <span style={{ fontWeight: 600 }}>₹{Math.round(booking.advanceAmount)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Rental Dates:</span>
              <span style={{ fontWeight: 600 }}>{booking.pickupDate} to {booking.returnDate}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--card-border)', paddingTop: '0.75rem', marginTop: '0.5rem' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Booking Status:</span>
              <span className="badge badge-pending">{booking.status}</span>
            </div>
          </div>
        </div>

        {/* Admin note */}
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', background: 'rgba(59, 130, 246, 0.05)', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(59, 130, 246, 0.1)', marginBottom: '2.5rem', textAlign: 'left' }}>
          <AlertCircle size={20} style={{ color: 'var(--primary)', flexShrink: 0, marginTop: '0.1rem' }} />
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
            <b>Note:</b> Your booking is currently pending administrator approval. Our agent will verify the details and approve your trip shortly. You can monitor the status on your bookings dashboard.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '1rem', width: '100%' }}>
          <Link to="/my-bookings" className="btn btn-primary" style={{ flex: 1 }}>
            View My Bookings
          </Link>
          <Link to="/" className="btn btn-outline" style={{ flex: 1 }}>
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
