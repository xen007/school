// importation des modules
import axios from "axios";
import React, {useState } from "react";
import { CurrencyExchange } from "react-bootstrap-icons";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from "react-router-dom";
import config from '../component/config';
// fonction  principale
export default function InsAdd({data}) {
  // déclaration des constantes
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

const id= data.matricule
const nom =data.nom
const classe =data.classe
const cl=data.cl
const ins = data.ins
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
  if(val.montant == ''){
    alert('le montant')
  }else if(Number(val.montant)  !== Number(ins) ){
    alert('le montant entré est different de l\'insciption')
  }  else {
    
  const formData = {
      mat:id,
      classe: cl,
      montant: val.montant,
      ins:ins
      // solde: val.solde
  }
  const res = await axios.post(`${config.apiBaseUrl}/ins.php`, formData)
  if(res.data.success){
      // setMessage(res.data.success)
      alert('Inscrit avec succès')
      setTimeout(() => {
          navigate('/inscriptions')
      }, 1000);
      handleClose()
  }
}
}



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
          <Modal.Title>Inscrire l'élève</Modal.Title>
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
                        <label>frais_Inscription</label>
                        <input type="number" name='ins' id='ins' value={ins} onChange={handleInput}  readOnly/>
                    </div> 
                    <div className="input-field">
                      <label>versement</label>
                      <input type="number" name='montant' id='montant'  max={ins} value={val.montant} onChange={handleInput}  placeholder="montant" required/>
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

