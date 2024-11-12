// importation des modules
import React, { useState, useEffect } from 'react'
import axios from "axios"
import {useNavigate, useParams} from 'react-router-dom'
import WebcamCapture from './webcam'
// fonction principale
export default function StudInsert(){
    // déclaration des contantes
    const[formvalue,setFormvalue] = useState({
        matricule:'',
        nom:'',
        prenom:'',
        dateNaiss:'',
        lieuNaiss:'',
        adresse:'',
        genre:'',
        tuteur:'',
        phone:'',
        ptuteur:'',
        mere:'',
        pmere:'',
        phoneM:'',
        niveau:'',
        classe:'',
        redoublant:'',
        scolaire:'',
        message:'',
        })

        const[photoVal,setPhotoVal] = useState({
            photo:'',
            })
    const[message,setMessage] = useState('')
    const navigate= useNavigate()
    const {matricule} = useParams()
    // prise en charge des entrées de l'utilisateur
    const handleInput =(e) =>{
        setFormvalue({...formvalue,[e.target.name] : e.target.value})
    }
    // gérer les informations de la photo
    const handlePhoto =(e) =>{
        setPhotoVal({[e.target.name] : e.target.files[0]})
    }
    useEffect( () => {
        // recupère et affiche les informations de l'élève
        const userRowdata = async() =>{
            const getUserdata = await fetch("http://localhost/ssm/api/l.php/"+matricule)
            const resuserdata = await getUserdata.json()
            // console.log(resuserdata)
            setFormvalue(resuserdata)
            setPhotoVal(resuserdata)
           
        }
        userRowdata()
    },[matricule])
    //envoi des informations concernant l'elève
    const uploadStudent = async()=>{
        const formData = new FormData()
        formData.append('nom',formvalue.nom)
        formData.append('prénom', formvalue.prenom)
        formData.append('dateNaiss',formvalue.dateNaiss)
        formData.append('lieuNaiss',formvalue.lieuNaiss)
        formData.append('adresse', formvalue.adresse)
        formData.append('genre',formvalue.genre)
        formData.append('tuteur',formvalue.tuteur)
        formData.append('phone', formvalue.phone)
        formData.append('ptuteur', formvalue.ptuteur)
        formData.append('mere', formvalue.mere)
        formData.append('pmere', formvalue.pmere)
        formData.append('phoneM', formvalue.phoneM)
        formData.append('infoSup',formvalue.infoSup)
        formData.append('photo',photoVal.photo)
        formData.append('matricule', formvalue.matricule)
        formData.append('niveau',formvalue.niveau)
        formData.append('classe',formvalue.classe)
        formData.append('redoublant',formvalue.redoublant)
        formData.append('scolaire', formvalue.scolaire)
    
        
        const response = await axios.post('http://localhost/ssm/api/u.php',formData,{
            headers:{"Content-Type": "multipart/form-data"},
        })

        if(response.data.success){
            setMessage(response.data.success)
            setTimeout(() => {
                navigate('/students')
            }, 2000);
        }
    }
//envoi des informations du formulaire
    const handleSubmit = async(e) =>{
        e.preventDefault()
         await uploadStudent()
         console.log(photoVal.photo)
    } 
    /* recuperation des select */
  
// declaration des constantes pour récuperer et afficher les informations dans les selects
        const[clData,setClData]=useState([])
        const[classData,setClassData] = useState([])
        const[niveauData,setNiveauData] = useState([])
        const[enable,setEnable] = useState(true)
        const[text,setText] = useState('Selectionnez d\'abord le niveau')
 
        useEffect( () => {
            const getNiveau = async()=>{
                const reqdata = await fetch("http://localhost/ssm/api/niveau.php")
                const resdata = await reqdata.json()
                // console.log(resdata)
                setNiveauData(resdata)
            }
            getNiveau()
            const getclasse= async()=>{
                const reqdata = await fetch("http://localhost/ssm/api/classe.php")
                const resdata = await reqdata.json()
                setClData(resdata)
                }
                getclasse()
          },[])
        //   fonction de tri des classes en fonction du niveau
          const handleNiveau = async (e)=>{
              setFormvalue({...formvalue,[e.target.name] : e.target.value})
              const niveauId = e.target.value
              
              if (niveauId !== "") {
                  setClassData(clData.filter(s => s.niveau === (e.target.value)))
                  setEnable(false)
                  setText('Selectionnez la classe')      
              }else{
                  setText('Selectionnez d\'abord le niveau')
                  setClassData([])
                  setEnable(true)
              }
      
              // console.log(niveauId)
          }

    return(
        <main className="main-container"> 
            <div className="container">
            <p className='text-success text-center'>{message}</p>
            <header>Modification</header>
                <form onSubmit={handleSubmit}>
                    <div className="form first">
                    <div className="details personnal">
                            <span className="title">Details Personnels</span>

                            <div className="fields">
                                
                                <div className="input-field">
                                    <label>Nom</label>
                                    <input type="text" name='nom' id='nom' value={formvalue.nom} onChange={ handleInput} placeholder="Entrez le nom" />
                                </div>
                                <div className="input-field">
                                    <label>Prénom</label>
                                    <input type="text" name='prenom' id='prenom'value={formvalue.prenom} onChange={ handleInput} placeholder="Entrez le prénom"/>
                                </div>
                                <div className="input-field">
                                    <label>Date de Naissane</label>
                                    <input type="date" name='dateNaiss' id='dateNaiss' value={formvalue.dateNaiss} onChange={ handleInput} />
                                </div>
                                <div className="input-field">
                                    <label>Lieu de Naissance</label>
                                    <input type="text" name='lieuNaiss' id='lieuNaiss'value={formvalue.lieuNaiss} onChange={ handleInput} placeholder="Entrez le lieu de Naissance" />
                                </div>
                                <div className="input-field">
                                    <label>Adresse</label>
                                    <input type="text" name='adresse' id='adresse' value={formvalue.adresse} onChange={ handleInput}placeholder="Entrez l'adresse" />
                                </div>
                                <div className="input-field">
                                    <label>Genre</label>
                                    <select name='genre' id='genre'value={formvalue.genre} onChange={ handleInput}>
                                        <option>Selectionnez le genre</option>
                                        <option value='M'>M</option> 
                                        <option value="F">F</option>
                                    </select>
                                </div>
                                <div className="input-field">
                                    <label>Nom Tuteur</label>
                                    <input type="text" name='tuteur' id='tuteur' value={formvalue.tuteur} onChange={ handleInput} placeholder="nom du tuteur" />
                                </div>
                                <div className="input-field">
                                    <label>Numéro Tuteur</label>
                                    <input type="number" name='phone' id='phone' value={formvalue.phone} onChange={ handleInput} placeholder="numéro tuteur" />
                                </div>
                                <div className="input-field">
                                    <label>Profession Tuteur</label>
                                    <input type="text" name='ptuteur' id='ptuteur' value={formvalue.ptuteur} onChange={ handleInput} placeholder="numéro tuteur" />
                                </div>
                                <div className="input-field">
                                    <label>Nom de la mere</label>
                                    <input type="text" name='mere' id='mere' value={formvalue.mere} onChange={ handleInput} placeholder="numéro tuteur" />
                                </div>
                                <div className="input-field">
                                    <label>Numéro Mere</label>
                                    <input type="number" name='phoneM' id='phoneM' value={formvalue.phoneM} onChange={ handleInput} placeholder="numéro tuteur" />
                                </div>
                                <div className="input-field">
                                    <label>Profession mere</label>
                                    <input type="text" name='pmere' id='pmere' value={formvalue.pmere} onChange={ handleInput} placeholder="numéro tuteur" />
                                </div>
                                <div className="input-field">
                                    <label>Autres Informations</label>
                                    <textarea name='infoSup' rows='4' value={formvalue.infoSup} onChange={ handleInput} />
                                </div>
                                <div className="">
                                    <label>Prendre une Photo </label>
                                    <WebcamCapture  
                                    mat = {matricule}
                                    /> 
                                </div>
                                <div className='file'>
                                    <label>Photo d'Identité</label>
                                    <input type ='file' name='photo' id='photo'  onChange={handlePhoto} className="form-control"></input>
                                </div>
                                
                            </div>
                        </div>

                        <div className="details ID">
                            <span className="title">Informations Scolaire</span>

                            <div className="fields">
                                <div className="input-field">
                                    <label>Matricule</label>
                                    <input type="text" name='matricule' id='matricule' value={formvalue.matricule} onChange={handleInput} readOnly/>
                                </div>
                                <div className="input-field">
                                    <label>Niveau de Classe</label>
                                    <select name='niveau' id='niveau' value={formvalue.niveau} onChange={ handleNiveau} >
                                        <option value="">Selectionnez le niveau</option>
                                        {
                                        niveauData.map((nData, index) =>{
                                            return (<option key={index}  value={nData.id}>{nData.libellee_niveau}</option> ) 
                                        }
                                      
                                    ) }
                                   
                                    </select></div>
                                <div className="input-field">
                                    <label>Classe</label>
                                    <select name='classe' id='classe' value={formvalue.classe} disabled={enable}  onChange={ handleInput} >
                                    <option>{text}</option>
                                    {
                                        classData.map((cData,index) =>{
                                                 return <option key={index}  value={cData.idClasse}>{cData.libellé_classe}</option>
                                        }
                                      
                                    ) }
                                    </select>   
                                    </div>
                                <div className="input-field">
                                <label>Redoublant</label>
                                    <select name='redoublant' id='redoublant' value={formvalue.redoublant} onChange={handleInput}>
                                    <option value="non" >Non</option>    
                                    <option value="oui" >Oui</option>    
                                    </select>
                                </div>
                                <div className="input-field">
                                <label>Année Scolaire</label>
                                    <select name='scolaire' id='scolaire' value={formvalue.scolaire} onChange={handleInput}>
                                      <option   value="2024-2025">2024-2025</option>    
                                    </select>
                                </div>
                                
                            </div>
                        </div>
                        <div className='buttons'>
                            <button className='btn btn-secondary' onClick={()=>{navigate('/students')}}>Retour</button>
                            <button type='submit' name='submit' className="btn btn-success">Modifier </button>
               
                        </div>  
                     </div>
            
                </form>
            </div>
        </main>
    )
}
