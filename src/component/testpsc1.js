
// import React, { useEffect, useState } from 'react';

// const Evaluation = () => {
//   const [data, setData] = useState({});

//   useEffect(() => {
//     // Assuming data is fetched from an endpoint
//     const fetchData = async () => {
//       const response = await fetch('http://localhost/ssm/api/testpsc.php/');
//       const result = await response.json();
//       setData(result);
//     };
//     fetchData();
//   }, []);
//   const tdStyle = {
//     height: '10px', // Adjust the height as needed
//     verticalAlign: 'middle', // Center the content vertically
//     fontSize:"10px"
//   };
  

//   return (
//     <table style={tdStyle} className='table table-striped table-bordered w-auto table-sm '>
//       <thead style={tdStyle}>
//         <tr>
//           <th>Matière</th>
//           <th>Evaluation</th>
//           <th>Bar</th>
//           <th>Mois1</th>
//           <th>Mois2</th>
//           <th>Mois3</th>
//           <th>Moy</th>
//           <th>Synthese<br />Competences</th>
//           <th >Appreciation</th>
//         </tr>
//       </thead>
//       <tbody  >
        
//         {Object.keys(data).map((matiere, idx) => (
//           <>
//           <React.Fragment key={idx}>
//             {data[matiere].map((item, index) => (
      
//               <tr key={item.id}>
//                 {index === 0 && (

//                   <td  rowSpan={data[matiere].length}>{matiere}</td>
                  
//                 )}
//                 <td>{item.nom}</td>
//                 <td>{item.bareme}</td>
//                 <td>{((item.note1) == null)? '/':item.note1}</td>
//                 <td>{((item.note2) == null)? '/':item.note2}</td>
//                 <td>{((item.note3) == null)? '/':item.note3}</td>
//                 <td>{item.avg}</td>
//                 {index === 0 && (
//                   <>
//                     <td rowSpan={data[matiere].length}></td>
//                     <td rowSpan={data[matiere].length}>{}</td>
//                   </>
//                 )}

//               </tr>
              
             
//             ))
//             }
//           </React.Fragment>
          
//           </>
//         ))
//         }
//       </tbody>
//     </table>
//   );
// };

// export default Evaluation;
import React, { useEffect, useState } from 'react';
import logo from './logo-tgsch.png'
const Evaluation = () => {
  const [data, setData] = useState({});
  const [totals, setTotals] = useState({ totalNote1: 0, totalBareme: 0 });
  const [averageMois1, setAverageMois1] = useState('N/A');


  useEffect(() => {
    // Assuming data is fetched from an endpoint
    const fetchData = async () => {
      const response = await fetch('http://localhost/ssm/api/testpsc.php/');
      const result = await response.json();
      setData(result);
    };
    fetchData();
  }, []);
  const tdStyle = {
    height: '10px', // Adjust the height as needed
    verticalAlign: 'middle', // Center the content vertically
    fontSize:"10px",
    textAlign:"center"
  };

  const calculateSum = (subjectData, key) => {
    return parseFloat(subjectData.reduce((total, item) => total + parseFloat(item[key]), 0).toFixed(2));
  };
  
  const getAppreciation = (synth) => {
    if (synth >= 18) return "Expert";
    if (synth >= 15) return "Acquis";
    if (synth >= 11) return "En cours d'Acquisition";
    return "Non Acquis";
  };
  

 useEffect(() => {
    if (Object.keys(data).length > 0) {
      let totalNote1 = 0;
      let totalBareme = 0;

      Object.keys(data).forEach(matiere => {
        data[matiere].forEach(item => {
          const note1 = parseFloat(item.note1);
          const bareme = parseFloat(item.bareme);

          if (!isNaN(note1) && !isNaN(bareme)) {
            totalNote1 += note1;
            totalBareme += bareme;
          }

          console.log(`Matiere: ${matiere}, Note1: ${item.note1}, Bareme: ${item.bareme}, Total Note1: ${totalNote1}, Total Bareme: ${totalBareme}`);
        });
      });

      setTotals({ totalNote1, totalBareme });
      const average = ((totalNote1 / totalBareme) * 20).toFixed(2);
      setAverageMois1(average);
    }
  }, [data]);



 

  return (
    <div className='container'>
    
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
                <img src={logo} style={{width:"100px"}} alt="Logo" />
              </div>
              <div >
                <p className="fw-bold">REPUBLIC OF CAMEROON</p>
                <p>Peace Work Fatherland</p>
                <p className="fw-bold">MINISTORY OF BASIC EDUCATION</p>
                <p>East Regional Delegation</p>
                <p>Lom and Djerem Divisional Delegation</p>
              </div>
            </div>
            <div id='middle'>
              <p id='tiEcol'>NEW GENEREATION "SCHOOL OF PERFORMANCE" </p>
              <p><i> Discipline Travail Succès</i> </p>
              <p className="fw-bold">{}e Trimestre </p>
              <p> Année-scolaire: 2023-2024</p>
            </div>
            <div id="head">
              
              <div id='botto'>
                <div >
                  <img src={logo} style={{width:"90px",paddingRight:"10px"}} alt="Logo" />
                </div>
                <div >
                  <p><strong>Nom et Prénoms:</strong> {data.nom} {data.prénom} </p>
                  <p><strong>Matricule:</strong> {} </p>
                  <p><strong>Né(e) le :</strong> {data.dateNaiss} à {data.lieuNaiss} </p>
                  <p><strong>Sexe:</strong> {data.effectif} </p>
                </div>
              </div>
              <div>
                <p><strong>Classe:</strong> {data.libcl} </p>
                <p><strong>Effectif:</strong> {data.libcl} </p>
              </div>
            </div>
    <table   style={tdStyle} className='table table-striped table-bordered w-auto table-sm '>
      <thead >
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
        {Object.keys(data).map((matiere, idx) => {
        const matiereData = data[matiere]
        const totalBareme = calculateSum(matiereData, 'bareme')
        const totalMoy = calculateSum(matiereData, 'avg')
        const synth = ((totalMoy / totalBareme) * 20).toFixed(2)
        const appreciation = getAppreciation(synth)
          return (
            <React.Fragment key={idx}>
              {data[matiere].map((item, index) => (
                <tr key={item.id}>
                  {index === 0 && (
                    <>
                    <td rowSpan={data[matiere].length}>{matiere}</td>
                    <td rowSpan={data[matiere].length}>{item.description}</td>
                    </>
                  )}
                  <td>{item.nom}</td>
                  <td>{item.bareme}</td>
                  <td>{item.note1 || '/'}</td>
                  <td>{item.note2 || '/'}</td>
                  <td>{item.note3 || '/'}</td>
                  <td>{item.avg}</td>
                  {index === 0 && (
                    <>
                      <td rowSpan={data[matiere].length}>{synth}</td>
                      <td rowSpan={data[matiere].length}>{appreciation}</td>
                    </>
                  )}
                </tr>
              ))}
            </React.Fragment>
          );
        })}
      </tbody>
    </table>
    <div>
    <h3>Average Mois1: {averageMois1}</h3>
      <p>Total Note1: {totals.totalNote1}</p>
      <p>Total Bareme: {totals.totalBareme}</p>
    </div>
    </div>
  );
};

// export default Evaluation;
// import React, { useEffect, useState } from 'react';

// const Evaluation = () => {
//   const [data, setData] = useState({});
//   const [groupedData, setGroupedData] = useState({});

//   useEffect(() => {
//     const fetchData = async () => {
//       const response = await fetch('http://localhost/ssm/api/testpsc.php'); // Change this to your actual endpoint
//       const result = await response.json();
//       setData(result);
//       groupData(result);
//     };
//     fetchData();
//   }, []);

//   const groupData = (data) => {
//     const grouped = {};

//     Object.keys(data).forEach(matricule => {
//       const studentData = data[matricule].notes;
//       studentData.forEach(item => {
//         const { matiere } = item;
//         if (!grouped[matricule]) {
//           grouped[matricule] = {};
//         }
//         if (!grouped[matricule][matiere]) {
//           grouped[matricule][matiere] = [];
//         }
//         grouped[matricule][matiere].push(item);
//       });
//     });

//     setGroupedData(grouped);
//   };

//   const calculateSum = (subjectData, key) => {
//     return parseFloat(subjectData.reduce((total, item) => total + parseFloat(item[key]), 0).toFixed(2));
//   };

//   const getAppreciation = (synth) => {
//     if (synth >= 18) return "Excellent";
//     if (synth >= 15) return "Very Good";
//     if (synth >= 12) return "Good";
//     if (synth >= 10) return "Average";
//     return "Needs Improvement";
//   };

//   const tdStyle = {
//     height: '10px',
//     verticalAlign: 'middle',
//     fontSize: "10px"
//   };

//   return (
//     <div>
//       <h3>Class Report Card</h3>
//       {Object.keys(groupedData).map(matricule => (
//         <div key={matricule}>
//           <h4>Matricule: {matricule}</h4>
//           <table style={tdStyle} className='table table-striped table-bordered w-auto table-sm'>
//             <thead style={tdStyle}>
//               <tr>
//                 <th>Matière</th>
//                 <th>Evaluation</th>
//                 <th>Bar</th>
//                 <th>Mois1</th>
//                 <th>Mois2</th>
//                 <th>Mois3</th>
//                 <th>Moy</th>
//                 <th>Synthese<br />Competences</th>
//                 <th>Appreciation</th>
//               </tr>
//             </thead>
//             <tbody>
//               {Object.keys(groupedData[matricule]).map((matiere, idx) => {
//                 const matiereData = groupedData[matricule][matiere];
//                 const totalBareme = calculateSum(matiereData, 'bareme');
//                 const totalMoy = calculateSum(matiereData, 'avg');
//                 const synth = ((totalMoy / totalBareme) * 20).toFixed(2);
//                 const appreciation = getAppreciation(synth);

//                 return (
//                   <React.Fragment key={idx}>
//                     {matiereData.map((item, index) => (
//                       <tr key={item.id}>
//                         {index === 0 && (
//                           <>
//                             <td rowSpan={matiereData.length}>{matiere}</td>
//                             <td rowSpan={matiereData.length}>{item.description}</td>
//                           </>
//                         )}
//                         <td>{item.nom}</td>
//                         <td>{item.bareme}</td>
//                         <td>{item.note1 || '/'}</td>
//                         <td>{item.note2 || '/'}</td>
//                         <td>{item.note3 || '/'}</td>
//                         <td>{item.avg}</td>
//                         {index === 0 && (
//                           <>
//                             <td rowSpan={matiereData.length}>{synth}</td>
//                             <td rowSpan={matiereData.length}>{appreciation}</td>
//                           </>
//                         )}
//                       </tr>
//                     ))}
//                   </React.Fragment>
//                 );
//               })}
//             </tbody>
//           </table>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Evaluation;