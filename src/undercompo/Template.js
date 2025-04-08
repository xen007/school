// Importation des modules
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { CashCoin, PrinterFill } from "react-bootstrap-icons";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ReactPrint from 'react-to-print';
import config from '../component/config';

// Fonction principale
export default function PdfTemplate({ data, props }) {
  // Déclaration des constantes
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [Dates, setDates] = useState('');
  const [ecData, setecData] = useState([]);

  const ref = useRef();
  const id = data.id;
  const mat = data.matricule;
  const nom = data.nom;
  const prenom = data.prenom;
  const classe = data.classe;
  const montant = data.montant;
  const reste = data.reste;
  const motif = data.motif;

  // Prise en charge des informations saisies
  useEffect(() => {
    const current = new Date();
    const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;
    setDates(date);

    const getecole = async () => {
      const reqdata = await fetch(`${config.apiBaseUrl}/schoolUp.php/` + 1);
      const resdata = await reqdata.json();
      setecData(resdata);
    };
    getecole();
  }, []);

  return (
    <>
      <Button variant="light" onClick={handleShow}>
        <PrinterFill />
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Body>
          <main className='main-container'>
            <div className="container card-container" ref={ref} style={{ width: '100%' }}>
              <div className="row">
                <div className="col-12 col-sm-7 col-md-5">
                  <p id='tiEcol'><strong>{ecData.nomec}</strong></p>
                  <p>{ecData.bp}</p>
                  <p>{ecData.contact}</p>
                </div>
                <div className="col-12 col-sm-5 col-md-2">
                  <img src={`${config.apiBaseUrl}/logo/${ecData.logo}`} style={{ width: "80px" }} alt="Logo" />
                </div>
                <div className="col-12 col-md-5 text-md-end">
                  <p>
                    <em><b>Date :</b> {Dates}</em>
                  </p>
                  <p>
                    <em>Receipt #: {id}</em>
                  </p>
                </div>
              </div>
              <br />
              <div className="form-horizontal">
                <legend>Reçu de paiement</legend>
                <div className='row'>
                  <div className="form-group col-md-8 mb-3">
                    <label htmlFor="recipient-name">Reçu de M/Mlle</label>
                    <input type="text" value={nom + ' ' + prenom} className="form-control" readOnly />
                  </div>
                  <div className="form-group col-md-4 mb-3">
                    <label htmlFor="matricule">Matricule</label>
                    <input type="text" value={mat} className="form-control" readOnly />
                  </div>
                </div>
                <div className='row'>
                  <div className="form-group col-md-6 mb-3">
                    <label htmlFor="classe">Classe</label>
                    <input type="text" value={classe} className="form-control" readOnly />
                  </div>
                  <div className="form-group col-md-6 mb-3">
                    <label htmlFor="amount">La somme de</label>
                    <input type="text" value={montant + ' FCFA'} className="form-control" readOnly />
                  </div>
                </div>
                <div className='row'>
                  <div className="form-group col-md-8 mb-3">
                    <label htmlFor="motif">Motif</label>
                    <input type="text" value={motif} className="form-control" readOnly />
                  </div>
                  <div className="form-group col-md-4 mb-3">
                    <label htmlFor="remaining">Reste à payer</label>
                    <input type="text" value={reste + ' FCFA'} className="form-control" readOnly />
                  </div>
                  <p className="text-end"><strong>La Directrice</strong></p>
                </div>
              </div>
              <ReactPrint trigger={() => <button className="btn btn-primary mt-3">Imprimer</button>} content={() => ref.current} />
            </div>
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
