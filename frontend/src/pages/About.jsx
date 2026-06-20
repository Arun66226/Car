import React from 'react';
import { Shield, Clock, Compass, Target, Users2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="container">
      {/* Introduction */}
      <section style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '3rem', alignItems: 'center', marginBottom: '4rem' }}>
        <div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>About Mishra Tour & Travels</h1>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.25rem', lineHeight: '1.8' }}>
            Founded in 2015, Mishra Tour & Travels has grown from a local car hire service in New Delhi to one of the most reliable and trusted premium car rental and travel planners across India.
          </p>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: '1.8' }}>
            We provide a diverse fleet of well-maintained vehicles, from utility cars like Innova Crysta and Ertiga to off-roaders like Mahindra Thar, luxury SUVs like Fortuner, and exotic supercars like Lamborghini.
          </p>
          <Link to="/cars" className="btn btn-primary">
            Explore Our Fleet
          </Link>
        </div>
        <div style={{ position: 'relative' }}>
          <img
            src="https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?q=80&w=600&auto=format&fit=crop"
            alt="Toyota Innova"
            style={{ width: '100%', height: '350px', objectFit: 'cover', borderRadius: 'var(--border-radius)', border: '1px solid var(--card-border)' }}
          />
        </div>
      </section>

      {/* Mission & Vision */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '5rem' }}>
        <div className="glass" style={{ padding: '2.5rem' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '8px', backgroundColor: 'rgba(59, 130, 246, 0.1)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justify: 'center', marginBottom: '1.25rem' }}>
            <Target size={24} />
          </div>
          <h2 style={{ fontSize: '1.4rem', marginBottom: '0.75rem' }}>Our Mission</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.925rem', lineHeight: '1.7' }}>
            To provide safe, affordable, comfortable, and luxury travel experiences for every single customer. We aim to take the stress out of vehicle rental and route planning.
          </p>
        </div>

        <div className="glass" style={{ padding: '2.5rem' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '8px', backgroundColor: 'rgba(245, 158, 11, 0.1)', color: 'var(--accent)', display: 'flex', alignItems: 'center', justify: 'center', marginBottom: '1.25rem' }}>
            <Compass size={24} />
          </div>
          <h2 style={{ fontSize: '1.4rem', marginBottom: '0.75rem' }}>Our Vision</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.925rem', lineHeight: '1.7' }}>
            To expand our footprints to every tier-1 and tier-2 city in India by integrating modern technology with trusted, safe, and hospitable driving professionals.
          </p>
        </div>
      </section>

      {/* Core values */}
      <section style={{ padding: '4rem 0', borderTop: '1px solid var(--card-border)' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '2.2rem', marginBottom: '0.5rem' }}>Our Operational Values</h2>
          <p style={{ color: 'var(--text-secondary)' }}>The principles that drive our customer success</p>
        </div>

        <div className="about-features">
          <div className="about-feature-card glass">
            <div className="about-icon">
              <Shield size={24} />
            </div>
            <h3>Safety First</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              All our cars undergo strict safety inspections, sanitization, and are equipped with active GPS tracking devices.
            </p>
          </div>

          <div className="about-feature-card glass">
            <div className="about-icon" style={{ color: 'var(--success)', backgroundColor: 'rgba(16, 185, 129, 0.1)' }}>
              <Clock size={24} />
            </div>
            <h3>Punctual Timings</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              Time is money. Whether it is an airport transfer or a business meeting, we guarantee our car reaches your doorstep early.
            </p>
          </div>

          <div className="about-feature-card glass">
            <div className="about-icon" style={{ color: '#8b5cf6', backgroundColor: 'rgba(139, 92, 246, 0.1)' }}>
              <Users2 size={24} />
            </div>
            <h3>Client Hospitality</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              Our drivers are trained in route expertise, guest management, and customer care to ensure you enjoy a VIP experience.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
