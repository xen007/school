// importation des modules
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import config from '../component/config';
//fonction principale
export default function ClassEdit(){
    // déclaration des constantes
    const[formvalue,setFormvalue] = useState({
        libellé_classe:'',
        niveau:'',
        enseignant:'',
        capacité:'',
        cat:''
    })

    const navigate = useNavigate()
    const {idClasse} = useParams()
    const [message,setMessage] = useState('')
// prise en charge des informations entrées
    const handleInput =(e) =>{
        setFormvalue({...formvalue,[e.target.name] : e.target.value})
    }
    //fonction de récupération des in formations de la classe
    useEffect( ()=>{
      const getClasse= async()=>{
          const reqdata = await fetch(`${config.apiBaseUrl}/classe.php/`+idClasse)
          const resdata = await reqdata.json()
        console.log(resdata)
          setFormvalue(resdata) 
          }
          getClasse()
      },[idClasse])

      const[categ,setCategData] = useState([])
    useEffect( () => {
        const getCateg = async()=>{
        const reqdata = await fetch(`${config.apiBaseUrl}/categCl.php`)
        const resdata = await reqdata.json()
        // console.log(resdata)
        setCategData(resdata)
        }
        getCateg()
    },[])
  
//fonction de soumissions du dormulaire
      const handleSubmit =async(e)=>{
        e.preventDefault()
        if(e.target.value===""){
            setMessage('verifiez les valeurs')
        }else{

        const formData = {
            idClasse:formvalue.idClasse,
            libellé_classe:formvalue.libellé_classe.toUpperCase(),
            capacité:formvalue.capacité,
            niveau:formvalue.niveau,
            enseignant: formvalue.enseignant,
            cat: formvalue.cat,
            filiere: formvalue.filiere,
        }
        const res = await axios.put(`${config.apiBaseUrl}/classe.php`, formData)
        if(res.data.success){
            setMessage(res.data.success)
            setTimeout(() => {
                navigate('/classes')
            }, 2000);
            
        }
    }

    }
    //déclaration et récupération des informations du niveau
    const[niveauData,setNiveauData] = useState([])
    useEffect( () => {
        const getNiveau = async()=>{
        const reqdata = await fetch(`${config.apiBaseUrl}/niveau.php`)
        const resdata = await reqdata.json()
        // console.log(resdata)
        setNiveauData(resdata)
        setNiveau(resdata)
        }
        getNiveau()
    },[])
    const[filiereData,setFiliereData] = useState([])
    useEffect( () => {
        const getFiliere = async()=>{
        const reqdata = await fetch(`${config.apiBaseUrl}/filiere.php`)
        const resdata = await reqdata.json()
        // console.log(resdata)
        setFiliereData(resdata)
        }
        getFiliere()
    },[])

    const[enable,setEnable] = useState(true)
   const[text,setText] = useState('Selectionnez d\'abord la filiere')
   const[niveau,setNiveau] = useState([])
   const handleFiliere = async (e)=>{
    setFormvalue({...formvalue,[e.target.name] : e.target.value})
    const filiereId = e.target.value
    if (filiereId !== "") {
        setNiveau(niveauData.filter(s => s.filiere.includes(e.target.value)))
        setEnable(false)
        setText('Selectionnez le niveau')
        
    }else{
        setText('Selectionnez d\'abord le niveau')
        setNiveau([])
        setEnable(true)
    }
    // console.log(niveauId)
}

    return(
        <main className="main-container">
            <div className="col-md-12 mt-4">
                <h2>Modifier</h2>
                <p className="text-success">{message}</p>
                <form onSubmit={handleSubmit}>
                <div className="col-sm-12">
          
                <div className="row mb-3">
                <div className="form-group col-md-4">
                    <label className="mb-2">Filiere</label>
                    <select name="filiere" className="form-control" value={formvalue.filiere} onChange={(e)=>handleFiliere(e)}>
                    <option value="">Selectionnez la Filiere</option>
                        {
                        filiereData.map((nData, index) =>(
                        <option key={index}  value={nData.id}>{nData.libellee_filiere}</option>
                            )
                        )}
                    </select>
                    </div>
                    <div className="form-group col-md-4">
                    <label className="mb-2">Niveau</label>
                    <select name="niveau" className="form-control" disabled={enable} value={formvalue.niveau} onChange={handleInput}>
                    <option value="">{text}</option>
                        {
                        niveau.map((nData, index) =>(
                        <option key={index}  value={nData.id}>{nData.libellee_niveau}</option>
                            )
                        )}
                    </select>
                    </div>
                    <div className="form-group col-md-4">
                    <label className="mb-2">libellé_Classe</label>
                    <input type="text" className="form-control" name="libellé_classe" id="libellé_classe" value={formvalue.libellé_classe} onChange={handleInput} />
                    </div>
                 
                    <div className="form-group col-md-4">
                    <label className="mb-2">Capacité_Acceuil</label>
                        <input type="number" className="form-control" name="capacité" id="capacité" value={formvalue.capacité}  onChange={handleInput}/>
                    </div>

                    <div  className="form-group col-md-4">
                    <label className="mb-2">categorie</label>
                    <select name="cat" className="form-control" value={formvalue.cat} onChange={handleInput}>
                    <option value="">Selectionnez la categorie</option>
                        {
                        categ.map((nData, index) =>(
                        <option key={index}  value={nData.id}>{nData.libellee}  ({nData.des})</option>
                            )
                        )}
                    </select>
                    </div>
                </div>
                    
            </div>
            <div className='buttons'>
                <button className='btn btn-secondary' onClick={()=>{navigate('/classes')}}>Retour</button>
                <button type='submit' name='submit' className="btn btn-success">Modifier </button>
               
            </div> 
            </form>

            </div>
        </main>
    )
}