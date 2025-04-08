
import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import config from '../component/config';

export default function SeeBulls({data}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

const id= data.matricule
const classe = data.classe

    const[noData, setnoData] = useState([])
    useEffect ( () => {
        const getnoData = async() =>{
            const requestData = await fetch(`${config.apiBaseUrl}/notes.php/`+ id)
            const responseData = await requestData.json()
            setnoData(responseData)
            // setFormvalue(responseData)
            // console.log(responseData)
        }
        getnoData()
    },[id])


  return (
    <>
      <Button variant="primary" onClick={handleShow}>
      <i className="bi bi-pen"></i>
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
        <main className="main-container">
            <h3>Bienvenu dans la gestion des bulletins</h3>
            <h1>FIRST TERM RESULT YEAR 2024 </h1>
            <p>WEEB result </p>
            
            
            <table className="table ">
                <tr>
                    <td>Nom et Prénoms: {data.nom} {data.prénom} </td>
                    <td>Matricule: {id} </td>
                </tr>
                <tr>
                    <td>Sex: {data.genre} </td>
                    <td>Classe: {classe} </td>
                    <td>Adresse: {data.adresse}</td>
                </tr>
              
                    
                <tr>
                    <th>Matiere/Enseignant</th>
                    <th>Note 1</th>
                    <th>Note 2</th>
                    <th>Coef</th>
                    <th>Moy</th>
                    <th>Observation</th>
                </tr>
                {
                    noData.map((no,index)=>(
                <tr key={index}>
                    <td>{no.nomMat}/{no.prof} </td>
                    <td>{no.note1}</td>
                    <td>{no.note2}</td> 
                    <td>{no.coef} </td>
                    <td>{no.note1 * no.coef} </td>
                    <td>Bien</td>
                </tr>
                 ))
                }
            </table>
       
        </main>
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