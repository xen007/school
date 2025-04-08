import React from "react";
import { Link } from "react-router-dom";

export default function Docs() {
  return (
    <main className="main-container">
      <p>Choisissez la liste à afficher</p>
      <Link to="/promotion" className="btn btn-primary m-2">
        Certificat Promotion
      </Link>
      <Link to="/IDCards" className="btn btn-danger m-2">
        Carte Scolaire
      </Link>
      <Link to="/graduation" className="btn btn-warning m-2">
        Certificat Graduation
      </Link>
      <Link to="/excell" className="btn btn-warning m-2">
        Diplome Excellence
      </Link>
      <Link to="/hon" className="btn btn-warning m-2">
        Tableau d'Honneur
      </Link>
      <Link to="/certSco" className="btn btn-warning m-2">
        Scolatite
      </Link>
    </main>
  );
}
