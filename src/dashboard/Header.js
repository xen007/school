import React, { useContext, useState } from 'react';
import { BsFillBellFill, BsFillEnvelopeFill, BsPersonCircle, BsSearch, BsJustify } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';
import { logout as performLogout } from '../utils/auth'; // Import the logout function
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Import Bootstrap JS
import './Header.css'; // Import custom CSS file if needed
import ResetPass from '../components/ResetPass'; // Import the ResetPass component

function Header({ OpenSidebar }) {
  const navigate = useNavigate();
  const { auth, setAuth } = useContext(AuthContext); // Access auth from AuthContext
  const [showDropdown, setShowDropdown] = useState(false); // State for managing dropdown visibility
  const [showChangePasswordPopup, setShowChangePasswordPopup] = useState(false); // State for managing change password popup visibility

  const handleLogout = async () => {
    const conf = window.confirm('Voulez-vous vraiment vous déconnecter ?');
    if (conf) {
      try {
        await performLogout(); // Call the logout function from auth.js
        setAuth(null); // Update the auth state
        navigate('/Login', { replace: true });

        const handlePopState = () => {
          navigate('/Login');
        };

        window.addEventListener('popstate', handlePopState);

        return () => {
          window.removeEventListener('popstate', handlePopState);
        };
      } catch (error) {
        console.error('Error logging out:', error);
        alert('Failed to log out. Please try again.');
      }
    }
  };

  const handleChangePassword = () => {
    setShowChangePasswordPopup(true);
  };

  const handleToggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <header className="header d-flex justify-content-between align-items-center p-3">
      <div className="menu-icon">
        <BsJustify className="icon" onClick={OpenSidebar} />
      </div>
      <div className="header-left">
        <BsSearch className="icon" />
      </div>
      <div className="header-right d-flex align-items-center">
        <BsFillBellFill className="icon mx-2" />
        <BsFillEnvelopeFill className="icon mx-2" />
        <div className="dropdown">
          <button
            className=" dropdown-toggle d-flex align-items-center"
            type="button"
            id="dropdownMenuButton"
            aria-expanded={showDropdown}
            onClick={handleToggleDropdown}
          >
            <BsPersonCircle className="me-1" /> Compte
          </button>
          <ul className={`dropdown-menu ${showDropdown ? 'show' : ''}`} aria-labelledby="dropdownMenuButton">
            {auth && (
              <>
                <li>
                  <span className="dropdown-item-text">Matricule: {auth.matricule}</span>
                </li>
                <li>
                  <span className="dropdown-item-text">Username: {auth.username}</span>
                </li>
              </>
            )}
            <li><button className="dropdown-item" onClick={handleLogout}>Déconnexion</button></li>
            <li><button className="dropdown-item" onClick={handleChangePassword}>Changer le mot de passe</button></li>
          </ul>
        </div>
      </div>

      {showChangePasswordPopup && <ResetPass onClose={() => setShowChangePasswordPopup(false)} />}
    </header>
  );
}

export default Header;
