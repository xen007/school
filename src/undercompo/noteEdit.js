// Importation des differents modules
import axios from "axios";
import React, { useState } from "react";
import { Pen } from "react-bootstrap-icons";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from "react-router-dom";
import config from '../component/config';

// Fonction principale
export default function NoteEdit({ data, ud, bar, fetchData }) {
  // Declaration des constantes
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [notes, setNote] = useState(data.note1);
  const matricule = data.matricule;
  const seq = ud.seq;
  const matiere = ud.matiere;
  const evaluation = ud.evaluation;

  // Recuperation des informations saisies

  // Declaration et recupération des informations concernant les professeurs
  const navigate = useNavigate();

  // Fonction de validation du formulaire
  const handleChange = (e) => {
    const { value } = e.target;
    const intBar = parseInt(bar, 10); // Convert bar to integer

    if (value > intBar) {
      alert(`La note ne peut pas dépasser ${intBar}.`);
      setNote(''); // Clear the value if it's greater than bareme
    } else if (value < 0) {
      alert(`La note ne peut pas être inférieure à 0.`);
      setNote(''); // Clear the value if it's less than 0
    } else {
      setNote(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      matricule: matricule,
      note: notes,
      seq: seq,
      evaluation: evaluation,
      matiere: matiere,
    };
    const res = await axios.post(`${config.apiBaseUrl}/noteEdit.php`, formData);

    alert(res.data.message);
    if (res.status === 200) {
      fetchData(); // Call fetchData to refresh data in NoteAdmin
      setTimeout(() => {
        navigate('/noteAdmin');
      }, 1000);
      handleClose();
    }
  };

  return (
    <>
      <Button variant="success" onClick={handleShow}>
        <Pen />
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modifier la note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form id="Affect">
            <div data-mdb-input-init className="form-outline mb-4">
              <input type="text" className="form-control" name="mat" id="mat" value={matricule} readOnly />
              <label className="form-label">Matricule</label>
            </div>
            <div data-mdb-input-init className="form-outline mb-4">
              <input type="number" className="form-control" name="note" id="note" value={notes} onChange={handleChange} />
              <label className="form-label">Note</label>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={handleClose} className="btn btn-secondary">
            Fermer
          </button>
          <button onClick={handleSubmit} className="btn btn-primary">
            Modifier
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
