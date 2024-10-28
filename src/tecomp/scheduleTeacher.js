import React, { useEffect, useState } from 'react';
import {FiPlusSquare} from '@react-icons/all-files/fi/FiPlusSquare';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom'
import SidebarTeacher from '../dashboard/SidebarTeacher';

export default function ScheduleTeacher() {
  const [classe, setClasse] = useState('');
  const [salle, setSalle] = useState('');
  const [text, setText] = useState('Selectionner d\'abord le niveau de la classe');
  const[BDdata, setBDData] = useState([]);

  const[disabled, setDisabled] = useState(true);
  const[openPopup, setOpenPopup] = useState(false);
  const navigate= useNavigate()
  //const [select, setSelected] =useState('');

  /*useEffect(()=>{
    getSalle();
  }, []) */ 

  const {matricule} = useParams();

  const [clData,setClData]= useState([])
  const [clDa,setClDa]= useState([])
  const [salleData,setNiveauData]= useState([])

  

useEffect(()=>{
  getClasse();
    }, []);

    const getClasse = async()=>{
      var headers = {"Accept":"application/json",
              "Content-Type": "application/json"};
      await axios(`http://localhost/toungou-sch/api/enseignantNiveau.php/${matricule}`, headers)
      .then(response=>{
        setClData(response.data);
        console.log(response.data)
        console.log(matricule)
      }
        )};

function handlesel (e){
const classeID= e.target.value
setBDData([]);
setClDa([]);
console.log(classeID)
    var headers = {"Accept":"application/json",
        "Content-Type": "application/json"};
        if(classeID !== ''){
          setDisabled(false);
          setText('Sélectionner la Classe');
axios.get(`http://localhost/toungou-sch/api/enseignantClasse.php/${matricule}/${classeID}`, headers)
.then(response=>{ 
    console.log(response.data);
    setClDa(response.data);
 
    
})}else{
  setDisabled(true);
  setText('Sélectionner d\'abord une Classe')
}

}
function handleData (e){
  var headers = {"Accept":"application/json",
  "Content-Type": "application/json"};
  const classId = e.target.value;
  console.log(classId);
  console.log(matricule);
  if(disabled !== true){
    axios.get(`http://localhost/toungou-sch/api/viewTeacherSchedule.php/${matricule}/${classId}`, headers)
    .then(response=>{
      console.log()

      setBDData(response.data)
      
    })
  }else{
setBDData([]);
  } 
}

  
  return (
    <>
    <SidebarTeacher/>
      <main className='main-container'>
        
        <div className="enseignant row"><h3>Bienvenu sur la gestion des Emplois de temps</h3>
        <div className="col-sm-12">
      
        <div className="row mb-3">
            <div className="form-group col-md-4">
            <label className="mb-2">Niveau</label>
            <select onChange={(e)=>handlesel(e)}  onClick ={()=>console.log(classe)}  className="form-select choice" name='classer'>
                          <option selected className='m-2' value="O">Sélectionner un Niveau</option>
                          {clData.map((clas, key) => 
                            <option className='m-2' key={key} value={clas.id_niveau}>{clas.libelle_niveau}</option>
                          )}
                        </select>
          </div>
          <div className="form-group col-md-4">
          <label className="mb-2">Classe</label>
          <select onChange={(e)=>handleData(e)} className="form-select choice" name='sal' disabled={disabled}>
                          <option selected className='m-2' value=''>{text}</option>
                          {clDa.map((salle, key) => 
                            <option className='m-2' key={key} value={salle.id_classe}>{salle.libelle_classe}</option>
                          )}
                        </select>
          </div>
        
       </div>
          
    </div>
        <div className='wholepage d-flex'>
         
             
          
              <div className="mt-1 px-3">
                    
                        <table className="table tab my-1 table-striped table-bordered  w-100">
                            <thead className='fixed'>
                            
                            <tr>
                                <th>Jour</th>
                                <th>Horaire</th>
                                <th>Matière</th>
                                <th>Salle</th>
                            </tr>
                            
                        </thead>
                        <tbody> {BDdata.map((data, key)=>
                            <tr className='text-dark' key={key}>
                                <td>{data.libelle_jour}</td>
                                <td>{data.debut_cours} - {data.fin_cours}</td>
                                <td>{data.nom_matiere}</td>
                                <td>{data.libelle_classe}</td>
                                
                            </tr>
                          )}  
                        </tbody>
                    </table>
                </div>       
              </div>
      </div>  
        </main>
    </>
  )
}
