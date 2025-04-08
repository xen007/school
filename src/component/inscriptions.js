import React, { useEffect, useRef, useState } from 'react';
import ScoAdd from '../undercompo/scoAdd';
import { FaCheck } from 'react-icons/fa';
import PdfTemplate from '../undercompo/Template';
import ReactToPrint from "react-to-print";
import { PrinterFill } from 'react-bootstrap-icons';
import InsAdd from '../undercompo/insAdd';
import config from './config';

export default function Inscriptions() {
  const [studentData, setStudentData] = useState([]);
  const [insData, setInsData] = useState([]);
  const [sco, setScoData] = useState([]);
  const [lab, setLab] = useState('');
  const [classe, setClData] = useState([]);
  const [classData, setClassData] = useState([]);
  const [niveauData, setNiveauData] = useState([]);
  const [enable, setEnable] = useState(true);
  const [text, setText] = useState('Selectionnez d\'abord le niveau');
  const [ecData, setEcData] = useState([]);
  const [record, setRecord] = useState([]);

  useEffect(() => {
    getStudentData();
    getScoData();
    getClasse();
  }, []);

  const getScoData = async () => {
    const req = await fetch(`${config.apiBaseUrl}/sco.php`);
    const res = await req.json();
    if (res.resultat !== 'Verifiez les informations SVP') {
      const result = res.sort((a, b) => a.nom.localeCompare(b.nom));
      setScoData(result);
    }
  };

  const getStudentData = async () => {
    const requestData = await fetch(`${config.apiBaseUrl}/l.php`);
    const responseData = await requestData.json();
    if (responseData.resultat !== 'Verifiez les informations SVP') {
      const result = responseData.sort((a, b) => a.nom.localeCompare(b.nom));
      setStudentData(result);
    }
  };

  const getClasse = async () => {
    const reqdata = await fetch(`${config.apiBaseUrl}/classe.php`);
    const resdata = await reqdata.json();
    setClData(resdata);
  };

  useEffect(() => {
    const getNiveau = async () => {
      const reqdata = await fetch(`${config.apiBaseUrl}/niveau.php`);
      const resdata = await reqdata.json();
      setNiveauData(resdata);
    };
    getNiveau();
    const getEcole = async () => {
      const reqdata = await fetch(`${config.apiBaseUrl}/schoolUp.php/` + 1);
      const resdata = await reqdata.json();
      setEcData(resdata);
    };
    getEcole();
  }, []);

  const handleNiveau = async (e) => {
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

  const handleTri = (e) => {
    setRecord(insData.filter(s => s.classe === e.target.value));
  };

  const Tri = (e) => {
    setRecord(insData.filter(s => s.nom.toLowerCase().includes(e.target.value) || s.nom.toUpperCase().includes(e.target.value)));
  };

  const handleInscrits = async () => {
    const req = await fetch(`${config.apiBaseUrl}/ins.php`);
    const res = await req.json();
    if (Array.isArray(res)) {
      const result = res.sort((a, b) => a.nom.localeCompare(b.nom));
      setInsData(result);
      setRecord(result);
    }
    setLab('Liste des élèves Inscrits');
  };

  const handleNonInscrits = async () => {
    const req = await fetch(`${config.apiBaseUrl}/ins.php`);
    const res = await req.json();
    if (Array.isArray(res)) {
      const nonInscrits = studentData.filter(obj1 => !res.some(obj2 => obj1.matricule === obj2.matricule));
      setRecord(nonInscrits);
    } else {
      setRecord(studentData);
    }
    setLab('Liste des élèves Non-Inscrits');
  };

  let componentPdf = useRef();

  return (
    <main className='main-container'>
      <h3>Bienvenu sur la gestion des Inscriptions</h3>
      <div className="col-sm-12">
        <div className="row mb-3">
          <div className="form-group col-md-4">
            <label className="mb-2">Niveau</label>
            <select name="niveau" className="form-control" onChange={handleNiveau}>
              <option value="">Selectionnez le Niveau</option>
              {niveauData.map((nData, index) => (
                <option key={index} value={nData.id}>{nData.libellee_niveau}</option>
              ))}
            </select>
          </div>
          <div className="form-group col-md-4">
            <label className="mb-2">Classe</label>
            <select name="classe" disabled={enable} onChange={handleTri} className="form-control">
              <option value="">{text}</option>
              {classData.map((nData, index) => (
                <option key={index}>{nData.libellé_classe}</option>
              ))}
            </select>
          </div>
          <div className="form-group col-md-4">
            <label className="mb-2">Rechercher</label>
            <input type="search" placeholder="Tapez le nom" aria-label="Search" onChange={Tri} className="form-control" />
          </div>
        </div>
        <div className='row'>
          <div className="btn-group col-md-4" role="group" aria-label="Basic outlined example">
            <button type="button" className="btn btn-outline-primary" onClick={handleInscrits}>Inscrits</button>
            <button type="button" className="btn btn-outline-primary" onClick={handleNonInscrits}>Non inscrits</button>
          </div>
          <div className="btn-group col-md-2" role="group">
            <ReactToPrint
              trigger={() => <button className="btn btn-success"><PrinterFill /> Imprimer</button>}
              content={() => componentPdf}
            />
          </div>
        </div>
      </div>

      <h3><strong>{lab}</strong></h3>

      {record.length > 0 ? (
        <table style={{ width: '100%', padding: '0px 12px' }} className='table table-striped table-bordered w-auto'>
          <thead>
            <tr>
              <th>Sr No</th>
              <th>Matricule</th>
              <th>Nom</th>
              <th>Classe</th>
              <th>Versé</th>
              <th>Reste</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {record.map((stuData, index) => {
              const isInIns = insData.some((el) => el.matricule === stuData.matricule);

              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{stuData.matricule}</td>
                  <td>{stuData.nom}</td>
                  <td>{stuData.classe}</td>
                  <td>{stuData.montant ? `${stuData.montant} FCFA` : '-'}</td>
                  <td>{stuData.reste ? `${stuData.reste} FCFA` : '-'}</td>
                  <td>
                    {isInIns ? (
                    <div className="btn-group" role="toolbar" aria-label="Toolbar with button groups">
                      <div role="group" aria-label="First group">
                        <div className='btn' style={{ color: 'green', fontSize: '15px' }}><FaCheck /></div>
                      </div>
                      <div role="group" aria-label="Third group">
                        <PdfTemplate data={stuData} />
                      </div>
                    </div>
                    ) : (
                      <InsAdd data={stuData} />
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p>Aucune donnée disponible</p>
      )}


  <div style={{ display: "none" }}  >
            <div ref={(el) => (componentPdf = el)} style={{width:'100%',padding:'20px 40px',fontSize:'11px'}} >
            <div id="head">
              {/* entete du bulletin */}
              <div>
                <p className="fw-bold">REPUBLIQUE DU CAMEROUN</p>
                <p>Paix Travail Patrie</p>
                <p className="fw-bold">MINISTERE DE L'EDUCATION DE BASE</p>
                <p>Délégation Régionale de l'Est</p>
                <p>Délégation Départementale du Lom et Djerem</p>
              </div>
              <div>
                <img src={`${config.apiBaseUrl}/logo/${ecData.logo}`} style={{ width: "80px" }} alt="Logo" />
              </div>
              <div>
                <p className="fw-bold">REPUBLIC OF CAMEROON</p>
                <p>Peace Work Fatherland</p>
                <p className="fw-bold">MINISTRY OF BASIC EDUCATION</p>
                <p>East Regional Delegation</p>
                <p>Lom and Djerem Divisional Delegation</p>
              </div>
            </div>
            <div id='middle'>
              <p id='tiEcol'>{ecData.nomec} </p>
            </div>
            <h5>{lab}</h5>
        <table   className='table table-striped table-bordered w-auto'>
            <thead>
                <tr>
                   <th>Sr No</th>
                   <th>Matricule</th>
                   <th>Nom</th>
                   <th>Classe</th>
                   <th>Versé</th>
                   <th>Reste</th>
                </tr>
            </thead>
            <tbody>
                {//affichage des donnees recuperes de la bd
                record.map((stuData,index)=>(
                <tr key={index}>
                    <td>{index+1}</td>
                    <td>{stuData.matricule}</td>
                    <td>{stuData.nom}</td>
                    <td>{stuData.classe}</td>
                    <td>{stuData.verser} FCFA </td>
                    <td>{stuData.reste} FCFA </td>
                </tr>
                )) 
                    
                }
            </tbody>
        </table>
            </div>
      </div>
    </main>
  );
}  