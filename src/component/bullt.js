import React from 'react';
import logo from './sign.png';

const Bullt = ({ groupedData, matricule, calculateSum, getAppreciation, averages, classAverages, getOrdinal }) => {

  const tdStyle = {
    height: '10px',
    verticalAlign: 'middle',
    fontSize: "12px",
  };

  return (
    <>
      <table style={tdStyle} className='table table-striped table-bordered'>
        <thead style={tdStyle}>
          <tr>
            <th>&nbsp;&nbsp;&nbsp;&nbsp;Matière/Subject&nbsp;&nbsp;&nbsp;</th>
            <th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Description&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
            <th>Trim/Term&nbsp;&nbsp;&nbsp;1</th>
            <th>Trim/Term&nbsp;&nbsp;&nbsp;2</th>
            <th>Trim/Term&nbsp;&nbsp;&nbsp;3</th>
            <th>Synth<br />Competences</th>
            <th>Appreciation</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(groupedData[matricule].notes).map((matiere, idx) => {
            const matiereData = groupedData[matricule].notes[matiere];
            const totalBareme = calculateSum(matiereData, 'bareme');
            const totalMoy1 = calculateSum(matiereData, 'moy1');
            const totalMoy2 = calculateSum(matiereData, 'moy2');
            const totalMoy3 = calculateSum(matiereData, 'moy3');
            const synth1 = ((totalMoy1 / totalBareme) * 20).toFixed(2);
            const synth2 = ((totalMoy2 / totalBareme) * 20).toFixed(2);
            const synth3 = ((totalMoy3 / totalBareme) * 20).toFixed(2);
            const totalGmoy = calculateSum(matiereData, 'Gmoy');
            const synthG = ((totalGmoy / totalBareme) * 20).toFixed(2);
            const appreciation = getAppreciation(synthG, groupedData[matricule].eleve.filiere);
            return (
              <React.Fragment key={idx}>
                {matiereData.map((item, index) => (
                  <tr key={item.id}>
                    {index === 0 && (
                      <>
                        <td>{matiere}</td>
                        <td>{item.description}</td>
                        <td>{synth1}</td>
                        <td>{synth2}</td>
                        <td>{synth3}</td>
                      </>
                    )}
                    {index === 0 && (
                      <>
                        <td>{synthG}</td>
                        <td>{appreciation}</td>
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
        <table className='table table-striped table-bordered table-sm' style={{ width: '100%', tableLayout: 'auto' }}>
          <thead>
            <tr style={{ fontSize: '9px' }}>
              <th>M1</th>
              <th>M2</th>
              <th>M3</th>
              <th>Résumé/Summary</th>
              <th>Stat Classe/Class</th>
              <th>Enseignant/Teacher</th>
              <th>Directrice/Headmistress</th>
              <th>Parent</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td rowSpan="2">Total: {averages[matricule]?.totalMoy1.toFixed(2) + '/' + averages[matricule]?.totalBaremeNote1}<br />Moy1: <strong>{averages[matricule]?.averageMois1}</strong></td>
              <td rowSpan="2">Total: {averages[matricule]?.totalMoy2.toFixed(2) + '/' + averages[matricule]?.totalBaremeNote2}<br />Moy2: <strong>{averages[matricule]?.averageMois2}</strong></td>
              <td rowSpan="2">Total: {averages[matricule]?.totalMoy3.toFixed(2) + '/' + averages[matricule]?.totalBaremeNote3}<br />Moy3: <strong>{averages[matricule]?.averageMois3}</strong></td>
              <td style={{ fontSize: '12px' }}><strong>moy.G/G.avg: {averages[matricule]?.averageGmoy}</strong></td>
              <td>Premier/First: {classAverages.highestG}</td>
              <td rowSpan="4"></td>
              <td rowSpan="4"><img src={logo} style={{width:'80px', height:'60px', objectFit: 'cover'}} /></td>
              <td rowSpan="4"></td>
            </tr>
            <tr>
              <td><strong>{getAppreciation(averages[matricule]?.averageGmoy, groupedData[matricule].eleve.filiere)}</strong></td>
              <td>Dernier/Last: {classAverages.lowestG}</td>
            </tr>
            <tr>
              <td>{getAppreciation(averages[matricule]?.averageMois1, groupedData[matricule].eleve.filiere)}</td>
              <td>{getAppreciation(averages[matricule]?.averageMois2, groupedData[matricule].eleve.filiere)}</td>
              <td>{getAppreciation(averages[matricule]?.averageMois3, groupedData[matricule].eleve.filiere)}</td>
              <td><strong>Rang/Rank: {getOrdinal((averages[matricule]?.rank), groupedData[matricule].eleve.filiere)}</strong></td>
              <td>Moy.Gen/Gen.Avg: {classAverages.middleG}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Bullt;

