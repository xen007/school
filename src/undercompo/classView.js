// importation des differents modules
import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './stview.css'
import { Eye } from "react-bootstrap-icons";
// fonction principale
export default function ClassView({data}) {
  // déclaration des constantes
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
const id= data.niveau
const libel_Classe = data.libellé_classe
const nombre_El = data.nombre_élève
const Ens = data.nomprof
const cat = data.cat
const sco = data.sco
const tr1 = data.tr1
const tr2 = data.tr2
const tr3 = data.tr3

const[sub,setSub]= useState([])
useEffect( ()=>{
  // récupération des informations de la classe
  const getSubject= async()=>{
    const reqdata = await fetch("http://localhost/ssm/api/clView.php/"+id)
    const resdata = await reqdata.json()
    // console.log(resdata)
      setSub(resdata)
      // setFormvalue(resdata) 
      }
      getSubject()
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
          <Modal.Title>Classe de {libel_Classe}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <form >
                
                <div className=" row ">
                <div className="col-md-4">
                  <div data-mdb-input-init className="form-outline">
                      <input type="text" className="form-control" name="" id="libellé_classe" value={libel_Classe}  disabled/>
                      <label className="form-label" >libellé_Classe </label>
                  </div>
                  <div data-mdb-input-init className="form-outline">
                      <input type="text" className="form-control" name="" id="libellé_classe" value={Ens}  disabled/>
                      <label className="form-label" >Enseignant Principal </label>
                  </div>
                  
                  <div data-mdb-input-init className="form-outline">
                      <input type="text" className="form-control" name="" id="libellé_classe" value={nombre_El} disabled/>
                      <label className="form-label" >nombre_élèves </label>
                      
                  </div>
                  
                </div>
                <div className="col-md-4">
                  <div data-mdb-input-init className="form-outline">
                      <input type="text" className="form-control" name="" id="libellé_classe" value={cat}  disabled/>
                      <label className="form-label" >Categorie </label>
                  </div>
                  <div data-mdb-input-init className="form-outline">
                      <input type="text" className="form-control" name="" id="sco" value={sco +' F'} disabled/>
                      <label className="form-label" >Frais_scolarite </label>
                  </div>
                
                  
                </div>
                <div className="col-md-4">
                <div data-mdb-input-init className="form-outline">
                      <input type="text" className="form-control" name="" id="libellé_classe" value={tr1}  disabled/>
                      <label className="form-label" >1ere tranche </label>
                  </div>
                
                  <div data-mdb-input-init className="form-outline">
                      <input type="text" className="form-control" name="" id="libellé_classe" value={tr2}  disabled/>
                      <label className="form-label" >2e tranche </label>
                  </div>
                
                  <div data-mdb-input-init className="form-outline">
                      <input type="text" className="form-control" name="" id="libellé_classe" value={tr3}  disabled/>
                      <label className="form-label" >3e tranche </label>
                  </div>
                </div>
                </div>
               
                </form>
                <div className='container'>
                    <div className='row'>
                        <h3><strong>Liste des matières disponibles</strong></h3>  
                        <table className='table table-striped table-bordered w-auto'>
                            <thead>
                                <tr>
                                    <th>Sr No</th>
                                    <th>libellé_Matière</th>
                                    <th>Nom_E_</th>
                                    <th>Coef</th>
                                </tr>
                            </thead>
                            <tbody>
                                {    
                                    sub.map((subData,index) =>(
                                    
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{subData.nom}</td>
                                    <td>{subData.ens}</td>
                                    <td>{subData.coef}</td>
                                </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                    {/* <div className='buttons'>
                            <button className='btn btn-secondary' onClick={()=>{navigate('/classes')}}>Retour</button>
                        </div> */}
                     
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




