import React from 'react';
import { Link } from 'react-router-dom';
import { Car, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer style={{
      backgroundColor: 'var(--bg-secondary)',
      borderTop: '1px solid var(--card-border)',
      padding: '4rem 1.5rem 2rem',
      color: 'var(--text-secondary)'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '3rem',
        marginBottom: '3rem'
      }}>
        <div>
          <div className="logo" style={{ marginBottom: '1.25rem' }}>
            <Car size={24} />
            <span>Mishra</span> Tour & Travels
          </div>
          <p style={{ fontSize: '0.9rem', lineHeight: '1.7' }}>
            Providing high-quality rental vehicles and custom outstation tour packages across India since 2015. Safe, affordable, and memorable travels.
          </p>
        </div>

        <div>
          <h3 style={{ color: '#fff', fontSize: '1.1rem', marginBottom: '1.25rem', fontFamily: 'var(--font-heading)' }}>Quick Links</h3>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem' }}>
            <li><Link to="/" style={{ hover: { color: '#fff' } }}>Home</Link></li>
            <li><Link to="/cars">Available Cars</Link></li>
            <li><Link to="/services">Our Services</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact Support</Link></li>
          </ul>
        </div>

        <div>
          <h3 style={{ color: '#fff', fontSize: '1.1rem', marginBottom: '1.25rem', fontFamily: 'var(--font-heading)' }}>Contact Info</h3>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem' }}>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Phone size={16} className="contact-icon" style={{ color: 'var(--accent)' }} />
              <span>+91 98765 43210</span>
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Mail size={16} className="contact-icon" style={{ color: 'var(--accent)' }} />
              <span>info@mishratravels.com</span>
            </li>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
              <MapPin size={16} className="contact-icon" style={{ color: 'var(--accent)', marginTop: '0.2rem' }} />
              <span>123 Travel Enclave, Connaught Place,<br />New Delhi, India - 110001</span>
            </li>
          </ul>
        </div>
      </div>

      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        paddingTop: '2rem',
        borderTop: '1px solid var(--card-border)',
        textAlign: 'center',
        fontSize: '0.85rem'
      }}>
        <p>&copy; {new Date().getFullYear()} Mishra Tour & Travels. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
