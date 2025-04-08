import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import config from '../component/config';
 
export default function StudentMark() {
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
  const [studentData, setStudentData] = useState([]);
  const [note, setNote] = useState({});
  const [enableNiveau, setEnableNiveau] = useState(true);
  const [enableMatiere, setEnableMatiere] = useState(true);
  const [enableEvaluation, setEnableEvaluation] = useState(true);
  const [text, setText] = useState("Selectionnez d'abord la classe");
  const [bareme, setBareme] = useState(null);
  const navigate = useNavigate();

  const [formvalue, setFormValue] = useState({
    seq: '',
    evaluation: '',
    classe: '',
    matiere: '',
  });

  const role = sessionStorage.getItem('userRole');
  const matricule = sessionStorage.getItem('matricule');

  const handleInput = (e) => {
    setFormValue({ ...formvalue, [e.target.name]: e.target.value });
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

  useEffect(() => {
    getNiveau();
    getSubject();
    getClasse();
    getEval();
    getSeq();
    getStudent();
  }, [getClasse]);

  const getStudent = async () => {
    const requestData = await fetch(`${config.apiBaseUrl}/l.php`);
    const responseData = await requestData.json();
    if (responseData.resultat !== 'Verifiez les informations SVP') {
      const result = responseData.sort((a, b) => a.nom.localeCompare(b.nom));
      setStudent(result);
    }
  };

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
    setFormValue({ ...formvalue, classe: classId });

    if (classId !== "") {
      const selectedClass = classe.find(c => c.idClasse === classId);
      if (selectedClass) {
        const selectedNiveau = niveau.find(n => n.id === selectedClass.niveau);
        setNiveauData(selectedNiveau ? [selectedNiveau] : []);
        setEnableNiveau(false);
        setEnableMatiere(true);
        setEnableEvaluation(true);
        setText("Selectionnez");
        setStudentData(student.filter(s => s.cl === classId));
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
    setFormValue({ ...formvalue, [e.target.name]: e.target.value });
    setEvalData(evaluation.filter(s => s.idMat === e.target.value));
    setEnableEvaluation(false);
  };

  const handleg = (e) => {
    const selectedEvaluationId = e.target.value;
    setFormValue({ ...formvalue, evaluation: selectedEvaluationId });

    const selectedEval = evaluation.find(eva => eva.ideval === selectedEvaluationId);

    if (selectedEval) {
      setBareme(parseInt(selectedEval.bareme, 10)); // Ensure bareme is an integer
    } else {
      setBareme(null);
    }
  };

  const handleChange = (setter, key, value) => {
    if (value > bareme) {
      alert(`La note ne peut pas dépasser ${bareme}.`);
      setter(prev => ({ ...prev, [key]: '' })); // Clear the value if it's greater than bareme
    } else if (value < 0) {
      alert(`La note ne peut pas être inférieure à 0.`);
      setter(prev => ({ ...prev, [key]: '' })); // Clear the value if it's less than 0
    } else {
      setter(prev => ({ ...prev, [key]: value }));
    }
  };

  const handleSubmit = async () => {
    const isConfirmed = window.confirm('Êtes-vous sûr de vouloir soumettre ces notes?');

    if (!isConfirmed) {
      return;
    }

    const formData = {
      evaluation: formvalue.evaluation,
      classe: formvalue.classe,
      niveau: formvalue.niveau,
      matiere: formvalue.matiere,
      seq: formvalue.seq,
      markNoteToStore: studentData.map(student => ({
        matricule: student.matricule,
        note: note[student.matricule] !== undefined ? note[student.matricule] : null
      }))
    };

    try {
      const response = await axios.post(`${config.apiBaseUrl}/RegisterMarks.php`, formData);
      alert(response.data.message);
      if (response.status === 200) {
        setTimeout(() => {
          navigate('/noteAdmin');
        }, 1000);
        console.log('Data successfully sent to the backend');
      } else {
        console.error('Failed to send data');
      }
    } catch (error) {
      alert('Erreur de soumission, reessayez.');
      console.error('Error:', error);
    }
  };

  return (
    <>
      <main className='main-container'>
        <div className="enseignant row">
          <h3>Selectionnez pour pouvoir ajouter une note</h3>
          <div className="col-sm-12">
            <div className="row mb-2">
              <div className="form-group col-md-2">
                <label className="mb-2">Classe</label>
                <select id='classe' name="classe" onChange={handleClass} className="form-control">
                  <option value="">{text}</option>
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
                <label>Sequence</label>
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
                <label>Evaluation</label>
                <select id='evaluation' name='evaluation' className="form-select" onChange={handleg} disabled={enableEvaluation}>
                  <option>Select the Evaluation</option>
                  {evalData.map((nData, index) => (
                    <option key={index} value={nData.ideval}>{nData.nom}</option>
                  ))}
                </select>
              </div>
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
        <div className="enseignant row main-container">
          <div className="col-auto contain">
            <table className="table table-striped table-bordered w-100 fixed-height-table">
              <thead>
                <tr>
                  <th>Matricule</th>
                  <th>Nom</th>
                  <th>Prenom</th>
                  <th>Note</th>
                </tr>
              </thead>
              <tbody>
                {studentData.map((student, key) => (
                  <tr key={key}>
                    <td>{student.matricule}</td>
                    <td>{student.nom}</td>
                    <td>{student.prenom}</td>
                    <td>
                      <input
                        type="number"
                        name="note"
                        value={note[student.matricule] || ""}
                        onChange={(e) => handleChange(setNote, student.matricule, e.target.value)}
                        min="0"
                        max={bareme}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <button className='btn btn-secondary m-2' onClick={() => { navigate('/noteAdmin') }}>Retour</button>
        <button onClick={handleSubmit} className="btn btn-success">Enregistrer</button>
      </main>
    </>
  );
}  