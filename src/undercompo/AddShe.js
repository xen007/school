import React, {useState, useEffect, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from '../component/config';


export default function AddSchedule() {
  // la partie set... permet de mettre à jour notre variable
    const [Matiere, setMatiere] = useState('');
    const [enseig, setEnseig] = useState('');
    const [classe, setClasse] = useState('');
    const [Salle, setSalle] = useState('');
    const [ddc, setDDC] = useState('');
    const [fdc, setFDC] = useState('');
    const [jour, setJour] = useState('');
    const navigate = useNavigate();

    useEffect(()=>{
        Addday();}, []);
//stockage des données récuperé dans la bd
const [clData,setClData]= useState([])
const [salleData,setNiveauData]= useState([])
const [matiereData,setMatiereData]= useState([])
const [enseigData,setEnseigData]= useState([])
const [jourData,setJourData]= useState([])

//function pour la récuperation des matières
function AddSUb(classe_id){
//e.preventDefault();
var headers = {"Accept":"application/json",
    "Content-Type": "application/json"}; // entête donnant les droit au script d'effectuer des modifications
axios.get(`${config.apiBaseUrl}/ajoutScheduleSub.php/${classe_id}`, headers) //api pour liant le script à une page php avec la method get
.then(response=>{
    setMatiereData(response.data);
      console.log(response.data);
 
})}
    
// récuperation des niveaux de classse
function AddClasse(){
    var headers = {"Accept":"application/json",
        "Content-Type": "application/json"};

axios.get(`${config.apiBaseUrl}/ajoutScheduleClass.php`, headers)
.then(response=>{
    setClData(response.data);
    console.log(response.data);
   // AddSalle()   
});}

//récupération des salles de classes
function AddSalle(classe_id){
  var headers = {"Accept":"application/json",
      "Content-Type": "application/json"};
axios.get(`${config.apiBaseUrl}/ajoutScheduleSalle.php/${classe_id}`, headers)
.then(response=>{
  setNiveauData(response.data);
  console.log(response.data);
  // AddSUb()
});}
   
    function AddEns(day){
        //e.preventDefault();
        var headers = {"Accept":"application/json",
            "Content-Type": "application/json"};
      console.log(`${config.apiBaseUrl}/ajoutScheduleEns.php/${Matiere}/${day}`)      
    axios.get(`${config.apiBaseUrl}/ajoutScheduleEns.php/${Matiere}/${day}`, headers)
    .then(response=>{
        // console.log(response.data);
        setEnseigData(response.data);
        Addday();
    })
    }

//récupération des jours
function Addday(e){
    //e.preventDefault();
    var headers = {"Accept":"application/json",
            "Content-Type": "application/json"};
    axios.get(`${config.apiBaseUrl}/ajoutday.php`, headers)
.then(response=>{
    console.log(response.data);
    setJourData(response.data);
})
AddClasse();
}
const handleLevel = (e) => {
  console.log(e); // Debugging
  setClasse(e.target.value);
  const id_classe = e.target.value
  AddSalle(id_classe)
};
const handleSalle = (e) => {
  console.log(e); // Debugging
  setSalle(e.target.value);
  const id_salle = e.target.value
  AddSUb(id_salle)
};
const handleMatiere = (e) => {
  console.log(e); // Debugging
  setMatiere(e.target.value);

  Addday();
};
const handleDay = async (e) => {
  setJour(e.target.value)
  const day= e.target.value;
  AddEns(day);
}
  
//enregistrement des données dans la bd

    const registerSchedule = async()=>{
      // stockage des valeurs récuperé dans la liste formData
      const formData = {
        clas : classe,
        sal : Salle,
        matiere:Matiere,
        ensei: enseig,
        dtime: ddc,
        ftime: fdc,
        jour: jour
      } 
      await axios.post(`${config.apiBaseUrl}/EnregisterSchedule.php`,formData,{ //api pour liant le script à une page php avec la method post
            headers:{"Content-Type": "multipart/form-data"},
        })
        .then(response=>{
          console.log(response.data.stutus);
          alert(response.data.status)
          
      })
    
    }
    const handleSubmit = async(e) =>{ //fxn handleSubmit appel la fxn registerSchedule;
        e.preventDefault()
        await registerSchedule();
        
    }
  return (
    
    <div className='row d-flex main-container'>
    
      <div className="col-md-9 contain">
    
        <div className='bor'>
        <div className='row' align="center">
        <form>

            <div className='col-lg-12'><br/>
              <div class='jumbotron'>
                  <legend>Please Schedule a class</legend>
                  <br/><br/>
                <div className='form-group'>
                  <label>Classe :</label>
                  <div className='col-md-6 items'>
                    <select onChange={handleLevel}  onClick ={()=>console.log(classe)}  className="form-select choice" name='classer'>{/* remplissage des options select avec les données de la bd en utilisant la fonction map*/}
                      <option selected className='m-2' value="">Select a Level</option>
                      {clData.map((clas, key) => 
                        <option className='m-2' key={key} value={clas.id_niveau}>{clas.libellee_niveau}</option>
                      )}
                    </select>
                  </div>
                </div>
                <div className='form-group'>
                  <label>Room :</label>
                  <div className='col-md-6 items'>
                    <select onChange={handleSalle} className="form-select choice" name='sal'>{/* remplissage des options select avec les données de la bd en utilisant la fonction map*/}
                      <option selected className='m-2' value=''>Select a Class</option>
                      {salleData.map((salle, key) => 
                        <option className='m-2' key={key} value={salle.id_classe}>{salle.libellee_classe}</option>
                      )}
                    </select>
                  </div>
                </div>
                <div className='form-group'>
                  <label>Subject :</label>
                  <div className='col-md-6 items'>
                    <select onChange={handleMatiere} className="form-select choice" name='matiere'>{/* remplissage des options select avec les données de la bd en utilisant la fonction map*/}
                      <option selected className='m-2' value=''>Select a subject</option>
                      {matiereData.map((matiere, key) => 
                        <option className='m-2' key={key} value={matiere.id_matiere} >{matiere.nom_matiere}</option>
                      )}
                    </select>
                  </div>
                </div>
                
                <div className='form-group'>
                  <label>Jour :</label>
                  <div className='col-md-6 items'>
                    <select onChange={handleDay} className="form-select choice" name='ensei'> {/* remplissage des options select avec les données de la bd en utilisant la fonction map*/}
                      <option selected className='m-2' value=''>Select a Day</option>
                      {jourData.map((jour, key) => 
                        <option className='m-2' key={key} value={jour.id_jour} >{jour.libellee_jour}</option>
                      )}
                    </select>
                  </div>
                  <div className='form-group'>
                  <label>Teacher :</label>
                  <div className='col-md-6 items'>
                    <select onChange={(e)=>setEnseig(e.target.value)} className="form-select choice" name='ensei'> {/* remplissage des options select avec les données de la bd en utilisant la fonction map*/}
                      <option selected className='m-2' value=''>Select a teacher</option>
                      {enseigData.map((ensei, key) => 
                        <option className='m-2' key={key} value={ensei.matricule_Ens} >{ensei.nomE} {ensei.prenomE}</option>
                      )}
                    </select>
                  </div>
                </div>
                </div>
                <div className='form-group'>
                  <label>Start of course :</label>
                  <div className='col-md-6 items'>
                    <input type='time' onChange={(e)=>setDDC(e.target.value)} name='dtime' className='choice' /> {/*la function onchange nous permet de recupérer la valeur entrée dans le input */}
                  </div>
                </div>
                <div className='form-group'>
                  <label>End of course :</label>
                  <div className='col-md-6 items'>
                    <input type='time' onChange={(e)=>setFDC(e.target.value)} name='ftime' className='choice' />
                  </div>
                </div>
              
                </div>
            </div>
        </form>
          </div>
            </div><br/>
            <button className='btn btn-secondary' onClick={()=>{navigate('/emplois')}} id='retour' >Back</button> {/*onclick appelle la function definie */}
            <button type='submit' onClick={handleSubmit} name='submit' className="btn btn-primary" id='submit' >Save </button>
            
      </div>
    </div>    
    
  )
}
