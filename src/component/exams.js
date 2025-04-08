
import React, { useEffect, useRef, useState } from 'react';
import ReactToPrint from "react-to-print";
import { PrinterFill } from 'react-bootstrap-icons';
import config from './config';

const Bulls = () => {
  const [groupedData, setGroupedData] = useState({});
  const [averages, setAverages] = useState({});
  const [classAverages, setClassAverages] = useState({ highest: 'N/A', middle: 'N/A', lowest: 'N/A' });
  const [studentCounts, setStudentCounts] = useState({});
  const [ranks, setRanks] = useState([]);
  const[classe,setClData]=useState([])
  const[classData,setClassData] = useState([])
  const[niveauData,setNiveauData] = useState([])
  const[ecData,setecData] = useState([])
  const[enable,setEnable] = useState(true)
  const[text,setText] = useState('Selectionnez d\'abord le niveau')
  let componentPdf = useRef();
  const handleNiveau = async (e)=>{
    const niveauId = e.target.value
    if (niveauId !== "") {
        setEnable(false)
        setText('Selectionnez la classe')
        setClassData(classe.filter(s => s.niveau === (e.target.value)))
        
    }else{
        setText('Selectionnez d\'abord le niveau')
        setClassData([])
        setEnable(true)
    }
    // console.log(niveauId)
} 
useEffect( () => {
  const getNiveau = async()=>{
      const reqdata = await fetch(`${config.apiBaseUrl}/niveau.php`)
      const resdata = await reqdata.json()
      // console.log(resdata)
      setNiveauData(resdata)
      }
      getNiveau()

      const getclasse= async()=>{
        const reqdata = await fetch(`${config.apiBaseUrl}/classe.php`)
        const resdata = await reqdata.json()
        setClData(resdata)
      }
        getclasse()
      const getecole= async()=>{
        const reqdata = await fetch(`${config.apiBaseUrl}/schoolUp.php/`+ 1)
        const resdata = await reqdata.json()
        setecData(resdata)
      }
        getecole()
  },[])
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await fetch('${config.apiBaseUrl}/testpsc.php'); // Change this to your actual endpoint
  //     const result = await response.json();
  //     groupData(result);
  //   };
  //   fetchData();
  // }, []);
  const[formvalue,setFormvalue] = useState({
    classe:'',
    trim:'',
})
const handleInput =(e) =>{
  setFormvalue({...formvalue,[e.target.name] : e.target.value})
}
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await fetch(`${config.apiBaseUrl}/testpsc.php`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json', 
      }, body: JSON.stringify(formvalue), 
    });
    const result = await res.json(); 
    if (result.error) {
      console.error(result.error); 
      return; 
    }
    // setResponse(result); // Update the response state with the result
    groupData(result); // Call your custom function with the result
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
    const studentData = groupedData[matricule].notes;
    Object.keys(studentData).forEach(matiere => {
      studentData[matiere].forEach(item => {
        const moy1 = parseFloat(item.moy1);
        const moy2 = parseFloat(item.moy2);
        const moy3 = parseFloat(item.moy3);
        const Gmoy = parseFloat(item.Gmoy);
        const bareme = parseFloat(item.bareme);
        if (!isNaN(moy1)) totalMoy1 += moy1;
        if (!isNaN(moy2)) totalMoy2 += moy2;
        if (!isNaN(moy3)) totalMoy3 += moy3;
        if (!isNaN(Gmoy)) totalGmoy += Gmoy;
        if (!isNaN(bareme)) totalBareme += bareme;
      });
    });
    const averageMois1 = totalBareme === 0 ? 'N/A' : ((totalMoy1 / totalBareme) * 20).toFixed(2);
    const averageMois2 = totalBareme === 0 ? 'N/A' : ((totalMoy2 / totalBareme) * 20).toFixed(2);
    const averageMois3 = totalBareme === 0 ? 'N/A' : ((totalMoy3 / totalBareme) * 20).toFixed(2);
    const averageGmoy = totalBareme === 0 ? 'N/A' : ((totalGmoy / totalBareme) * 20).toFixed(2);
    newAverages[matricule] = parseFloat(averageGmoy);
    setAverages(prevAverages => ({
      ...prevAverages,
      [matricule]: {
        averageMois1,
        averageMois2,
        averageMois3,
        averageGmoy,
        totalMoy1,
        totalMoy2,
        totalMoy3,
        totalGmoy,
        totalBareme,
        appreciationMois1: getAppreciation(averageMois1),
        appreciationMois2: getAppreciation(averageMois2),
        appreciationMois3: getAppreciation(averageMois3),
        appreciationGmoy: getAppreciation(averageGmoy)
      }
    }));
  });
  return newAverages;
};

const assignRanks = () => {
  const averages = calculateAverages();
  const sortedStudents = Object.keys(averages).sort((a, b) => averages[b] - averages[a]); // Sort in descending order
  setRanks(sortedStudents);
  calculateClassAverages(averages);
};

useEffect(() => {
  if (Object.keys(groupedData).length > 0) {
    assignRanks();
  }
}, [groupedData]);

const calculateClassAverages = (averages) => { 
  const allAverages = Object.values(averages).filter(avg => !isNaN(avg)); 
  if (allAverages.length > 0) { 
    const highest = Math.max(...allAverages); 
    const lowest = Math.min(...allAverages); 
    const middle = allAverages.reduce((a, b) => a + b, 0) / allAverages.length; 
  setClassAverages({ highest, middle: middle.toFixed(2), lowest }); 
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
  let nomt = ""
  const getOrdinal = (n, filiere) => {
    if (filiere === '2') {
      nomt = "Term"
      return getOrdinalEn(n);
    } else if (filiere === '1') {
      nomt = "Trimestre"
      return getOrdinalFr(n);
    }
    return n;
  };
  
  const tdStyle = {
    height: '10px',
    verticalAlign: 'middle',
    fontSize: "10px"
  };

  const getAppreciationEn= (synth) => {
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
      return getAppreciationFr(synth); } 
    else if (filiere === '2') { 
      return getAppreciationEn(synth); 
    } 
    return 'N/A'; 
  };
  
// envoie des informations du formulaire
  return (
    <main className='main-container'>
      <h3>Class Report Card</h3>
      <div className="row mb-3">
                <div className="form-group col-md-2">
                <label className="mb-2">Niveau</label>
                <select name="niveau" className="form-control" onChange={handleNiveau}>
                <option value="">Selectionnez le Niveau</option>
                    {
                    niveauData.map((nData, index) =>(
                    <option key={index}  value={nData.id}>{nData.libellee_niveau}</option>
                        )
                    )}
                </select>
              </div>
              <div className="form-group col-md-2">
              <label className="mb-2">Classe</label>
              <select id='classe' name="classe" disabled={enable} className="form-control" onChange={handleInput}>
              <option value="">{text}</option>
                {
                classData.map((nData, index) =>(
                <option key={index} value={nData.idClasse}>{nData.libellé_classe}</option>
                    )
                )}
                </select>
              </div>
              <div className="form-group col-md-2">
              <label className="mb-2">Trimestre</label>
              <select id='trim' name="trim" disabled={enable} className="form-control" onChange={handleInput}>
                <option value="">Choisir le Timestre</option>
                <option value="1">Timestre 1</option>
                <option value="2">Timestre 2</option>
                <option value="3">Timestre 3</option>
                </select>
              </div>
              <div className=" col-md-1">
              <label className="mb-2"></label>
              <button className="btn btn-success" onClick={handleSubmit}>valider</button>
              </div>
              
              </div>
      <div className="btn-group col-md-4" role="group">
        <ReactToPrint
          trigger={() => <button className="btn btn-success"> <PrinterFill /> Imprimer</button>}
          content={() => componentPdf}
        />
      </div>
      <div className='contain' ref={(el) => (componentPdf = el)} style={{ width: '100%', padding: '0px 20px' }}>
  {ranks.map((matricule, index) => (
    <div key={matricule} style={{ pageBreakInside: 'avoid', marginBottom: '10px', height: 'auto' }}>
      <div id="head" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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
          {/* <p><strong>Enseignant(e):</strong> {groupedData[matricule].eleve.nomE} {groupedData[matricule].eleve.prenomE}</p> 
      */}
        </div>
      </div>
    <table style={tdStyle} className='maintab table table-striped table-bordered table-sm'>
      <thead style={tdStyle}>
        <tr>
          <th>&nbsp;&nbsp;&nbsp;&nbsp;Matière/Subject&nbsp;&nbsp;&nbsp;</th>
          <th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Description&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
          <th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Evaluation&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
          <th>Bar</th>
          <th>T1</th>
          <th>T2</th>
          <th>T3</th>
          <th>Gmoy</th>
          <th>Synth<br />Competences</th>
          <th>Appreciation</th>
        </tr>
      </thead>
      <tbody>
        {Object.keys(groupedData[matricule].notes).map((matiere, idx) => {
          const matiereData = groupedData[matricule].notes[matiere];
          const totalBareme = calculateSum(matiereData, 'bareme');
          const totalGmoy = calculateSum(matiereData, 'Gmoy');
          const synth = ((totalGmoy / totalBareme) * 20).toFixed(2);
          const appreciation = getAppreciation(synth, groupedData[matricule].eleve.filiere);
          return (
            <React.Fragment key={idx}>
              {matiereData.map((item, index) => (
                <tr key={item.id}>
                  {index === 0 && (
                    <>
                      <td rowSpan={matiereData.length}>{matiere}</td>
                      <td rowSpan={matiereData.length}>{item.description}</td>
                    </>
                  )}
                  <td style={{ fontSize: '9px' }}>{item.nom}</td>
                  <td style={{ fontSize: '9px' }}>{item.bareme}</td>
                  <td style={{ fontSize: '9px' }}>{item.moy1 || '/'}</td>
                  <td style={{ fontSize: '9px' }}>{item.moy2 || '/'}</td>
                  <td style={{ fontSize: '9px' }}>{item.moy3 || '/'}</td>
                  <td style={{ fontSize: '9px' }}>{item.Gmoy}</td>
                  {index === 0 && (
                    <>
                      <td rowSpan={matiereData.length}>{synth}</td>
                      <td rowSpan={matiereData.length}>{appreciation}</td>
                    </>
                  )}
                </tr>
              ))}
            </React.Fragment>
          );
        })}
      </tbody>
    </table>
      <div id="tab" style={{ width: '100%', overflowX: 'auto', height: 'auto' }}>
        {/* <table className='table table-striped table-bordered table-sm' style={{ width: '100px', tableLayout: 'auto' }}>
          <thead>
            <tr>
              <th style={{ fontSize: '9px' }}>[0;10[ <br /> NA: Non acquis</th>
              <th style={{ fontSize: '9px' }}>[11;14[ <br /> ECA: En Cours d'Acquisition</th>
              <th style={{ fontSize: '9px' }}>[15;17[ <br /> A: Acquis</th>
              <th style={{ fontSize: '9px' }}>[18;20[ <br /> A+: Expert</th>
            </tr>
          </thead>
        </table> */}
       <table className='table table-striped table-bordered table-sm' style={{ width: '100%', tableLayout: 'auto' }}>
  <thead>
    <tr style={{ fontSize: '9px' }}>
      <th>Moy1</th>
      <th>Moy2</th>
      <th>Moy3</th>
      <th>Résumé/Summary</th>
      <th>Stat Classe/Class</th>
      <th>Enseignant/Teacher</th>
      <th>Directrice/Headmistress</th>
      <th>Parent</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td rowSpan="2">Total: {averages[matricule]?.totalMoy1 + '/' + averages[matricule]?.totalBareme}<br />Moy/Avg: <strong>{averages[matricule]?.averageMois1}</strong></td>
      <td rowSpan="2">Total: {averages[matricule]?.totalMoy2 + '/' + averages[matricule]?.totalBareme}<br />Moy/Avg: <strong>{averages[matricule]?.averageMois2}</strong></td>
      <td rowSpan="2">Total: {averages[matricule]?.totalMoy3 + '/' + averages[matricule]?.totalBareme}<br />Moy/Avg: <strong>{averages[matricule]?.averageMois3}</strong></td>
      <td style={{ fontSize: '12px' }}> <strong>Moy/Avg: {averages[matricule]?.averageGmoy}</strong></td>
      <td>Premier/First: {classAverages.highest}</td>
      <td rowSpan="4"></td>
      <td rowSpan="4"></td>
      <td rowSpan="4"></td>
    </tr>
    <tr>
      <td ><strong>{getAppreciation(averages[matricule]?.averageGmoy, groupedData[matricule].eleve.filiere)}</strong></td>
      <td>Dernier/Last: {classAverages.lowest}</td>
    </tr>
    <tr>
      <td>{getAppreciation(averages[matricule]?.averageMois1, groupedData[matricule].eleve.filiere)}</td>
      <td>{getAppreciation(averages[matricule]?.averageMois2, groupedData[matricule].eleve.filiere)}</td>
      <td>{getAppreciation(averages[matricule]?.averageMois3, groupedData[matricule].eleve.filiere)}</td>
      <td > <strong>Rang/Rank: {getOrdinal(index + 1, groupedData[matricule].eleve.filiere)}</strong></td>
      <td>Moy.Gen/Gen.Avg: {classAverages.middle}</td>
    </tr>
  </tbody>
</table>

      </div>

        </div>
      ))}
    </div>
    </main>
  );
};

export default Bulls;
