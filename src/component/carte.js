import React, { useState, useRef } from 'react';
import { Card, Button, Modal } from 'react-bootstrap';
import ReactToPrint from 'react-to-print';
import { PersonBadgeFill, PrinterFill } from 'react-bootstrap-icons';
import config from './config';
const IDCards = ({ data, res }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const individualPdf = useRef();

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        <PersonBadgeFill />
      </Button>
 bn
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>ID Card for {data.nom}</Modal.Title>
        </Modal.Header>
        <Modal.Body ref={individualPdf}>
          <Card style={{ margin: '10px', border: '1px solid #ddd',width:'450px', padding: '10px', boxShadow: '0px 0px 15px rgba(0,0,0,0.1)', backgroundColor: '#f7f7f7' }}>
            <Card.Header style={{ backgroundColor: '#004080', color: 'white', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <img src={`${config.apiBaseUrl}/logo/${res.logo}`} style={{ width: "60px",borderRadius:'40px',padding:'5px' }} alt="Logo" /> 
               <div style={{ flex: 1, textAlign: 'center' }}>
                <Card.Title style={{ fontWeight: 'bold', fontSize: '12px', margin: 0 }}>{res.nomec}</Card.Title>
              </div>
              <div style={{textAlign: 'left', padding:'5px'}}>
                <p style={{ margin: 0, fontSize: '10px' }}>Adresse/ Adress: {res.adresse} </p>
                {/* <p style={{ margin: 0, fontSize: '10px' }}>BP/ PO Box: {res.bp} Bertoua </p> */}
                <p style={{ margin: 0, fontSize: '10px' }}>Tel/ Phone: {res.contact}</p>
              </div>
            </Card.Header>
            <Card.Body style={{ display: 'flex', flexDirection: 'row', padding: '10px', height: '150px', }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginRight: '20px', height: '100%' }}>
                <img src={`${config.apiBaseUrl}/image/${data.photo}`} alt={`${data.nom}'s photo`} style={{ width: '120px', height: '100%', borderRadius: '10px', border: '2px solid #ddd', marginBottom: '3px' }} />
              </div>
              <div style={{ flex: 1 ,height: '100%' }}>
                <p style={{ fontSize: '11px', margin: '5px' }}><strong>Noms/Names:</strong> {data.nom} {data.prenom}</p>
                <p style={{ fontSize: '11px', margin: '5px' }}><strong>Matricule:</strong> {data.matricule}</p>
                <p style={{ fontSize: '11px', margin: '5px' }}><strong>Classe/ Class:</strong> {data.classe}</p>
                <p style={{ fontSize: '11px', margin: '5px' }}><strong>DateNaiss/Birth Date:</strong> {data.dateNaiss}</p>
                <p style={{ fontSize: '11px', margin: '5px' }}><strong>Genre/Gender:</strong> {data.genre}</p>
              </div>
            </Card.Body>
            <Card.Footer style={{ backgroundColor: '#f8f9fa', textAlign: 'center',}}>
              <p style={{ fontWeight: 'bold', fontSize: '11px',margin: 0 }}>Authorized Signature</p>
            </Card.Footer>
          </Card>
        </Modal.Body>
        <Modal.Footer>
          <ReactToPrint
            trigger={() => <Button variant="success"><PrinterFill /> Print</Button>}
            content={() => individualPdf.current}
          />
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default IDCards;
