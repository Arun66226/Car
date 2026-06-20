import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home'; // Naya Home page import kiya
import Dashboard from './pages/Dashboard';
import Cars from './pages/Cars';
import CarDetails from './pages/CarDetails';
import BookingForm from './pages/BookingForm';
import Payment from './pages/Payment';
import Confirmation from './pages/Confirmation';
import MyBookings from './pages/MyBookings';
import Services from './pages/Services';
import About from './pages/About';
import Contact from './pages/Contact';
import Profile from './pages/Profile';
import Signup from './pages/Signup';
import Login from './pages/Login';

// Admin Pages
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import ManageBookings from './pages/ManageBookings';
import ManageCars from './pages/ManageCars';
import ManageUsers from './pages/ManageUsers';

// Guard for Regular Customers
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (user.role === 'ADMIN') {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return children;
};

// Guard for Administrators
const AdminRoute = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user || user.role !== 'ADMIN') {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return children;
};

const AppContent = () => {
  return (
    <div className="app-container">
      <Navbar />
      <main className="main-content">
        <Routes>
          {/* Public Guest / Customer Routes */}
          {/* 1. Ab sabse pehle ye shandaar Home landing page khulega */}
          <Route path="/" element={<Home />} />
          
          {/* Dashboard ko alag route de di taaki purana logic na toote */}
          <Route path="/dashboard" element={<Dashboard />} /> 
          
          <Route path="/cars" element={<Cars />} />
          <Route path="/cars/:id" element={<CarDetails />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          {/* Protected Customer Routes */}
          <Route path="/book/:id" element={
            <ProtectedRoute>
              <BookingForm />
            </ProtectedRoute>
          } />
          <Route path="/payment" element={
            <ProtectedRoute>
              <Payment />
            </ProtectedRoute>
          } />
          <Route path="/confirmation" element={
            <ProtectedRoute>
              <Confirmation />
            </ProtectedRoute>
          } />
          <Route path="/my-bookings" element={
            <ProtectedRoute>
              <MyBookings />
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          } />
          <Route path="/admin/bookings" element={
            <AdminRoute>
              <ManageBookings />
            </AdminRoute>
          } />
          <Route path="/admin/cars" element={
            <AdminRoute>
              <ManageCars />
            </AdminRoute>
          } />
          <Route path="/admin/users" element={
            <AdminRoute>
              <ManageUsers />
            </AdminRoute>
          } />

          {/* Fallback Redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;