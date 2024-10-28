import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthProvider';
import '../style/modificationNote.css';
// import Enseignant from '../components/Enseignant';
import { useNavigate, useParams } from 'react-router-dom';
import Popup2 from '../popup/Popup';

export default function ModificationNote() {
const {auth} = useContext(AuthContext);
const {authteacher} = useContext(AuthContext);
  const[matriculeEleve, setMatriculeEleve] = useState('');
  const[noteEleve, setnoteEleve] = useState("");
  const[Matricule, setMatricule] = useState("");
  const[nom, setNom] = useState("");
  const[prenom, setPrenom] = useState("");
  const[OpenpopUp, setOpenPopup] = useState(true);
  const navigate = useNavigate();
  const {matricule_El, seq_elev, matiere} = useParams();
  if(auth){
    
  }
  console.log(matricule_El);
  console.log(seq_elev);
  console.log(matiere);

  const GetData = async (e) =>{
    //e.preventDefault();
    var headers = {"Accept":"application/json",
        "Content-Type": "application/json"};
       await axios.get(`http://localhost/ssm/api/getStudent.php/${matricule_El}/${matiere}/${seq_elev}`, headers)
        .then(response=>{ 
          console.log(response.data);
          console.log(response.data.nom);
          console.log(response.data.note);
          setnoteEleve(response.data.note);
          setNom(response.data.nom);
          setPrenom(response.data.prenom);
          setMatricule(response.data.matricule_El);
        })
  }

  useEffect(()=>{GetData()}, [])
  const handleSubmit = (e) =>{//envoi des valeurs à l'api et fermeture du popup
    e.preventDefault()
    setOpenPopup(false)
    //navigate('/noteAdmin')
    const formData = {
      note:noteEleve
    }
    console.log(formData);
    //window.location.reload();
    axios.post(`http://localhost/ssm/api/NoteModifier.php/${matricule_El}/${seq_elev}/${matiere}`,formData,{
        headers:{"Content-Type": "multipart/form-data"},
    })
    if(authteacher ){
      navigate(`/home`)
    }
    else if(auth){
      navigate('/Home')
    }
    else{

    }
  }
  return (
            <div className="col-md-6">
                <form onSubmit={handleSubmit}>
                    <div className=" ">
                          <div className="">  
                            <div className="">
                              <div className="notes d-flex">
                                <div className='lab col-md-10'>
                                <label ><span className='name'>{nom}</span><span className='surname'>{prenom}</span></label>
                                </div>
                                <div className="mat col-md-2">
                                   <input type="number" name='note' id='note' value={noteEleve} onChange={(e)=>setnoteEleve(e.target.value)} />
                                </div>
                              </div>
                            </div>
                          </div>        
                          <div className='buttons'>
                            <button className='btn btn-secondary' onClick={()=>{navigate('/noteAdmin')}}>Back</button>
                            <button type='submit' name='submit' className="btn btn-primary" onClick={(e) =>handleSubmit(e)} >Modify </button>
                            </div>  
                        </div>
                </form>
            </div>
  )
}
