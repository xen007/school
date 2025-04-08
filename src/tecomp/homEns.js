import React, { useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import notes3 from '../others/images/notes3.jpg';
import { FaPen } from '@react-icons/all-files/fa/FaPen';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider'; // Import AuthContext

export default function HomeEns() {
  const { auth } = useContext(AuthContext); // Access auth from AuthContext

  return (
    <main className="main-container">
      <div className="col-lg-6 col-md-6 col-sm-6">
        <img src={notes3} alt="notes" className="emploi" />
        <Link to="/noteAdmin/" className="btn btn-primary">
          Saisie des notes <FaPen />
        </Link>
      </div>
      {auth && (
        <div className="col-lg-6 col-md-6 col-sm-6">
          <h3>Welcome, {auth.matricule}!</h3> {/* Display the matricule */}
          <h5>Username: {auth.username}</h5> {/* Display the username */}
        </div>
      )}
    </main>
  );
}
