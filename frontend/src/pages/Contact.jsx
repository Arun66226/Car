import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    subject: '',
    message: ''
  });
  
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In real-world this would send a POST request. We mock the inquiry submission successfully.
    setSubmitted(true);
    setFormData({
      name: '',
      email: '',
      mobile: '',
      subject: '',
      message: ''
    });
    setTimeout(() => {
      setSubmitted(false);
    }, 4000);
  };

  return (
    <div className="container">
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Contact Us</h1>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
          Have any questions about car availability, rental packages, or outstation tours? Get in touch with us!
        </p>
      </div>

      <div className="contact-grid">
        {/* Contact Info Cards */}
        <div className="contact-info-cards">
          <div className="glass contact-info-card">
            <Phone size={24} className="contact-icon" />
            <div>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '0.25rem', color: '#fff' }}>Call Center</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>+91 98765 43210</p>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Mon-Sun: 24/7 Available</p>
            </div>
          </div>

          <div className="glass contact-info-card">
            <Mail size={24} className="contact-icon" />
            <div>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '0.25rem', color: '#fff' }}>Email Support</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>support@mishratravels.com</p>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>info@mishratravels.com</p>
            </div>
          </div>

          <div className="glass contact-info-card">
            <MapPin size={24} className="contact-icon" />
            <div>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '0.25rem', color: '#fff' }}>Main Office</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                123 Travel Enclave, Connaught Place,<br />
                New Delhi, India - 110001
              </p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="glass" style={{ padding: '2.5rem' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: '#fff' }}>Send Inquiry</h2>
          
          {submitted && (
            <div className="alert-banner alert-success" style={{ marginBottom: '1.5rem' }}>
              <CheckCircle size={18} />
              <span>Your inquiry was submitted! Our team will contact you within 2-4 hours.</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label" htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-input"
                  required
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-input"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label" htmlFor="mobile">Mobile Number</label>
                <input
                  type="tel"
                  id="mobile"
                  name="mobile"
                  className="form-input"
                  required
                  pattern="[0-9]{10}"
                  value={formData.mobile}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="form-input"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="message">Message Details</label>
              <textarea
                id="message"
                name="message"
                className="form-input"
                rows="4"
                required
                value={formData.message}
                onChange={handleChange}
                style={{ resize: 'vertical' }}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: '100%', marginTop: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
            >
              <Send size={18} /> Send Inquiry Form
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
