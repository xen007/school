import React, {useState, useEffect} from 'react';
import '../style/modensei.css';
import axios from 'axios';
import cors from 'cors';
import Enseignant from '../components/Enseignant';
import { useNavigate, useParams } from 'react-router-dom';


export default function Try(){

    const[formvalue,setFormvalue] = useState({
        matricule:'',
        name:'',
        prenom:'',
        date_Naiss:'',
        lieu_Naiss:'',
        adresse:'',
        civ:'',
        email:'',
        tel:'',
        pass:'',
        
       
    
        })

        const[photoVal,setPhotoVal] = useState({
            img:'', 
            cv:'',
            cni:'',
            })
    
  
    const navigate= useNavigate()
    const {matriculeEns} = useParams()

    const handleInput =(e) =>{
        setFormvalue({...formvalue,[e.target.name] : e.target.value})
    }
    const handlePhoto =(e) =>{
        setPhotoVal({[e.target.name] : e.target.files[0]})
    }
   

    useEffect( () => {
        const userRowdata = async() =>{
            const getUserdata = await fetch("http://localhost/files/try.php/"+ matriculeEns)
            const resuserdata = await getUserdata.json()
            console.log(resuserdata)
            setFormvalue(resuserdata)
            setPhotoVal(resuserdata)
           
        }
        userRowdata()
    }, [matriculeEns])

    const Modifiereenseig = async()=>{
        const formData = new FormData()
        formData.append('matricule',formvalue.matriculeEns)
        formData.append('name',formvalue.nom)
        formData.append('prenom', formvalue.prenom)
        formData.append('date_Naiss',formvalue.date_naiss)
        formData.append('lieu_Naiss',formvalue.lieu_naiss)
        formData.append('adresse', formvalue.adresse)
        formData.append('civ',formvalue.genre)
        formData.append('email',formvalue.email)
        formData.append('tel', formvalue.telephone)
        formData.append('pass',formvalue.pass)
        formData.append('img',photoVal.photo)
        formData.append('cv', formvalue.cv)
        formData.append('cni',formvalue.cni)
        
    
        
        const response = await axios.post('http://localhost/files/modifier.php',formData,{
            headers:{"Content-Type": "multipart/form-data"},
        })

        if(response.data.success){
            //setMessage(response.data.success)
            setTimeout(() => {
                navigate('/students')
            }, 2000);
        }
    }

    const handleSubmit = async(e) =>{
        e.preventDefault()
         await Modifiereenseig()
         console.log(photoVal.photo)
        
    }

    
   
    const handleBack = () =>{
        const  form = document.querySelector("form"), 
        backBtn = form.querySelector(".backBtn")
        backBtn.addEventListener("click", ()=>form.classList.remove('secActive'))
    }

    return(
        <main className="ajout_enseignant container">
            <form className='form'>
                <div className="form first" >
                    <div className="details personnal">
                        <span className="title">Information Personnel</span>

                        <div className="fields">
                            <div className="input-field">
                                <label htmlFor='mat' className="setaddressm-label">Matricule</label>
                                <input type="text" value={formvalue.matricule} onChange={handleInput} id="mat" name="mat" placeholder="Veuillez entrer votre matricule" className="m-control" aria-labelledby="name" required/>
                            </div>
                            <div className="input-field">
                                <label htmlFor='civ' setaddress="m-label">Civilité</label>
                                <select className='m-selct' value={formvalue.civ} onChange={handleInput}  aria-label="Default select example" name="civ">
                                    <option value="M" >M</option>
                                    <option value="Mme">Mme</option>
                                    <option value="Mlle">Mlle</option>
                                </select><span className="help-inline"></span>
                            </div>
                            <div className="input-field">
                                <label htmlFor='name' className="setaddressm-label">Nom</label>
                                <input type="text" value={formvalue.name} onChange={handleInput} id="name" name="name" placeholder="renseignez votre Nom" className="m-control" aria-labelledby="name"  required/>
                            </div>
                            <div className="input-field">
                                <label htmlFor='prenom' className="setaddressm-label">Prénom</label>
                                <input type="text" id="prenom" value={formvalue.prenom} onChange={handleInput} name="prenom" placeholder="renseignez votre Prénom" className="m-control" aria-labelledby="prenom" required/>
                            </div>
                            <div className="input-field">
                                <label htmlFor='adresse' className="setaddressm-label">Adresse</label>
                                <input type="text"id="adresse" value={formvalue.adresse} onChange={handleInput} name="adresse" placeholder="renseignez votre Adresse" className="m-control" aria-labelledby="adresse" required/>
                            </div>
                            <div className="input-field">
                                <label htmlFor='img' className="setaddressm-label">Photo</label>
                                <input type="file" name="img" id='img' onChange={handleInput} placeholder="Selectionner une Photo" />
                            </div>
                            
                        </div>
                    </div>

                    <div className="details ID">
                        <span className="title">Information detaillé</span>

                        <div className="fields">
                            <div className="input-field">
                                <label htmlFor='email' className="setaddressm-label">Email</label>
                                <input type="email" id="email" value={formvalue.email} onChange={handleInput} name="email" placeholder="Entrer une adresse email" className="m-control" aria-labelledby="email" required/>
                            </div>
                            <div className="input-field">
                                <label htmlFor='pass' className="setaddressm-label">Mot de Passe</label>
                                <input type="password" id="pass" value={formvalue.pass} onChange={handleInput} name="pass" placeholder="Entrer un mot de passe" className="m-control" aria-labelledby="pass" required/>
                            </div>
                            <div className="input-field">
                                <label htmlFor='tel' className="setaddressm-label">Téléphone</label>
                                <input type="number" id="tel" value={formvalue.tel} onChange={handleInput} name="tel" placeholder="Entrer votre Numéro de Téléphone" className="m-control" aria-labelledby="tel" required/>
                            </div>
                            <div className="input-field">
                                <label htmlFor='date_naiss' className="setaddressm-label">Date de Naissance</label>
                                <input type="date" id="date_naisse" value={formvalue.date_naiss} onChange={handleInput} name="date_naiss" placeholder="Entrer votre date de naissance" className="m-control" aria-labelledby="date_naiss" required/>
                            </div>
                            <div className="input-field">
                                <label htmlFor='lieu_naiss' className="setaddressm-label">Lieu de naissance</label>
                                <input type="text" id="lieu_naisse" value={formvalue.lieu_naiss} onChange={handleInput} name="lieu_naiss" placeholder="Entrer votre lieu de naissance" className="m-control" aria-labelledby="lieu_naiss" required/>
                            </div>
                            <div className="input-field">
                                <label htmlFor='cni'>CNI</label>
                                <input type="file" id="cni" onChange={handleInput} name="cni" placeholder="entrer votre CNI" className="m-control" aria-labelledby="cni"/>
                            </div>
                            
                        </div>
                    </div>
                    <div className="details Adress">
                        <span className="title">Autre informations</span>

                        <div className="fields">
                            <div className="input-field">
                                <label htmlFor='cv'>CV</label>
                                <input type="file" id="cv" name="cv" onChange={handleInput} placeholder="entrer votre CV"  className="m-control" aria-labelledby="cv" />
                            </div>
                            <div className="input-field">
                                <label>Debut du Contrat</label>
                                <input type="date" id="ddc" name="ddc" placeholder="Selectionner une date" className="m-control" aria-labelledby="debut contrat" />
                            </div>
                            <div className="input-field">
                                <label>Ville d'origine</label>
                                <input type="text" id="ville" name="ville" placeholder="Ville d'origine" className="m-control" aria-labelledby="ville" />
                            </div>
                            
                            
                        </div>
                        
                        <div>
                            <button className="submit" onClick={handleSubmit} >
                                <span className="btn2 btn-success">Modifier</span>
                            </button>
                        </div>

                    </div>
                </div>
        
            </form>
        </main>
    );
}