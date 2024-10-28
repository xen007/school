// importation des modules
import React, { useEffect, useState} from "react";

// fonction principale pour le bulletin du trimestre
export default function Bullt({data,num,nt}) {//donnée transmis en parametre
  // recupération du matricule et de l'index de position
const id= data.matricule
const po = num;

// déclaration et récupération des données de la table note
    const[noData, setnoData] = useState([])
    useEffect ( () => {
        const getnoData = async() =>{
          // recherche  dans la table avec les parametres envoyés
            const requestData = await fetch("http://localhost/ssm/api/trim.php/?" + new URLSearchParams({
              id: id,
              nt: nt,
          }).toString())
          // recupération du résultat
            const responseData = await requestData.json()
            setnoData(responseData)
            // setFormvalue(responseData)
            // console.log(responseData)
        }
        getnoData()
    },[id,nt])
        // déclaration des constantes utilisés  pour les calculs
    let tcoef = 0
    let tmoy = 0
    let moy = 0
    
    
    noData.forEach(no =>{
        tcoef += Number(no.coef)
        tmoy += ((no.note1) == null)? Number(no.note2)* no.coef: (no.note2) == null? Number(no.note1)* no.coef :(Number(no.note1) + Number(no.note2)) /2 * no.coef
        moy = (tmoy/tcoef).toFixed(3)
        
    })
  return (
    <>
     <div className="containers">
     
        <div >
            <div id="head">
              {/* entete du bulletin */}
              <div id="Fr">
                <p >REPUBLIQUE DU CAMEROUN</p>
                <p id="f1">Paix Travail Patrie</p>
                <p>MINISTERE DES ENSEIGNENTS SESCONDAIRES</p>
                <p id="f1">ARCHIDIOCESSE DE BERTOUA</p>
                <p id="f1">SECRETARIAT A L'EDUCATION</p>
              </div>
              <div id="Fr">
                <p>REPUBLIC OF CAMEROON</p>
                <p id="f1">Peace Work Fatherland</p>
                <p>MINISTORY OF SECONDARY EDUCATION</p>
                <p id="f1">ARCHIDIOCESE OF BERTOUA</p>
                <p id="f1">EDUCATION SECRETARY</p>
              </div>
            </div>
            <div >
              <p id="ti">{nt}e Trimestre </p>
              <p id="tii"> Année-scolaire: 2023-2024</p>
            </div>
            <div id="t1">
              <div id="t11">
                <p><strong>Nom et Prénoms:</strong> {data.nom} {data.prénom} </p>
                <p><strong>Né(e) le :</strong> {data.dateNaiss} à {data.lieuNaiss} </p>
                <p><strong>Effectif :</strong> {data.effectif} </p>
              </div>
              <div id="t11">
                <p><strong>Matricule:</strong> {id} </p>
                <p><strong>Sex:</strong> {data.genre} </p>
                <p><strong>Classe:</strong> {data.libcl} </p>
              </div>
            </div>
            
            <div>
            <table className="table table-bordered table-striped">
                     {/* informations du bulletin */}
                    <thead>
                    <tr>
                        <th>Matiere/Enseignant</th>
                        <th>Note 1</th>
                        <th>Note 2</th>
                        <th>Moy/20</th>
                        <th>Coef</th>
                        <th>Moy x</th>
                        <th>Observation</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        noData.map((no,index)=>(
                          
                    <tr key={index}>
                        <td>{no.nomMat}/{no.nomEn} </td>
                        <td>{((no.note1) == null)? '/':no.note1}</td>
                        <td>{((no.note2) == null)? '/':no.note2}</td>
                        <td>{((no.note1) == null)? Number(no.note2): (no.note2) == null? Number(no.note1): (Number(no.note1) + Number(no.note2)) /2} </td>
                        <td>{no.coef} </td>
                        <td>{((no.note1) == null)? Number(no.note2)* no.coef: (no.note2) == null? Number(no.note1)* no.coef :(Number(no.note1) + Number(no.note2)) /2 * no.coef} </td>
                        <td>{no.app}</td>
                    </tr>
                     ))
                    }
                    <tr>
                        <th>TOTAL</th>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>{tcoef}</td>
                        <td>{tmoy}</td>
                        <td></td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div id="to">
              <p><strong>Moyenne:</strong>{moy} </p>
              <p><strong>Rang:</strong>{po} </p>
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
                  <p id="d11">Absences(En heures)</p>
                  <p id="d12"></p>
                  <p id="d12"></p>
                </div>
                <div id="d1">
                  <p id="d111">Retenus</p>
                  <p id="d12"></p>
                </div>
                <div id="d2">
                  <p id="p">RECAPITULATIF ANNUEL</p>
                  <div id="d21">
                    
                    <div>
                      <p id="trim">Moyenne trim</p>
                      <p>{moy}</p>
                    </div>
                  </div>
                
                </div>
              </div>

              <div id="travail">
                <p id="p">TRAVAIL</p>
                <p>APPRECIATIONS</p>
                <p>Acquis</p>
              </div>

              <div id="C3">
                <p id="p">APPRECIATIONS GENERALES</p>
                <div id="c33"><input type="checkbox"></input>Promue(e) en classe de: </div>
                <div id="c33"><input type="checkbox"></input>Examen de rattrapage en: </div>
                <div id="c33"><input type="checkbox"></input>Admis(e) à reprendre la classe de: </div>
                <div id="c33"><input type="checkbox"></input>Exclu(e) pour: </div>
                <h6>OBSERVATIONS ET SIGNATURE DU CHEF D'ETABLISSEMENT</h6>
                <p id="p">Le Principal/ The Principal</p>
              </div>

            </div>
            </div>
            
     </div>
    

    </>
  );
}
