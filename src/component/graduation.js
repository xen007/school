import React, { useState, useEffect, useRef } from 'react';
import ReactToPrint from 'react-to-print';
import config from './config';
import logo from './format.png';
import './certificate.css';

export default function Graduation() {
  const [studentData, setStudentData] = useState([]);
  const [record, setRecord] = useState([]);
  const [ecData, setEcData] = useState({});
  const [niveau, setNiveau] = useState([]);
  const [classe, setClData] = useState([]);
  const [classData, setClassData] = useState([]);
  const [enable, setEnable] = useState(true);
  const [text, setText] = useState("Selectionnez d'abord le niveau");

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
  };

  const getClasse = async () => {
    const reqData = await fetch(`${config.apiBaseUrl}/classe.php`);
    const resData = await reqData.json();
    setClData(resData);
  };

  const handleTri = (e) => {
    setRecord(studentData.filter(s => s.cl === e.target.value));
  };

  const handleNiveau = (e) => {
    const niveauId = e.target.value;
    if (niveauId !== "") {
      setClassData(classe.filter(s => s.niveau === niveauId));
      setEnable(false);
      setText('Selectionnez la classe');
    } else {
      setText("Selectionnez d'abord le niveau");
      setClassData([]);
      setEnable(true);
    }
  };

  const getCurrentDate = (filiere) => {
    const today = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const locale = (filiere === '1' || filiere === '3') ? 'fr-FR' : 'en-US';
    return today.toLocaleDateString(locale, options);
  };

  let componentPdf = useRef();

  const getFonc = (filiere) => {
    switch (filiere) {
      case '1':case '3':
        return 'La Directrice';
      case '2':
        return 'The Headmistress';
      default:
        return 'N/A';
    }
  };

  const getRem = (filiere) => {
    return (filiere === '1' || filiere === '3') ? 'FÉLICITATIONS' : 'CONGRATULATIONS';
  };

  return (
    <main className='main-container'>
      <div className="row mb-3">
        <div className="form-group col-md-4">
          <label className="mb-2">Niveau</label>
          <select name="niveau" className="form-control" onChange={handleNiveau}>
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

      <div style={{ display: "" }}>
        <div ref={(el) => (componentPdf = el)}>
          {record.map((student, index) => (
            <div key={index} className="image-container">
              <img src={logo} alt="Background logo" className="background-image" />
              <div id="heads">
                <div>
                  <p className="fw-bold">REPUBLIQUE DU CAMEROUN</p>
                  <p>Paix Travail Patrie</p>
                  <p className="fw-bold">MINISTERE DE L'EDUCATION DE BASE</p>
                  <p>Délégation Régionale de l'Est</p>
                  <p>Délégation Départementale du Lom et Djerem</p>
                </div>
                <div>
                  <img src={`${config.apiBaseUrl}/logo/${ecData.logo}`} style={{ width: "130px" }} alt="School logo" />
                </div>
                <div>
                  <p className="fw-bold">REPUBLIC OF CAMEROON</p>
                  <p>Peace Work Fatherland</p>
                  <p className="fw-bold">MINISTRY OF BASIC EDUCATION</p>
                  <p>East Regional Delegation</p>
                  <p>Lom and Djerem Divisional Delegation</p>
                </div>
              </div>
              <div id="middles">
                <p id="tiEcol">{ecData.nomec}</p>
              </div>
              
              <div id='tex'>
                <div id='tiC'>
                    <p>CERTIFICAT DE GRADUATION</p> 
                    <p style={{fontSize:'18px',marginLeft:'100px'}}><em >GRADUATION CERTIFICATE</em></p>
                </div>
                
                <p>Je soussignée Madame <strong>{ecData.responsable}</strong> Directrice de {ecData.nomec},</p>
                <p style={{fontSize:'15px'}}><em>I, the undersigned Mrs. Headmistress of</em></p>

                <p>Certifie que l'élève <strong style={{fontSize:'23px'}} id='nom'>{student.nom} {student.prenom}</strong>, Né(e) le <strong><em style={{fontSize:'18px'}}>{student.dateNaiss}</em></strong> à <strong><em style={{fontSize:'18px'}}>{student.lieuNaiss}</em></strong> est promu(e) en classe de SIL au primaire</p>
                <p style={{fontSize:'15px'}}><em>Certify that the pupil Born on the at is promoted to Class 1 of Primary school</em></p>
                
                <p>Suite à ses brillants résultats en <strong>2eme année  </strong> de maternelle durant l'année scolaire <strong>{student.scolaire}</strong>.</p>
                <p style={{fontSize:'15px'}}><em>Following his/her brilliant performance in Nursery 2 of nursery School during the school year </em></p>
                
                <p>Pour attester cela, ce certificat est délivré pour servir et valoir ce que de droit.</p>
                <p style={{fontSize:'15px'}}><em>To witness it, this certificate is issued to serve the purpose it deserves.</em></p>
              </div>
              <div id='dte'>
                <p><strong>Bertoua, {getCurrentDate(student.filiere)}</strong> </p>
                <p><strong>{getFonc(student.filiere)}</strong></p>
              </div>
              <p id='remd'><strong>{getRem(student.filiere)}</strong></p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
