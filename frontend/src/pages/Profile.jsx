import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Phone, Mail, Lock, ShieldCheck, AlertCircle } from 'lucide-react';

const Profile = () => {
  const { user, updateLocalUser } = useAuth();
  
  // Profile edit states
  const [profileData, setProfileData] = useState({
    name: '',
    mobile: '',
    email: ''
  });
  const [profileError, setProfileError] = useState('');
  const [profileSuccess, setProfileSuccess] = useState('');
  const [profileSubmitting, setProfileSubmitting] = useState(false);

  // Password edit states
  const [passData, setPassData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passError, setPassError] = useState('');
  const [passSuccess, setPassSuccess] = useState('');
  const [passSubmitting, setPassSubmitting] = useState(false);

  // Fetch latest user details on load
  useEffect(() => {
    fetch('/api/users/profile', {
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
      .then((res) => {
        if (!res.ok) throw new Error('Could not fetch profile');
        return res.json();
      })
      .then((data) => {
        setProfileData({
          name: data.name || '',
          mobile: data.mobile || '',
          email: data.email || ''
        });
      })
      .catch((err) => {
        console.error(err);
        // Fallback to context user details
        setProfileData({
          name: user.name || '',
          mobile: user.mobile || '',
          email: user.email || ''
        });
      });
  }, [user]);

  const handleProfileChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handlePassChange = (e) => {
    setPassData({ ...passData, [e.target.name]: e.target.value });
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setProfileError('');
    setProfileSuccess('');
    setProfileSubmitting(true);

    try {
      const response = await fetch('/api/users/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify({
          name: profileData.name,
          mobile: profileData.mobile
        })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to update profile');
      }

      // Success! Update details in context as well
      updateLocalUser({ name: data.name, mobile: data.mobile });
      setProfileSuccess('Profile details updated successfully!');
    } catch (err) {
      setProfileError(err.message || 'Failed to update profile.');
    } finally {
      setProfileSubmitting(false);
    }
  };

  const handlePassSubmit = async (e) => {
    e.preventDefault();
    setPassError('');
    setPassSuccess('');

    if (passData.newPassword !== passData.confirmPassword) {
      setPassError('New passwords do not match!');
      return;
    }

    if (passData.newPassword.length < 6) {
      setPassError('Password must be at least 6 characters long.');
      return;
    }

    setPassSubmitting(true);
    try {
      const response = await fetch('/api/users/change-password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify({
          currentPassword: passData.currentPassword,
          newPassword: passData.newPassword
        })
      });

      const data = await response.text();
      if (!response.ok) {
        throw new Error(data || 'Failed to change password');
      }

      setPassSuccess('Password updated successfully!');
      setPassData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      setPassError(err.message || 'Failed to update password.');
    } finally {
      setPassSubmitting(false);
    }
  };

  return (
    <div className="container" style={{ maxWidth: '900px' }}>
      <div className="section-header" style={{ marginBottom: '3rem' }}>
        <div className="section-title">
          <h2>My Profile</h2>
          <p className="section-subtitle">Manage your personal settings and account security</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '2.5rem', alignItems: 'start' }}>
        
        {/* Profile Info */}
        <div className="glass" style={{ padding: '2rem' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--card-border)', paddingBottom: '0.5rem', color: 'var(--accent)' }}>
            Edit Profile Details
          </h3>

          {profileError && (
            <div className="alert-banner alert-error" style={{ marginBottom: '1.5rem' }}>
              <span>{profileError}</span>
            </div>
          )}

          {profileSuccess && (
            <div className="alert-banner alert-success" style={{ marginBottom: '1.5rem' }}>
              <span>{profileSuccess}</span>
            </div>
          )}

          <form onSubmit={handleProfileSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="name">Full Name</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-input"
                  required
                  value={profileData.name}
                  onChange={handleProfileChange}
                  style={{ paddingLeft: '2.5rem' }}
                />
                <User size={18} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="mobile">Mobile Number</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="tel"
                  id="mobile"
                  name="mobile"
                  className="form-input"
                  required
                  pattern="[0-9]{10}"
                  value={profileData.mobile}
                  onChange={handleProfileChange}
                  style={{ paddingLeft: '2.5rem' }}
                />
                <Phone size={18} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="email">Email Address (Cannot be changed)</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="email"
                  id="email"
                  className="form-input"
                  disabled
                  value={profileData.email}
                  style={{ paddingLeft: '2.5rem', opacity: 0.6, cursor: 'not-allowed' }}
                />
                <Mail size={18} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: '100%', marginTop: '1rem' }}
              disabled={profileSubmitting}
            >
              {profileSubmitting ? 'Saving changes...' : 'Save Profile Changes'}
            </button>
          </form>
        </div>

        {/* Change Password */}
        <div className="glass" style={{ padding: '2rem' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--card-border)', paddingBottom: '0.5rem', color: 'var(--accent)' }}>
            Security & Password
          </h3>

          {passError && (
            <div className="alert-banner alert-error" style={{ marginBottom: '1.5rem' }}>
              <span>{passError}</span>
            </div>
          )}

          {passSuccess && (
            <div className="alert-banner alert-success" style={{ marginBottom: '1.5rem' }}>
              <span>{passSuccess}</span>
            </div>
          )}

          <form onSubmit={handlePassSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="currentPassword">Current Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="password"
                  id="currentPassword"
                  name="currentPassword"
                  className="form-input"
                  required
                  placeholder="••••••••"
                  value={passData.currentPassword}
                  onChange={handlePassChange}
                  style={{ paddingLeft: '2.5rem' }}
                />
                <Lock size={18} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="newPassword">New Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  className="form-input"
                  required
                  placeholder="••••••••"
                  value={passData.newPassword}
                  onChange={handlePassChange}
                  style={{ paddingLeft: '2.5rem' }}
                />
                <Lock size={18} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="confirmPassword">Confirm New Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  className="form-input"
                  required
                  placeholder="••••••••"
                  value={passData.confirmPassword}
                  onChange={handlePassChange}
                  style={{ paddingLeft: '2.5rem' }}
                />
                <Lock size={18} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-outline"
              style={{ width: '100%', marginTop: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem' }}
              disabled={passSubmitting}
            >
              <ShieldCheck size={18} />
              {passSubmitting ? 'Updating password...' : 'Change Password'}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default Profile;
