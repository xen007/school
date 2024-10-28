// importation des modules
import axios from "axios";
import React, {useState } from "react";
import { PencilSquare } from "react-bootstrap-icons";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from "react-router-dom";

// fonction prinncipale
export default function LevEdit({data}) {
//déclarations des constantes
const [show, setShow] = useState(false);
const handleClose = () => setShow(false);
const handleShow = () => setShow(true);
const id= data.id
const[lev,setLev] =useState((data.libellee_niveau))
const navigate = useNavigate()
const handleInput =(e) =>{
    setLev(e.target.value)
}
// fonction de soumission du formulaire
const handleSubmit =async(e)=>{
  e.preventDefault()
  const formData = {
      idNi:id,
      lib_niv: lev.toUpperCase()
  }
  const res = await axios.put('http://localhost/ssm/api/niveau.php', formData)
  if(res.data.success){
      // setMessage(res.data.success)
      alert('modifié')
      setTimeout(() => {
          navigate('/levels')
      }, 2000);
      handleClose()
  }
}
  return (
    <>
      <Button variant="success" onClick={handleShow}>
      <PencilSquare />
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modifier le niveau</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form id="Affect">
            <div data-mdb-input-init className="form-outline mb-4">
            <input type="text" className="form-control" name="libellé_classe" id="libellé_classe" value={lev} onChange={handleInput} />
            <label className="form-label" >libellé_Niveau</label>
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
