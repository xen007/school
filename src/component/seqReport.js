import React, { useEffect, useRef, useState } from 'react';
import ReactToPrint from "react-to-print";
import { PrinterFill } from 'react-bootstrap-icons';
import config from './config';
import Bulls from './bulls'; // For Trim 1 and 2
import Bullt from './bullt'; // For Trim 3

const SeqReport = () => {
  const [groupedData, setGroupedData] = useState({});
  const [averages, setAverages] = useState({});
  const [classAverages, setClassAverages] = useState({ highest: 'N/A', middle: 'N/A', lowest: 'N/A', highestG: 'N/A', middleG: 'N/A', lowestG: 'N/A' });
  const [studentCounts, setStudentCounts] = useState({});
  const [ranks, setRanks] = useState([]);
  const [classe, setClData] = useState([]);
  const [classData, setClassData] = useState([]);
  const [niveauData, setNiveauData] = useState([]);
  const [ecData, setecData] = useState([]);
  const [enable, setEnable] = useState(true);
  const [text, setText] = useState('Selectionnez d\'abord le niveau');
  const [formvalue, setFormvalue] = useState({ classe: '', trim: '' });
  const [selectedTrim, setSelectedTrim] = useState('');
  let componentPdf = useRef();

  const handleNiveau = async (e) => {
    const niveauId = e.target.value;
    if (niveauId !== "") {
      setEnable(false);
      setText('Selectionnez la classe');
      setClassData(classe.filter(s => s.niveau === (e.target.value)));
    } else {
      setText('Selectionnez d\'abord le niveau');
      setClassData([]);
      setEnable(true);
    }
  };

  useEffect(() => {
    const getNiveau = async () => {
      const reqdata = await fetch(`${config.apiBaseUrl}/niveau.php`);
      const resdata = await reqdata.json();
      setNiveauData(resdata);
    };
    getNiveau();

    const getclasse = async () => {
      const reqdata = await fetch(`${config.apiBaseUrl}/classe.php`);
      const resdata = await reqdata.json();
      setClData(resdata);
    };
    getclasse();

    const getecole = async () => {
      const reqdata = await fetch(`${config.apiBaseUrl}/schoolUp.php/1`);
      const resdata = await reqdata.json();
      setecData(resdata);
    };
    getecole();
  }, []);

  const handleInput = (e) => {
    setFormvalue({ ...formvalue, [e.target.name]: e.target.value });
    if (e.target.name === "seq") setSelectedTrim(e.target.value);
  };

  
  const [isVerified, setIsVerified] = useState(false);

  const handleSubmit = async (e) => {
      e.preventDefault();
      try {
          const res = await fetch(`${config.apiBaseUrl}/seqcol.php`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(formvalue),
          });
          const result = await res.json();
          if (result.error) {
              console.error(result.error);
              return;
          }
          groupData(result);
      } catch (error) {
          console.error('Error:', error);
      }
  };
  
  
  const groupData = (data) => {
    const grouped = {};
    Object.keys(data).forEach(matricule => {
      if (matricule === 'studentCounts') {
        setStudentCounts(data[matricule]);
        return;
      }
      const studentData = data[matricule].notes;
      const student = data[matricule].eleve;
      if (!grouped[matricule]) {
        grouped[matricule] = { eleve: student, notes: {} };
      }
      studentData.forEach(item => {
        const { matiere } = item;
        if (!grouped[matricule].notes[matiere]) {
          grouped[matricule].notes[matiere] = [];
        }
        grouped[matricule].notes[matiere].push(item);
      });
    });
    setGroupedData(grouped);
  };
  
  const calculateAverages = () => {
    const newAverages = {};
    const totalData = {};
  
    Object.keys(groupedData).forEach(matricule => {
      let totalNote = 0, totalCoef = 0, totalMoyXCoef = 0;
      const studentData = groupedData[matricule].notes;
      Object.keys(studentData).forEach(matiere => {
        studentData[matiere].forEach(item => {
          const note = parseFloat(item.note);
          const coef = parseFloat(item.coef);
          if (!isNaN(note) && note !== null) {
            totalNote += note;
            totalCoef += coef;
            totalMoyXCoef += note * coef;
          }
        });
      });
  
      const moy = totalCoef === 0 ? 'N/A' : (totalMoyXCoef / totalCoef).toFixed(2);
  
      newAverages[matricule] = {
        moy,
        totalNote,
        totalCoef,
        totalMoyXCoef: totalMoyXCoef.toFixed(2),
        appreciation: getAppreciation(moy, groupedData[matricule]?.eleve?.filiere),
        rank: 0 // Placeholder for rank
      };
  
      totalData[matricule] = {
        totalNote,
        totalCoef,
        totalMoyXCoef: totalMoyXCoef.toFixed(2)
      };
    });
  
    setAverages(prevAverages => ({
      ...prevAverages,
      ...newAverages
    }));
    
    return { newAverages, totalData };
  };
  
  const assignRanks = () => {
    const { newAverages } = calculateAverages();
    const sortedStudents = Object.keys(newAverages).sort((a, b) => newAverages[b].moy - newAverages[a].moy);
  
    sortedStudents.forEach((matricule, index) => {
      newAverages[matricule].rank = index + 1; // Assign rank based on sorted order, starting from 1
    });
    setRanks(sortedStudents);
    calculateClassAverages(newAverages);
  };
  
  useEffect(() => {
    if (Object.keys(groupedData).length > 0) {
      assignRanks();
    }
  }, [groupedData]);
  
  const calculateClassAverages = (averages) => {
    const allAverages = Object.values(averages).filter(avg => !isNaN(parseFloat(avg.moy)));
  
    if (allAverages.length > 0) {
      const highest = Math.max(...allAverages.map(avg => parseFloat(avg.moy)));
      const lowest = Math.min(...allAverages.map(avg => parseFloat(avg.moy)));
      const middle = allAverages.reduce((total, avg) => total + parseFloat(avg.moy), 0) / allAverages.length;
      setClassAverages(prevAverages => ({
        ...prevAverages,
        highest: highest.toFixed(2),
        middle: middle.toFixed(2),
        lowest: lowest.toFixed(2)
      }));
    } else {
      setClassAverages(prevAverages => ({
        ...prevAverages,
        highest: 'N/A',
        middle: 'N/A',
        lowest: 'N/A'
      }));
    }
  };
  
  

const getOrdinalEn = (n) => {
  const s = ["th", "st", "nd", "rd"], v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
};

const getOrdinalFr = (n) => {
  const s = ["ème", "er", "ème", "ème"], v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
};

let nomt = "";
const getOrdinal = (n, filiere) => {
  if (filiere === '2') {
    nomt = "Sequence";
    return getOrdinalEn(n);
  } else if (filiere === '1') {
    nomt = "Sequence";
    return getOrdinalFr(n);
  }
  return n;
};

const getAppreciationEn = (note) => {
    if (note >= 18) return "Expert";
    if (note >= 15) return "Acquired";
    if (note >= 10) return "Being Acquired";
    return "Not Acquired";
  };
  
  const getAppreciationFr = (note) => {
    if (note >= 18) return "Expert";
    if (note >= 15) return "Acquis";
    if (note >= 10) return "ECA";
    return "Non Acquis";
  };
  
  const getAppreciation = (note, filiere) => {
    if (filiere === '1') {
      return getAppreciationFr(note);
    } else if (filiere === '2') {
      return getAppreciationEn(note);
    }
    return 'N/A';
  };
  
 return (
    <main className='main-container'>
      <h3>Class Report Card</h3>
      <div className="row mb-3">
        <div className="form-group col-md-2">
          <label className="mb-2">Niveau</label>
          <select name="niveau" className="form-control" onChange={handleNiveau}>
            <option value="">Selectionnez le Niveau</option>
            {niveauData.map((nData, index) => (
              <option key={index} value={nData.id}>{nData.libellee_niveau}</option>
            ))}
          </select>
        </div>
        <div className="form-group col-md-2">
          <label className="mb-2">Classe</label>
          <select id='classe' name="classe" disabled={enable} className="form-control" onChange={handleInput}>
            <option value="">{text}</option>
            {classData.map((nData, index) => (
              <option key={index} value={nData.idClasse}>{nData.libellé_classe}</option>
            ))}
          </select>
        </div>
        <div className="form-group col-md-2">
          <label className="mb-2">Trimestre</label>
          <select id='seq' name="seq" className="form-control" onChange={handleInput}>
            <option value="">Choisir la Séquence</option>
            <option value="1">Sequence 1</option>
            <option value="2">Sequence 2</option>
            <option value="3">Sequence 3</option>
            <option value="3">Sequence 4</option>
            <option value="3">Sequence 5</option>
            <option value="3">Sequence 6</option>
          </select>
        </div>
        <div className="col-md-1">
          <label className="mb-2"></label>
          <button className="btn btn-success" onClick={handleSubmit}>Valider</button>
        </div>
      </div>
      <div className="btn-group col-md-4" role="group">
        <ReactToPrint
          trigger={() => <button className="btn btn-success"><PrinterFill /> Imprimer</button>}
          content={() => componentPdf}
        />
      </div>
      <div className='contain' ref={(el) => (componentPdf = el)} style={{ width: '100%', padding: '0px 20px' }}>
        {ranks.map((matricule, index) => (
          <>
            <div key={matricule} style={{ pageBreakInside: 'avoid', marginBottom: '10px', height: 'auto' }}>
            
            <div id="head" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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
            <div id='middle' style={{ textAlign: 'center', marginTop: '10px' }}>
              <p id='tiEcol'>{ecData.nomec}</p>
              <p><i>{ecData.devise}</i></p>
              <p className="fw-bold">{getOrdinal(formvalue.seq, groupedData[matricule].eleve.filiere)} {nomt}</p>
              <p>Année-scolaire: {'2024-2025'}</p>
            </div>
            <div id="head" style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
              <div id='botto' style={{ display: 'flex' }}>
                <div>
                  <img src={`${config.apiBaseUrl}/image/${groupedData[matricule].eleve.photo}`} alt={groupedData[matricule].eleve.photo} style={{ width: "90px", paddingRight: "10px" }} />
                </div>
                <div>
                  <p>Noms/Names: <strong>{groupedData[matricule].eleve.nom} {groupedData[matricule].eleve.prenom}</strong></p>
                  <p>Matricule: <strong>{matricule}</strong></p>
                  <p>Né(e) le/Born on : {groupedData[matricule].eleve.dateNaiss || 'N/A'} à/in {groupedData[matricule].eleve.lieuNaiss || 'N/A'}</p>
                  <p>Sexe/Sex: {groupedData[matricule].eleve.genre}</p>
                </div>
              </div>
              <div style={{ textAlign: 'left' }}>
                <p><strong>Classe/Class:</strong> {groupedData[matricule].eleve.libellee_classe}</p>
                <p><strong>Effectif:</strong> {studentCounts[groupedData[matricule].eleve.classe]}</p>
              </div>
            </div>
           
              <Bulls
                groupedData={groupedData}
                matricule={matricule}
                getAppreciation={getAppreciation}
                averages={averages}
                classAverages={classAverages}
                getOrdinal={getOrdinal}
              
              />
            
          </div>
          </>
        ))}
      
          
          </div>
    </main>
  );
}  
export default SeqReport;