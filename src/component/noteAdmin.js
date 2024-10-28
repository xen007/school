import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthProvider';

export default function StudentMark() {
  const { auth } = useContext(AuthContext);
  const [classe, setClasse] = useState('');
  const [seq, setSeq] = useState('');
  const [matiere, setMatiere] = useState('');
  const [atti, setEva_Atti] = useState({});
  const [wri, setEva_Wri] = useState({});
  const [oral, setEva_Or] = useState({});
  const [prac, setEva_Prac] = useState({});
  const [savoir, setEva_Savoir] = useState({});
  const [ecrit, setEva_Ecrit] = useState({});
  const [clData, setClData] = useState([]);
  const [clSeq, setClSeq] = useState([]);
  const [matiereData, setMatiereData] = useState([]);
  const [StudentInfo, setStudentInfo] = useState([]);
  const [disable, setDisable] = useState(true);
  const { matricule } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    handlesal(); // Fetch classes and sequences on mount
  }, []);

  const handlesal = async () => {
    const response = await axios.get(`http://localhost/ssm/api/handleClassTeacher.php/${matricule}`);
    setClData(response.data);
    handleSeq();
  };

  const handleSeq = async () => {
    const response = await axios.get('http://localhost/ssm/api/sequence.php/001');
    setClSeq(response.data);
  };

  const handleClasse = async (e) => {
    const selectedClass = e.target.value;
    setClasse(selectedClass);
    setDisable(false);
    
    const response = await axios.get(`http://localhost/ssm/api/handleMatiereTeacher.php/${matricule}/${selectedClass}`);
    setMatiereData(response.data);
  };

  const handleData = async (e) => {
    const subject = e.target.value;
    setMatiere(subject);
    
    const response = await axios.get(`http://localhost/ssm/api/handleStudents.php/${classe}`);
    setStudentInfo(response.data);
  };

  const handleChange = (setter, matricule, value) => {
    setter(prevMarks => ({
      ...prevMarks,
      [matricule]: value
    }));
  };

  const handleSubmit = async () => {
    if (!seq || !matiere ){
      alert('Please fill in all the fields!');
      return;
    }

    // Gather form data
    const formData = {
      seq,
      matiere,
      markOralToStore: Object.entries(oral),
      markAttiToStore: Object.entries(atti),
      markWriteToStore: Object.entries(wri),
      markPracToStore: Object.entries(prac),
      markSavoirToStore: Object.entries(savoir),
      markEcritToStore: Object.entries(ecrit),
      markNoteToStore: StudentInfo.map(student => [
        student.matricule_El,  // First element: matricule
        (                      // Second element: totalNote
          (parseInt(oral[student.matricule_El]) || 0) +
          (parseInt(atti[student.matricule_El]) || 0) +
          (parseInt(wri[student.matricule_El]) || 0) +
          (parseInt(prac[student.matricule_El]) || 0) +
          (parseInt(savoir[student.matricule_El]) || 0) +
          (parseInt(ecrit[student.matricule_El]) || 0)
        )
      ])
    };
    
    console.log(formData);

    //Submit the form data to the API
    try {
      const response = await axios.post('http://localhost/ssm/api/RegisterMarks.php', formData);
      alert(response.data.status);
      console.log(response.data.status)
    } catch (error) {
      console.error('Error submitting marks:', error);
      alert('Error submitting marks, please try again.');
    }
  };
  return (
    <>
      <main className='main-container'>
        <div className="enseignant row">
          <h3>Welcome to Notes Management</h3>
          <div className="col-sm-12">
            <div className="row mb-3">
              <div className="form-group col-md-4">
                <label>Room</label>
                <select className="form-select" onChange={handleClasse} disabled={!clData.length}>
                  <option defaultValue value=''>Select the Classroom</option>
                  {clData.map((classe, key) => (
                    <option key={key} value={classe.id_classe}>{classe.libellee_classe}</option>
                  ))}
                </select>
              </div>
              <div className="form-group col-md-4">
                <label>Sequence</label>
                <select className="form-select" onChange={(e) => setSeq(e.target.value)} disabled={!clSeq.length}>
                  <option defaultValue value=''>Select Sequence</option>
                  {clSeq.map((seq, key) => (
                    <option key={key} value={seq.id}>{seq.libellee_sequence}</option>
                  ))}
                </select>
              </div>
              <div className="form-group col-md-4">
                <label>Subject</label>
                <select className="form-select" onChange={handleData} disabled={disable}>
                  <option defaultValue value=''>Select the Subject</option>
                  {matiereData.map((matiere, key) => (
                    <option key={key} value={matiere.id_matiere}>{matiere.nom_matiere}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="enseignant row main-container">
          <div className="col-md-9 contain">
            <table className="table table-striped table-bordered w-100">
              <thead>
                <tr>
                  <th>Matricule</th>
                  <th>Name</th>
                  <th>First name</th>
                  <th>EV.Atti</th>
                  <th>EV.Or</th>
                  <th>EV.Wri</th>
                  <th>EV.Prac</th>
                  <th>EV.Savoir</th>
                  <th>EV.Ecrit</th>
                  <th>Note Moyenne</th>
                </tr>
              </thead>
              <tbody>
                {StudentInfo.map((student, key) => (
                  <tr key={key}>
                    <td>{student.matricule_El}</td>
                    <td>{student.nom}</td>
                    <td>{student.prenom}</td>
                    <td><input type="number" value={atti[student.matricule_El] || ''} onChange={(e) => handleChange(setEva_Atti, student.matricule_El, e.target.value)} /></td>
                    <td><input type="number" value={oral[student.matricule_El] || ''} onChange={(e) => handleChange(setEva_Or, student.matricule_El, e.target.value)} /></td>
                    <td><input type="number" value={wri[student.matricule_El] || ''} onChange={(e) => handleChange(setEva_Wri, student.matricule_El, e.target.value)} /></td>
                    <td><input type="number" value={prac[student.matricule_El] || ''} onChange={(e) => handleChange(setEva_Prac, student.matricule_El, e.target.value)} /></td>
                    <td><input type="number" value={savoir[student.matricule_El] || ''} onChange={(e) => handleChange(setEva_Savoir, student.matricule_El, e.target.value)} /></td>
                    <td><input type="number" value={ecrit[student.matricule_El] || ''} onChange={(e) => handleChange(setEva_Ecrit, student.matricule_El, e.target.value)} /></td>

                                        
                    <td>
                    <input
                        type="number"
                        name="note"
                        value={
                            (parseInt(atti[student.matricule_El]) || 0) +
                            (parseInt(oral[student.matricule_El]) || 0) +
                            (parseInt(wri[student.matricule_El]) || 0) +
                            (parseInt(prac[student.matricule_El]) || 0) +
                            (parseInt(savoir[student.matricule_El]) || 0) +
                            (parseInt(ecrit[student.matricule_El]) || 0)
                        }
                        readOnly
                        />
                    </td>                    
                </tr>
                              )  )}
                            </tbody>
                        </table>
                    </div>
                </div>

                <button onClick={handleSubmit} className="btn btn-primary">Submit</button>
            </main>
        </>
    );
}

