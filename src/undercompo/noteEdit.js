// importation des differents modules
import axios from "axios";
import React, { useState } from "react";
import { Pen } from "react-bootstrap-icons";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from "react-router-dom";
// fonction principale
export default function NoteEdit({data,ud}) {
   // declaration des constantes
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [notes, setNote] = useState(data.note1)
const matricule = data.matricule
const seq=ud.seq
const matiere=ud.matiere
const evaluation=ud.evaluation

// recuperation des informations saisies

//declaration et recupération des informations concernant les professeurs
const navigate = useNavigate()
// fonction de validation du formulaire
const handleSubmit =async(e)=>{
  e.preventDefault()
  const formData = {
      matricule : matricule,
      note: notes,
      seq: seq,
      evaluation: evaluation,
      matiere: matiere,
  }
  const res = await axios.post('http://localhost/ssm/api/noteEdit.php', formData)
  
      // setMessage(res.data.success)
      alert(res.data.message)
      if(res.status === 200){
      setTimeout(() => {
          navigate('/noteAdmin')
      }, 1000);
      handleClose()
  }
}

  return (
    <>
      <Button variant="success" onClick={handleShow}>
      <Pen/>
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
            <input type="text" className="form-control" name="mat" id="mat" value={matricule} />
            <label className="form-label" >Matricule</label>
        </div>
        <div data-mdb-input-init className="form-outline mb-4">
            <input type="number" className="form-control" name="note" id="note" value={notes} onChange={(e)=> setNote(e.target.value)} />
            <label className="form-label" >Note</label>
        </div>
        
        
   </form>
        </Modal.Body>
        <Modal.Footer>
          {/* <Button variant="secondary" onClick={handleClose}>
            Fermer
          </Button> */}
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

