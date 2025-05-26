import React, { useState, useEffect, useRef } from 'react';
import ReactToPrint from 'react-to-print';
import config from './config';
import logo from './hon.png';
import './certificate.css';
import { PrinterFill } from 'react-bootstrap-icons';
import sign from './sign.png';

export default function Hon() {
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
  
    const handleSubmit = async (e) => {
      e.preventDefault();
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
    
    const calculateAverages = () => {
      const newAverages = {};
      Object.keys(groupedData).forEach(matricule => {
        let totalMoy1 = 0, totalMoy2 = 0, totalMoy3 = 0, totalGmoy = 0, totalBareme = 0;
        const studentData = groupedData[matricule].notes;
        Object.keys(studentData).forEach(matiere => {
          studentData[matiere].forEach(item => {
  
            // For term 3
            const moy1 = parseFloat(item.moy1);
            const moy2 = parseFloat(item.moy2);
            const moy3 = parseFloat(item.moy3);
            const Gmoy = parseFloat(item.Gmoy);
            const bareme = parseFloat(item.bareme);
  
  
            // Update total values for term 3
            if (!isNaN(moy1)) totalMoy1 += moy1;
            if (!isNaN(moy2)) totalMoy2 += moy2;
            if (!isNaN(moy3)) totalMoy3 += moy3;
            if (!isNaN(Gmoy)) totalGmoy += Gmoy;
  
            if (!isNaN(bareme)) totalBareme += bareme;
          });
        });
  
        // Calculate averages for term 3
        const averageMois1 = totalBareme === 0 ? 'N/A' : ((totalMoy1 / totalBareme) * 20).toFixed(2);
        const averageMois2 = totalBareme === 0 ? 'N/A' : ((totalMoy2 / totalBareme) * 20).toFixed(2);
        const averageMois3 = totalBareme === 0 ? 'N/A' : ((totalMoy3 / totalBareme) * 20).toFixed(2);
        const averageGmoy = totalBareme === 0 ? 'N/A' : ((totalGmoy / totalBareme) * 20).toFixed(2);
  
        newAverages[matricule] = {
         
          averageMois1,
          averageMois2,
          averageMois3,
          averageGmoy,
          totalMoy1,
          totalMoy2,
          totalMoy3,
          totalGmoy,
          totalBareme,
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
    let validStudents = [];
    let invalidStudents = [];
  
    // Separate students with valid and invalid averages
    Object.keys(averages).forEach((matricule) => {
      if (selectedTrim === '4') {
        if (averages[matricule].averageGmoy !== null && averages[matricule].averageGmoy !== "N/A") {
          validStudents.push(matricule);
        } else {
          invalidStudents.push(matricule);
        }
      } else {
        if (averages[matricule].averageMoy !== null && averages[matricule].averageMoy !== "N/A") {
          validStudents.push(matricule);
        } else {
          invalidStudents.push(matricule);
        }
      }
    });
  
    // Sort valid students in descending order
    validStudents.sort((a, b) => {
      return selectedTrim === '4'
        ? averages[b].averageGmoy - averages[a].averageGmoy
        : averages[b].averageMoy - averages[a].averageMoy;
    });
  
    // Assign ranks only to valid students
    validStudents.forEach((matricule, index) => {
      averages[matricule].rank = index + 1; // Rank starts from 1
    });
  
    // Optionally, add invalid students to the end with no rank
    invalidStudents.forEach((matricule) => {
      averages[matricule].rank = null; // No rank assigned
    });
  
    // Update ranks in state
    setRanks([...validStudents, ...invalidStudents]);
  };
  
  
  
  useEffect(() => {
  if (Object.keys(groupedData).length > 0) {
    assignRanks();
  }
  }, [groupedData]);
  
    const getFonc = (filiere) => {
      switch (filiere) {
        case 1:
          return 'La Directrice';
        case 2:
          return 'The Headmistress';
        default:
          return 'N/A';
      }
    };

  const getRem = (filiere) => {
    // return filiere === '1' ? 'FÉLICITATIONS' : 'CONGRATULATIONS';
    return filiere === '1' ? "L'ENSEIGNANT" : 'THE TEACHER';
 
};
const getTic = (filiere) => {
  // return filiere === '1' ? 'FÉLICITATIONS' : 'CONGRATULATIONS';
  return filiere === '1' ? "TABLEAU D'HONNEUR" : 'HONNOR ROLL';

};
const getCertContent = (filiere, averages, groupedData, matricule, studentCounts) => {
    if (filiere === 1) {
      return (
        <>
          
          <p><strong>Groupe Scolaire Bilingue CHARIS</strong> récompense l'élève <strong id='nom'>{groupedData[matricule].eleve.nom} {groupedData[matricule].eleve.prenom}</strong></p>
          <p>Qui mérite un tableau d'honneur pour le travail de l'année scolaire <strong>{groupedData[matricule].eleve.scolaire}</strong></p>
          <p>Avec une moyenne annuelle de <strong>{averages[matricule].averageGmoy}/20</strong> et une position de <strong>{averages[matricule].rank}/{studentCounts[groupedData[matricule].eleve.classe]}</strong></p>
          <p>À qui de droit pour le tableau d'honneur.</p>
        </>
      );
    } else if (filiere === 2) {
      return (
        <>

          <p><strong>CHARIS Bilingual School Complex</strong> awards the pupil <strong id='nom'>{groupedData[matricule].eleve.nom} {groupedData[matricule].eleve.prenom}</strong></p>
          <p>Who merits an honour roll for the work of the academic year <strong>{groupedData[matricule].eleve.scolaire}</strong></p>
          <p>With an annual average of <strong>{averages[matricule].averageGmoy}/20</strong> and a position of <strong>{averages[matricule].rank}/{studentCounts[groupedData[matricule].eleve.classe]}</strong></p>
          <p>To whomsoever the purpose of honour roll.</p>
        </>
      );
    }
    return null;
  };
    
  
  return (
    <main className='main-container'>
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
            <option value="4">Annuel</option>
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
  
      <div style={{ visibility: "" }}>
        <div ref={(el) => (componentPdf = el)}>
          {ranks.map((matricule, index) => (
            <>
              {averages[matricule].averageGmoy >= 12 && (
                <div key={matricule} style={{ padding: '30px' }} className="image-container">
                  <img src={logo} alt="Background logo" className="background-image" />
                  <div id="heads">
                    <div style={{ padding: '60px 30px' }}>
                      <p className="fw-bold">REPUBLIQUE DU CAMEROUN</p>
                      <p>Paix Travail Patrie</p>
                      <p className="fw-bold">MINISTERE DE L'EDUCATION DE BASE</p>
                      <p>Délégation Régionale de l'Est</p>
                      <p>Délégation Départementale du Lom et Djerem</p>
                    </div>
                    <div style={{ padding: '50px' }}>
                      <img src={`${config.apiBaseUrl}/logo/${ecData.logo}`} style={{ width: "150px" }} alt="School logo" />
                    </div>
                    <div style={{ padding: '60px' }}>
                      <p className="fw-bold">REPUBLIC OF CAMEROON</p>
                      <p>Peace Work Fatherland</p>
                      <p className="fw-bold">MINISTRY OF BASIC EDUCATION</p>
                      <p>East Regional Delegation</p>
                      <p>Lom and Djerem Divisional Delegation</p>
                    </div>
                  </div>
                  <div id="middles" style={{ padding: '80px 50px' }}>
                    <p id="tiEcol">{ecData.nomec}</p>
                    <p id='tiC'>{getTic(groupedData[matricule].eleve.filiere)}</p>
                  </div>
                  <div id='tex' style={{ padding: '50px',marginTop: '80px' }}>
                    {getCertContent(groupedData[matricule].eleve.filiere, averages, groupedData, matricule, studentCounts)}
                  </div>
                  <div id='dte'>
                    <p><strong>{getRem(groupedData[matricule].eleve.filiere)}</strong></p>
                    <p><strong>{getFonc(groupedData[matricule].eleve.filiere)}</strong></p>
                  </div>
                  <p id='remdo'> <img src={`${config.apiBaseUrl}/logo/${ecData.sign}`} style={{width:'90px', height:'80px', objectFit: 'cover'}} alt="" /></p> 
                </div>
                  
              )}
            </>
          ))}
        </div>
      </div>
    </main>
  );
  
}  