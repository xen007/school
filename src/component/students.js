//importation des differents modules
import axios from 'axios'
import React, {useEffect, useRef, useState } from 'react'
import { Eye, PencilSquare, Plus, PrinterFill, Trash } from 'react-bootstrap-icons'
import {Link, useNavigate} from 'react-router-dom'
import InsAdd from '../undercompo/insAdd'
import { FaCheck } from 'react-icons/fa'
import ReactToPrint from "react-to-print";
import config from './config';
import IDCards from './IDCards'
export default function StudentList(){ //declaration de la fonction principale
    // declaration de la  constante pour naviguuer entre les pages
    const navigate = useNavigate()
    // declaration de la constant pour stcocker les donnees relatifs aux eleves
    const[studentData, setStudentData] = useState([])
    const[ins, setInsData] = useState([])
    const[record,setRecord] = useState([])
    const[ecData,setecData]=useState([])
    const [displayActive, setDisplayActive] = useState(true); // State to track which students to display
    useEffect( ()=> {
        getStudentData()
    },[])
    const getStudentData = async() =>{
        const requestData = await fetch(`${config.apiBaseUrl}/l.php`)
        const responseData = await requestData.json()
        if(responseData.resultat !== 'Verifiez les informations SVP'){
            const result = responseData.sort((a,b) => a.nom.localeCompare(b.nom))
            setRecord(result.filter(s => s.stat !== '0')); // Filter to show only active students) 
            setStudentData(result)
            } 
    const getecole= async()=>{
        const reqdata = await fetch(`${config.apiBaseUrl}/schoolUp.php/`+ 1)
        const resdata = await reqdata.json()
        setecData(resdata)
        }
    getecole()
        
    }

    useEffect( ()=>{
        getInsData()
    },[])
    const getInsData =async()=>{
        const req= await fetch(`${config.apiBaseUrl}/ins.php`)
        const res = await req.json()
        setInsData(res)
    }
        // fonction de suppression
  
  
    // }
    //declaration des autrea contantes
    const[classe,setClData]=useState([])
    const[classData,setClassData] = useState([])
    const[niveauData,setNiveauData] = useState([])
    const[enable,setEnable] = useState(true)
    const[text,setText] = useState('Selectionnez d\'abord le niveau')
    // fonction de recuperation des niveaux
      useEffect( () => {
        const getNiveau = async()=>{
            const reqdata = await fetch(`${config.apiBaseUrl}/niveau.php`)
            const resdata = await reqdata.json()
            // console.log(resdata)
            setNiveauData(resdata)
          }
        getNiveau()
        // fonction de recuperation des classes
        const getclasse= async()=>{
            const reqdata = await fetch(`${config.apiBaseUrl}/classe.php`)
            const resdata = await reqdata.json()
            setClData(resdata)
        }
        getclasse()
      },[])
    //   fonction de tri des classe a partir du niveau
      const handleNiveau = async (e)=>{
          const niveauId = e.target.value
          if (niveauId !== "") {
              setClassData(classe.filter(s => s.niveau === (e.target.value)))
              setEnable(false)
              setText('Selectionnez la classe')
              
          }else{
              setText('Selectionnez d\'abord le niveau')
              setClassData([])
              setEnable(true)
          }
          // console.log(niveauId)
      }
      let componentPdf = useRef()
  
    // constante pour stockr les donnees tries eet fonctions de tris
    if (studentData.resultat === 'Verifiez les informations SVP') {
        return(
            <main className="main-container">
            <h3>Bienvenu sur la gestion des Elèves </h3>
            <div className="col-sm-12">       
          
                      
              </div>
                                         
                    <div className='container'>
                        <div className='row'>
                            <p className='text-danger text-center'></p>
                            <h3><strong>Ajouter un élève</strong> <Link to='/studInsert' className="btn btn-success"><span className="bi bi-plus"></span>Ajouter</Link></h3>
                    
                            <p id='vide'>AUCUN ELEVE DISPONIBLE POUR L'INSTANT</p>
                        
                        </div>
        
                    </div>
            </main>
        )
    } else {

    const handleTri = (e) =>{
        setRecord(studentData.filter(s => s.classe === (e.target.value)))
    }
    const Tri = (e) =>{
        setRecord(studentData.filter(s => s.nom.toLowerCase().includes(e.target.value) || s.nom.toUpperCase().includes(e.target.value)))
    }
    const handleDisplayActive = () => { setDisplayActive(true); setRecord(studentData.filter(s => s.stat !== '0')); }; 
    const handleDisplayInactif = () => { setDisplayActive(false); setRecord(studentData.filter(s => s.stat === '0')); };
    // fonction pour avtiver et deactiver l'eleve
    const HandleStat = async (stat, matricule) => {
        if (stat === '1') { // Statut 1 pour actif
          var msg = prompt('Motif obligatoire');
          if (msg === null || msg.trim() === "") { // Si le motif est vide ou si l'utilisateur a annulé, annuler l'opération
            alert('Annulé');
            return; // Sortir de la fonction si annulé
          } else { // Sinon, le statut passe à 0 et on affiche 'effectué'
            stat = 0;
            alert('Effectué');
          }
        } else { // Si l'élève était inactif, il devient actif (statut 1)
          stat = 1;
          msg = "";
        }
      
        // Récupérer les informations pour mettre à jour la table
        const formData = {
          iduser: matricule,
          stat: stat,
          msg: msg
        };
        
        try {
          const res = await axios.put(`${config.apiBaseUrl}/niv.php`, formData);
          if (res.data.success) {
            setTimeout(() => {
              navigate('/students');
            }, 2000);
            getStudentData(); // Mettre à jour la liste des étudiants après le changement de statut
          }
        } catch (error) {
          console.error('Error updating status:', error);
        }
      };
      

    return(
        <main className='main-container'>
            <h3>Bienvenu sur la gestion des Elèves</h3>
            
          
<div className="row mb-3">
  <div className="form-group col-md-4">
    <label className="mb-2">Niveau</label>
    <select name="niveau" className="form-control" onChange={(e) => handleNiveau(e)}>
      <option value="">Selectionnez le Niveau</option>
      {niveauData.map((nData, index) => (
        <option key={index} value={nData.id}>{nData.libellee_niveau}</option>
      ))}
    </select>
  </div>
  <div className="form-group col-md-4">
    <label className="mb-2">Classe</label>
    <select name="classe" disabled={enable} onChange={handleTri} className="form-control">
      <option value="">{text}</option>
      {classData.map((nData, index) => (
        <option key={index}>{nData.libellé_classe}</option>
      ))}
    </select>
  </div>
  <div className="form-group col-md-4">
    <label className="mb-2">Rechercher</label>
    <input type="search" placeholder="Tapez le nom" aria-label="Search" onChange={Tri} className="form-control" />
  </div>
</div>
<div className='row '>
  <div className="btn-group col-md-4 col-sm-6" role="group" aria-label="Basic outlined example">
    <button type="button" className="btn btn-outline-primary" onClick={handleDisplayActive}>Afficher Actifs</button>
    <button type="button" className="btn btn-outline-primary" onClick={handleDisplayInactif}>Afficher Inactifs</button>
  </div>
  <div className="btn-group col-md-2 col-sm-3" role="group">
    <ReactToPrint
      trigger={() => <button className="btn btn-success"> <PrinterFill /> Imprimer</button>}
      content={() => componentPdf}
    />
  </div>
</div>

                                         
            <div className='container'>
                <div className='row'>
                    <h3><strong>Ajouter un élève</strong> <Link to='/studInsert' className="btn btn-success"><Plus/>Ajouter</Link></h3>
                    {record.length > 0 ? (
                    <table className='table table-striped table-bordered w-autotable-sm'>
                        <thead>
                            <tr>
                                <th>Sr No</th>
                                <th>Photo</th>
                                <th>Matricule</th>
                                <th>Nom</th>
                                <th>Prénom</th>
                                <th>Genre</th>
                                <th>date_Naiss</th>
                                <th>classe</th>
                                <th>Statut</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                           
                            {//aficher les donnees recuperes et filtres
                                record.map((stuData,index) =>(
                                <tr key={index}>
                                <td>{index+1}</td>
                                <td className='ima'><img src={`${config.apiBaseUrl}/image/${stuData.photo}`}    alt={stuData.photo} /></td>
                                <td>{stuData.matricule}</td>
                                <td>{stuData.nom}</td>
                                <td>{stuData.prenom}</td>
                                <td>{stuData.genre}</td>
                                <td>{stuData.dateNaiss}</td>
                                <td>{stuData.classe}</td>
                                <td>{stuData.stat === '0'? "Inactif" : "Actif"}</td>
                                <td className=''>
                                {
                                            stuData.stat !== '0'? 
                                    <div className="btn-group " role="toolbar" aria-label="Toolbar with button groups">
                                       
                                            <div role="group" aria-label="First group">
                                            <Link to={"/studView/"+stuData.matricule}   className="btn btn-light mx-2"><Eye /></Link>
                                        </div>
                                        <div role="group" aria-label="Second group">
                                            <Link to={"/studEdit/"+stuData.matricule} className="btn btn-success mx-2"><PencilSquare /></Link>
                                        </div>
                                        <div  role="group" aria-label="Third group">
                                            <button onClick={()=> HandleStat(stuData.stat,stuData.matricule)} className="btn  btn-danger mx-2"><Trash/></button>       
                                        </div>
                                        {/* <div role="group" aria-label="second group">
                                            <IDCards data={stuData} res={ecData} />
                                        </div> */}
                                        {/* <div  role="group" aria-label="Third group">
                                            <button onClick={()=> handleDelete(stuData.matricule)} className="btn  btn-danger mx-2"><Trash/></button>       
                                        </div> */}
                                        <div role="group" aria-label="Second group">
                                            {
                                                ins.resultat === 'Verifiez les informations SVP'? <InsAdd data={stuData} />:
                                            ins.find((el)=> el.matricule === stuData.matricule)? <div style={{color: 'green',fontSize:'15px'}}><FaCheck /></div>: <InsAdd data={stuData} />
                                            }
                                        </div> 
                                    </div>
                                    : <div  role="group" aria-label="Third group">
                                    <button onClick={()=> HandleStat(stuData.stat,stuData.matricule)} className="btn  btn-danger mx-2"><Trash/></button>       
                                </div>
                                }
                                </td>
                                </tr>
                                ))
                            }
                        </tbody>


                    </table>
                    ):(
                    <p>Aucune donnée disponible</p>
                    )}
                </div>
                <div style={{ display: "none" }}>
                <div ref={(el) => (componentPdf = el)} style={{width:'100%',padding:'20px 40px',fontSize:'10px'}} >
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
                <div id='middle'>
                    <p id='tiEcol'>{ecData.nom} </p>
                </div>
                <h5>Liste des élèves</h5>
                <table className='table table-striped table-bordered '>
                        <thead>
                            <tr>
                                <th>Sr No</th>
                                <th>Matricule</th>
                                <th>Nom</th>
                                <th>Prénom</th>
                                <th>Genre</th>
                                <th>date_Naiss</th>
                                <th>classe</th>
                            </tr>
                        </thead>

                        <tbody>
                           
                            {//aficher les donnees recuperes et filtres
                                record.map((stuData,index) =>(
                                <tr key={index}>
                                <td>{index+1}</td>
                                <td>{stuData.matricule}</td>
                                <td>{stuData.nom}</td>
                                <td>{stuData.prenom}</td>
                                <td>{stuData.genre}</td>
                                <td>{stuData.dateNaiss}</td>
                                <td>{stuData.classe}</td>
                               
                                </tr>
                                ))
                            }
                        </tbody>


                    </table>
                </div>
                </div>

            </div>
              
            {/* <div className="modal fade" id="userForm">
                {<StudView />}
            </div> */}
        </main>
    )
}
}