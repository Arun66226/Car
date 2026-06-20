import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Calendar, MapPin, IndianRupee, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const MyBookings = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/bookings/my', {
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load bookings');
        return res.json();
      })
      .then((data) => {
        setBookings(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [user.token]);

  const getStatusBadgeClass = (status) => {
    switch (status.toLowerCase()) {
      case 'approved': return 'badge-approved';
      case 'rejected': return 'badge-rejected';
      default: return 'badge-pending';
    }
  };

  return (
    <div className="container">
      <div className="section-header" style={{ marginBottom: '3rem' }}>
        <div className="section-title">
          <h2>My Bookings</h2>
          <p className="section-subtitle">Track your active rental bookings and rental history</p>
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '5rem', color: 'var(--text-secondary)' }}>
          Loading your reservations...
        </div>
      ) : bookings.length > 0 ? (
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Car Details</th>
                <th>Trip Details (Pickup ➔ Drop)</th>
                <th>Dates</th>
                <th>Deposit Paid</th>
                <th>Approval Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id}>
                  <td style={{ fontWeight: 700, color: 'var(--accent)' }}>{booking.bookingId}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <img 
                        src={booking.car?.imageUrl || 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=600&auto=format&fit=crop'} 
                        alt={booking.car?.name} 
                        style={{ width: '60px', height: '40px', objectFit: 'cover', borderRadius: '4px', border: '1px solid var(--card-border)' }}
                      />
                      <div>
                        <div style={{ fontWeight: 600, color: '#fff' }}>{booking.car?.name || 'Selected Car'}</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{booking.car?.fuelType}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
                      <MapPin size={14} style={{ color: 'var(--primary)', flexShrink: 0 }} />
                      <span>{booking.pickupLocation}</span>
                      <ArrowRight size={14} style={{ color: 'var(--text-muted)' }} />
                      <span>{booking.dropLocation}</span>
                    </div>
                  </td>
                  <td style={{ fontSize: '0.9rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                      <span><b>From:</b> {booking.pickupDate}</span>
                      <span><b>To:</b> {booking.returnDate}</span>
                    </div>
                  </td>
                  <td style={{ fontWeight: 600, color: 'var(--success)' }}>
                    ₹{Math.round(booking.advanceAmount)}
                  </td>
                  <td>
                    <span className={`badge ${getStatusBadgeClass(booking.status)}`}>
                      {booking.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '4rem 1.5rem', borderRadius: 'var(--border-radius)', background: 'var(--bg-secondary)', border: '1px solid var(--card-border)' }}>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>No Bookings Yet</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
            You have not made any vehicle reservations with us yet.
          </p>
          <Link to="/cars" className="btn btn-primary">
            Book Your First Ride
          </Link>
        </div>
      )}
    </div>
  );
};

export default MyBookings;
