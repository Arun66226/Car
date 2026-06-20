import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Users, Car, Calendar, IndianRupee, ShieldAlert, CheckCircle, XCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalCars: 0,
    totalBookings: 0,
    totalRevenue: 0.0
  });
  
  const [recentBookings, setRecentBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch statistics
    const fetchStats = async () => {
      try {
        const statsRes = await fetch('/api/admin/stats', {
          headers: { 'Authorization': `Bearer ${user.token}` }
        });
        const statsData = await statsRes.json();
        setStats(statsData);

        // Fetch bookings
        const bookingsRes = await fetch('/api/admin/bookings', {
          headers: { 'Authorization': `Bearer ${user.token}` }
        });
        const bookingsData = await bookingsRes.json();
        setRecentBookings(bookingsData.slice(0, 5)); // show latest 5
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchStats();
  }, [user.token]);

  const handleApprove = async (id) => {
    try {
      const res = await fetch(`/api/admin/bookings/${id}/approve`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${user.token}` }
      });
      if (res.ok) {
        // Refresh bookings and stats
        const updatedBookings = recentBookings.map(b => b.id === id ? { ...b, status: 'Approved' } : b);
        setRecentBookings(updatedBookings);
        // Refresh stats
        const statsRes = await fetch('/api/admin/stats', {
          headers: { 'Authorization': `Bearer ${user.token}` }
        });
        setStats(await statsRes.json());
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
        const updatedBookings = recentBookings.map(b => b.id === id ? { ...b, status: 'Rejected' } : b);
        setRecentBookings(updatedBookings);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container">
      <div className="section-header" style={{ marginBottom: '2.5rem' }}>
        <div className="section-title">
          <h2>Admin Dashboard</h2>
          <p className="section-subtitle">System overview, metrics, and quick actions</p>
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '5rem', color: 'var(--text-secondary)' }}>
          Loading dashboard metrics...
        </div>
      ) : (
        <>
          {/* Statistics Grid */}
          <div className="stats-grid">
            <div className="glass stat-card">
              <div className="stat-icon users">
                <Users size={24} />
              </div>
              <div className="stat-info">
                <span className="stat-label">Total Users</span>
                <span className="stat-number">{stats.totalUsers}</span>
              </div>
            </div>

            <div className="glass stat-card">
              <div className="stat-icon cars">
                <Car size={24} />
              </div>
              <div className="stat-info">
                <span className="stat-label">Total Cars</span>
                <span className="stat-number">{stats.totalCars}</span>
              </div>
            </div>

            <div className="glass stat-card">
              <div className="stat-icon bookings">
                <Calendar size={24} />
              </div>
              <div className="stat-info">
                <span className="stat-label">Bookings</span>
                <span className="stat-number">{stats.totalBookings}</span>
              </div>
            </div>

            <div className="glass stat-card">
              <div className="stat-icon revenue">
                <IndianRupee size={24} />
              </div>
              <div className="stat-info">
                <span className="stat-label">Total Revenue</span>
                <span className="stat-number">₹{Math.round(stats.totalRevenue)}</span>
              </div>
            </div>
          </div>

          {/* Quick Action links */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
            <Link to="/admin/bookings" className="btn btn-outline" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', height: 'auto' }}>
              <span style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff' }}>Manage Bookings</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Approve or reject rentals</span>
            </Link>
            <Link to="/admin/cars" className="btn btn-outline" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', height: 'auto' }}>
              <span style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff' }}>Manage Cars Fleet</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Add, edit or delete cars</span>
            </Link>
            <Link to="/admin/users" className="btn btn-outline" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', height: 'auto' }}>
              <span style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff' }}>Manage Users</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>View, block, or delete users</span>
            </Link>
          </div>

          {/* Recent Bookings Panel */}
          <div className="glass" style={{ padding: '2rem' }}>
            <div className="section-header" style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.25rem' }}>Recent Rental Bookings</h3>
              <Link to="/admin/bookings" style={{ color: 'var(--accent)', fontSize: '0.9rem', fontWeight: 600 }}>
                View All Bookings
              </Link>
            </div>

            {recentBookings.length > 0 ? (
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Booking ID</th>
                      <th>Customer Name</th>
                      <th>Mobile Number</th>
                      <th>Car Name</th>
                      <th>Pickup Location</th>
                      <th>Drop Location</th>
                      <th>Status</th>
                      <th>Quick Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentBookings.map((b) => (
                      <tr key={b.id}>
                        <td style={{ fontWeight: 700, color: 'var(--accent)' }}>{b.bookingId}</td>
                        <td style={{ color: '#fff' }}>{b.customerName}</td>
                        <td>{b.customerMobile}</td>
                        <td>{b.car?.name || 'Selected Car'}</td>
                        <td>{b.pickupLocation}</td>
                        <td>{b.dropLocation}</td>
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
                                className="btn btn-outline"
                                style={{ padding: '0.35rem', color: 'var(--success)', border: '1px solid rgba(16, 185, 129, 0.3)' }}
                                title="Approve Booking"
                              >
                                <CheckCircle size={16} />
                              </button>
                              <button
                                onClick={() => handleReject(b.id)}
                                className="btn btn-outline"
                                style={{ padding: '0.35rem', color: 'var(--danger)', border: '1px solid rgba(239, 68, 68, 0.3)' }}
                                title="Reject Booking"
                              >
                                <XCircle size={16} />
                              </button>
                            </div>
                          ) : (
                            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Verified</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>
                No bookings found.
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default AdminDashboard;
