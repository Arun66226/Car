import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Search, CheckCircle, XCircle, FileText, ArrowLeft, ArrowRight, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const ManageBookings = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    fetchBookings();
  }, [user.token]);

  const fetchBookings = () => {
    setLoading(true);
    fetch('/api/admin/bookings', {
      headers: { 'Authorization': `Bearer ${user.token}` }
    })
      .then((res) => res.json())
      .then((data) => {
        setBookings(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  // Search and Filter bookings
  useEffect(() => {
    let result = bookings;

    if (search.trim()) {
      const term = search.toLowerCase();
      result = result.filter(
        (b) =>
          b.bookingId.toLowerCase().includes(term) ||
          b.customerName.toLowerCase().includes(term) ||
          b.customerMobile.includes(term) ||
          (b.car?.name && b.car.name.toLowerCase().includes(term))
      );
    }

    if (statusFilter) {
      result = result.filter((b) => b.status.toLowerCase() === statusFilter.toLowerCase());
    }

    setFilteredBookings(result);
  }, [bookings, search, statusFilter]);

  const handleApprove = async (id) => {
    try {
      const res = await fetch(`/api/admin/bookings/${id}/approve`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${user.token}` }
      });
      if (res.ok) {
        setBookings(bookings.map((b) => (b.id === id ? { ...b, status: 'Approved' } : b)));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleReject = async (id) => {
    try {
      const res = await fetch(`/api/admin/bookings/${id}/reject`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${user.token}` }
      });
      if (res.ok) {
        setBookings(bookings.map((b) => (b.id === id ? { ...b, status: 'Rejected' } : b)));
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container">
      <Link to="/admin/dashboard" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', color: 'var(--text-secondary)' }}>
        <ArrowLeft size={16} /> Back to Dashboard
      </Link>

      <div className="section-header" style={{ marginBottom: '2.5rem' }}>
        <div className="section-title">
          <h2>Manage Bookings</h2>
          <p className="section-subtitle">Verify, approve, or reject customer rental requests</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="glass" style={{ padding: '1.5rem', marginBottom: '2.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem', alignItems: 'center' }}>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <input
              type="text"
              placeholder="Search by Booking ID, customer name, mobile or vehicle..."
              className="form-input"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ paddingLeft: '2.5rem' }}
            />
            <Search size={18} style={{ position: 'absolute', left: '0.75rem', color: 'var(--text-muted)' }} />
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <select
              className="form-input"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              style={{ cursor: 'pointer' }}
            >
              <option value="">All Statuses</option>
              <option value="pending">Pending Approval</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '5rem', color: 'var(--text-secondary)' }}>
          Loading reservations data...
        </div>
      ) : filteredBookings.length > 0 ? (
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Customer Contact</th>
                <th>Car Details</th>
                <th>Locations</th>
                <th>Dates</th>
                <th>Advance Payment</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map((b) => (
                <tr key={b.id}>
                  <td style={{ fontWeight: 700, color: 'var(--accent)' }}>{b.bookingId}</td>
                  <td>
                    <div>
                      <div style={{ fontWeight: 600, color: '#fff' }}>{b.customerName}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{b.customerMobile}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{b.customerEmail}</div>
                    </div>
                  </td>
                  <td>
                    <div style={{ fontWeight: 600, color: '#fff' }}>{b.car?.name || 'Selected Car'}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>₹{Math.round(b.car?.pricePerDay)}/day</div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.85rem' }}>
                      <MapPin size={12} style={{ color: 'var(--primary)' }} />
                      <span>{b.pickupLocation}</span>
                      <ArrowRight size={12} style={{ color: 'var(--text-muted)' }} />
                      <span>{b.dropLocation}</span>
                    </div>
                  </td>
                  <td style={{ fontSize: '0.85rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span><b>Pick:</b> {b.pickupDate}</span>
                      <span><b>Ret:</b> {b.returnDate}</span>
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ color: 'var(--success)', fontWeight: 600 }}>₹{Math.round(b.advanceAmount)}</span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Paid</span>
                    </div>
                  </td>
                  <td>
                    <span className={`badge ${
                      b.status === 'Approved' ? 'badge-approved' : b.status === 'Rejected' ? 'badge-rejected' : 'badge-pending'
                    }`}>
                      {b.status}
                    </span>
                  </td>
                  <td>
                    {b.status === 'Pending' ? (
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button
                          onClick={() => handleApprove(b.id)}
                          className="btn btn-primary"
                          style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                        >
                          <CheckCircle size={14} /> Approve
                        </button>
                        <button
                          onClick={() => handleReject(b.id)}
                          className="btn btn-danger"
                          style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                        >
                          <XCircle size={14} /> Reject
                        </button>
                      </div>
                    ) : (
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>No actions</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '4rem 1.5rem', borderRadius: 'var(--border-radius)', background: 'var(--bg-secondary)', border: '1px solid var(--card-border)' }}>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>No Bookings Found</h3>
          <p style={{ color: 'var(--text-secondary)' }}>No rental bookings match your search filters.</p>
        </div>
      )}
    </div>
  );
};

export default ManageBookings;
