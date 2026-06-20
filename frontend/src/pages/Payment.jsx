import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { CreditCard, ArrowLeft, ShieldCheck, QrCode } from 'lucide-react';

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const bookingDetails = location.state?.bookingDetails;
  
  const [paymentMethod, setPaymentMethod] = useState('Google Pay');
  const [transactionId, setTransactionId] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Auto-generate transaction ID if user doesn't enter one
  const generateTxnId = () => {
    return 'TXN' + Math.floor(1000000000 + Math.random() * 9000000000);
  };

  const handlePayNow = async (e) => {
    e.preventDefault();
    if (!bookingDetails) return;

    setError('');
    setSubmitting(true);

    const finalTxnId = transactionId.trim() || generateTxnId();

    const payload = {
      carId: bookingDetails.carId,
      customerName: bookingDetails.customerName,
      customerMobile: bookingDetails.customerMobile,
      customerEmail: bookingDetails.customerEmail,
      pickupLocation: bookingDetails.pickupLocation,
      dropLocation: bookingDetails.dropLocation,
      pickupDate: bookingDetails.pickupDate,
      returnDate: bookingDetails.returnDate,
      specialRequirements: bookingDetails.specialRequirements,
      paymentMethod,
      transactionId: finalTxnId
    };

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to submit booking');
      }

      // Success! Redirect to Booking Confirmation
      navigate('/confirmation', { state: { booking: data } });

    } catch (err) {
      setError(err.message || 'Payment submission failed. Please try again.');
      setSubmitting(false);
    }
  };

  if (!bookingDetails) {
    return (
      <div className="container" style={{ textAlign: 'center', padding: '5rem' }}>
        <h2>Invalid Session</h2>
        <p>No active booking data found.</p>
        <Link to="/cars" className="btn btn-primary" style={{ marginTop: '1rem' }}>Browse Cars</Link>
      </div>
    );
  }

  return (
    <div className="container" style={{ maxWidth: '800px' }}>
      <button onClick={() => navigate(-1)} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', color: 'var(--text-secondary)', cursor: 'pointer' }}>
        <ArrowLeft size={16} /> Back to Booking Form
      </button>

      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <h2 style={{ fontSize: '2.2rem', marginBottom: '0.5rem' }}>Secure Checkout</h2>
        <p style={{ color: 'var(--text-secondary)' }}>Pay the ₹100 booking advance to lock your ride</p>
      </div>

      {error && (
        <div className="alert-banner alert-error" style={{ marginBottom: '1.5rem' }}>
          <span>{error}</span>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.8fr', gap: '2rem', alignItems: 'start' }}>
        
        {/* Payment info */}
        <div className="glass" style={{ padding: '1.5rem' }}>
          <h3 style={{ fontSize: '1.15rem', marginBottom: '1rem', color: '#fff' }}>Booking Summary</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Car Model:</span>
              <span style={{ fontWeight: 600 }}>{bookingDetails.carName}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Pickup:</span>
              <span style={{ fontWeight: 600, textAlign: 'right' }}>{bookingDetails.pickupLocation}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Drop:</span>
              <span style={{ fontWeight: 600, textAlign: 'right' }}>{bookingDetails.dropLocation}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Dates:</span>
              <span style={{ fontWeight: 600 }}>{bookingDetails.pickupDate} to {bookingDetails.returnDate}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--card-border)', paddingTop: '0.75rem', marginTop: '0.5rem' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Total Rental Cost:</span>
              <span style={{ fontWeight: 600 }}>₹{Math.round(bookingDetails.totalCost)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--card-border)', paddingTop: '0.75rem', marginTop: '0.5rem', color: 'var(--success)', fontSize: '1rem', fontWeight: 700 }}>
              <span>Advance Amount:</span>
              <span>₹100.00</span>
            </div>
          </div>
        </div>

        {/* Payment options & QR */}
        <div className="glass" style={{ padding: '2rem' }}>
          <form onSubmit={handlePayNow}>
            <h3 style={{ fontSize: '1.15rem', marginBottom: '1.25rem', color: '#fff' }}>Select UPI Method</h3>
            
            <div className="payment-methods-grid">
              {['Google Pay', 'PhonePe', 'Paytm', 'UPI ID'].map((method) => (
                <div
                  key={method}
                  className={`payment-method-card ${paymentMethod === method ? 'selected' : ''}`}
                  onClick={() => setPaymentMethod(method)}
                >
                  <CreditCard size={18} style={{ color: paymentMethod === method ? 'var(--primary)' : 'var(--text-muted)' }} />
                  <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>{method}</span>
                </div>
              ))}
            </div>

            {/* Simulated QR Scan */}
            <div style={{ textAlign: 'center', margin: '2rem 0' }}>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
                Scan the QR Code using your <b>{paymentMethod}</b> app
              </p>
              
              <div className="upi-qr-wrapper">
                {/* Custom SVG QR Code to feel extremely premium */}
                <svg className="upi-qr-img" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 0h30v30H0V0zm10 10v10h10V10H10zM70 0h30v30H70V0zm10 10v10h10V10H80zM0 70h30v30H0V70zm10 10v10h10V10H10zM35 5h10v10H35V5zm15 0h15v10H50V5zm0 15h10v15H50V20zm15 15h15v10H65V35zm-20 20h10v10H45V55zm10 0h15v15H55V55zm-20 15h10v10H35V70zm15 15h15v10H50V85zm35-15h10v30H85V70zm-15 10h10v10H70V80zm-20-45h10v10H50V35z" fill="#0b0f19" />
                  <rect x="38" y="38" width="24" height="24" rx="2" fill="var(--accent)" fillOpacity="0.2" />
                  <path d="M44 48l4 4 8-8" stroke="var(--accent)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div className="upi-qr-text">UPI ID: mishratravels@upi</div>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="transactionId">
                Transaction ID (Optional - Auto-generated if left blank)
              </label>
              <input
                type="text"
                id="transactionId"
                className="form-input"
                placeholder="E.g. UPI982374623"
                value={transactionId}
                onChange={(e) => setTransactionId(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="btn btn-accent"
              style={{ width: '100%', padding: '1rem', fontSize: '1.1rem', marginTop: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
              disabled={submitting}
            >
              <ShieldCheck size={20} />
              {submitting ? 'Confirming payment...' : 'Pay Now ₹100'}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default Payment;
