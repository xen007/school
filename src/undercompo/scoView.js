// importation des differents modules
import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './stview.css'
import { Eye } from "react-bootstrap-icons";
import PdfTemplate from "./Template";
// fonction principale
export default function ScoView({data}) {
  // déclaration des constantes
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
const id= data.matricule

const[scoData,setScoData]= useState([])
useEffect( ()=>{
  // récupération des informations de la classe
  const getSco= async()=>{
    const reqdata = await fetch("http://localhost/ssm/api/sco.php/"+id)
    const resdata = await reqdata.json()
    // console.log(resdata)
      setScoData(resdata)
      // setFormvalue(resdata) 
      }
      getSco()
  },[id])

  return (
    <>
      <Button className="btn btn-light mx-2" onClick={handleShow}>
      <Eye/>
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Matricule : {id}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         
                <div className='container'>
                    <div className='row'>
                        <h3><strong>Récap des versements</strong></h3>  
                        <table className='table table-striped table-bordered w-auto'>
                        <thead>
                <tr>
                   <th>Sr No</th>
                   <th>Nom</th>
                   <th>Versé</th>
                   <th>Reste</th>
                   <th>Date</th>
                   <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {//affichage des donnees recuperes de la bd
                scoData.map((stuData,index)=>(
                <tr key={index}>
                    <td>{index+1}</td>
                    <td>{stuData.nom}</td>
                    <td>{stuData.montant} F </td>
                    <td>{stuData.reste} F </td>
                    <td>{stuData.date}</td>
                    <td>
                        <div  role="group" aria-label="Third group">
                            <PdfTemplate data={stuData}/> 
                        </div>
                    </td>
                </tr>
                )) 
                    
                }
            </tbody>
                        </table>
                    </div>
                     
                </div>
            
        </Modal.Body>
        <Modal.Footer>
          {/* <Button variant="secondary" onClick={handleClose}>
            Fermer
          </Button> */}
          <button onClick={handleClose} className="btn btn-secondary">
            Fermer
          </button>

        </Modal.Footer>
      </Modal>
    </>
  );
}




