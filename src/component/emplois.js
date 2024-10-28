// importation des modules
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {FaTrash} from '@react-icons/all-files/fa/FaTrash'
import {FaPen} from '@react-icons/all-files/fa/FaPen';

import ModSchedule from '../undercompo/ModSchedule';
import {Link} from 'react-router-dom';
import Popup2 from '../popup/Popup2';
import { Plus } from 'react-bootstrap-icons';

//fonction principale
export default function Schedule() {
  // déclaration des constantes
  const [text, setText] = useState("Selectionnez d'abord le niveau");
  const[BDdata, setBDData] = useState([]);
  const[openPopup, setOpenPopup] = useState(false);
  //const [select, setSelected] =useState('');

  /*useEffect(()=>{
    getSalle();
  }, []) */ 
  const[disabled, setDisabled] = useState(true);
  const [clData,setClData]= useState([])
  const [clDa,setClDa]= useState([])

  
  /*const getSalle = async()=>{
    var headers = {"Accept":"application/json",
              "Content-Type": "application/json"};
     await axios("http://localhost/files/ajoutScheduleSalle.php", headers)
    .then(response=>{
      setNiveauData(response.data);})
      
      }*/
  
//fonction pour ouvrir le pop up
function togglePopup(){
  setOpenPopup(false)
}
// récupération du resultat du fatch dans la table classe
useEffect(()=>{
  getClasse();
    }, []);

    const getClasse = async()=>{
      console.log('bonjour')
      var headers = {"Accept":"application/json",
              "Content-Type": "application/json"};
      await axios("http://localhost/ssm/api/ajoutScheduleClass.php", headers)
      .then(response=>{
        setClData(response.data);}
        )};


  /*function handlevalue(e){
    //e.preventDefault();
    var headers = {"Accept":"application/json",
        "Content-Type": "application/json"};
axios.get(`http://localhost/files/viewSchedule.php`, headers)
.then(response=>{
    console.log(response.data);
    setClasse(response.data);}
    )}*/
//  fonction pour lier les select entre niveau et classe du niveau 
function handlesel (e){
  setBDData([]); 
setClDa([]);
const niveauID= e.target.value
console.log(niveauID)
    var headers = {"Accept":"application/json",
        "Content-Type": "application/json"};
        if(niveauID !== ''){
          setDisabled(false);
axios.get(`http://localhost/ssm/api/viewClasse.php/${niveauID}`, headers)
.then(response=>{
    console.log(response.data);
    setClDa(response.data);
    
    //setOpenPopup(false)
})}else{
  setDisabled(true);
  setText('Sélectionner d\'abord une Classe')
}
}
//fonction pour trier les classe avant d'afficher dans l'emploi de temps
function handleData (e){
  const classId = e.target.value;
  var headers = {"Accept":"application/json",
  "Content-Type": "application/json"};
  if(disabled !== true){
  axios.get(`http://localhost/ssm/api/viewSchedule.php/${classId}`, headers)
  .then(response=>{
    console.log()
    setBDData(response.data)
    
  })}
  else{
    setBDData([]);
   }
}
// supprimer une heure de cours
const handleDelete = (id_cours)=>{

        
  const conf = window.confirm('Voulez-vous vraiment supprimé ce programme ?');
  if (conf) {
      axios.delete(`http://localhost/ssm/api/deleteCours.php/${id_cours}`).then(function(response){
          console.log(response.data);
      })
      getClasse();
      handlesel();
      handleData();
      //window.location.reload();
     
  }
}
  
  return (
    <main className='main-container'>
        
    <div className="enseignant row"><h3>Bienvenu sur la gestion des Emplois de Temps</h3>
    <div className="col-sm-12">
  
    <div className="row mb-3">
        <div className="form-group col-md-4">
        <label className="mb-2">Niveau</label>
        <select onChange={(e)=>handlesel(e)}  className="form-select choice" name='classer'>
                      <option selected className='m-2' value="">Selectionnez le Niveau</option>
                      {clData.map((clas, key) => 
                        <option className='m-2' key={key} value={clas.id_niveau}>{clas.libellee_niveau}</option>
                      )}
                    </select>
      </div>
      <div className="form-group col-md-4">
      <label className="mb-2">Classe</label>
      <select onChange={(e)=>handleData(e)} className="form-select choice" name='sal' disabled={disabled}>
                      <option selected className='m-2' value=''>{text}</option>
                      {clDa.map((salle, key) => 
                        <option className='m-2' key={key} value={salle.id_classe}>{salle.libellee_classe}</option>
                      )}
                    </select>
      </div>
    
   </div>
      
</div>
      
        <div className="col-md-9 contain ">
       
        
            <div className="mt-1 px-3">
                <h3><strong>Ajouter un programme</strong> <Link to='/AddShe' className="btn btn-success"><Plus />Ajouter</Link></h3>
                
                </div>
                    <table className="table tab my-1 table-striped table-bordered  w-100">
                        <thead className='fixed'>
                        
                        <tr>
                          <th>Jour</th>
                          <th>Horaire</th>
                          <th>Matiere</th>
                          <th>Enseignant</th>
                          <th>Classe</th>
                          <th>Action</th>
                        </tr>
                        
                    </thead>
                    <tbody> {BDdata.map((data, key)=>
                        <tr className='text-dark' key={key}>
                            <td>{data.libellee_jour}</td>
                            <td>{data.debut_cours}<br/>{data.fin_cours}</td>
                            <td>{data.nom_matiere}</td>
                            <td>{data.nomE}<br/>{data.prenomE}</td>
                            <td>{data.libellee_classe}</td>
                            <td>
                          
                                <button onClick={()=>{handleDelete(data.id_cours)}} className='btn btn-danger m-1 w-10 h-10 p-1'><FaTrash /></button>
                                <Link to={`/emplois/${data.id_cours}`} onClick={() =>setOpenPopup(true)} className='btn btn-primary m-1 w-10 h-10 p-1'><FaPen/></Link>
                            </td>
                        </tr>
                      )}  
                    </tbody>
                </table>
            </div>
            <Popup2 openPopup = {openPopup}
                setOpenPopup = {setOpenPopup}
                title ='Schedule'
                togglePopup = {togglePopup}
                >
            <ModSchedule  />
        </Popup2>        
          </div>
</main> 
    
  )
}
