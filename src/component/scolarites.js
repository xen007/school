import React, { useEffect, useRef, useState } from 'react';
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import ScoSuite from '../undercompo/scoSuite';
import ScoAdd from '../undercompo/scoAdd';
import ScoView from '../undercompo/scoView';
import ReactToPrint from "react-to-print";
import { PrinterFill } from 'react-bootstrap-icons';
import config from './config';

export default function Scolarite() {
  const [scoData, setscoData] = useState([]);
  const [insData, setinsData] = useState([]);
  const [classe, setClData] = useState([]);
  const [classData, setClassData] = useState([]);
  const [niveauData, setNiveauData] = useState([]);
  const [enable, setEnable] = useState(true);
  const [text, setText] = useState('Selectionnez d\'abord le niveau');
  const [ecData, setecData] = useState([]);
  const [lab, setLab] = useState('');
  const [record, setRecord] = useState([]);

  useEffect(() => {
    getclasse();
    getNiveau();
    getEcole();
  }, []);

  const getclasse = async () => {
    const reqdata = await fetch(`${config.apiBaseUrl}/classe.php`);
    const resdata = await reqdata.json();
    setClData(resdata);
  };

  const getNiveau = async () => {
    const reqdata = await fetch(`${config.apiBaseUrl}/niveau.php`);
    const resdata = await reqdata.json();
    setNiveauData(resdata);
  };

  const getEcole = async () => {
    const reqdata = await fetch(`${config.apiBaseUrl}/schoolUp.php/` + 1);
    const resdata = await reqdata.json();
    setecData(resdata);
  };

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
    setRecord(scoData.filter(s => s.classe === e.target.value));
  };

  const Tri = (e) => {
    setRecord(scoData.filter(s => s.nom.toLowerCase().includes(e.target.value.toLowerCase())));
  };

  const handleIns = async () => {
    const reqSco = await fetch(`${config.apiBaseUrl}/sco.php`);
    const resSco = await reqSco.json();
    setscoData(resSco);

    const reqIns = await fetch(`${config.apiBaseUrl}/ins.php`);
    const resIns = await reqIns.json();
    setinsData(resIns);

    if (Array.isArray(resIns) && Array.isArray(resSco)) {
      const result = resIns.filter(ins => !resSco.some(sco => sco.matricule === ins.matricule)).sort((a, b) => a.nom.localeCompare(b.nom));
      setRecord(result);
      setscoData(result)
    }else{
      const reqIns = await fetch(`${config.apiBaseUrl}/ins.php`);
      const resIns = await reqIns.json();
      setinsData(resIns);
      setRecord(resIns);
    }
    setLab('Tous les élèves inscrits uniquement');
  };

  const handleTr1 = async () => {
    const req = await fetch(`${config.apiBaseUrl}/sco.php`);
    const res = await req.json();
    if (Array.isArray(res)) {
      const result = res.filter(s => s.tranche === "1").sort((a, b) => a.nom.localeCompare(b.nom));
      setscoData(result);
      setRecord(result);
    }
    setLab('1ère Tranche En cours');
  };

  const handleTr2 = async () => {
    const req = await fetch(`${config.apiBaseUrl}/sco.php`);
    const res = await req.json();
    if (Array.isArray(res)) {
      const result = res.filter(s => s.tranche === "2").sort((a, b) => a.nom.localeCompare(b.nom));
      setscoData(result);
      setRecord(result);
    }
    setLab('2ème Tranche En cours');
  };

  const handleTr3 = async () => {
    const req = await fetch(`${config.apiBaseUrl}/sco.php`);
    const res = await req.json();
    if (Array.isArray(res)) {
      const result = res.filter(s => (s.tranche === "3" && s.reste !== 0)).sort((a, b) => a.nom.localeCompare(b.nom));
      setscoData(result);
      setRecord(result);
    }
    setLab('3ème Tranche En cours');
  };

  const handleTerm = async () => {
    const req = await fetch(`${config.apiBaseUrl}/sco.php`);
    const res = await req.json();
    if (Array.isArray(res)) {
      const result = res.filter(s => s.reste === 0).sort((a, b) => a.nom.localeCompare(b.nom));
      setscoData(result);
      setRecord(result);
    }
    setLab('Scolarité terminée');
  };

  let componentPdf = useRef();

  return (
    <main className='main-container'>
      <h3>Bienvenue sur la gestion des frais de scolarités</h3>
      <div className="col-sm-12">
        <div className="row mb-3">
          <div className="form-group col-md-3">
            <label className="mb-2">Niveau</label>
            <select name="niveau" className="form-control" onChange={handleNiveau}>
              <option value="">Selectionnez le Niveau</option>
              {niveauData.map((nData, index) => (
                <option key={index} value={nData.id}>{nData.libellee_niveau}</option>
              ))}
            </select>
          </div>
          <div className="form-group col-md-3">
            <label className="mb-2">Classe</label>
            <select name="classe" disabled={enable} onChange={handleTri} className="form-control">
              <option value="">{text}</option>
              {classData.map((nData, index) => (
                <option key={index}>{nData.libellé_classe}</option>
              ))}
            </select>
          </div>
          <div className="form-group col-md-3">
            <label className="mb-2">Rechercher</label>
            <input type="search" placeholder="Tapez le nom" aria-label="Search" onChange={Tri} className="form-control" />
          </div>
        </div>
        <div className='row'>
          <div className="form-group col-md-7">
            <div className="btn-group w-100" role="group" aria-label="Basic outlined example">
              <button className="btn btn-outline-primary w-20" onClick={handleIns}>Tous</button>
              <button className="btn btn-outline-primary w-20" onClick={handleTr1}>Tranche 1</button>
              <button className="btn btn-outline-primary w-20" onClick={handleTr2}>Tranche 2</button>
              <button className="btn btn-outline-primary w-20" onClick={handleTr3}>Tranche 3</button>
              <button className="btn btn-outline-primary w-20" onClick={handleTerm}>Soldé</button>
            </div>
          </div>
          <div className="col-md-3">
            <ReactToPrint
              trigger={() => <button className="btn btn-success"><PrinterFill /> Imprimer</button>}
              content={() => componentPdf}
            />
          </div>
        </div>
      </div>
      <h3><strong>{lab}</strong></h3>
      <table className='table table-striped table-bordered w-auto'>
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
          {record.map((stuData, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{stuData.matricule}</td>
              <td>{stuData.nom}</td>
              <td>{stuData.classe}</td>
              <td>{stuData.verser} FCFA</td>
              <td>{stuData.reste} FCFA</td>
              <td>
              {lab === 'Tous les élèves inscrits uniquement' ? (
                <div role="group" aria-label="First group">
                    <ScoAdd data={stuData} />
                </div>
                
                ) : stuData.reste === 0 ? (
                <div className="btn-group" role="toolbar" aria-label="Toolbar with button groups">
                    <div role="group" aria-label="First group">
                        <div className='btn ' style={{ color: 'green', fontSize: '15px' }}><IoCheckmarkDoneSharp /></div>
                    </div>
                    <div role="group" aria-label="Third group">
                        <ScoView data={stuData} />
                    </div>
                </div>
                ) : (
                <div className="btn-group" role="toolbar" aria-label="Toolbar with button groups">
                    <div role="group" aria-label="First group">
                        <ScoSuite data={stuData} />
                    </div>
                    <div role="group" aria-label="Third group">
                        <ScoView data={stuData} />
                    </div>
                </div>
                )}

              </td>
            </tr>

          ))}
        </tbody>
      </table>




        <div style={{ display: "none" }}  >
            <div ref={(el) => (componentPdf = el)} style={{width:'100%',padding:'20px 40px',fontSize:'10px'}} >
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
    )
}
