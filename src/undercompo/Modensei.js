import React, {useState, useEffect} from 'react';
import '../style/modificationNote.css';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import config from '../component/config';


export default function Modensei(){

     //déclaration et initialisation des constances
    const[matriculeEns, setMatricule] = useState('');
    const[prenom, setPrenom] = useState('');
    const[date_naiss, setdate_naiss] = useState('');
    const[lieu_naiss, setlieu_naiss] = useState('');
    const[adresse, setAdresse] = useState('')
    const[email, setEmail] = useState('')
    const[pass, setPass] = useState('')
    const[civ, setCIV] = useState('')
    const[tel, setTel] = useState('')
    const[name, setName] = useState('');
    const[img, setImage] = useState('');
    const[cni, setCNI] = useState('');
    const[cv, setCV] = useState('');
       
    const [openPopup2, setOpenPopup2] = useState(false); //constance pour ouverture et fermeture du popup

    const navigate= useNavigate()

    const {matricule} = useParams()
    console.log(matricule)
    
    useEffect(()=>{
        tabEnseig()}, []);

    function tabEnseig(){ // function permettant la récupération des données de la bd et la mise à jour des constances 
        var headers = {"Accept":"application/json",
            "Content-Type": "application/json"};
    axios.get(`${config.apiBaseUrl}/view.php/${matricule}`, headers)
    .then(response=>{
       
        console.log(response.data)
        setMatricule(response.data.matricule_Ens)
        setPrenom(response.data.nomE)
        setName(response.data.prenomE)
        setEmail(response.data.email)
        setAdresse(response.data.adresse)
        setPass(response.data.mot_de_passe)
        setlieu_naiss(response.data.lieuNaiss)
        setdate_naiss(response.data.dateNaiss)
        setCIV(response.data.civilitee)
        setTel(response.data.telephone)
        setCNI(response.data.cni)
        setCV(response.data.cv)
    })
    }
    
    

    const handleSubmit = (e) =>{//envoi des valeurs à l'api et fermeture du popup
        e.preventDefault()
        setOpenPopup2(false)
        //window.location.reload();
        const formData = new FormData()
        formData.append('matricule', matricule)
        formData.append('nom', name)
        formData.append('prenom', prenom)
        formData.append('date_naiss',date_naiss)
        formData.append('lieu_naiss',lieu_naiss)
        formData.append('adresse', adresse)
        formData.append('civ',civ)
        formData.append('img', img)
        formData.append('email',email)
        formData.append('pass',pass)
        formData.append('matricule', matricule)
        formData.append('cni',cni)
        formData.append('tel',tel)
        formData.append('cv', cv)
        console.log(formData)
        axios.post(`${config.apiBaseUrl}/mod.php`,formData,{
            headers:{"Content-Type": "multipart/form-data"}
           
        }).then(response=>{
           alert(response.data.status)
        })
         navigate('/Home')
        
    }
        

    return(
        <div className="pop container"> 
                <form onSubmit={handleSubmit}>
                    <div className="form first">
                        <div className="details personnal">
                                <span className="title">informations Personnelles</span>

                                <div className="fields">
                                    
                                    <div className="input-field">
                                        <label>Matricule</label>
                                        <input type="text" name='matricule' id='matricule' value={matriculeEns} onChange={(e)=>setMatricule(e.target.value)} placeholder="Entrez le matricu" required/>
                                    </div>

                                    <div className="input-field">
                                        <label>Nom</label>
                                        <input type="text" name='name' id='name'value={name} onChange={(e)=>setName(e.target.value)} placeholder="Entrez le nom" required/>
                                    </div>
                                    
                                    <div className="input-field">
                                        <label>Prénom</label>
                                        <input type="text" name='prenom' id='prenom'value={prenom} onChange={(e)=>setPrenom(e.target.value)} placeholder="Entrez le prénom" required/>
                                    </div>
                                    
                                    <div className="input-field">
                                        <label>Date de naissance</label>
                                        <input type="date" name='date_naiss' id='date_naiss' value={date_naiss} onChange={(e)=>setdate_naiss(e.target.value)} required/>
                                    </div>
                                    <div className="input-field">
                                        <label>Lieu de naissance</label>
                                        <input type="text" name='lieu_naiss' id='lieu_naiss'value={lieu_naiss} onChange={(e)=>setlieu_naiss(e.target.value)} placeholder="Entrez le lieu de Naissance" required/>
                                    </div>
                                    <div className="input-field">
                                        <label>Adresse</label>
                                        <input type="text" name='adresse' id='adresse' value={adresse} onChange={(e)=>setAdresse(e.target.value)} placeholder="Entrez l'adresse" required/>
                                    </div>
                                    <div className="input-field">
                                        <label>Genre</label>
                                        <select name='civ' id='civ' value={civ} onChange={(e)=>setCIV(e.target.value)}>
                                            <option>Choisissez la civilitée</option>
                                            <option value='M'>M</option>
                                            <option value="Mme">Mme</option>
                                            <option value="Mlle">Mlle</option>
                                        </select>
                                    </div>
                                    <div className="input-field">
                                        <label>Mot de passe</label>
                                        <input type="password" name='pass' id='pass' value={pass} onChange={(e)=>setPass(e.target.value)} />
                                    </div>
                                    <div className="input-field">
                                        <label>Email</label>
                                        <input type="email" name='email' id='email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
                                    </div>
                                    <div className="input-field">
                                        <label>Début de contrat</label>
                                        <input type="date" id="ddc" name="ddc" placeholder="Select a date" className="m-control" aria-labelledby="debut contrat" required/>
                                    </div>
                                </div>
                            </div>

                            <div className="details ID"><br/>
                                <span className="title">Détails </span>

                                <div className="fields">
                                    <div className="file">
                                        <label className='fichier'>Photo</label><br/>
                                        
                                        <input type ='file' name='img' id='img'  onChange={(e)=>setImage(e.target.files[0])} className="form-control" />
                                    
                                        <label className='fichier'>CV</label><br/>
                                        
                                        <input type="file" name='cv' id='cv' onChange={(e)=>setCV(e.target.files[0])} className="form-control" />
                                    
                                        <label className='fichier'>CNI</label><br/>
                                       
                                        <input type="file" name='cni' id='cni' onChange={(e)=>setCNI(e.target.files[0])} className="form-control"/>
                                    </div>
                                    
                                </div>

                                
                            <div className='buttons'>
                                <button className='btn btn-secondary' onClick={()=>{navigate('/teachers')}}>Retour</button>
                                <button type='submit' name='submit' onClick={handleSubmit} className="btn btn-primary" >Modifier </button>
                
                            </div>  
                        </div>
                    </div>
                </form>
        </div>
    );
}