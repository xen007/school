import React, {useState} from 'react';
// import '../style/ajoutenseig.css';

import axios from 'axios';

import { useNavigate } from 'react-router-dom';


export default function Ajoutenseig(){
//creation et initialisation des constances
    const[nom,setNom] = useState('')
    const[prenom,setPrenom] = useState('')
    const[date_naiss,setDate_naiss] = useState('')
    const[lieu_naiss,setLieu_naiss] = useState('')
    const[adresse,setAdresse] = useState('')    
    const[civ,setCiv] = useState('')     
    const[photo,setPhoto] = useState('')    
    const[email,setEmail] = useState('')    
    const[matricule,setMatricule] = useState('')    
    const[pass,setpass] = useState('')    
    const[Tel,settelephone] = useState('')    
    const[cni,setCNI] = useState('')    
    const[cv,setCV] = useState('')  
     
    const[msg,setMsg] = useState('')  
        
     //stockage du hook useNavigate dans une constance  
    const navigate= useNavigate()

    //enregistrement des valeurs récupéré lors du submit
    

    const handleSubmit = async(e)=>{
        e.preventDefault() //empeche la page de récharger lors de l'execution de la fonction
        console.log(matricule)
        const formData = new FormData()
        formData.append('name',nom)
        formData.append('prenom', prenom)
        formData.append('date_naiss',date_naiss)
        formData.append('lieu_naiss',lieu_naiss)
        formData.append('adresse', adresse)
        formData.append('civ',civ)
        formData.append('img', photo)
        formData.append('email',email)
        formData.append('pass',pass)
        formData.append('mat', matricule)
        formData.append('cni',cni)
        formData.append('tel',Tel)
        formData.append('cv', cv);
        console.log(formData);
        const response = await axios.post('http://localhost/ssm/api/ajoutenseig.php',formData,{ //envoi de la liste de données à l'api avec la method post
            headers:{"Content-Type": "multipart/form-data"},//type de données receptible
        })

         //action à executer si le post a été executé sans erreur, avec le temps d'execcution
            setTimeout(() => {
                navigate('/teachers')
            }, 2000);

         console.log(matricule)
        
    }
    
  return (
    <main className=" main-container ">
            
            <div className="col-md-9 contain ">
          
            
            <div className=" container">
                <div className="">
                    <header>Registration</header>
                    <p>{msg}</p>
                    <form >
                        <div className="form first">
                            <div className="details personnal">
                                <span className="title">Personal Information</span>

                                <div className="fields">
                                    <div className="input-field">
                                        <label htmlFor='mat' className="setaddressm-label">Matricule</label>
                                        <input type="text" onChange={(e)=>setMatricule(e.target.value)} id="mat" name="mat" placeholder="Please enter a matricule" className="m-control" required/>{/*la function onchange nous permet de recupérer la valeur entrée dans le input */}
                                    </div>
                                    <div className="input-field">
                                        <label htmlFor='civ' setaddress="m-label">Civility</label>
                                        <select className='m-selct' onChange={(e)=>setCiv(e.target.value)} aria-label="Default select example" name="civ" >{/*la function onchange nous permet de recupérer la valeur entrée dans le input*/}
                                            <option value=""></option>
                                            <option value="M" >M</option>
                                            <option value="Mme">Mme</option>
                                            <option value="Mlle">Mlle</option>
                                        </select><span className="help-inline"></span>
                                    </div>
                                    <div className="input-field">
                                        <label htmlFor='name' className="setaddressm-label">Name</label>
                                        <input type="text" onChange={(e)=>setNom(e.target.value)} id="name" name="name" placeholder="enter your Name" className="m-control"/>{/*la function onchange nous permet de recupérer la valeur entrée dans le input */}
                                    </div>
                                    <div className="input-field">
                                        <label htmlFor='prenom' className="setaddressm-label">First name</label>
                                        <input type="text" id="prenom" onChange={(e)=>setPrenom(e.target.value)} name="prenom" placeholder="enter your first name" className="m-control" />
                                    </div>
                                    <div className="input-field">
                                        <label htmlFor='adresse' className="setaddressm-label">Address</label>
                                        <input type="text"id="adresse" onChange={(e)=>setAdresse(e.target.value)} name="adresse" placeholder="enter your Address" className="m-control" />
                                    </div>
                                    <div className="input-field">
                                        <label htmlFor='img' className="setaddressm-label">Photo</label>
                                        <input type="file" id="img" name="img" onChange={(e) => {
                                        // Check if a file is selected
                                        if (e.target.files && e.target.files[0]) {
                                            setPhoto(e.target.files[0]);  // Set the selected file
                                        } else {
                                            setPhoto('');  // Set empty string if no file is selected
                                        }
                                    }}  placeholder="Selectionner une photo"  className="m-control" />
                                    </div>
                                    
                                </div>
                            </div>

                            <div className="details ID">
                                <span className="title">Detailed information</span>

                                <div className="fields">
                                    <div className="input-field">
                                        <label htmlFor='email' className="setaddressm-label">Email</label>
                                        <input type="email" id="email" onChange={(e)=>setEmail(e.target.value)} name="email" placeholder="Enter an email address" className="m-control" />
                                    </div>
                                    <div className="input-field">
                                        <label htmlFor='pass' className="setaddressm-label">Password</label>
                                        <input type="password" id="pass" onChange={(e)=>setpass(e.target.value)} name="pass" placeholder="Enter a password" className="m-control" required/>
                                    </div>
                                    <div className="input-field">
                                        <label htmlFor='tel' className="setaddressm-label">Phone</label>
                                        <input type="number" id="tel" onChange={(e)=>settelephone(e.target.value)} name="tel" placeholder="Enter your Phone Number" className="m-control" />
                                    </div>
                                    <div className="input-field">
                                        <label htmlFor='date_naiss' className="setaddressm-label">Date of Birth</label>
                                        <input type="date" id="date_naisse" onChange={(e)=>setDate_naiss(e.target.value)} name="date_naiss" placeholder="Enter your date of birth" className="m-control" />
                                    </div>
                                    <div className="input-field">
                                        <label htmlFor='lieu_naiss' className="setaddressm-label">Place of birth</label>
                                        <input type="text" id="lieu_naisse" onChange={(e)=>setLieu_naiss(e.target.value)} name="lieu_naiss" placeholder="Enter your place of birth" className="m-control" />
                                    </div>
                                    <div className="input-field">
                                        <label htmlFor='cni'>CNI</label>
                                        <input type="file" id="cni" onChange={(e) => {
                                            // Check if a file is selected
                                            if (e.target.files && e.target.files[0]) {
                                                setCNI(e.target.files[0]);  // Set the selected file
                                            } else {
                                                setCNI('');  // Set empty string if no file is selected
                                            }
                                        } } name="cni" placeholder="enter your CNI" className="m-control"/>
                                    </div>
                                    
                                </div>
                                <div/>
                            </div>
                            <div className="details Adress">
                                <span className="title">Other informations</span>

                                <div className="fields">
                                    <div className="input-field">
                                        <label htmlFor='cv'>CV</label>
                                        <input type="file" id="cv" name="cv" onChange={(e) => {
                                        // Check if a file is selected
                                        if (e.target.files && e.target.files[0]) {
                                            setCV(e.target.files[0]);  // Set the selected file
                                        } else {
                                            setCV('');  // Set empty string if no file is selected
                                        }
                                    } } placeholder="enter your CV"  className="m-control"/>
                                                                </div>
                                    <div className="input-field">
                                        <label>Start of the Contract</label>
                                        <input type="date" id="ddc" name="ddc" placeholder="Select a date" className="m-control" aria-labelledby="debut contrat"/>
                                    </div>
                                </div>
                      
                                <div className="buttons">
                                    <button type='submit' className="btn btn-success btnText" onClick={handleSubmit}>Submit
                                    </button>
                                </div>

                            </div>
                        </div>
                
                    </form>
                </div>
                </div>
            </div>
        </main>
  )
}
