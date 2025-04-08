import React, { useEffect, useRef, useState } from 'react';
import ReactToPrint from "react-to-print";
import { PrinterFill } from 'react-bootstrap-icons';
import config from './config';
import Bulls from './bulls'; // For Trim 1 and 2
import Bullt from './bullt'; // For Trim 3

const AnnualReport = () => {
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
    if (e.target.name === "trim") setSelectedTrim(e.target.value);
  };

  
  const [isVerified, setIsVerified] = useState(false);

  const handleSubmit = async (e) => {
      e.preventDefault();
      if (formvalue.trim === '3') {
              const verificationCode = prompt("Please enter the verification code:");
              if (verificationCode === null) { // User pressed cancel
                  alert("Verification canceled.");
                  return;
              } else if (verificationCode !== '1234') { // The verification code is incorrect
                  alert("Incorrect verification code.");
                  return;
              } else {
                  alert("Verification successful.");
              }
          
      }
  
      try {
          const res = await fetch(`${config.apiBaseUrl}/testpsc.php`, {
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
  
  const calculateSum = (subjectData, key) => {
    return parseFloat(subjectData.reduce((total, item) => total + parseFloat(item[key] || 0), 0).toFixed(2));
  };
  const calculateAverages = () => {
    const newAverages = {};
    Object.keys(groupedData).forEach(matricule => {
        let totalMoy1 = 0, totalMoy2 = 0, totalMoy3 = 0, totalGmoy = 0, totalBareme = 0;
        let totalNote1 = 0, totalNote2 = 0, totalNote3 = 0, totalMoy = 0;
        let totalBaremeNote1 = 0, totalBaremeNote2 = 0, totalBaremeNote3 = 0;
        const studentData = groupedData[matricule].notes;
        Object.keys(studentData).forEach(matiere => {
            studentData[matiere].forEach(item => {
                // For term 1 and 2
                const note1 = parseFloat(item.note1);
                const note2 = parseFloat(item.note2);
                const note3 = parseFloat(item.note3);
                const moy = parseFloat(item.moy);
                // For term 3
                const moy1 = parseFloat(item.moy1);
                const moy2 = parseFloat(item.moy2);
                const moy3 = parseFloat(item.moy3);
                const Gmoy = parseFloat(item.Gmoy);
                const bareme = parseFloat(item.bareme);

                // Update total values for term 1 and 2
                if (!isNaN(note1) && note1 !== null) {
                    totalNote1 += note1;
                    if (!isNaN(bareme) && bareme !== null) {
                        totalBaremeNote1 += bareme;
                    }
                }
                if (!isNaN(note2) && note2 !== null) {
                    totalNote2 += note2;
                    if (!isNaN(bareme) && bareme !== null) {
                        totalBaremeNote2 += bareme;
                    }
                }
                if (!isNaN(note3) && note3 !== null) {
                    totalNote3 += note3;
                    if (!isNaN(bareme) && bareme !== null) {
                        totalBaremeNote3 += bareme;
                    }
                }
                if (!isNaN(moy) && moy !== null) {
                    totalMoy += moy;
                    if (!isNaN(bareme) && bareme !== null) {
                        totalBareme += bareme;
                    }
                }

                // Update total values for term 3
                if (!isNaN(moy1) && moy1 !== null) {
                  totalMoy1 += moy1;
                  totalBaremeNote1 += bareme;
                }
                if (!isNaN(moy2) && moy2 !== null) {
                  totalMoy2 += moy2;
                  totalBaremeNote2 += bareme;
                }

                if (!isNaN(moy3) && moy3 !== null) {
                  totalMoy3 += moy3;
                  totalBaremeNote3 += bareme
                }
                if (!isNaN(Gmoy) && Gmoy !== null){
                  totalGmoy += Gmoy;
                  totalBareme += bareme
                }
            });
        });

        // Calculate averages for term 1 and 2
        const averageNote1 = totalBaremeNote1 === 0 ? 'N/A' : ((totalNote1 / totalBaremeNote1) * 20).toFixed(2);
        const averageNote2 = totalBaremeNote2 === 0 ? 'N/A' : ((totalNote2 / totalBaremeNote2) * 20).toFixed(2);
        const averageNote3 = totalBaremeNote3 === 0 ? 'N/A' : ((totalNote3 / totalBaremeNote3) * 20).toFixed(2);
        const averageMoy = totalBareme === 0 ? 'N/A' : ((totalMoy / totalBareme) * 20).toFixed(2);

        // Calculate averages for term 3
        const averageMois1 = totalBaremeNote1 === 0 ? 'N/A' : ((totalMoy1 / totalBaremeNote1) * 20).toFixed(2);
        const averageMois2 = totalBaremeNote2 === 0 ? 'N/A' : ((totalMoy2 / totalBaremeNote2) * 20).toFixed(2);
        const averageMois3 = totalBaremeNote3 === 0 ? 'N/A' : ((totalMoy3 / totalBaremeNote3) * 20).toFixed(2);
        const averageGmoy = totalBareme === 0 ? 'N/A' : ((totalGmoy / totalBareme) * 20).toFixed(2);

        newAverages[matricule] = {
            averageNote1,
            averageNote2,
            averageNote3,
            averageMoy,
            totalNote1,
            totalNote2,
            totalNote3,
            totalMoy,
            appreciationNote1: getAppreciation(averageNote1),
            appreciationNote2: getAppreciation(averageNote2),
            appreciationNote3: getAppreciation(averageNote3),
            appreciationMoy: getAppreciation(averageMoy),
            averageMois1,
            averageMois2,
            averageMois3,
            averageGmoy,
            totalMoy1,
            totalMoy2,
            totalMoy3,
            totalGmoy,
            totalBareme,
            totalBaremeNote1,
            totalBaremeNote2,
            totalBaremeNote3,
            appreciationMois1: getAppreciation(averageMois1),
            appreciationMois2: getAppreciation(averageMois2),
            appreciationMois3: getAppreciation(averageMois3),
            appreciationGmoy: getAppreciation(averageGmoy),
            rank: 0 // Placeholder for rank
        };

  setAverages(prevAverages => ({
    ...prevAverages,
    [matricule]: newAverages[matricule]
  }));
});
return newAverages;
};

const assignRanks = () => {
  const averages = calculateAverages();
  let sortedStudents;

  if (selectedTrim === '3') {
    // Sort in descending order based on Term 3's averageGmoy
    sortedStudents = Object.keys(averages).sort((a, b) => averages[b].averageGmoy - averages[a].averageGmoy);
  } else {
    // Sort in descending order based on Term 1 and 2's averageMoy
    sortedStudents = Object.keys(averages).sort((a, b) => averages[b].averageMoy - averages[a].averageMoy);
  }

  sortedStudents.forEach((matricule, index) => {
    averages[matricule].rank = index + 1; // Assign rank based on sorted order, starting from 1
  });

  setRanks(sortedStudents);
  calculateClassAverages(averages);
};



useEffect(() => {
if (Object.keys(groupedData).length > 0) {
  assignRanks();
}
}, [groupedData]);

const calculateClassAverages = (averages) => { 
  const allAverages = Object.values(averages).filter(avg => !isNaN(parseFloat(avg.averageMoy))); 
  const allAveragesG = Object.values(averages).filter(avg => !isNaN(parseFloat(avg.averageGmoy))); 

  // Calculate for averageMoy
  if (allAverages.length > 0) { 
    const highest = Math.max(...allAverages.map(avg => parseFloat(avg.averageMoy))); 
    const lowest = Math.min(...allAverages.map(avg => parseFloat(avg.averageMoy))); 
    const middle = allAverages.reduce((a, b) => parseFloat(a) + parseFloat(b.averageMoy), 0) / allAverages.length; 
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

  // Calculate for averageGmoy
  if (allAveragesG.length > 0) { 
    const highestG = Math.max(...allAveragesG.map(avg => parseFloat(avg.averageGmoy))); 
    const lowestG = Math.min(...allAveragesG.map(avg => parseFloat(avg.averageGmoy))); 
    const middleG = allAveragesG.reduce((a, b) => parseFloat(a) + parseFloat(b.averageGmoy), 0) / allAveragesG.length; 
    setClassAverages(prevAverages => ({
      ...prevAverages,
      highestG: highestG.toFixed(2),
      middleG: middleG.toFixed(2),
      lowestG: lowestG.toFixed(2)
    }));
  } else {
    setClassAverages(prevAverages => ({
      ...prevAverages,
      highestG: 'N/A',
      middleG: 'N/A',
      lowestG: 'N/A'
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
    nomt = "Term";
    return getOrdinalEn(n);
  } else if (filiere === '1') {
    nomt = "Trimestre";
    return getOrdinalFr(n);
  }
  return n;
};


const getAppreciationEn = (synth) => {
  if (synth >= 18) return "Expert";
  if (synth >= 15) return "Acquired";
  if (synth >= 10) return "Being Acquired";
  return "Not Acquired";
};

const getAppreciationFr = (synth) => {
  if (synth >= 18) return "Expert";
  if (synth >= 15) return "Acquis";
  if (synth >= 10) return "ECA";
  return "Non Acquis";
};

const getAppreciation = (synth, filiere) => {
  if (filiere === '1') {
    return getAppreciationFr(synth);
  } else if (filiere === '2') {
    return getAppreciationEn(synth);
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
          <select id='trim' name="trim" className="form-control" onChange={handleInput}>
            <option value="">Choisir le Timestre</option>
            <option value="1">Timestre 1</option>
            <option value="2">Timestre 2</option>
            <option value="3">Timestre 3</option>
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
              <p className="fw-bold">{getOrdinal(formvalue.trim, groupedData[matricule].eleve.filiere)} {nomt}</p>
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
            {selectedTrim === '1' || selectedTrim === '2' ? (
              <Bulls
                groupedData={groupedData}
                matricule={matricule}
                calculateSum={calculateSum}
                getAppreciation={getAppreciation}
                averages={averages}
                classAverages={classAverages}
                getOrdinal={getOrdinal}
               
              />
            ) : (
              <>
              <Bullt
                groupedData={groupedData}
                matricule={matricule}
                calculateSum={calculateSum}
                getAppreciation={getAppreciation}
                averages={averages}
                classAverages={classAverages}
                getOrdinal={getOrdinal}
               
              />
              </>
            )}
          </div>
          </>
        ))}
      
          
          </div>
    </main>
  );
}  
export default AnnualReport;