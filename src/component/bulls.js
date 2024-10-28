// importation des modules
import React, { useEffect, useState} from "react";
import logo from './logo-tgsch.png'
// fonction principale pour le bulletin de séquence
export default function Bullt({data,num,ns}) {//donnée transmis en parametre
// recupération du matricule et de l'index de position
const id= data.matricule
const po = num;

// déclaration et récupération des données de la table note
    const[noData, setnoData] = useState([])
    useEffect ( () => {
        const getnoData = async() =>{
          // recherche  dans la table avec les parametres envoyés
            const requestData = await fetch("http://localhost/ssm/api/seq.php/?" + new URLSearchParams({
              id: id,
              ns: ns,
          }).toString())
          // recupération du résultat
            const responseData = await requestData.json()
            setnoData(responseData)
            // setFormvalue(responseData)
            // console.log(responseData)
        }
        getnoData()
    },[id,ns])
    // déclaration des constantes utilisés  pour les calculs
    let tcoef = 0 //total du coef
    let tmoy = 0  //total de la moy
    let moy = 0 //moy générale
    
 
if (noData.resultat === 'Verifiez les informations SVP' ) {
 
} else {
  noData.forEach(no =>{
    tcoef += ((no.note1) == null)? 0:Number(no.coef)
    tmoy += ((no.note1) == null)? 0: Number(no.note1) * no.coef
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
                <p id="f1">SMACCOS BERTOUA</p>
                <p id="f1">P.O. BOX 350 BERTOUA</p>
                <p id="f1">Devise: Qualité - Morale - Travail</p>
              </div>
              <div id="Fr">
                <img src={logo} style={{width:"120px"}} alt="Logo" />
              </div>
              <div id="Fr">
                <p>REPUBLIC OF CAMEROON</p>
                <p id="f1">Peace Work Fatherland</p>
                <p>MINISTORY OF SECONDARY EDUCATION</p>
                <p id="f1">SMACCOS BERTOUAY</p>
                <p id="f1">P.O. BOX 350 BERTOUA</p>
                <p id="f1">Motto: Quality - Morality - Hard work</p>
              </div>
            </div>
            <div >
              <p id="tit" >SAINT MARTIN'S COMPREHENSIVE COLLEGE OF STANDARDS</p>
              <p id="ti">{ns}e Séquence </p>
              <p id="tii"> Année-scolaire: {data.scolaire}</p>
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
                        <td>{((no.note1) == null)? '/':no.coef} </td>
                        <td>{((no.note1) == null)? '/': Number(no.note1) * no.coef} </td>
                        <td>{((no.note1) == null)? '/':no.app}</td>
                    </tr>
                     ))
                    }
                    <tr>
                        <th>TOTAL</th>
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
                  <p id="p">RECAPITULATIF</p>
                  <div id="d21">
                   
                    <div>
                      <p id="trim">Moy Seq.</p>
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
}