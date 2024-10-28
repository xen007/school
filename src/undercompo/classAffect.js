// importation des modules
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Pen } from "react-bootstrap-icons";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from "react-router-dom";
// fonction principale
export default function ClassAffect({data}) {
  // déclaration des constantes
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const[formvalue,setFormvalue] = useState({
    ens:'',
    libellé_classe:'',
})
const id= data.idClasse
const libel_Classe = data.libellé_classe
const handleInput =(e) =>{
    setFormvalue({...formvalue,[e.target.name] : e.target.value})
}
// déclaration des constantes et recupérations des informations de la classe
const[sub,setSub]= useState([])
useEffect( ()=>{
  const getSubject= async()=>{
    const reqdata = await fetch("http://localhost/ssm/api/affect.php/" + id)
    const resdata = await reqdata.json()
    // console.log(resdata)
      setSub(resdata)
      // setFormvalue(resdata) 
      }
      getSubject()
  },[id])

  const navigate = useNavigate()
// fonction de soumission du formulaire
  const handleSubmit =async(e)=>{
    e.preventDefault()
    const formData = {
        idCl:id,
        ens: formvalue.ens
    }
    const res = await axios.put('http://localhost/ssm/api/affect.php', formData)
    if(res.data.success){
        // setMessage(res.data.success)
        alert('affecté')
        setTimeout(() => {
            navigate('/classes')
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
        <select name="ens" value={formvalue.ens} onChange={handleInput} className="form-control" required >
                    <option value="">Slectionnez un Enseignant</option>
                    {
                    sub.map((p, index) =>(
                    <option key={index} value={p.ens} >{p.nomE}</option>
                        )
                    )}
                    </select>
        <label className="form-label" >Enseignant</label>
        </div>
            <div data-mdb-input-init className="form-outline mb-4">
            <input type="text" className="form-control" name="" id="libellé_classe" value={libel_Classe}  disabled/>
            <label className="form-label" >libellé_Classe</label>
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

