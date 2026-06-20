import React from 'react';
import { Car, Plane, Navigation, ShieldAlert, Heart, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

const Services = () => {
  const servicesList = [
    {
      title: 'Car Rental',
      description: 'Choose from a wide variety of premium and self-drive cars, from budget-friendly hatchbacks to premium SUVs and supercars.',
      icon: <Car size={28} />
    },
    {
      title: 'Airport Pickup & Drop',
      description: 'Reliable, highly punctual pickup and drop services to and from major airports. Never miss a flight or wait for a cab again.',
      icon: <Plane size={28} />
    },
    {
      title: 'Local Sightseeing',
      description: 'Tailored local city tours with expert guides and professional drivers who know the best sights, markets, and eateries.',
      icon: <Navigation size={28} />
    },
    {
      title: 'Outstation Tours',
      description: 'Exciting long-distance tour packages for weekends and holidays. Comfortable, safe travel to nearby cities and hill stations.',
      icon: <ShieldAlert size={28} />
    },
    {
      title: 'Wedding Car Service',
      description: 'Make your special day even more grand with our beautifully decorated luxury luxury cars, including Fortuners and Lamborghinis.',
      icon: <Heart size={28} />
    },
    {
      title: 'Corporate Rentals',
      description: 'Monthly and daily executive car rental programs tailored for corporate entities, complete with flexible billing options.',
      icon: <Calendar size={28} />
    }
  ];

  return (
    <div className="container">
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Our Premium Services</h1>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
          Mishra Tour & Travels offers a comprehensive suite of mobility solutions designed around your safety and comfort.
        </p>
      </div>

      <div className="services-grid">
        {servicesList.map((service, idx) => (
          <div key={idx} className="glass service-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '12px',
              backgroundColor: 'rgba(59, 130, 246, 0.1)',
              color: 'var(--primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {service.icon}
            </div>
            <h3 style={{ fontSize: '1.25rem', color: '#fff' }}>{service.title}</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              {service.description}
            </p>
          </div>
        ))}
      </div>

      <div style={{
        marginTop: '4rem',
        padding: '3rem 2rem',
        borderRadius: 'var(--border-radius)',
        background: 'radial-gradient(circle at center, rgba(59, 130, 246, 0.1), transparent 100%)',
        border: '1px solid var(--card-border)',
        textAlign: 'center'
      }}>
        <h2 style={{ fontSize: '1.8rem', marginBottom: '0.75rem' }}>Need a Custom Outstation Package?</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', maxWidth: '550px', margin: '0 auto 1.5rem' }}>
          Tell us your travel plans (pickup, destination, dates, and car preference) and we will craft a personalized tour plan at the best rates.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
          <Link to="/contact" className="btn btn-primary">
            Contact Booking Agent
          </Link>
          <Link to="/cars" className="btn btn-outline">
            Browse Car Fleet
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Services;
