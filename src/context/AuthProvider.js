// src/context/AuthProvider.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import config from '../component/config';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setAuth(JSON.parse(user));
    } else {
      setAuth(null);
    }
  }, []);

  const login = async (username, password) => {
    try {
      const response = await axios.post(`${config.apiBaseUrl}/auth.php`, { username, password });
      if (response.data.status === 'success') {
        localStorage.setItem('user', JSON.stringify(response.data.user));
        setAuth(response.data.user);
      }
      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      return { status: 'error', message: 'Login failed' };
    }
  };

  const logout = async () => {
    try {
      await axios.post(`${config.apiBaseUrl}/logout.php`);
      localStorage.removeItem('user');
      setAuth(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const getUserRole = () => {
    return auth ? auth.role : null;
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout, getUserRole, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
