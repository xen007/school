// // importation des modules
// import React from "react";
// import { Link } from "react-router-dom";

// //fonction principale
// export default function Bulls(){

//   return(
//     <main className="main-container" >
//     <h3>Bienvenu sur la gestion des bulletins</h3> 
//       <div className="col-sm-12">
//         <div className="row mb-3">
//          <div className="btn-group col-md-3">
//           <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" >
//             Type de bulletins
//           </button>
//           <ul className="dropdown-menu">
//             {/* //menu déroulant */}
//             <li> <Link className="dropdown-item">Trimestriel </Link>
//               <ul className="dropdown-menu dropdown-submenu">  
//               {/* liste des trimestres dans le menu déroulant */}
//                  <Link to={"trim/"+ 1} className="dropdown-item">Trimestre 1</Link> 
//                  <Link to={'trim/'+ 2}className="dropdown-item">Trimestre 2</Link> 
//                  <Link to={'trim/'+ 3} className="dropdown-item">Trimestre 3</Link>   
//               </ul>
//             </li>
//             <li><Link className="dropdown-item">Séquenciel</Link>
//             <ul className="dropdown-menu dropdown-submenu">
//             {/* liste des séquences dans le menu déroulant */}
//                  <Link to={'seq/'+ 1} className="dropdown-item">Séquence 1</Link> 
//                  <Link to={'seq/'+ 2} className="dropdown-item">Séquence 2</Link> 
//                  <Link to={'seq/'+ 3} className="dropdown-item">Séquence 3</Link>   
//                  <Link to={'seq/'+ 4} className="dropdown-item">Séquence 4</Link>   
//                  <Link to={'seq/'+ 5} className="dropdown-item">Séquence 5</Link>   
//                  <Link to={'seq/'+ 6} className="dropdown-item">Séquence 6</Link>   
//               </ul>
//             </li>
//             </ul>
//           </div>
//            </div>
          
//       </div>
//   </main>
//   )
// }


import React, { useEffect, useRef, useState } from 'react';
import ReactToPrint from "react-to-print";
import { PrinterFill } from 'react-bootstrap-icons';

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
      const reqdata = await fetch("http://localhost/ssm/api/niveau.php")
      const resdata = await reqdata.json()
      // console.log(resdata)
      setNiveauData(resdata)
      }
      getNiveau()

      const getclasse= async()=>{
        const reqdata = await fetch("http://localhost/ssm/api/classe.php")
        const resdata = await reqdata.json()
        setClData(resdata)
      }
        getclasse()
      const getecole= async()=>{
        const reqdata = await fetch("http://localhost/ssm/api/schoolUp.php/"+ 1)
        const resdata = await reqdata.json()
        setecData(resdata)
      }
        getecole()
  },[])
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await fetch('http://localhost/ssm/api/testpsc.php'); // Change this to your actual endpoint
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
    const res = await fetch('http://localhost/ssm/api/testpsc.php', {
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
      let totalNote1 = 0, totalNote2 = 0, totalNote3 = 0, totalMoy = 0, totalBareme = 0;
      const studentData = groupedData[matricule].notes;
      Object.keys(studentData).forEach(matiere => {
        studentData[matiere].forEach(item => {
          const note1 = parseFloat(item.note1);
          const note2 = parseFloat(item.note2);
          const note3 = parseFloat(item.note3);
          const moy = parseFloat(item.moy);
          const bareme = parseFloat(item.bareme);
          if (!isNaN(note1)) totalNote1 += note1;
          if (!isNaN(note2)) totalNote2 += note2;
          if (!isNaN(note3)) totalNote3 += note3;
          if (!isNaN(moy)) totalMoy += moy;
          if (!isNaN(bareme)) totalBareme += bareme;
        });
      });
      const averageMois1 = totalBareme === 0 ? 'N/A' : ((totalNote1 / totalBareme) * 20).toFixed(2);
      const averageMois2 = totalBareme === 0 ? 'N/A' : ((totalNote2 / totalBareme) * 20).toFixed(2);
      const averageMois3 = totalBareme === 0 ? 'N/A' : ((totalNote3 / totalBareme) * 20).toFixed(2);
      const averageMoy = totalBareme === 0 ? 'N/A' : ((totalMoy / totalBareme) * 20).toFixed(2);
      newAverages[matricule] = parseFloat(averageMoy);
      setAverages(prevAverages => ({
        ...prevAverages,
        [matricule]: {
          averageMois1,
          averageMois2,
          averageMois3,
          averageMoy,
          totalNote1,
          totalNote2,
          totalNote3,
          totalMoy,
          totalBareme,
          appreciationMois1: getAppreciation(averageMois1),
          appreciationMois2: getAppreciation(averageMois2),
          appreciationMois3: getAppreciation(averageMois3),
          appreciationMoy: getAppreciation(averageMoy)
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

  const getOrdinal = (n) => { 
    const s = ["th", "st", "nd", "rd"], v = n % 100; 
    return n + (s[(v - 20) % 10] || s[v] || s[0]); 
  };
  const tdStyle = {
    height: '10px',
    verticalAlign: 'middle',
    fontSize: "10px"
  };

  const getAppreciation = (synth) => {
    if (synth >= 18) return "Excellent";
    if (synth >= 15) return "Very Good";
    if (synth >= 12) return "Good";
    if (synth >= 10) return "Average";
    return "Needs Improvement";
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
      <div ref={(el) => (componentPdf = el)} style={{ width: '80%', padding: '20px 40px', fontSize: '10px' }}>
        {ranks.map((matricule, index) => (
          <div key={matricule}>
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
                <img src={`http://localhost/ssm/api/logo/${ecData.logo}`} style={{ width: "100px" }} alt="Logo" />
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
              <p id='tiEcol'>{ecData.nomec}</p>
              <p><i> {ecData.devise}</i> </p>
              <p className="fw-bold">{}e Trimestre </p>
              <p> Année-scolaire: {'2024-2025'} </p>
            </div>
            <div id="head">
              <div id='botto'>
                <div>
                  <img src={`http://localhost/ssm/api/image/${groupedData[matricule].eleve.photo}`}    alt={groupedData[matricule].eleve.photo} style={{ width: "90px", paddingRight: "10px" }} />
                </div>
                <div>
                  <p>Nom et Prénoms: <strong> {groupedData[matricule].eleve.nom}{groupedData[matricule].eleve.prenom} </strong></p>
                  <p>Matricule: <strong>{matricule} </strong> </p>
                  <p>Né(e) le : {groupedData[matricule].eleve.dateNaiss || 'N/A'} à {groupedData[matricule].eleve.lieuNaiss || 'N/A'} </p>
                  <p>Sexe:{groupedData[matricule].eleve.genre} </p>
        </div>
      </div>
      <div>
        <p><strong>Classe:</strong> {groupedData[matricule].eleve.libellee_classe} </p>
        <p><strong>Effectif:</strong> {studentCounts[groupedData[matricule].eleve.classe]} </p>
      </div>
    </div>
            <table style={tdStyle} className='table table-striped table-bordered table-sm'>
              <thead style={tdStyle}>
                <tr>
                  <th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Matière&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
                  <th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Description&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </th>
                  <th>Evaluation</th>
                  <th>Bar</th>
                  <th>Mois1</th>
                  <th>Mois2</th>
                  <th>Mois3</th>
                  <th>Moy</th>
                  <th>Synthese<br />Competences</th>
                  <th>Appreciation</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(groupedData[matricule].notes).map((matiere, idx) => {
                  const matiereData = groupedData[matricule].notes[matiere];
                  const totalBareme = calculateSum(matiereData, 'bareme');
                  const totalMoy = calculateSum(matiereData, 'moy');
                  const synth = ((totalMoy / totalBareme) * 20).toFixed(2);
                  const appreciation = getAppreciation(synth);
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
                          <td>{item.nom}</td>
                          <td>{item.bareme}</td>
                          <td>{item.note1 || '/'}</td>
                          <td>{item.note2 || '/'}</td>
                          <td>{item.note3 || '/'}</td>
                          <td>{item.moy}</td>
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
          {/* <div>
            <h3>Average Mois1: {averages[matricule]?.averageMois1}</h3>
            <h3>Average Mois2: {averages[matricule]?.averageMois2}</h3>
            <h3>Average Mois3: {averages[matricule]?.averageMois3}</h3>
            <h3>Average Moy: {averages[matricule]?.averageMoy}</h3>
          </div> */}
          <div id="tab">
         
            <table className='table table-striped table-bordered table-sm ' >
              <tbody>
              <tr>
                <td>[0;10[ <br /> NA:Non acquis <br />  </td>
                <td>[11;14[ <br /> ECA:En Cours <br />d'Acquisition </td>
                <td>[15;17[ <br /> A: Acquis </td>
                <td>[18;20[ <br /> A+: Expert </td>
              </tr>
              </tbody>
            </table>
         
          <table className='table table-striped table-bordered table-sm' >
              <thead>
                <tr>
                  <th> Mois1</th>
                  <th> Mois2</th>
                  <th> Mois3</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td> Total: {averages[matricule]?.totalNote1 + '/' + averages[matricule]?.totalBareme }<br /> Moy: {averages[matricule]?.averageMois1}</td>
                  <td>  Total: {averages[matricule]?.totalNote2 + '/' + averages[matricule]?.totalBareme }<br /> Moy: {averages[matricule]?.averageMois2}</td>
                  <td>  Total: {averages[matricule]?.totalNote3 + '/' + averages[matricule]?.totalBareme }<br /> Moy: {averages[matricule]?.averageMois3}</td>
                </tr>
                <tr>
                  <td> {averages[matricule]?.appreciationMois1}</td>
                  <td> {averages[matricule]?.appreciationMois2}</td>
                  <td> {averages[matricule]?.appreciationMois3}</td>
                </tr>
                </tbody>
              </table>
           
       
              <table className='table table-striped table-bordered table-sm' >
                <thead>
                  <tr>
                    <th>Résumé du Travail</th>
                  </tr>
                </thead>
                <tbody>
                <tr>
                  <td>Moy:{averages[matricule]?.averageMoy} </td>
                </tr>
                <tr>
                  <td>{averages[matricule]?.appreciationMoy}  </td>
                </tr>
                <tr>
                  <td>Rang: {getOrdinal(index + 1)} </td>
                </tr>
              </tbody>
            </table>
      
          
            
          </div>
          <div id='tab' style={{marginBottom:'50px'}}>
            <table  className='table table-striped table-bordered table-sm'>
              <thead >
                <tr>
                  <th colSpan="2">Statistiques Classe</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Moy.Premier</td>
                  <td>{classAverages.highest}</td>
                </tr>
                <tr>
                  <td>Moy.Dernier</td>
                  <td>{classAverages.lowest}</td>
                </tr>
                <tr>
                  <td>Moy.Generale</td>
                  <td>{classAverages.middle}</td>
                </tr>
              </tbody>
            </table>
            <table className='table table-striped table-bordered table-sm' >
              <thead>
              <tr>
              <th>Visa de l'enseignant</th>
                <th>Visa Chef d'etablissement</th>
                <th>Visa du Parent</th>
              </tr>
              </thead>
              <tbody>
               <tr>
               <td></td>
                <td></td>
                <td></td>
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
