import axios from 'axios';
import config from '../component/config';

export const isAuthenticated = () => {
  return !!localStorage.getItem('user');
};

export const getUserRole = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user ? user.role : null;
};

export const login = async (identifier, password) => {
  try {
    const response = await axios.post(`${config.apiBaseUrl}/auth.php`, { identifier, password });
    if (response.data.status === 'success') {
      localStorage.setItem('user', JSON.stringify(response.data.user));
      return response.data.user;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    throw new Error(error.message || 'Login failed');
  }
};

export const logout = async () => {
  try {
    localStorage.removeItem('user');
    await axios.post(`${config.apiBaseUrl}/logout.php`);
  } catch (error) {
    console.error('Network error during logout:', error);
    alert('Failed to log out. Please try again.');
  }
};

export const register = async (username, matricule, password, confirmPassword, role) => {
  try {
    const response = await axios.post(`${config.apiBaseUrl}/register.php`, {
      username,
      matricule,
      password,
      confirmPassword,
      role
    });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la création :', error);
    throw new Error('Echec! Résayé plus tard.');
  }
};

// Add the resetAccount function 
export const resetAccount = async (username) => {
  try {
    const response = await axios.post(`${config.apiBaseUrl}/resetAcc.php`, { username });
    return response.data;
  } catch (error) {
    console.error('Error during account reset:', error);
    throw new Error('Account reset failed. Please try again.');
  }
};

// Add the changePassword function 
export const changePassword = async (previousPassword, newPassword, username, matricule) => {
  const response = await fetch(`${config.apiBaseUrl}/changePass.php`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ previousPassword, newPassword, username, matricule }),
  });
  return response.json();
};
