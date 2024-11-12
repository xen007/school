import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function StudentMark() {
  const [seq, setSeq] = useState([]);
  const [note, setNote] = useState({});
  const [niveau, setNiveau] = useState([]);
  const [evaluation, setEvaluation] = useState([]);
  const [evalData, setEvalData] = useState([]);
  const [student, setStudent] = useState([]);
  const [studentData, setStudentData] = useState([]);
  const [subject, setSubject] = useState([]);
  const [subData, setSubData] = useState([]);
  const [classData, setClassData] = useState([]);
  const [classe, setClasse] = useState([]);
  const [enable, setEnable] = useState(true);
  const [text, setText] = useState("Selectionnez d'abord le niveau");
  const navigate = useNavigate();

  const [formvalue, setFormValue] = useState({
    seq: '',
    evaluation: '',
    classe: '',
    matiere: '',
  });

  const handleInput = (e) => {
    setFormValue({ ...formvalue, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    getNiveau();
    getSubject();
    getClasse();
    getEval();
    getSeq();
    getStudent();
  }, []);

  const getStudent = async () => {
    const requestData = await fetch("http://localhost/ssm/api/l.php");
    const responseData = await requestData.json();
    if (responseData.resultat !== 'Verifiez les informations SVP') {
      const result = responseData.sort((a, b) => a.nom.localeCompare(b.nom));
      setStudent(result);
    }
  };

  const getNiveau = async () => {
    const req = await fetch('http://localhost/ssm/api/niveau.php/');
    const res = await req.json();
    setNiveau(res);
  };

  const getSubject = async () => {
    const reqdata = await fetch("http://localhost/ssm/api/mat.php");
    const resdata = await reqdata.json();
    setSubject(resdata);
  };

  const getClasse = async () => {
    const reqdata = await fetch("http://localhost/ssm/api/classe.php");
    const resdata = await reqdata.json();
    setClasse(resdata);
  };

  const getEval = async () => {
    const reqdata = await fetch("http://localhost/ssm/api/eval.php");
    const resdata = await reqdata.json();
    setEvaluation(resdata);
  };

  const getSeq = async () => {
    const reqdata = await fetch("http://localhost/ssm/api/sequence.php");
    const resdata = await reqdata.json();
    setSeq(resdata);
  };

  const handleNiveau = (e) => {
    const niveauId = e.target.value;
    setFormValue({ ...formvalue, niveau: niveauId });
    if (niveauId !== "") {
      setSubData(subject.filter(s => s.niv === niveauId));
      setClassData(classe.filter(s => s.niveau === niveauId));
      setEnable(false);
      setText('Selectionnez la matiere');
    } else {
      setText("Selectionnez d'abord le niveau");
      setSubData([]);
      setEnable(true);
    }
  };

  const handleEval = (e) => {
    setFormValue({ ...formvalue, [e.target.name]: e.target.value });
    setEvalData(evaluation.filter(s => s.idMat === e.target.value));
  };

  const handleStud = (e) => {
    setFormValue({ ...formvalue, [e.target.name]: e.target.value });
    setStudentData(student.filter(s => s.cl === e.target.value));
  };

  const handleChange = (setter, key, value) => {
    setter(prev => ({ ...prev, [key]: value ? value : null }));
  };

  const handleSubmit = async () => {
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
      const response = await axios.post('http://localhost/ssm/api/RegisterMarks.php', formData);
      alert(response.data.message);
      if (response.status === 200) {
        setTimeout(() => {
          navigate('/noteAdmin')
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
                <label className="mb-2">Niveau</label>
                <select id='niveau' name="niveau" className="form-control" onChange={handleNiveau}>
                  <option value="">Selectionnez le Niveau</option>
                  {niveau.map((nData, index) => (
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
                <select id='matiere' name="matiere" disabled={enable} onChange={handleEval} className="form-control">
                  <option value="">{text}</option>
                  {subData.map((nData, index) => (
                    <option key={index} value={nData.idMat}>{nData.nom}</option>
                  ))}
                </select>
              </div>
              <div className="form-group col-md-2">
                <label>Evaluation</label>
                <select id='evaluation' name='evaluation' className="form-select" onChange={handleInput} disabled={enable}>
                  <option>Select the Evaluation</option>
                  {evalData.map((nData, index) => (
                    <option key={index} value={nData.ideval}>{nData.nom}</option>
                  ))}
                </select>
              </div>
              <div className="form-group col-md-2">
                <label className="mb-2">Classe</label>
                <select id='classe' name="classe" disabled={enable} onChange={handleStud} className="form-control">
                  <option value="">{text}</option>
                  {classData.map((nData, index) => (
                    <option key={index} value={nData.idClasse}>{nData.libellé_classe}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
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
                        onChange={(e) => handleChange(setNote, student.matricule, e.target.value)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        <button className='btn btn-secondary m-2' onClick={()=>{navigate('/noteAdmin')}}>Retour</button>
        <button onClick={handleSubmit} className="btn btn-success">Enregister</button>
       
      </main>
    </>
  );
}
