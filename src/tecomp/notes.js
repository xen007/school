// importation des modules
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {FaPen} from '@react-icons/all-files/fa/FaPen';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Popup from '../popup/Popup';
import ModificationNote from '../undercompo/modificationNote';
import { Plus } from 'react-bootstrap-icons';
import SidebarTeacher from '../dashboard/SidebarTeacher';
// fonction principale
export default function NoteAdmin() {
    // déclaration des constantes
    const [classe, setClasse] = useState('');
    const [seq, setSeq] = useState('');
    const [matiere, setMatiere] = useState('');
    const [Msg, setMsg] = useState('');
    const [matStudent, setmatStudent] = useState('');
    const [disable, setDisable] = useState(true);
    const [disabled, setDisabled] = useState(true);
    const[openPopup, setOpenPopup] = useState(false);
  
    const [clSeq,setClSeq]= useState([])
    const [clData,setClData]= useState([])
    const [matiereData,setMatiereData]= useState([])
    const [noteEleve,setNoteEleve]= useState([])
    const [noteEleve2,setNoteEleve2]= useState([])
    const navigate = useNavigate(); 
    const {matricule} = useParams(); 
    
    useEffect(()=>{handlesal();}, []); 
  
  const handlesal = async()=>{
   setClData([]);   
  var headers = {"Accept":"application/json",
      "Content-Type": "application/json"};
     await axios.get(`http://localhost/ssm/api/handleClasseAdmin.php`, headers)
      .then(response=>{
          setClData(response.data);
          handleSeq();
          console.log(response.data)
          
      },[])
      
  }
//   fonction pour récupérer les séquences
  const handleSeq = async()=>{
    
    var headers = {"Accept":"application/json",
        "Content-Type": "application/json"};
       await axios.get(`http://localhost/ssm/api/Sequence.php`, headers)
        .then(response=>{
            setClSeq(response.data);
        },[])
        
    }
    
    const handleClasse = async(e)=>{
        setMatiereData([])
        setDisable(false)
        var headers = {"Accept":"application/json",
        "Content-Type": "application/json"};
        await setClasse(e.target.value)
        const trial = e.target.value;
        console.log(trial);
        //setmatStudent(trial) 
            if(trial !== ''){ 
                console.log(trial);
                axios.get(`http://localhost/ssm/api/ajoutScheduleSub.php/${trial}`, headers)
                .then(response=>{
                    console.log(response.data);
                    setMatiereData(response.data);
                      
                }) 
            }
            
        }
        const handleData = (e)=>{
            setNoteEleve([]);
            setMatiere(e.target.value)
            const subject = e.target.value;
            console.log(subject)
            var headers = {"Accept":"application/json",
            "Content-Type": "application/json"};
            console.log(`http://localhost/ssm/api/ViewNote.php/${subject}/${seq}`);
            axios.get(`http://localhost/ssm/api/ViewNote.php/${subject}/${seq}`, headers)
            .then(response=>{
                setNoteEleve(response.data);
                console.log(response.data);
            })
            
        }
  return (
<>
<SidebarTeacher/>
<main className='main-container'>
    <div className="enseignant row"><h3>Welcome to Notes management</h3>
    <div className="col-sm-12">
  
    <div className="row mb-3">
        <div className="form-group col-md-4">
        <label className="mb-2">Room</label>
        <select className="form-select choice" onChange={handleClasse} name='salle'>
                        <option selected className='m-2' value='0'>Select the Classroom</option>
                        {clData.map((valu, key)=>(
                        <option className='m-2' key={key} value={valu.id_classe}>{valu.libellee_classe}</option>
                        ))}
                    </select>
      </div>
      <div className="form-group col-md-4">
      <label className="mb-2">Sequence</label>
      <select onChange={(e)=>{setSeq(e.target.value); setDisabled(false)}} className="form-select choice" name='sequence'disabled={disable}>
                        <option selected className='m-2' value="0">Select Sequence</option>
                        {clSeq.map((valu, key)=>
                        <option className='m-2' key={key} value={valu.id}>{valu.libellee_sequence}</option>  
                        )} 
                    </select>
      </div>
      <div className="form-group col-md-4">
      <label className="mb-2">Subject</label>
      <select className="form-select choice" onChange={handleData} name='mat' disabled={disabled}>
                        <option selected className='m-2' value='0'>Select the Subject</option>
                        {matiereData.map((valu, key)=>
                        <option className='m-2' key={key} value={valu.id_matiere}>{valu.nom_matiere}</option>
                    )} 
                    </select>
        </div>
   </div>
      
</div>
      </div> 
    <div className="enseignant row main-container">
    <h3><strong>Add marks</strong> <Link to={`/studentmarks`} className="btn btn-success"><Plus />Add</Link></h3>
    
        <div className="col-md-9 contain ">

            <div className='secondside'>
                
            </div>
                    <table className="table tab my-1 table-striped table-bordered  w-100 container">
                        <thead className='fixed'>
                        
                        <tr>
                            <th>Matricule</th>
                            <th>Name</th>
                            <th>First Name</th>
                            <th>Notes</th>
                        </tr>
                        
                    </thead>
                    <tbody>{noteEleve.map((notes, key)=>
                        <tr className='text-dark' key={key}>
                            <td>{notes.matricule_El}</td>
                            <td>{notes.nom}</td>
                            <td>{notes.prenom}</td>
                            <td>{notes.note}</td>
                               
                        </tr>)}
                    </tbody> 
                </table>
            </div>
            <div>
            <Popup openPopup = {openPopup}
                setOpenPopup = {setOpenPopup}
                title ='Modify the note'
                >
            <ModificationNote />
        </Popup>
        </div> 
    </div>
    </main>
    </>
  )
}
