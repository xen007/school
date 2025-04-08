import React, { useState } from 'react';
import { changePassword } from '../utils/auth'; // Import the changePassword function

function ResetPass({ onClose }) {
  const user = JSON.parse(localStorage.getItem('user')); // Retrieve user from local storage
  const [previousPassword, setPreviousPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handlePasswordChangeSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await changePassword(previousPassword, newPassword, user.username, user.matricule); // Pass username and matricule
      if (res.success) {
        alert('Mot de passe changé avec succès');
        onClose();
      } else {
        alert(res.message || 'Échec du changement de mot de passe');
      }
    } catch (error) {
      alert('Erreur : ' + error.message);
    }
  };

  return (
    <div className="modal show d-block" tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Changer le mot de passe</h5>
          </div>
          <form onSubmit={handlePasswordChangeSubmit}>
            <div className="modal-body">
              <div className="form-group">
                <label>Matricule: {user.matricule}</label>
              </div>
              <div className="form-group">
                <label htmlFor="previousPassword">Mot de passe précédent</label>
                <input
                  type="password"
                  className="form-control"
                  id="previousPassword"
                  value={previousPassword}
                  onChange={(e) => setPreviousPassword(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="newPassword">Nouveau mot de passe</label>
                <input
                  type="password"
                  className="form-control"
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>Fermer</button>
              <button type="submit" className="btn btn-primary">Changer le mot de passe</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ResetPass;
