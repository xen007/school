// importation des differents modules
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Pen } from "react-bootstrap-icons";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from "react-router-dom";
import config from '../component/config';
// fonction principale
export default function SubAffect({data}) {
   // declaration des constantes
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const[formvalue,setFormvalue] = useState({
    ens:'',
    libellé_classe:'',
})
const id= data.id
const libel = data.nom
// recuperation des informations saisies
const handleInput =(e) =>{
    setFormvalue({...formvalue,[e.target.name] : e.target.value})
}
//declaration et recupération des informations concernant les professeurs
  const[prof,setProf]=useState([])
  useEffect( () => {
    const getNiveau = async()=>{
    const reqdata = await fetch(`${config.apiBaseUrl}/prof.php/`+ libel)
    const resdata = await reqdata.json()
    console.log(resdata)
    setProf(resdata)
    }
    getNiveau()
},[libel])
const navigate = useNavigate()
// fonction de validation du formulaire
const handleSubmit =async(e)=>{
  e.preventDefault()
  const formData = {
      idSub:id,
      ens: formvalue.ens
  }
  const res = await axios.put(`${config.apiBaseUrl}/aff.php`, formData)
  if(res.data.success){
      // setMessage(res.data.success)
      alert('affecté')
      setTimeout(() => {
          navigate('/subjects')
      }, 2000);
      handleClose()
  }
}

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
      <Pen/>
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Affecter l'enseignant</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form id="Affect">
        <div data-mdb-input-init className="form-outline mb-4">
        <select name="ens" value={formvalue.ens} onChange={handleInput} className="form-control" required>
                    <option value="">Slectionnez un Enseignant</option>
                    {
                    prof.map((p, index) =>(
                    <option key={index} value={p.id} >{p.nom }{' '}{p.prénom}</option>
                        )
                    )}
                    </select>
        <label className="form-label" >Enseignant</label>
        </div>
            <div data-mdb-input-init className="form-outline mb-4">
            <input type="text" className="form-control" name="libellé_classe" id="libellé_classe" value={libel} onChange={handleInput} />
            <label className="form-label" >libellé_Matiere</label>
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
            Affecter
          </button>

        </Modal.Footer>
      </Modal>
    </>
  );
}

