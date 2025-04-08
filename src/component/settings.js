import React, { useState } from "react";
import { Link } from "react-router-dom";
import config from './config';
import Registration from '../components/Registration';
import './settings.css'; // Import the CSS file
import { resetAccount } from '../utils/auth'; // Import the resetAccount function
import axios from "axios";

export default function Setting() {
  const seq = 'sequence';
  const [showPopup, setShowPopup] = useState(false);
  const [resetUser, setResetUser] = useState(''); // New state for the reset user
  const [showResetPopup, setShowResetPopup] = useState(false);

  const handleSave = async () => {
    const res = await axios.post(`${config.apiBaseUrl}/sauve.php`);
    if (res.data.success) {
      alert('Sauvegarde réussie');
    }
  };

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  const handleResetPopupClose = () => {
    setShowResetPopup(false);
  };

  const handleResetSubmit = async () => {
    try {
      const res = await resetAccount(resetUser);
      if (res.success) {
        alert('Compte réinitialisé avec succès');
        setShowResetPopup(false);
      } else {
        alert(res.message || 'Échec de la réinitialisation du compte');
      }
    } catch (error) {
      alert('Erreur : ' + error.message);
    }
  };

  return (
    <main className="main-container">
      <h3>Effectuez des réglages Ici</h3>
      <div className="container">
        <h4>Définir les catégories des classes</h4>
        <div>
          <Link to={'/categCl/'} className="btn btn-outline-primary">Catégories</Link>
        </div>
        <h4>Faire une sauvegarde</h4>
        <button className="btn btn-success" onClick={handleSave}>Sauvegarder</button>
        <h4>Mettre à jour les informations de l'école</h4>
        <Link to={'/SchoolUp/' + 1} className="btn btn-outline-primary">MAJ</Link>
       
        {/* <h4></h4>
        <Link to={'/a/'} className="btn btn-outline-primary">ACT</Link>
        */}
        <h4>Gestion des comptes</h4> 
        <div className="btn-group" role="group" aria-label="Basic toggle button group">
          <button 
            className="btn btn-outline-primary" 
            onClick={() => setShowPopup(true)} 
            disabled={showPopup}
          >
            Créer un compte
          </button>
          <button 
            className="btn btn-outline-primary" 
            onClick={() => setShowResetPopup(true)}
            disabled={showResetPopup}
          >
            Réinitialiser un compte
          </button>
        </div>
      </div>
      {showPopup && <Registration onClose={handlePopupClose} />}
      {showResetPopup && (
        <div className="reset-popup">
          <div className="reset-popup-content">
            <h3>Réinitialiser le compte</h3>
            <form onSubmit={(e) => { e.preventDefault(); handleResetSubmit(); }}>
              <label>
                Nom d'utilisateur:
                <input 
                  type="text" 
                  value={resetUser} 
                  onChange={(e) => setResetUser(e.target.value)} 
                  required 
                />
              </label>
              <div className="reset-buttons">
                <button type="submit" className="btn btn-primary">Réinitialiser</button>
                <button type="button" className="btn btn-secondary" onClick={handleResetPopupClose}>Annuler</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
