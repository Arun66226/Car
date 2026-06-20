import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShieldAlert, Mail, Lock, Eye, EyeOff, ArrowLeft } from 'lucide-react';

const AdminLogin = () => {
  const { loginAdmin } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      await loginAdmin(formData.email, formData.password);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.message || 'Invalid admin credentials.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-layout" style={{ background: 'radial-gradient(circle at bottom right, rgba(245, 158, 11, 0.08), transparent 50%)' }}>
      <div className="auth-card glass" style={{ borderColor: 'rgba(245, 158, 11, 0.2)' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'var(--accent-light)', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ShieldAlert size={28} />
          </div>
        </div>

        <div className="auth-header">
          <h2>Admin Portal</h2>
          <p>Sign in with administrative credentials</p>
        </div>

        {error && (
          <div className="alert-banner alert-error">
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="email">Admin Email</label>
            <div style={{ position: 'relative' }}>
              <input
                type="email"
                id="email"
                name="email"
                className="form-input"
                placeholder="admin@mishratravels.com"
                required
                value={formData.email}
                onChange={handleChange}
                style={{ paddingLeft: '2.5rem' }}
              />
              <Mail size={18} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="password">Password</label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                className="form-input"
                placeholder="••••••••"
                required
                value={formData.password}
                onChange={handleChange}
                style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}
              />
              <Lock size={18} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', cursor: 'pointer' }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-accent"
            style={{ width: '100%', marginTop: '1rem', color: '#0b0f19' }}
            disabled={submitting}
          >
            {submitting ? 'Authenticating...' : 'Login As Admin'}
          </button>
        </form>

        <div className="auth-footer">
          <Link to="/login" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.85rem' }}>
            <ArrowLeft size={14} /> Back to User Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
