import React, { useEffect, useRef, useState } from 'react';
import ReactToPrint from "react-to-print";
import { PrinterFill } from 'react-bootstrap-icons';
import config from './config';
import Bulls from './bulls'; // For Trim 1 and 2
import { Link } from 'react-router-dom';
import logo from './format.png';
import './certificate.css';


const Excell = () => {
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
        const avg = parseFloat(averages[matricule].averageGmoy);
        if (!isNaN(avg)) {
          validStudents.push(matricule); // Add only if average is a valid float
        } else {
          invalidStudents.push(matricule);
        }
      } else {
        const avg = parseFloat(averages[matricule].averageMoy);
        if (!isNaN(avg)) {
          validStudents.push(matricule); // Add only if average is a valid float
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
  
    // For invalid students, do not assign a rank
    invalidStudents.forEach((matricule) => {
      averages[matricule].rank = null; // No rank for invalid averages
    });
  
    // Update ranks in state
    setRanks([...validStudents, ...invalidStudents]);
    
};


useEffect(() => {
if (Object.keys(groupedData).length > 0) {
  assignRanks();
}
}, [groupedData]);


  const getCurrentDate = (filiere) => {
    const today = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const locale = filiere === '1' ? 'fr-FR' : 'en-US';
    return today.toLocaleDateString(locale, options);
  };

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
    return filiere === '1' ? 'FÉLICITATIONS' : 'CONGRATULATIONS';
  };

  const getOrdinalEn = (n) => {
    const s = ["th", "st", "nd", "rd"], v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  };
  
  const getOrdinalFr = (n) => {
    const s = ["ème", "er", "ème", "ème"], v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
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
      <div style={{display:""}}>
      <div className='contain' ref={(el) => (componentPdf = el)} style={{ width: '100%', padding: '0px 20px' }}>
        {ranks.map((matricule, index) => (
          <>
            
              { (averages[matricule].rank >= 0 && averages[matricule].rank <= 5) && (

              <div key={matricule} style={{ pageBreakInside: 'avoid', marginBottom: '10px', height: 'auto' }}>
              <div  className="image-container">
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
                <div id='tiC'>
                    <p>BOURSE SCOLAIRE (5%)</p> 
                    <p style={{fontSize:'18px'}}><em > (5%) SCOLARSHIP</em></p>
                </div>
              </div>
              
              <div id='tex' style={{ padding: '50px' }}>
                <p>DÉCERNÉ à <strong style={{fontSize:'23px'}} id='nom'>{groupedData[matricule].eleve.nom} {groupedData[matricule].eleve.prenom}</strong></p>
                <p style={{fontSize:'18px'}}><em>AWARDED to</em></p>
                
                <p>Pour ses performances scolaires appreciables occupant le rang de {getOrdinalFr(averages[matricule]?.rank)} de sa classe <strong> {groupedData[matricule].eleve.libellee_classe} </strong></p>
                <p style={{fontSize:'18px'}}><em>For his/her appreciable performance with rank of {getOrdinalEn(averages[matricule]?.rank)} for his class {groupedData[matricule].eleve.libellee_classe}</em></p>
                
                <p>avec une moyenne annuelle de <strong>{averages[matricule].averageGmoy}</strong>/20</p>
                <p style={{fontSize:'18px'}}><em>With an annual average of</em></p>
              </div>
              <div id='dte' style={{paddingBottom: '50px'}}>
                <p><strong>Bertoua, {getCurrentDate(groupedData[matricule].eleve.filiere)}</strong> </p>
                <p><strong>{getFonc(groupedData[matricule].eleve.filiere)}</strong> </p>
              </div>
              <p id='remd'>
                <strong>{getRem(groupedData[matricule].eleve.filiere)}</strong>
              </p>
              <p id='remdo'> <img src={`${config.apiBaseUrl}/logo/${ecData.sign}`} style={{width:'90px', height:'80px', objectFit: 'cover'}} /></p> 
              </div>
            </div>
            )}
          </>
        ))}
      
      </div>
          </div>
    </main>
  );
}  
export default Excell;