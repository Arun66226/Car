import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Car, ArrowRight, Shield, Clock, ThumbsUp } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-hero" style={{
      minHeight: '85vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '3rem 1.5rem',
      background: 'radial-gradient(circle at center, #1e293b 0%, #0f172a 100%)',
      color: '#ffffff',
      textAlign: 'center'
    }}>
      {/* Top Floating Badge */}
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        background: 'rgba(245, 158, 11, 0.1)',
        border: '1px solid rgba(245, 158, 11, 0.25)',
        padding: '0.6rem 1.2rem',
        borderRadius: '50px',
        marginBottom: '2rem',
        color: '#f59e0b',
        fontSize: '0.9rem',
        fontWeight: '500',
        letterSpacing: '0.5px'
      }}>
        <Car size={16} /> Premium Rental Experience
      </div>

      {/* Main Heading Text */}
      <h1 style={{
        fontSize: '3.8rem',
        fontWeight: '800',
        lineHeight: '1.2',
        maxWidth: '850px',
        marginBottom: '1.5rem',
        letterSpacing: '-1px'
      }}>
        Welcome to <span style={{ color: '#f59e0b', textShadow: '0 0 20px rgba(245,158,11,0.2)' }}>Mishra</span> Tour & Travels
      </h1>

      {/* Subtitle description */}
      <p style={{
        fontSize: '1.25rem',
        color: '#94a3b8',
        maxWidth: '650px',
        marginBottom: '3rem',
        lineHeight: '1.6',
        fontWeight: '400'
      }}>
        Your smart AI-powered assistant for fast, secure, and hassle-free luxury car rentals. 
        Experience seamless verification, real-time map tracking, and premium rides.
      </p>

      {/* GET STARTED BUTTON */}
      <button 
        onClick={() => navigate('/cars')}
        style={{
          background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
          color: '#000',
          border: 'none',
          padding: '1.2rem 3rem',
          fontSize: '1.15rem',
          fontWeight: '700',
          borderRadius: '50px',
          cursor: 'pointer',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.8rem',
          boxShadow: '0 10px 30px rgba(245, 158, 11, 0.35)',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.03)';
          e.currentTarget.style.boxShadow = '0 12px 35px rgba(245, 158, 11, 0.5)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 10px 30px rgba(245, 158, 11, 0.35)';
        }}
      >
        Get Started Free <ArrowRight size={20} strokeWidth={2.5} />
      </button>

      {/* Features Showcase Badges */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '2rem',
        marginTop: '5rem',
        width: '100%',
        maxWidth: '1000px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: 'rgba(30, 41, 59, 0.4)', padding: '1rem 1.5rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.03)' }}>
          <Shield size={24} color="#f59e0b" />
          <span style={{ fontWeight: '500', fontSize: '0.95rem' }}>100% Secure Checkout</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: 'rgba(30, 41, 59, 0.4)', padding: '1rem 1.5rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.03)' }}>
          <Clock size={24} color="#f59e0b" />
          <span style={{ fontWeight: '500', fontSize: '0.95rem' }}>24/7 Verified Support</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: 'rgba(30, 41, 59, 0.4)', padding: '1rem 1.5rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.03)' }}>
          <ThumbsUp size={24} color="#f59e0b" />
          <span style={{ fontWeight: '500', fontSize: '0.95rem' }}>Top Quality Fleets Only</span>
        </div>
      </div>
    </div>
  );
};

export default Home;