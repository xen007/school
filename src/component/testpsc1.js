import React, { useState, useEffect, useRef } from 'react';
import ReactToPrint from 'react-to-print';
import config from './config';
import logo from './format.png';
import './certificate.css';

export default function Excell() {
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
    const locale = filiere === '1' ? 'fr-FR' : 'en-US';
    return today.toLocaleDateString(locale, options);
  };

  let componentPdf = useRef();

  const getFonc = (filiere) => {
    switch (filiere) {
      case '1':
        return 'La Directrice';
      case '2':
        return 'The Headmistress';
      default:
        return 'N/A';
    }
  };

  const getRem = (filiere) => {
    return filiere === '1' ? 'FÉLICITATIONS' : 'CONGRATULATIONS';
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

      <div style={{ display: "hidden" }}>
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
                  <img src={`${config.apiBaseUrl}/logo/${ecData.logo}`} style={{ width: "150px" }} alt="School logo" />
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
                    <p>BOURSE SCOLAIRE (5%)</p> 
                    <p style={{fontSize:'18px',marginLeft:'150px'}}><em > (5%) SCOLARSHIP</em></p>
                </div>

                <p>DÉCERNÉ à <strong style={{fontSize:'23px'}} id='nom'>{student.nom} {student.prenom}</strong></p>
                <p style={{fontSize:'15px'}}><em>AWARDED TO</em></p>
                
                <p>Pour ses performances scolaires appreciables occupant le rang de 1er de sa classe</p>
                <p style={{fontSize:'15px'}}><em>For his/her appreciable performance with rank of 1st for his class</em></p>
                
                <p>avec une moyenne annuelle de /20</p>
                <p style={{fontSize:'15px'}}><em>With an annual average of</em></p>
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
