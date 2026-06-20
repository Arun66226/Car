import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Plus, Edit, Trash2, X, ArrowLeft, Image } from 'lucide-react';
import { Link } from 'react-router-dom';

const ManageCars = () => {
  const { user } = useAuth();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingCar, setEditingCar] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    pricePerDay: '',
    capacity: '5',
    fuelType: 'Diesel',
    features: '',
    description: '',
    imageUrl: '',
    isAvailable: true
  });

  const [formError, setFormError] = useState('');
  const [formSubmitting, setFormSubmitting] = useState(false);

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = () => {
    setLoading(true);
    fetch('/api/cars')
      .then((res) => res.json())
      .then((data) => {
        setCars(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  const handleOpenAddModal = () => {
    setEditingCar(null);
    setFormData({
      name: '',
      pricePerDay: '',
      capacity: '5',
      fuelType: 'Diesel',
      features: 'Air Conditioning,Music System,GPS Navigation,Power Steering',
      description: '',
      imageUrl: '',
      isAvailable: true
    });
    setFormError('');
    setShowModal(true);
  };

  const handleOpenEditModal = (car) => {
    setEditingCar(car);
    setFormData({
      name: car.name,
      pricePerDay: car.pricePerDay.toString(),
      capacity: car.capacity.toString(),
      fuelType: car.fuelType,
      features: car.features || '',
      description: car.description || '',
      imageUrl: car.imageUrl || '',
      isAvailable: car.isAvailable
    });
    setFormError('');
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingCar(null);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    setFormSubmitting(true);

    const payload = {
      ...formData,
      pricePerDay: parseFloat(formData.pricePerDay),
      capacity: parseInt(formData.capacity)
    };

    if (isNaN(payload.pricePerDay) || payload.pricePerDay <= 0) {
      setFormError('Please enter a valid price per day!');
      setFormSubmitting(false);
      return;
    }

    const url = editingCar ? `/api/admin/cars/${editingCar.id}` : '/api/admin/cars';
    const method = editingCar ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error('Failed to save vehicle.');
      }

      fetchCars();
      handleCloseModal();
    } catch (err) {
      setFormError(err.message || 'Error occurred while saving vehicle details.');
    } finally {
      setFormSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this car? This action cannot be undone.')) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/cars/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${user.token}` }
      });

      if (response.ok) {
        setCars(cars.filter((c) => c.id !== id));
      } else {
        alert('Failed to delete car.');
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
          <h2>Manage Fleet</h2>
          <p className="section-subtitle">Add new rental cars, update pricing, or delete vehicle listings</p>
        </div>
        <button onClick={handleOpenAddModal} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Plus size={18} /> Add New Car
        </button>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '5rem', color: 'var(--text-secondary)' }}>
          Loading cars fleet data...
        </div>
      ) : cars.length > 0 ? (
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Car Details</th>
                <th>Capacity</th>
                <th>Fuel Type</th>
                <th>Price per Day</th>
                <th>Availability</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cars.map((car) => (
                <tr key={car.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <img
                        src={car.imageUrl || 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=600&auto=format&fit=crop'}
                        alt={car.name}
                        style={{ width: '70px', height: '45px', objectFit: 'cover', borderRadius: '4px', border: '1px solid var(--card-border)' }}
                      />
                      <div>
                        <div style={{ fontWeight: 600, color: '#fff' }}>{car.name}</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {car.features}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td style={{ color: '#fff', fontWeight: 500 }}>{car.capacity} Seater</td>
                  <td>{car.fuelType}</td>
                  <td style={{ color: 'var(--accent)', fontWeight: 700 }}>₹{Math.round(car.pricePerDay)}</td>
                  <td>
                    <span className={`badge ${car.isAvailable ? 'badge-approved' : 'badge-rejected'}`}>
                      {car.isAvailable ? 'Available' : 'Booked'}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button
                        onClick={() => handleOpenEditModal(car)}
                        className="btn btn-outline"
                        style={{ padding: '0.4rem', color: 'var(--primary)', border: '1px solid rgba(59, 130, 246, 0.3)' }}
                        title="Edit Car"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(car.id)}
                        className="btn btn-outline"
                        style={{ padding: '0.4rem', color: 'var(--danger)', border: '1px solid rgba(239, 68, 68, 0.3)' }}
                        title="Delete Car"
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
          <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>No Cars in Fleet</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>Start by adding a vehicle to your catalog.</p>
          <button onClick={handleOpenAddModal} className="btn btn-primary">
            Add First Vehicle
          </button>
        </div>
      )}

      {/* Add / Edit Modal */}
      {showModal && (
        <div className="modal-backdrop">
          <div className="glass modal-content">
            <div className="modal-header">
              <h3 style={{ fontSize: '1.3rem', color: '#fff' }}>
                {editingCar ? `Edit Car Details: ${editingCar.name}` : 'Add New Car to Fleet'}
              </h3>
              <button onClick={handleCloseModal} className="modal-close">
                <X size={20} />
              </button>
            </div>

            {formError && (
              <div className="alert-banner alert-error" style={{ marginBottom: '1.5rem' }}>
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label" htmlFor="name">Vehicle Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-input"
                  required
                  placeholder="E.g. Thar 4x4"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label" htmlFor="pricePerDay">Price per Day (₹)</label>
                  <input
                    type="number"
                    id="pricePerDay"
                    name="pricePerDay"
                    className="form-input"
                    required
                    placeholder="E.g. 4000"
                    value={formData.pricePerDay}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="capacity">Seating Capacity</label>
                  <select
                    id="capacity"
                    name="capacity"
                    className="form-input"
                    value={formData.capacity}
                    onChange={handleInputChange}
                  >
                    <option value="2">2 Seater</option>
                    <option value="4">4 Seater</option>
                    <option value="5">5 Seater</option>
                    <option value="7">7 Seater</option>
                    <option value="9">9 Seater</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label" htmlFor="fuelType">Fuel Type</label>
                  <select
                    id="fuelType"
                    name="fuelType"
                    className="form-input"
                    value={formData.fuelType}
                    onChange={handleInputChange}
                  >
                    <option value="Diesel">Diesel</option>
                    <option value="Petrol">Petrol</option>
                    <option value="Petrol/CNG">CNG</option>
                    <option value="Electric">Electric</option>
                  </select>
                </div>

                <div className="form-group" style={{ justifyContent: 'center', paddingLeft: '0.5rem' }}>
                  <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', marginTop: '1.25rem' }}>
                    <input
                      type="checkbox"
                      name="isAvailable"
                      checked={formData.isAvailable}
                      onChange={handleInputChange}
                      style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                    />
                    <span>Available for Rent</span>
                  </label>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="imageUrl">Vehicle Image URL</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="url"
                    id="imageUrl"
                    name="imageUrl"
                    className="form-input"
                    placeholder="https://images.unsplash.com/..."
                    value={formData.imageUrl}
                    onChange={handleInputChange}
                    style={{ paddingLeft: '2.5rem' }}
                  />
                  <Image size={18} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="features">Included Features (Comma separated)</label>
                <input
                  type="text"
                  id="features"
                  name="features"
                  className="form-input"
                  placeholder="Air Conditioning,Music System,GPS Navigation..."
                  value={formData.features}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="description">Description Details</label>
                <textarea
                  id="description"
                  name="description"
                  className="form-input"
                  rows="3"
                  placeholder="Enter details about this car..."
                  value={formData.description}
                  onChange={handleInputChange}
                  style={{ resize: 'vertical' }}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: '100%', padding: '0.85rem', fontSize: '1rem', marginTop: '1rem' }}
                disabled={formSubmitting}
              >
                {formSubmitting ? 'Saving changes...' : editingCar ? 'Save Changes' : 'Add Vehicle'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageCars;
