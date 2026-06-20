import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Car, Menu, X, LogOut, User as UserIcon } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
    navigate('/login');
  };

  const isAdmin = user && user.role === 'ADMIN';

  // Active Link Ke Liye Custom Style Function
  const getNavLinkClass = ({ isActive }) => {
    return isActive ? 'nav-link active-glass-link' : 'nav-link';
  };

  // Alignment ke liye inline base styles
  const baseLiStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    whiteSpace: 'nowrap' // Yeh text ko wrap hoke do lines mein break hone se rokega
  };

  const baseLinkStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    whiteSpace: 'nowrap',
    verticalAlign: 'middle'
  };

  return (
    <nav className="navbar glass-nav">
      <div className="nav-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
        {/* Brand Logo with Highlight Accent */}
        <Link to="/" className="logo" onClick={() => setMobileMenuOpen(false)} style={{ display: 'flex', alignItems: 'center' }}>
          <Car size={28} className="logo-car-icon" />
          <span><span style={{ color: '#f59e0b' }}>Mishra</span> Tour & Travels</span>
        </Link>

        {/* Mobile menu toggle */}
        <button 
          className="mobile-menu-btn" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{ color: '#fff' }}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Links Container */}
        <ul 
          className={`nav-links ${mobileMenuOpen ? 'mobile-active' : ''}`} 
          style={mobileMenuOpen ? {
            display: 'flex',
            flexDirection: 'column',
            position: 'absolute',
            top: 'var(--header-height)',
            left: 0,
            right: 0,
            background: 'var(--bg-secondary)',
            borderBottom: '1px solid var(--card-border)',
            padding: '2rem',
            gap: '1.5rem',
            zIndex: 999
          } : {
            display: 'flex',
            alignItems: 'center', // Desktop par saare menu items ko vertically perfect center karega
            gap: '1rem',
            listStyle: 'none',
            margin: 0,
            padding: 0
          }}
        >
          
          {!isAdmin ? (
            <>
              <li style={!mobileMenuOpen ? baseLiStyle : {}}>
                <NavLink to="/" className={getNavLinkClass} onClick={() => setMobileMenuOpen(false)} style={!mobileMenuOpen ? baseLinkStyle : {}}>Home</NavLink>
              </li>
              <li style={!mobileMenuOpen ? baseLiStyle : {}}>
                <NavLink to="/cars" className={getNavLinkClass} onClick={() => setMobileMenuOpen(false)} style={!mobileMenuOpen ? baseLinkStyle : {}}>Cars</NavLink>
              </li>
              <li style={!mobileMenuOpen ? baseLiStyle : {}}>
                <NavLink to="/services" className={getNavLinkClass} onClick={() => setMobileMenuOpen(false)} style={!mobileMenuOpen ? baseLinkStyle : {}}>Services</NavLink>
              </li>
              {user && (
                <li style={!mobileMenuOpen ? baseLiStyle : {}}>
                  <NavLink to="/my-bookings" className={getNavLinkClass} onClick={() => setMobileMenuOpen(false)} style={!mobileMenuOpen ? baseLinkStyle : {}}>My Bookings</NavLink>
                </li>
              )}
              <li style={!mobileMenuOpen ? baseLiStyle : {}}>
                <NavLink to="/about" className={getNavLinkClass} onClick={() => setMobileMenuOpen(false)} style={!mobileMenuOpen ? baseLinkStyle : {}}>About Us</NavLink>
              </li>
              <li style={!mobileMenuOpen ? baseLiStyle : {}}>
                <NavLink to="/contact" className={getNavLinkClass} onClick={() => setMobileMenuOpen(false)} style={!mobileMenuOpen ? baseLinkStyle : {}}>Contact</NavLink>
              </li>
            </>
          ) : (
            <>
              <li style={!mobileMenuOpen ? baseLiStyle : {}}>
                <NavLink to="/admin/dashboard" className={getNavLinkClass} onClick={() => setMobileMenuOpen(false)} style={!mobileMenuOpen ? baseLinkStyle : {}}>Dashboard</NavLink>
              </li>
              <li style={!mobileMenuOpen ? baseLiStyle : {}}>
                <NavLink to="/admin/bookings" className={getNavLinkClass} onClick={() => setMobileMenuOpen(false)} style={!mobileMenuOpen ? baseLinkStyle : {}}>Manage Bookings</NavLink>
              </li>
              <li style={!mobileMenuOpen ? baseLiStyle : {}}>
                <NavLink to="/admin/cars" className={getNavLinkClass} onClick={() => setMobileMenuOpen(false)} style={!mobileMenuOpen ? baseLinkStyle : {}}>Manage Cars</NavLink>
              </li>
              <li style={!mobileMenuOpen ? baseLiStyle : {}}>
                <NavLink to="/admin/users" className={getNavLinkClass} onClick={() => setMobileMenuOpen(false)} style={!mobileMenuOpen ? baseLinkStyle : {}}>Manage Users</NavLink>
              </li>
            </>
          )}

          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginLeft: mobileMenuOpen ? 0 : '1rem', whiteSpace: 'nowrap' }}>
              {!isAdmin && (
                <Link to="/profile" className="nav-link" onClick={() => setMobileMenuOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <UserIcon size={18} />
                  <span>{user.name}</span>
                </Link>
              )}
              {isAdmin && (
                <span style={{ color: 'var(--accent)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <UserIcon size={18} /> Admin Portal
                </span>
              )}
              <button onClick={handleLogout} className="btn btn-outline" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem', display: 'inline-flex', alignItems: 'center', gap: '0.25rem', whiteSpace: 'nowrap' }}>
                <LogOut size={16} /> Logout
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '1rem', marginLeft: mobileMenuOpen ? 0 : '1rem', whiteSpace: 'nowrap' }}>
              <Link to="/login" className="btn btn-outline" onClick={() => setMobileMenuOpen(false)} style={{ padding: '0.5rem 1rem', fontSize: '0.85rem', whiteSpace: 'nowrap' }}>
                Login
              </Link>
              <Link to="/signup" className="btn btn-primary" onClick={() => setMobileMenuOpen(false)} style={{ padding: '0.5rem 1rem', fontSize: '0.85rem', whiteSpace: 'nowrap' }}>
                Sign Up
              </Link>
            </div>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;