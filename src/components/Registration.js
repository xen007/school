import React, { useState, useEffect } from "react";
import './Registration.css'; // Import the CSS file
import { register } from '../utils/auth'; // Import the register function

function Registration({ onClose }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('user'); // Default role
  const [matricule, setMatricule] = useState(''); // New state for matricule
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [passwordStrength, setPasswordStrength] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const isFormValid = username && matricule && passwordStrength === 'Strong' && passwordMatch;
    setIsFormValid(isFormValid);
  }, [username, matricule, passwordStrength, passwordMatch]);

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    validatePassword(value);
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    setPasswordMatch(password === value);
  };

  const validatePassword = (value) => {
    const strength = /^(?=.*\d).{4,}$/.test(value) ? 'Strong' : 'Weak';
    setPasswordStrength(strength);
    setPasswordMatch(value === confirmPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isFormValid) {
      try {
        const response = await register(username, matricule, password, confirmPassword, role);
        if (response.status === 'success') {
          alert('Compte créé avec succès!');
          onClose();
        } else {
          alert(response.message || 'Échec de la création du compte');
        }
      } catch (error) {
        alert('Error: ' + error.message);
      }
    } else {
      alert('Remplissez les champs correctement.');
    }
  };

  return (
    <div className="registration-popup">
      <div className="registration-popup-content">
        <h3>Création de Compte</h3>
        <form className="registration-form" onSubmit={handleSubmit}>
          <label>
            Nom d'utilisateur:
            <input 
              type="text" 
              name="username"
              value={username} 
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>
          <label>
            Matricule:
            <input 
              type="text" 
              name="matricule"
              value={matricule} 
              onChange={(e) => setMatricule(e.target.value)}
              required
            />
          </label>
          <label>
            Mot de passe:
            <input 
              type="password" 
              name="password"
              value={password} 
              onChange={handlePasswordChange}
              required
            />
            <small className={`password-strength ${passwordStrength.toLowerCase()}`}>
              {passwordStrength} (min 4 chars, 1 number)
            </small>
          </label>
          <label>
            Confirmation Mot de passe:
            <input 
              type="password" 
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              required
            />
            {!passwordMatch && (
              <small className="password-error">Passwords do not match</small>
            )}
          </label>
          <label>
            Role:
            <select 
              name="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </label>
          <div className="registration-buttons">
            <button 
              type="submit" 
              className="registration-button registration-button-submit" 
              disabled={!isFormValid}
            >
              Enregister
            </button>
            <button 
              type="button" 
              className="registration-button registration-button-close" 
              onClick={onClose}
            >
              Fermer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Registration;
