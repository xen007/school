
// importation des modules
import axios from "axios";
import React, {useEffect, useRef, useState } from "react";
import { CashCoin, PrinterFill } from "react-bootstrap-icons";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ReactPrint from 'react-to-print'
// fonction  principale

export default function PdfTemplate({data,props}) {
  // déclaration des constantes
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [Dates, setDates] = useState('');
  const ref = useRef ();
  const id= data.id
  const mat= data.matricule
  const nom =data.nom
  const prenom =data.prenom
  const classe =data.classe
  const montant =data.montant
  const reste =data.reste
  const motif =data.motif

// prise en charge des information saisies
useEffect(() => {

  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;
  setDates(date)

},[])
  return (
    <>
      <Button variant="light" onClick={handleShow}>
      <PrinterFill/>
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Body>
        < main className='main-container'>
                <div className="container" ref={ref} >
            {/* <div className=" col-md-10 text-center">
                <h2 style={{ color: '#325aa8' }} >INVOICE</h2>
                <h5> Id: {props.InvoiceNumber}</h5>
            </div>  */}
        <div className="col-xs-12">
            <div className="col-md-12">
            <div className="row">
                <div className="col-xs-7 col-sm-7 col-md-7">
                        <strong>SAINT MARTIN'S COMPREHENSIVE COLLEGE OF STANDARDS BERTOUA</strong>
                        <br/>
                        P.O. BOX 350 BERTOUA
                        <br/>
                        <abbr title="Phone">P:</abbr> (+237) 699-999-999
                </div>
                <div className="col-xs-5 col-sm-5 col-md-5 text-end">
                    <p>
                        <em><b>Date :</b> {Dates}</em>
                    </p>
                    <p>
                        <em>Receipt #: {id}</em>
                    </p>
                </div>
                
            </div>
                 <br/>
                <div className="form-horizontal">
                          <legend>Reçu de paiement</legend>
                          <div className='row '>
                            <div className="form-group col-md-8 col-sm-8">
                                <label for="card-number">Reçu de M/Mlle</label>
                                <div>
                                <input type="text" value={nom +' '+prenom} className="form-control" readOnly />
                                </div>
                            </div>
                            <div className="col-md-4 col-sm-4">
                                <label for="card-number">Matricule</label>
                                <div >
                                <input type="text" value={mat} className="form-control" readOnly />
                                </div>
                            </div>
                            </div>
                          <div className='row '>
                            <div className="form-group col-md-6 col-sm-6" >
                                <label for="card-number">Classe</label>
                                <div className="">
                                <input type="text" value={classe} className="form-control" readOnly />
                                </div>
                            </div>
                            <div className="col-md-6 col-sm-6">
                                <label for="card-number">La somme de</label>
                                <div className="co">
                                <input type="text" value={montant + 'FCFA'} className="form-control" readOnly />
                                </div>
                            </div>
                          </div>
                          <div className='row '>
                            <div className="form-group col-md-8 col-sm-8">
                                <label for="card-number">Motif</label>
                                <div>
                                <input type="text" value={motif} className="form-control" readOnly />
                                </div>
                            </div>
                            <div className="col-md-4 col-sm-4">
                                <label for="card-number">Reste à payer</label>
                                <div >
                                <input type="text" value={reste + 'FCFA'} className="form-control" readOnly />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
            <ReactPrint trigger={() => <button>Imprimer</button>} content={() => ref.current}  />
            
        </main>

        </Modal.Body>
        <Modal.Footer>
          <button onClick={handleClose} className="btn btn-secondary">
            Fermer
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

