
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
    // <table style={tdStyle} className='table table-striped table-bordered w-auto table-sm '>
    //   <thead style={tdStyle}>
    //     <tr>
    //       <th>Matière</th>
    //       <th>Evaluation</th>
    //       <th>Bar</th>
    //       <th>Mois1</th>
    //       <th>Mois2</th>
    //       <th>Mois3</th>
    //       <th>Moy</th>
    //       <th>Synthese<br />Competences</th>
    //       <th >Appreciation</th>
    //     </tr>
    //   </thead>
    //   <tbody  >
        
    //     {Object.keys(data).map((matiere, idx) => (
    //       <>
    //       <React.Fragment key={idx}>
    //         {data[matiere].map((item, index) => (
      
    //           <tr key={item.id}>
    //             {index === 0 && (

    //               <td  rowSpan={data[matiere].length}>{matiere}</td>
                  
    //             )}
    //             <td>{item.nom}</td>
    //             <td>{item.bareme}</td>
    //             <td>{((item.note1) == null)? '/':item.note1}</td>
    //             <td>{((item.note2) == null)? '/':item.note2}</td>
    //             <td>{((item.note3) == null)? '/':item.note3}</td>
    //             <td>{item.avg}</td>
    //             {index === 0 && (
    //               <>
    //                 <td rowSpan={data[matiere].length}></td>
    //                 <td rowSpan={data[matiere].length}>{}</td>
    //               </>
    //             )}

    //           </tr>
              
             
    //         ))
    //         }
    //       </React.Fragment>
          
    //       </>
    //     ))
    //     }
    //   </tbody>
    // </table>
//   );
// };

//  export default Evaluation;
// import React, { useEffect, useState } from 'react';
// import logo from './logo-tgsch.png'
// const Evaluation = () => {
//   const [data, setData] = useState({});
//   const [totals, setTotals] = useState({ totalNote1: 0, totalBareme: 0 });
//   const [averageMois1, setAverageMois1] = useState('N/A');


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
//     fontSize:"10px",
//     textAlign:"center"
//   };

//   const calculateSum = (subjectData, key) => {
//     return parseFloat(subjectData.reduce((total, item) => total + parseFloat(item[key]), 0).toFixed(2));
//   };
  
//   const getAppreciation = (synth) => {
//     if (synth >= 18) return "Expert";
//     if (synth >= 15) return "Acquis";
//     if (synth >= 11) return "En cours d'Acquisition";
//     return "Non Acquis";
//   };
  

//  useEffect(() => {
//     if (Object.keys(data).length > 0) {
//       let totalNote1 = 0;
//       let totalBareme = 0;

//       Object.keys(data).forEach(matiere => {
//         data[matiere].forEach(item => {
//           const note1 = parseFloat(item.note1);
//           const bareme = parseFloat(item.bareme);

//           if (!isNaN(note1) && !isNaN(bareme)) {
//             totalNote1 += note1;
//             totalBareme += bareme;
//           }

//           console.log(`Matiere: ${matiere}, Note1: ${item.note1}, Bareme: ${item.bareme}, Total Note1: ${totalNote1}, Total Bareme: ${totalBareme}`);
//         });
//       });

//       setTotals({ totalNote1, totalBareme });
//       const average = ((totalNote1 / totalBareme) * 20).toFixed(2);
//       setAverageMois1(average);
//     }
//   }, [data]);



 

//   return (
//     <div className='container'>
    
//             <div id="head">
//               {/* entete du bulletin */}
//               <div>
                
//                 <p className="fw-bold">REPUBLIQUE DU CAMEROUN</p>
//                 <p>Paix Travail Patrie</p>
//                 <p className="fw-bold">MINISTERE DE L'EDUCATION DE BASE</p>
//                 <p>Délégation Régionale de l'Est</p>
//                 <p>Délégation Départementale du Lom et Djerem</p>
//               </div>
//               <div>
//                 <img src={logo} style={{width:"100px"}} alt="Logo" />
//               </div>
//               <div >
//                 <p className="fw-bold">REPUBLIC OF CAMEROON</p>
//                 <p>Peace Work Fatherland</p>
//                 <p className="fw-bold">MINISTORY OF BASIC EDUCATION</p>
//                 <p>East Regional Delegation</p>
//                 <p>Lom and Djerem Divisional Delegation</p>
//               </div>
//             </div>
//             <div id='middle'>
//               <p id='tiEcol'>NEW GENEREATION "SCHOOL OF PERFORMANCE" </p>
//               <p><i> Discipline Travail Succès</i> </p>
//               <p className="fw-bold">{}e Trimestre </p>
//               <p> Année-scolaire: 2023-2024</p>
//             </div>
//             <div id="head">
              
//               <div id='botto'>
//                 <div >
//                   <img src={logo} style={{width:"90px",paddingRight:"10px"}} alt="Logo" />
//                 </div>
//                 <div >
//                   <p><strong>Nom et Prénoms:</strong> {data.nom} {data.prénom} </p>
//                   <p><strong>Matricule:</strong> {} </p>
//                   <p><strong>Né(e) le :</strong> {data.dateNaiss} à {data.lieuNaiss} </p>
//                   <p><strong>Sexe:</strong> {data.effectif} </p>
//                 </div>
//               </div>
//               <div>
//                 <p><strong>Classe:</strong> {data.libcl} </p>
//                 <p><strong>Effectif:</strong> {data.libcl} </p>
//               </div>
//             </div>
    // <table   style={tdStyle} className='table table-striped table-bordered w-auto table-sm '>
    //   <thead >
    //     <tr>
    //       <th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Matière&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
    //       <th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Description&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </th>
    //       <th>Evaluation</th>
    //       <th>Bar</th>
    //       <th>Mois1</th>
    //       <th>Mois2</th>
    //       <th>Mois3</th>
    //       <th>Moy</th>
    //       <th>Synthese<br />Competences</th>
    //       <th>Appreciation</th>
    //     </tr>
    //   </thead>
    //   <tbody>
    //     {Object.keys(data).map((matiere, idx) => {
    //     const matiereData = data[matiere]
    //     const totalBareme = calculateSum(matiereData, 'bareme')
    //     const totalMoy = calculateSum(matiereData, 'avg')
    //     const synth = ((totalMoy / totalBareme) * 20).toFixed(2)
    //     const appreciation = getAppreciation(synth)
    //       return (
    //         <React.Fragment key={idx}>
    //           {data[matiere].map((item, index) => (
    //             <tr key={item.id}>
    //               {index === 0 && (
    //                 <>
    //                 <td rowSpan={data[matiere].length}>{matiere}</td>
    //                 <td rowSpan={data[matiere].length}>{item.description}</td>
    //                 </>
    //               )}
    //               <td>{item.nom}</td>
    //               <td>{item.bareme}</td>
    //               <td>{item.note1 || '/'}</td>
    //               <td>{item.note2 || '/'}</td>
    //               <td>{item.note3 || '/'}</td>
    //               <td>{item.avg}</td>
    //               {index === 0 && (
    //                 <>
    //                   <td rowSpan={data[matiere].length}>{synth}</td>
    //                   <td rowSpan={data[matiere].length}>{appreciation}</td>
    //                 </>
    //               )}
    //             </tr>
    //           ))}
    //         </React.Fragment>
    //       );
    //     })}
    //   </tbody>
    // </table>
    // <div>
    // <h3>Average Mois1: {averageMois1}</h3>
    //   <p>Total Note1: {totals.totalNote1}</p>
    //   <p>Total Bareme: {totals.totalBareme}</p>
    // </div>
    // </div>
//   );
// };

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



// import React, { useEffect, useState } from 'react';

// const Evaluation = () => {
//   const [data, setData] = useState({});
//   const [groupedData, setGroupedData] = useState({});
//   const [totals, setTotals] = useState({ totalNote1: 0, totalNote2: 0, totalNote3: 0, totalMoy: 0, totalBareme: 0 });
//   const [averages, setAverages] = useState({ averageMois1: 'N/A', averageMois2: 'N/A', averageMois3: 'N/A', averageMoy: 'N/A' });

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
//     return parseFloat(subjectData.reduce((total, item) => total + parseFloat(item[key] || 0), 0).toFixed(2));
//   };

//   const calculateAveragesForMatricule = (matricule) => {
//     let totalNote1 = 0, totalNote2 = 0, totalNote3 = 0, totalMoy = 0, totalBareme = 0;

//     Object.keys(groupedData[matricule]).forEach(matiere => {
//       groupedData[matricule][matiere].forEach(item => {
//         const note1 = parseFloat(item.note1);
//         const bareme = parseFloat(item.bareme);

//         if (!isNaN(note1) && !isNaN(bareme)) {
//           totalNote1 += note1;
//           totalBareme += bareme;
//         }
      
//         const note2 = parseFloat(item.note2 || 0);
//         const note3 = parseFloat(item.note3 || 0);
//         const moy = parseFloat(item.avg || 0);

        
//         if (!isNaN(note2)) totalNote2 += note2;
//         if (!isNaN(note3)) totalNote3 += note3;
//         if (!isNaN(moy)) totalMoy += moy;
//       });
//     });

    

//     setTotals({ totalNote1, totalNote2, totalNote3, totalMoy, totalBareme });
//     setAverages({
//       averageMois1: totalBareme === 0 ? 'N/A' : ((totalNote1 / totalBareme) * 20).toFixed(2),
//       averageMois2: totalBareme === 0 ? 'N/A' : ((totalNote2 / totalBareme) * 20).toFixed(2),
//       averageMois3: totalBareme === 0 ? 'N/A' : ((totalNote3 / totalBareme) * 20).toFixed(2),
//       averageMoy: totalBareme === 0 ? 'N/A' : ((totalMoy / totalBareme) * 20).toFixed(2),
//     });
//   };

  // useEffect(() => {
  //   if (Object.keys(groupedData).length > 0) {
  //     // You can call calculateAveragesForMatricule with the specific matricule you want to calculate for
  //     calculateAveragesForMatricule('2022NGSOP001'); // Change to the desired matricule
  //   }
  // }, [groupedData]);

//   const tdStyle = {
//     height: '10px',
//     verticalAlign: 'middle',
//     fontSize: "10px"
//   };
  //   const getAppreciation = (synth) => {
  //   if (synth >= 18) return "Excellent";
  //   if (synth >= 15) return "Very Good";
  //   if (synth >= 12) return "Good";
  //   if (synth >= 10) return "Average";
  //   return "Needs Improvement";
  // };


//   return (
//     <div>
//       <h3>Class Report Card</h3>
//       {Object.keys(groupedData).map(matricule => (
//         <div key={matricule}>
//           <h4>Matricule: {matricule}</h4>
//           <table style={tdStyle} className='table table-striped table-bordered w-auto table-sm'>
//             <thead style={tdStyle}>
//               <tr>
//                 <th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Matière&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
//                 <th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Description&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
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
//           {Object.keys(groupedData[matricule]).map((matiere, idx) => {
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
//                 <td>{item.avg}</td>
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
//           <div>
//     <h3>Average Mois1: {averages.averageMois1}</h3>
//       <p>Total Note1: {totals.totalNote1}</p>
//       <p>Total Bareme: {totals.totalBareme}</p> 
//     </div>
//         </div>
//       ))}
//     </div>
//   );
// };

//  export default Evaluation;

import React, { useEffect, useRef, useState } from 'react';
import ReactToPrint from "react-to-print";
import { PrinterFill } from 'react-bootstrap-icons';
const Evaluation = () => {
  const [data, setData] = useState({});
  const [groupedData, setGroupedData] = useState({});
  const [averages, setAverages] = useState({});
  const [classAverages, setClassAverages] = useState({ highest: 'N/A', middle: 'N/A', lowest: 'N/A' });
  let componentPdf = useRef()

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost/ssm/api/testpsc.php'); // Change this to your actual endpoint
      const result = await response.json();
      setData(result);
      groupData(result);
    };
    fetchData();
  }, []);

  const groupData = (data) => {
    const grouped = {};
    Object.keys(data).forEach(matricule => {
      const studentData = data[matricule].notes;
      studentData.forEach(item => {
        const { matiere } = item;
        if (!grouped[matricule]) {
          grouped[matricule] = {};
        }
        if (!grouped[matricule][matiere]) {
          grouped[matricule][matiere] = [];
        }
        grouped[matricule][matiere].push(item);
      });
    });
    setGroupedData(grouped);
  };

  const calculateSum = (subjectData, key) => {
    return parseFloat(subjectData.reduce((total, item) => total + parseFloat(item[key] || 0), 0).toFixed(2));
  };

  const calculateAverages = (matricule) => {
    let totalNote1 = 0, totalNote2 = 0, totalNote3 = 0, totalMoy = 0, totalBareme = 0;
    const studentData = groupedData[matricule];

    Object.keys(studentData).forEach(matiere => {
      studentData[matiere].forEach(item => {
        const note1 = parseFloat(item.note1);
        const note2 = parseFloat(item.note2);
        const note3 = parseFloat(item.note3);
        const moy = parseFloat(item.avg);
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

    const appreciationMois1 = getAppreciation(averageMois1);
    const appreciationMois2 = getAppreciation(averageMois2);
    const appreciationMois3 = getAppreciation(averageMois3);
    const appreciationMoy = getAppreciation(averageMoy);

  //   setAverages(prevAverages => ({
  //     ...prevAverages,
  //     [matricule]: { averageMois1, averageMois2, averageMois3, averageMoy, appreciationMois1, appreciationMois2, appreciationMois3, appreciationMoy }
  //   }));
  // };
  setAverages(prevAverages => ({
    ...prevAverages,
    [matricule]: { 
      averageMois1, averageMois2, averageMois3, averageMoy, 
      totalNote1, totalNote2, totalNote3, totalMoy, totalBareme,
      appreciationMois1, appreciationMois2, appreciationMois3, appreciationMoy
    }
  }));
};
const calculateClassAverages = () => {
  const allAverages = [];
  Object.keys(groupedData).forEach(matricule => {
    const averages = calculateAverages(matricule);
    allAverages.push(parseFloat(averages.averageMoy));
  });

  allAverages.sort((a, b) => a - b);
  const highest = allAverages[allAverages.length - 1];
  const middle = allAverages[Math.floor(allAverages.length / 2)];
  const lowest = allAverages[0];

  setClassAverages({ highest, middle, lowest });
};

  useEffect(() => {
    if (Object.keys(groupedData).length > 0) {
      Object.keys(groupedData).forEach(matricule => {
        calculateAverages(matricule);
      });
    }
  }, [groupedData]);

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
    return "Needs Improvement"
  }
  return (
    <main className='main-container'>
      <h3>Class Report Card</h3>
      <div className="btn-group col-md-4" role="group">
              <ReactToPrint
                trigger={() => 
                    <button className="btn btn-success"> <PrinterFill /> Imprimer</button>
                }
                content={() => componentPdf}
                />
           </div>
    <div ref={(el) => (componentPdf = el)} style={{width:'100%',padding:'0px 12px',fontSize:'10px'}}>
      {Object.keys(groupedData).map(matricule => (
        <div key={matricule}>
          <h4>Matricule: {matricule}</h4>
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
              {Object.keys(groupedData[matricule]).map((matiere, idx) => {
                const matiereData = groupedData[matricule][matiere];
                const totalBareme = calculateSum(matiereData, 'bareme');
                const totalMoy = calculateSum(matiereData, 'avg');
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
                        <td>{item.avg}</td>
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
          <div >
            <table className='table table-striped table-bordered ' >
              <tbody>
              <tr>
                <td>[ 0;10[ <br /> NA:Non acquis <br />  </td>
                <td>[ 11;14[ <br /> ECA:En Cours <br />d'Acquisition </td>
                <td>[ 15;17[ <br /> A: Acquis </td>
                <td>[ 18;20[ <br /> A: Expert </td>
              </tr>
              </tbody>
            </table>
          </div>
          <div>
          <table id='' className='table table-striped table-bordered table-sm' >
              <thead>
                <tr>
                  <th> Mois1</th>
                  <th> Mois2</th>
                  <th> Mois3</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td> Total:{averages[matricule]?.totalNote1 + '/' + averages[matricule]?.totalBareme } Moy:{averages[matricule]?.averageMois1}</td>
                  <td>  Total:{averages[matricule]?.totalNote2 + '/' + averages[matricule]?.totalBareme } Moy:{averages[matricule]?.averageMois2}</td>
                  <td>  Total:{averages[matricule]?.totalNote3 + '/' + averages[matricule]?.totalBareme } Moy:{averages[matricule]?.averageMois3}</td>
                </tr>
                <tr>
                  <td> {averages[matricule]?.appreciationMois1}</td>
                  <td> {averages[matricule]?.appreciationMois2}</td>
                  <td> {averages[matricule]?.appreciationMois3}</td>
                </tr>
                </tbody>
              </table>
            </div>
            <div id='tab'>
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
                  <td>Rang:{averages[matricule]?.totalBareme} </td>
                </tr>
              </tbody>
            </table>
          </div>
            <div id='tab'>
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
                  <td>Rang:{averages[matricule]?.totalBareme} </td>
                </tr>
              </tbody>
            </table>
          </div>
          
          
          
          </div>
          <div id='tab'>
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

export default Evaluation;
