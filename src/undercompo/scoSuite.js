// importation des modules
import axios from "axios";
import React, { useState } from "react";
import { CurrencyExchange } from "react-bootstrap-icons";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from "react-router-dom";
import config from '../component/config';

// fonction  principale
export default function ScoSuite({ data }) {
  // déclaration des constantes
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const id = data.matricule;
  const nom = data.nom;
  const classe = data.classe;
  const sco = data.sco;
  const verser = data.verser;
  const reste = data.reste;

  const [val, setVal] = useState({
    montant: '',
    code: '',
    etat: ''
  });

  // prise en charge des information saisies
  const handleInput = (e) => {
    setVal({ ...val, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  // fonction pour soumettre le formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (val.montant === '') {
      alert('Le montant est vide');
    } else if (val.montant > reste) {
      alert('Le montant entré est supérieur au solde');
    } else {
      const formData = {
        mat: id,
        montant: val.montant,
        code: val.code,
        sco: sco,
      };
      try {
        const res = await axios.post(`${config.apiBaseUrl}/sco.php`, formData);
        if (res.data.success) {
          alert('Montant pris en compte avec succès');
          setTimeout(() => {
            navigate('/scolarites');
          }, 1000);
          handleClose();
        } else {
          alert(res.data.message || 'Erreur lors du versement');
        }
      } catch (error) {
        alert('Erreur de réseau ou serveur indisponible');
      }
    }
  };

  return (
    <>
      <Button variant="warning" onClick={handleShow}>
        <CurrencyExchange />
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Continuer la scolarité</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6">
                <div className="input-field">
                  <label>Matricule</label>
                  <input type="text" name='matricule' id='matricule' value={id} disabled />
                </div>
                <div className="input-field">
                  <label>Nom de l'élève</label>
                  <input type="text" name='nom' id='nom' value={nom} disabled />
                </div>
                <div className="input-field">
                  <label>Classe</label>
                  <input type="text" name='classe' id='classe' value={classe} disabled />
                </div>
                <div className="input-field">
                  <label>Frais total</label>
                  <input type="number" name='sco' id='sco' value={sco} readOnly />
                </div>
              </div>
              <div className="col-md-6">
                <div className="input-field">
                  <label>Frais versé</label>
                  <input type="number" name='verser' id='verser' value={verser} readOnly />
                </div>
                <div className="input-field">
                  <label>Reste à verser</label>
                  <input type="number" name='reste' id='reste' value={reste} readOnly />
                </div>
                <div className="input-field">
                  <label>Versement</label>
                  <input type="number" name='montant' id='montant' max={reste} value={val.montant} onChange={handleInput} placeholder="Montant" required />
                </div>
                <div className="input-field">
                  <label>Code de versement</label>
                  <input type="text" name='code' id='code' value={val.code} onChange={handleInput} placeholder="Code de versement" required />
                </div>
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={handleClose} className="btn btn-secondary">
            Fermer
          </button>
          <button onClick={handleSubmit} className="btn btn-primary">
            Terminer
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
