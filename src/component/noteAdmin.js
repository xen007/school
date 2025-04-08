// Importation des modules
import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'react-bootstrap-icons';
import NoteEdit from '../undercompo/noteEdit';
import config from './config';

// Fonction principale
export default function NoteAdmin() {
  // Déclaration des constantes
  const [seq, setSeq] = useState([]);
  const [niveau, setNiveau] = useState([]);
  const [niveauData, setNiveauData] = useState([]);
  const [evaluation, setEvaluation] = useState([]);
  const [evalData, setEvalData] = useState([]);
  const [student, setStudent] = useState([]);
  const [subject, setSubject] = useState([]);
  const [subData, setSubData] = useState([]);
  const [classData, setClassData] = useState([]);
  const [classe, setClasse] = useState([]);
  const [enableNiveau, setEnableNiveau] = useState(true);
  const [enableMatiere, setEnableMatiere] = useState(true);
  const [enableEvaluation, setEnableEvaluation] = useState(true);
  const [text, setText] = useState("Selectionnez d'abord la classe");
  const [bareme, setBareme] = useState(null);

  const [formvalue, setFormvalue] = useState({
    seq: '',
    evaluation: '',
    classe: '',
    matiere: '',
  });

  // Retrieve role and matricule from session storage
  const role = sessionStorage.getItem('userRole');
  const matricule = sessionStorage.getItem('matricule');

  const handleInput = (e) => {
    setFormvalue({ ...formvalue, [e.target.name]: e.target.value });
  };

  const getClasse = useCallback(async () => {
    const reqdata = await fetch(`${config.apiBaseUrl}/classe.php`);
    const resdata = await reqdata.json();
    
    if (role === 'admin') {
      setClasse(resdata);
      setClassData(resdata);
    } else {
      const filteredClasses = resdata.filter(s => s.enseignant === matricule);
      setClasse(filteredClasses);
      setClassData(filteredClasses);
    }
  }, [matricule, role]);

  const fetchData = async () => {
    try {
      const res = await fetch(`${config.apiBaseUrl}/ViewNote.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formvalue),
      });
      const result = await res.json();
      if (result.error) {
        console.error(result.error);
        return;
      }
      if (result.resultat !== 'Verifiez les informations SVP') {
        const resultat = result.sort((a, b) => a.nom.localeCompare(b.nom));
        setStudent(resultat);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    getNiveau();
    getSubject();
    getClasse();
    getEval();
    getSeq();
  }, [getClasse]);

  const getNiveau = async () => {
    const req = await fetch(`${config.apiBaseUrl}/niveau.php`);
    const res = await req.json();
    setNiveau(res);
  };

  const getSubject = async () => {
    const reqdata = await fetch(`${config.apiBaseUrl}/mat.php`);
    const resdata = await reqdata.json();
    setSubject(resdata);
  };

  const getEval = async () => {
    const reqdata = await fetch(`${config.apiBaseUrl}/eval.php`);
    const resdata = await reqdata.json();
    setEvaluation(resdata);
  };

  const getSeq = async () => {
    const reqdata = await fetch(`${config.apiBaseUrl}/sequence.php`);
    const resdata = await reqdata.json();
    setSeq(resdata);
  };

  const handleClass = (e) => {
    const classId = e.target.value;
    setFormvalue({ ...formvalue, classe: classId });

    if (classId !== "") {
      const selectedClass = classe.find(c => c.idClasse === classId);
      if (selectedClass) {
        const selectedNiveau = niveau.find(n => n.id === selectedClass.niveau);
        setNiveauData(selectedNiveau ? [selectedNiveau] : []);
        setEnableNiveau(false);
        setEnableMatiere(true);
        setEnableEvaluation(true);
        setText("Selectionnez");
      }
    } else {
      setText("Selectionnez d'abord la classe");
      setNiveauData([]);
      setEnableNiveau(true);
      setEnableMatiere(true);
      setEnableEvaluation(true);
    }
  };

  const handleNiveau = (e) => {
    const niveauId = e.target.value;
    if (niveauId !== "") {
      setSubData(subject.filter(s => s.niv === niveauId));
      setEnableMatiere(false);
      setEnableEvaluation(true);
      setText("Selectionnez");
    } else {
      setText("Selectionnez d'abord le niveau");
      setSubData([]);
      setEnableMatiere(true);
      setEnableEvaluation(true);
    }
  };

  const handleEval = (e) => {
    setFormvalue({ ...formvalue, [e.target.name]: e.target.value });
    setEvalData(evaluation.filter(s => s.idMat === e.target.value));
    setEnableEvaluation(false);
  };

  const handleg = (e) => {
    const selectedEvaluationId = e.target.value;
    setFormvalue({ ...formvalue, evaluation: selectedEvaluationId });

    const selectedEval = evaluation.find(eva => eva.ideval === selectedEvaluationId);

    if (selectedEval) {
      setBareme(selectedEval.bareme);
    } else {
      setBareme(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    fetchData();
  };

  return (
    <>
      <main className='main-container'>
        <div className="enseignant row">
          <h3>Bienvenu sur la gestion des Notes</h3>
          {/* Display role and matricule */}
          <div className="col-md-12">
          </div>
          <div className="row">
            <div className="form-group col-md-2">
              <label className="mb-2">Classe</label>
              <select id='classe' name="classe" className="form-control" onChange={handleClass}>
                <option value="">Selectionnez la Classe</option>
                {classData.map((nData, index) => (
                  <option key={index} value={nData.idClasse}>{nData.libellé_classe}</option>
                ))}
              </select>
            </div>
            <div className="form-group col-md-2">
              <label className="mb-2">Niveau</label>
              <select id='niveau' name="niveau" className="form-control" onChange={handleNiveau} disabled={enableNiveau}>
                <option value="">Selectionnez le Niveau</option>
                {niveauData.map((nData, index) => (
                  <option key={index} value={nData.id}>{nData.libellee_niveau}</option>
                ))}
              </select>
            </div>
            <div className="form-group col-md-2">
              <label className="mb-2">Sequence</label>
              <select id='seq' name='seq' className="form-select" onChange={handleInput}>
                <option>Choix Sequence</option>
                {seq.map((seq, key) => (
                  <option key={key} value={seq.id}>{seq.libellee_seq}</option>
                ))}
              </select>
            </div>
            <div className="form-group col-md-2">
              <label className="mb-2">Matiere</label>
              <select id='matiere' name="matiere" disabled={enableMatiere} onChange={handleEval} className="form-control">
                <option value="">{text}</option>
                {subData.map((nData, index) => (
                  <option key={index} value={nData.idMat}>{nData.nom}</option>
                ))}
              </select>
            </div>
            <div className="form-group col-md-2">
              <label className="mb-2">Evaluation</label>
              <select id='evaluation' name='evaluation' className="form-select" onChange={handleg} disabled={enableEvaluation}>
                <option>Select the Evaluation</option>
                {evalData.map((nData, index) => (
                  <option key={index} value={nData.ideval}>{nData.nom}</option>
                ))}
              </select>
            </div>
            <div className="col-md-1">
            <label className="mb-2"></label>
            <button className="btn btn-success" onClick={handleSubmit}>Valider</button>
          </div>
        </div>
      </div>

      {bareme && (
        <div className="enseignant row">
          <div className="col-sm-12">
            <div className="alert alert-info">
              <strong>Barème: </strong>{bareme}
            </div>
          </div>
        </div>
      )}
      <div className="container">
        <h3><strong>Ajouter une note</strong> <Link to={`/studentmarks`} className="btn btn-success"><Plus />Ajouter</Link></h3>
        <table className="table table-striped table-bordered w-auto">
          <thead>
            <tr>
              <th>Matricule</th>
              <th>Nom</th>
              <th>Prénom</th>
              <th>Note</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {student.map((notes, key) => (
              <tr className='text-dark' key={key}>
                <td>{notes.matricule}</td>
                <td>{notes.nom}</td>
                <td>{notes.prenom}</td>
                <td>{notes.note1}</td>
                <td>
                  {role === 'admin' ? (
                    <div className="btn-group" role="toolbar" aria-label="Toolbar with button groups">
                      <div role="group" aria-label="Second group">
                        <NoteEdit data={notes} ud={formvalue} bar={bareme} fetchData={fetchData} />
                      </div>
                    </div>
                  ) : (
                    'N/A'
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  </>
);
}