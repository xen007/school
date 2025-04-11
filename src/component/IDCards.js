import React, { useState, useEffect, useRef } from 'react';
import { Card, Button } from 'react-bootstrap';
import ReactToPrint from 'react-to-print';
import config from './config';

export default function IDCards() {
  const [studentData, setStudentData] = useState([]);
  const [record, setRecord] = useState([]);
  const [ecData, setEcData] = useState({});
  const [niveau, setNiveau] = useState([]);
  const [classe, setClData] = useState([]);
  const [classData, setClassData] = useState([]);
  const [enable, setEnable] = useState(true);
  const [text, setText] = useState('Selectionnez d\'abord le niveau');
  const componentRef = useRef();

  useEffect(() => {
    getStudentData();
    getEcole();
    getNiveau();
    getClasse();
  }, []);

  const getStudentData = async () => {
    const requestData = await fetch(`${config.apiBaseUrl}/l.php`);
    const responseData = await requestData.json();
    if (responseData.resultat !== 'Verifiez les informations SVP') {
      const result = responseData.sort((a, b) => a.nom.localeCompare(b.nom));
      setStudentData(result.filter(s => s.stat !== '0'));
    }
  };

  const getEcole = async () => {
    const reqData = await fetch(`${config.apiBaseUrl}/schoolUp.php/1`);
    const resData = await reqData.json();
    setEcData(resData);
  };

  const getNiveau = async () => {
    const reqData = await fetch(`${config.apiBaseUrl}/niveau.php`);
    const resData = await reqData.json();
    setNiveau(resData);
    console.log(resData)
  };

  const getClasse = async () => {
    const reqData = await fetch(`${config.apiBaseUrl}/classe.php`);
    const resData = await reqData.json();
    setClData(resData);
  };

  const handleTri = (e) =>{
    setRecord(studentData.filter(s => s.cl === e.target.value));
  }

  const handleNiveau = (e) => {
    const niveauId = e.target.value;
    if (niveauId !== "") {
      setClassData(classe.filter(s => s.niveau === niveauId));
      setEnable(false);
      setText('Selectionnez la classe');
    } else {
      setText('Selectionnez d\'abord le niveau');
      setClassData([]);
      setEnable(true);
    }
  };
  let componentPdf = useRef();
  return (
    <main className='main-container'>
     
     <div className="row mb-3">
        <div className="form-group col-md-4">
            <label className="mb-2">Niveau</label>
            <select name="niveau" className="form-control" onChange={(e) => handleNiveau(e)}>
                <option value="">Selectionnez le Niveau</option>
                {niveau.map((nData, index) => (
                    <option key={index} value={nData.id}>{nData.libellee_niveau}</option>
                ))}
            </select>
        </div>
        <div className="form-group col-md-2">
            <label className="mb-2">Classe</label>
            <select id='classe' name="classe" onChange={handleTri} className="form-control" disabled={enable}>
                <option value="">{text}</option>
                {classData.map((nData, index) => (
                    <option key={index} value={nData.idClasse}>{nData.libellé_classe}</option>
                ))}
            </select>
        </div>
        <div className="col-md-2 d-flex align-items-end">
            <ReactToPrint
                trigger={() => <button className='btn btn-primary'>Imprimer</button>}
                content={() => componentPdf}
            />
        </div>
    </div>

      <div ref={(el) => (componentPdf = el)} style={{ display: 'flex', flexWrap: 'wrap'}}>
        {record.map((data, index) => (
          <Card key={index} style={{ width:'350px',height:'200px', margin: '12px', border: '1px solid #ddd', boxShadow: '0px 0px 15px rgba(0,0,0,0.1)', backgroundColor: '#f7f7f7', display: 'flex', flexDirection: 'column' }}>
            <Card.Header style={{ backgroundColor: '#004080', color: 'white', display: 'flex' }}>
              <img src={`${config.apiBaseUrl}/logo/${ecData.logo}`} style={{ width: '40px', borderRadius: '40px'}} alt="Logo" />
              <div style={{ flex: 1,padding:'1px', textAlign: 'center' }}>
                <Card.Title style={{ fontWeight: 'bold', fontSize: '9px', margin: 0 }}>{ecData.nomec}</Card.Title>
              </div>
              <div style={{ textAlign: 'left' }}>
                <p style={{ margin: 0, fontSize: '8px' }}>Adresse/ Address: {ecData.adresse}</p>
               {/* <p style={{ margin: 0, fontSize: '8px' }}>BP/ PO Box: {ecData.bp} Bertoua</p> */}
                <p style={{ margin: 0, fontSize: '8px' }}>Tel/ Phone: {ecData.contact}</p>
              </div>
            </Card.Header>
            <Card.Body style={{ display: 'flex', flexDirection: 'row', padding: '10px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginRight: '20px', height: '100%' }}>
                <img src={`${config.apiBaseUrl}/image/${data.photo}`} alt={`${data.nom}'s photo`} style={{ width: '80px', height: '70%', borderRadius: '10px', border: '2px solid #ddd', marginBottom: '3px' }} />
              </div>
              <div style={{ flex: 1, height: '100%' }}>
                <p style={{ fontSize: '11px' }}><strong>Noms/Names:</strong> {data.nom} {data.prenom}</p>
                <p style={{ fontSize: '11px' }}><strong>Matricule:</strong> {data.matricule}</p>
                <p style={{ fontSize: '11px' }}><strong>Classe/ Class:</strong> {data.classe}</p>
                <p style={{ fontSize: '11px' }}><strong>Date Naiss/Birth Date:</strong> {data.dateNaiss}</p>
                <p style={{ fontSize: '11px' }}><strong>Genre/Gender:</strong> {data.genre}</p>
                <p style={{ fontSize: '11px' }}><strong>Tuteur/Tutor:</strong> {data.tuteur}</p>
                <p style={{ fontSize: '11px' }}><strong>telephone:</strong> {data.phone}</p>
              </div>
            </Card.Body>
           
          </Card>
        ))}
      </div>
    </main>
  );
}
