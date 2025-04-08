import React from 'react';
import logo from './sign.png';

const Bulls = ({ groupedData, matricule, calculateSum, getAppreciation, averages, classAverages, getOrdinal }) => {
  const tdStyle = {
    height: '10px',
    verticalAlign: 'middle',
    fontSize: "10px",
  };

  return (
    <>
      <table style={tdStyle} className='maintab table table-striped table-bordered table-sm'>
        <thead style={tdStyle}>
          <tr>
            <th>&nbsp;&nbsp;&nbsp;&nbsp;Matière/Subject&nbsp;&nbsp;&nbsp;</th>
            <th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Description&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
            <th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Evaluation&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
            <th>Bar</th>
            <th>M1</th>
            <th>M2</th>
            <th>M3</th>
            <th>Moy</th>
            <th>Synth<br />Competences</th>
            <th>Appreciation</th>
          </tr>
        </thead>
        <tbody>
          {groupedData[matricule]?.notes && Object.keys(groupedData[matricule].notes).map((matiere, idx) => {
            const matiereData = groupedData[matricule].notes[matiere];
            const totalBareme = calculateSum(matiereData, 'bareme');
            const totalMoy = calculateSum(matiereData, 'moy');
            const synth = ((totalMoy / totalBareme) * 20).toFixed(2);
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
                    <td style={{ fontSize: '9px' }}>{item.note1 || '/'}</td>
                    <td style={{ fontSize: '9px' }}>{item.note2 || '/'}</td>
                    <td style={{ fontSize: '9px' }}>{item.note3 || '/'}</td>
                    <td style={{ fontSize: '9px' }}>{item.moy}</td>
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
              <td rowSpan="2">Total: {averages[matricule]?.totalNote1 + '/' + averages[matricule]?.totalBaremeNote1}<br />Moy/Avg: <strong>{averages[matricule]?.averageNote1}</strong></td>
              <td rowSpan="2">Total: {averages[matricule]?.totalNote2 + '/' + averages[matricule]?.totalBaremeNote2}<br />Moy/Avg: <strong>{averages[matricule]?.averageNote2}</strong></td>
              <td rowSpan="2">Total: {averages[matricule]?.totalNote3 + '/' + averages[matricule]?.totalBaremeNote3}<br />Moy/Avg: <strong>{averages[matricule]?.averageNote3}</strong></td>
              <td style={{ fontSize: '12px' }}><strong>Moy/Avg: {averages[matricule]?.averageMoy}</strong></td>
              <td>Premier/First: {classAverages.highest}</td>
              <td rowSpan="4"></td>
              <td rowSpan="4"><img src={logo} style={{ width: '80px', height: '60px', objectFit: 'cover' }} /></td>
              <td rowSpan="4"></td>
            </tr>
            <tr>
              <td><strong>{getAppreciation(averages[matricule]?.averageMoy, groupedData[matricule].eleve.filiere)}</strong></td>
              <td>Dernier/Last: {classAverages.lowest}</td>
            </tr>
            <tr>
              <td>{getAppreciation(averages[matricule]?.averageNote1, groupedData[matricule].eleve.filiere)}</td>
              <td>{getAppreciation(averages[matricule]?.averageNote2, groupedData[matricule].eleve.filiere)}</td>
              <td>{getAppreciation(averages[matricule]?.averageNote3, groupedData[matricule].eleve.filiere)}</td>
              <td><strong>Rang/Rank: {getOrdinal(averages[matricule]?.rank, groupedData[matricule].eleve.filiere)}</strong></td>
              <td>Moy.Gen/Gen.Avg: {classAverages.middle}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Bulls;
