import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Search, UserX, UserCheck, Trash2, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const ManageUsers = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchUsers();
  }, [user.token]);

  const fetchUsers = () => {
    setLoading(true);
    fetch('/api/admin/users', {
      headers: { 'Authorization': `Bearer ${user.token}` }
    })
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  // Filter users based on search
  useEffect(() => {
    if (search.trim()) {
      const term = search.toLowerCase();
      const filtered = users.filter(
        (u) =>
          u.name.toLowerCase().includes(term) ||
          u.email.toLowerCase().includes(term) ||
          u.mobile.includes(term)
      );
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers(users);
    }
  }, [users, search]);

  const handleToggleBlock = async (id) => {
    try {
      const res = await fetch(`/api/admin/users/${id}/block`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${user.token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setUsers(users.map((u) => (u.id === id ? { ...u, isBlocked: data.isBlocked } : u)));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user? All their bookings will be detached.')) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/users/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${user.token}` }
      });
      if (res.ok) {
        setUsers(users.filter((u) => u.id !== id));
      } else {
        alert('Failed to delete user.');
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
          <h2>Manage Users</h2>
          <p className="section-subtitle">View active registrations, block accounts, or remove client records</p>
        </div>
      </div>

      {/* Search Input */}
      <div className="glass" style={{ padding: '1.5rem', marginBottom: '2.5rem' }}>
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <input
            type="text"
            placeholder="Search users by name, email or mobile..."
            className="form-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ paddingLeft: '2.5rem' }}
          />
          <Search size={18} style={{ position: 'absolute', left: '0.75rem', color: 'var(--text-muted)' }} />
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '5rem', color: 'var(--text-secondary)' }}>
          Loading user accounts...
        </div>
      ) : filteredUsers.length > 0 ? (
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Full Name</th>
                <th>Email Address</th>
                <th>Mobile Number</th>
                <th>Register Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((u) => (
                <tr key={u.id}>
                  <td style={{ fontWeight: 600 }}>#{u.id}</td>
                  <td style={{ color: '#fff', fontWeight: 600 }}>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.mobile}</td>
                  <td style={{ fontSize: '0.85rem' }}>
                    {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : 'N/A'}
                  </td>
                  <td>
                    <span className={`badge ${u.isBlocked ? 'badge-rejected' : 'badge-approved'}`}>
                      {u.isBlocked ? 'Blocked' : 'Active'}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button
                        onClick={() => handleToggleBlock(u.id)}
                        className="btn btn-outline"
                        style={{
                          padding: '0.4rem',
                          color: u.isBlocked ? 'var(--success)' : 'var(--danger)',
                          borderColor: u.isBlocked ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'
                        }}
                        title={u.isBlocked ? 'Unblock User' : 'Block User'}
                      >
                        {u.isBlocked ? <UserCheck size={16} /> : <UserX size={16} />}
                      </button>
                      <button
                        onClick={() => handleDelete(u.id)}
                        className="btn btn-outline"
                        style={{ padding: '0.4rem', color: 'var(--danger)', border: '1px solid rgba(239, 68, 68, 0.3)' }}
                        title="Delete User"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '4rem 1.5rem', borderRadius: 'var(--border-radius)', background: 'var(--bg-secondary)', border: '1px solid var(--card-border)' }}>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>No Users Found</h3>
          <p style={{ color: 'var(--text-secondary)' }}>No registered users match your search criteria.</p>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
