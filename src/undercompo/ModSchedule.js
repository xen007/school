import React, {useState, useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';


// la partie set... permet de mettre à jour nos constance
export default function ModSchedule() {
    const [Matiere, setMatiere] = useState('');
    const [Matiere1, setMatiere1] = useState('');
    const [ensei, setEnsei] = useState('');
    const [ensei1, setEnsei1] = useState('');
    const [enseig, setEnseig] = useState('');
    const [Salle, setSalle] = useState('');
    const [Salle1, setSalle1] = useState('');
    const [ddc, setDDC] = useState();
    const [fdc, setFDC] = useState('');
    const [jour, setJour] = useState('');
    const [jour1, setJour1] = useState('');

    const navigate = useNavigate();
    const {cours} = useParams();

    const[openPopup, setOpenPopup] = useState();

    function togglePopup(){
      setOpenPopup(false)
    }
    
    useEffect(()=>{view();
      
  }, []);

//function pour la récuperation des infromations dans la bd et set ces valeurs
 function view(e){
  var headers = {"Accept":"application/json",
"Content-Type": "application/json"};
axios.get(`http://localhost/toungou-sch/api/modSchedule.php/${cours}`, headers)
.then(response=>{
  const control = response.data.id_classe;
  const con = response.data.matriculeEnseignant;
setMatiere1(response.data.nom_matiere);
setMatiere(response.data.id_matiere);
setEnsei(response.data.nomE);
setEnsei1(response.data.prenomE);
setEnseig(response.data.matriculeEnseignant);
setSalle(response.data.id_classe);
setSalle1(response.data.libellee_classe);
setDDC(response.data.debut_cours);
setFDC(response.data.fin_cours);
setJour(response.data.id_jour);
setJour1(response.data.libelle_jour);

if(control !== ''){
  AddSUb(control, con);
  Addday(con); 
}

})}

//stockage des données récuperé dans la bd
const [clData,setClData]= useState([]);
const [salleData,setNiveauData]= useState([]);
const [matiereData,setMatiereData]= useState([]);
const [enseigData,setEnseigData]= useState([]);
const [jourData,setJourData]= useState([]);

console.log(Salle)
//function pour la récuperation des matières
function AddSUb(id_mat, mat){
  //e.preventDefault();
  var headers = {"Accept":"application/json",
      "Content-Type": "application/json"}; // entête donnant les droit au script d'effectuer des modifications
  axios.get(`http://localhost/toungou-sch/api/modifyScheduleSub.php/${id_mat}/${mat}`, headers) //api pour liant le script à une page php avec la method get
  .then(response=>{
      setMatiereData(response.data);
      console.log(response.data)
  })}
  
 

      
  // récuperation des niveaux de classse
  function AddClasse(){
      var headers = {"Accept":"application/json",
          "Content-Type": "application/json"};
  
  axios.get(`http://localhost/toungou-sch/api/ajoutScheduleClass.php`, headers)
  .then(response=>{
      setClData(response.data);
      console.log(response.data);
       
  });}
  
  //récupération des salles de classes
  function AddSalle(classe_id){
    var headers = {"Accept":"application/json",
        "Content-Type": "application/json"};
  axios.get(`http://localhost/toungou-sch/api/ajoutScheduleSalle.php/${classe_id}`, headers)
  .then(response=>{
    setNiveauData(response.data);
    console.log(response.data);
  });}
     
  function AddEns(day){
    var headers = {"Accept":"application/json",
        "Content-Type": "application/json"};
  console.log(`http://localhost/toungou-sch/api/ajoutScheduleEns.php/${Matiere}/${day}`)      
axios.get(`http://localhost/toungou-sch/api/ajoutScheduleEns.php/${Matiere}/${day}`, headers)
.then(response=>{
    // console.log(response.data);
    setEnseigData(response.data);
    
    Addday();
})
}
  
  //récupération des jours
  function Addday(con){
      //e.preventDefault();
      var headers = {"Accept":"application/json",
              "Content-Type": "application/json"};
      axios.get(`http://localhost/toungou-sch/api/modifyDay.php/${con}`, headers)
  .then(response=>{
      console.log(response.data);
      setJourData(response.data);
  })
  AddClasse();
  
  }

  const handleSalle = (e) => {
    console.log(Salle)
    
    AddEns(Matiere)
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
//function pour set matiere et set le value du premier option tag de matière à ''


//function pour set salle et set le value du premier option tag de salle à ''
// const handleSalle= async(e) =>{
//   setSalle(e.target.value);
//   setSalle1('');
  
// }
//function pour set enseig, ensei et set le value du premier option tag de enseig1 et ensei1 à '' vu que enseig gère le nom et ensei le nom
const handleEnsei= async(e) =>{
  setEnseig(e.target.value);
  //setEnsei(e.target.value);
  //setEnsei1(''); 
}
//function pour set jour et set le value du premier option tag de jour à ''

 // stockage des valeurs récuperé dans la liste formData
    const handleSubmit = (e) =>{
      e.preventDefault()
      
        
        const formData = new FormData()
        formData.append('Salle', Salle);
        formData.append('Matiere', Matiere);
        formData.append('enseig', enseig);
        formData.append('ddc', ddc);
        formData.append('fdc', fdc);
        formData.append('jour', jour);
      
      axios.post(`http://localhost/toungou-sch/api/UpdateSchedule.php/${cours}`,formData,{
           headers:{"Accept":"application/json","Content-Type": "application/json"},
        })
        .then(response=>{
          console.log(response.data);
          setOpenPopup(false);
          alert(response.data)
          navigate('/Addshe')
      })
       
    }
  return (
    
        <main className='main-component'>
          <form onSubmit={togglePopup}>
            <div className='col-lg-12'><br/>
              <div className='jumbotron'>
                <div className='form-group'>
                  <label>Room :</label>
                  <div className='col-md-6 items'>
                  
                    <select onChange={(e)=>handleSalle(e)} onClick={handleSalle} className="form-select choice" value={Salle} name='Salle'>
                      <option selected className='m-2' value={Salle} >{Salle1}</option>
                      {salleData.map((salle, key) => 
                        <option className='m-2' key={key} value={salle.id_classe}>{salle.libellee_classe}</option>
                      )}
                    </select>
                  </div>
                </div>
                <div className='form-group'>
                  <label>Subjects :</label>
                  <div className='col-md-6 items'>
                    <select onChange={(e)=>{handleMatiere(e)}} className="form-select choice" value={Matiere} name='Matiere'>
                    
                      {matiereData.map((matiere, key) => 
                        <option className='m-2' key={key} value={matiere.id_matiere} >{matiere.nom_matiere}</option>
                      )}
                    </select>
                  </div>
                </div>
                <div className='form-group'>
                  <label>Day:</label>
                  <div className='col-md-6 items'>
                    <select onChange={handleDay} className="form-select choice" value={jour} name='jour'>
                      
                      {jourData.map((jour, key) => 
                        <option className='m-2' key={key} value={jour.id_jour} >{jour.libellee_jour}</option>
                      )}
                    </select>
                  </div>
                </div>
                <div className='form-group'>
                  <label>Teacher:</label>
                  
                  <div className='col-md-6 items'>
                    <select onChange={(e)=>handleEnsei(e)} value={enseig} className="form-select choice" name='ensei'> {/* remplissage des options select avec les données de la bd en utilisant la fonction map*/}
                    <option selected className='m-2' value={enseig}>{ensei} {ensei1}</option>
                      {enseigData.map((ensei, key) => 
                        <option className='m-2' key={key} value={ensei.matricule_Ens} >{ensei.nomE} {ensei.prenomE}</option>
                      )}
                    </select>
                  </div>
                </div>
                
                <div className='form-group'>
                  <label>Start of course :</label>
                  <div className='col-md-6 items'>
                    <input type='time' onChange={(e)=>setDDC(e.target.value)} name='ddc' value={ddc} className='choice'/>
                  </div>
                </div>
                <div className='form-group'>
                  <label>End of course :</label>
                  <div className='col-md-6 items'>
                    <input type='time' onChange={(e)=>setFDC(e.target.value)} name='fdc' value={fdc} className='choice' />
                  </div>
                </div>
              
                </div>
            </div>
          <br/>
            <button className='btn btn-secondary' onClick={()=>{navigate('/home')}}  >Back</button>
            <button type='submit' onClick={(e) =>handleSubmit(e)} name='submit' className="btn btn-primary" id='submit' >Save </button>        
    </form>
    </main>    
    
  )
}
