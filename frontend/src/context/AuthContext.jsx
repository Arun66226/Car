import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore user from localStorage on init
  useEffect(() => {
    const storedUser = localStorage.getItem('mtt_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem('mtt_user');
      }
    }
    setLoading(false);
  }, []);

  const loginUser = async (email, password) => {
    const response = await fetch('/api/auth/user/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.text();
    if (!response.ok) {
      throw new Error(data || 'Login failed');
    }

    const userData = JSON.parse(data);
    setUser(userData);
    localStorage.setItem('mtt_user', JSON.stringify(userData));
    return userData;
  };

  const loginAdmin = async (email, password) => {
    const response = await fetch('/api/auth/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.text();
    if (!response.ok) {
      throw new Error(data || 'Admin login failed');
    }

    const adminData = JSON.parse(data);
    setUser(adminData);
    localStorage.setItem('mtt_user', JSON.stringify(adminData));
    return adminData;
  };

  const signup = async (name, mobile, email, password) => {
    const response = await fetch('/api/auth/user/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, mobile, email, password }),
    });

    const data = await response.text();
    if (!response.ok) {
      throw new Error(data || 'Signup failed');
    }
    return data;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('mtt_user');
  };

  const updateLocalUser = (updatedInfo) => {
    if (user) {
      const updatedUser = { ...user, ...updatedInfo };
      setUser(updatedUser);
      localStorage.setItem('mtt_user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, loginUser, loginAdmin, signup, logout, updateLocalUser }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export default AuthContext;
