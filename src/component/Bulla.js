import React from 'react';
import logo from './sign.png';

const Bulla = ({ groupedData, matricule, getAppreciation, averages, classAverages, getOrdinal }) => {
  const tdStyle = {
    height: '10px',
    verticalAlign: 'middle',
    fontSize: '10px',
  };

  return (
    <>
      <table style={tdStyle} className='maintab table table-striped table-bordered table-sm'>
        <thead style={tdStyle}>
          <tr>
            <th>Matière/Subject</th>
            <th>Term 1</th>
            <th>Term 2</th>
            <th>Term 3</th>
            <th>Moy/20</th>
            <th>Coef</th>
            <th>Avg/Moy x</th>
            <th>Rank</th>
            <th>Observation</th>
            <th>Teacher/Enseig</th>
            <th>Signature</th>
          </tr>
        </thead>
        <tbody>
          {groupedData[matricule]?.notes &&
            Object.keys(groupedData[matricule].notes).map((matiere, idx) => {
              const matiereData = groupedData[matricule].notes[matiere];

              return (
                <React.Fragment key={idx}>
                  {matiereData.map((item) => (
                    <tr key={item.id}>
                      <td style={{ fontSize: '9px' }}>{item.matiere}</td>
                      <td style={{ fontSize: '9px' }}>{item.moy1 !== null ? item.moy1 : '/'}</td>
                      <td style={{ fontSize: '9px' }}>{item.moy2 !== null ? item.moy2 : '/'}</td>
                      <td style={{ fontSize: '9px' }}>{item.moy3 !== null ? item.moy3 : '/'}</td>
                      <td style={{ fontSize: '9px' }}>{item.Gmoy}</td>
                      <td style={{ fontSize: '9px' }}>{item.coef}</td>
                      <td style={{ fontSize: '9px' }}>{item.Gmoy !== null ? item.Gmoy * item.coef : '/'}</td>
                      <td style={{ fontSize: '9px' }}>{getOrdinal(item.ranksubject, groupedData[matricule]?.eleve?.filiere)}</td>
                      <td style={{ fontSize: '9px' }}>{getAppreciation(item.Gmoy, groupedData[matricule]?.eleve?.filiere)}</td>
                      <td style={{ fontSize: '9px' }}>{item.nomEn}</td>
                      <td style={{ fontSize: '9px' }}></td>
                    </tr>
                  ))}
                </React.Fragment>
              );
            })}
          <tr>
            <th>TOTAL</th>
            <td>{averages[matricule]?.averageMoy1 ? averages[matricule].averageMoy1 : '/'}</td>
            <td>{averages[matricule]?.averageMoy2 ? averages[matricule].averageMoy2 : '/'}</td>
            <td>{averages[matricule]?.averageMoy3 ? averages[matricule].averageMoy3 : '/'}</td>
            <td></td>
            <td>{averages[matricule]?.totalMoyCoef || '/'}</td>
            <td>{averages[matricule]?.totalGmoy || '/'}</td>
            <td></td>
          </tr>
          <tr>
            <th>TOTAL</th>
            <td>{averages[matricule]?.totalNote1 ? `${averages[matricule].totalNote1} / ${averages[matricule].totalCoef1}` : '/'}</td>
            <td>{averages[matricule]?.totalNote2 ? `${averages[matricule].totalNote2} / ${averages[matricule].totalCoef2}` : '/'}</td>
            <td>{averages[matricule]?.totalmoy ? `${averages[matricule].totalmoy} / ${averages[matricule].totalMoyCoef}` : '/'}</td>
            <td>{averages[matricule]?.totalMoyCoef || '/'}</td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>

      <div id="to">
        <p><strong>Moyenne:</strong> {averages[matricule]?.averageGmoy || '/'}</p>
        <p><strong>Rang:</strong> {getOrdinal(averages[matricule]?.rank, groupedData[matricule]?.eleve?.filiere) || '/'}</p>
        <p><strong>Highest:</strong> {classAverages.highestG || '/'}</p>
        <p><strong>Middle:</strong> {classAverages.middleG || '/'}</p>
        <p><strong>Lowest:</strong> {classAverages.lowestG || '/'}</p>
      </div>

      <div id="bott">
        <div id="discipline">
          <p id="p">DISCIPLINE</p>
          <div id="d1">
            <p id="d11">Retards</p>
            <p id="d12"></p>
            <p id="d12"></p>
          </div>
          <div id="d1">
            <p id="d11">Absences (En heures)</p>
            <p id="d12"></p>
            <p id="d12"></p>
          </div>
          <div id="d1">
            <p id="d11">Retenus</p>
            <p id="d12"></p>
          </div>
          <div id="d2">
            <p id="p">RECAPITULATIF</p>
            <div id="d21">
              <div>
                <p id="trim">Trim 1 </p>
                <p>{averages[matricule]?.averageMoy1 || '/'}</p>
                <p>{getAppreciation(averages[matricule]?.averageMoy1, groupedData[matricule]?.eleve?.filiere) || '/'}</p>
              </div>
              <div>
                <p id="trim">Trim 2 </p>
                <p>{averages[matricule]?.averageMoy2 || '/'}</p>
                <p>{getAppreciation(averages[matricule]?.averageMoy2, groupedData[matricule]?.eleve?.filiere) || '/'}</p>
              </div>
              <div>
                <p id="trim">Trim 3</p>
                <p>{averages[matricule]?.averageMoy3 || '/'}</p>
                <p>{getAppreciation(averages[matricule]?.averageMoy3, groupedData[matricule]?.eleve?.filiere) || '/'}</p>
              </div>
            </div>
          </div>
        </div>

        <div id="travail">
          <p id="p">TRAVAIL</p>
          <p>APPRECIATIONS</p>
          <p>{getAppreciation(averages[matricule]?.averageGmoy, groupedData[matricule]?.eleve?.filiere)}</p>
        </div>

        <div id="C3">
          <p id="p">APPRECIATIONS GENERALES</p>
          <div id="c33"><input type="checkbox" />Promue(e) en classe de: </div>
          <div id="c33"><input type="checkbox" />Examen de rattrapage en: </div>
          <div id="c33"><input type="checkbox" />Admis(e) à reprendre la classe de: </div>
          <div id="c33"><input type="checkbox" />Exclu(e) pour: </div>
          <h6>OBSERVATIONS ET SIGNATURE DU CHEF D'ETABLISSEMENT</h6>
          <p id="p">Le Principal/ The Principal</p>
        </div>
      </div>
    </>
  );
};

export default Bulla;
