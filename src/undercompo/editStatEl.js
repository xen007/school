
import axios from "axios";
import React, {useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from "react-router-dom";

export default function EditStatEl({data}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


const id= data.id

const[Stat,setStat] =useState((data.stat))
const handleInput =(e) =>{
    setStat(e.target.value)
}
const navigate = useNavigate()

const handleSubmit =async(e)=>{
  e.preventDefault()
  const formData = {
      idNi:id,
      lib_niv: Stat.toUpperCase()
  }
  const res = await axios.put('http://localhost/ssm/api/niv.php', formData)
  if(res.data.success){
      // setMessage(res.data.success)
      alert('modifié')
      setTimeout(() => {
          navigate('/Statels')
      }, 2000);
      handleClose()
  }
}

  return (
    <>
      <Button variant="danger" onClick={handleShow}>
      <i className="bi bi-trash"></i>
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Changer de Statut</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form id="Affect">
        <div data-mdb-input-init className="form-outline ">
        <select name="stat" value={Stat} onChange={handleInput} className="form-control" required >
                    <option value="1">Actif</option>
                    <option value="0">Inactif</option>
                    </select>
        <label className="form-label" >Statut</label>
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

