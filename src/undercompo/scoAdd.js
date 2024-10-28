// importation des modules
import axios from "axios";
import React, {useState } from "react";
import { CashCoin } from "react-bootstrap-icons";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from "react-router-dom";
// fonction  principale
export default function ScoAdd({data}) {
  // déclaration des constantes
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
const id= data.matricule
const nom =data.nom
const classe =data.classe
const sco = data.sco
const[val,setVal] =useState({
  montant:'',
  etat: ''
})
// prise en charge des information saisies
const handleInput =(e) =>{
  setVal({...val,[e.target.name] : e.target.value})
}
const navigate = useNavigate()
// fonction pour soumettre le formulaire
const handleSubmit =async(e)=>{
  e.preventDefault()
  console.log(sco)
  if(val.montant == ''){
    alert('le montant est vide')
  }
  else if(Number(val.montant) > Number(sco)){
    alert('le montant entré est supérieur au solde')
  } else {
    
  const formData = {
    i: data.i,
    mat:id,
    montant: val.montant,
    sco: sco,
      // solde: val.solde
  }
  const res = await axios.post('http://localhost/ssm/api/sco.php', formData)
  if(res.data.success){
      // setMessage(res.data.success)
      alert('Montant pris en compte avec succès')
      setTimeout(() => {
          navigate('/scolarites')
      }, 1000);
      handleClose()
  }
}
}



  return (
    <>
      <Button variant="warning" onClick={handleShow}>
      <CashCoin/>
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>commencer la scolarite</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
                <form onSubmit={handleSubmit}>
                <div className=" row ">
                  <div className="col-md-6">
                  
                    <div className="input-field">
                      <label>Matricule</label>
                      <input type="text" name='matricule' id='matricule' value={id} placeholder="Entrez le lieu de Naissance" disabled/>
                    </div>
                    <div className="input-field">
                      <label>Nom_Eleve</label>
                      <input type="text" name='nom' id='nom' value={nom} placeholder="Entrez l'adresse" disabled/>
                      </div>
                    <div className="input-field">
                    <label>Classe</label>
                      <input type="text" name='classe' id='classe' value={classe}  disabled/>
                  </div>
                  </div>
                  <div className="col-md-6">
                    <div className="input-field">
                        <label>Frais_Total</label>
                        <input type="number" name='sco' id='sco' value={sco} onChange={handleInput}  readOnly/>
                    </div> 
                    <div className="input-field">
                        <label>Reste_a_verser</label>
                        <input type="number" name='solde' id='solde' value={sco} onChange={handleInput}  readOnly/>
                    </div> 
                    <div className="input-field">
                      <label>versement</label>
                      <input type="number" name='montant' id='montant'  max={sco} value={val.montant} onChange={handleInput}  placeholder="montant" required/>
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

