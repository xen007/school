// importation des modules
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import config from '../component/config';
// fonction principale
export default function EvalEdit(){
    // declaration des constantes
    const[formvalue,setFormvalue] = useState({
        nom:'',
        matiere:'',
    })
    const {ideval} = useParams()
    useEffect( ()=>{
        // recuperation des données sur la matiere
      const getEval= async()=>{
          const reqdata = await fetch(`${config.apiBaseUrl}/eval.php/`+ideval)
          const resdata = await reqdata.json()

          setFormvalue(resdata)
          }
          getEval()
      },[ideval])
    //   envoie des informations du fomulaire
      const handleSubmit =async(e)=>{
        e.preventDefault()
        if(e.target.value===""){
            setMessage('verifiez les valeurs')
        }else{
        //console.log(formvalue)
        const formData = {
            ideval:ideval,
            nom:formvalue.nom,
            matiere:formvalue.idMat,
           bareme:formvalue.bareme,
           niveau:formvalue.niveau,
        }
        const res = await axios.put(`${config.apiBaseUrl}/eval.php`, formData)
        if(res.data.success){
            setMessage(res.data.success)
            setTimeout(() => {
                navigate('/evaluations')
            }, 2000);
        }
    }
}
    const[subject,setSubjectData] = useState([])
    useEffect( ()=>{
        getSubject()
    },[])
    const getSubject= async()=>{
        const reqdata = await fetch(`${config.apiBaseUrl}/mat.php`)
        const resdata = await reqdata.json()
            setSubjectData(resdata)
            setSubData(resdata)
            console.log(resdata)
        }
// declaration des  constantes et recuperation des matieres
    const navigate = useNavigate()
    const [message,setMessage] = useState('')

    const handleInput =(e) =>{
        setFormvalue({...formvalue,[e.target.name] : e.target.value})
    }
    const[subData,setSubData] = useState([])
    const[enable,setEnable] = useState(true)
    const[text,setText] = useState('Selectionnez d\'abord le niveau')
    const[niveau,setNiveau] = useState([])
    // fonction pour recuperer les donnees de la classe
    useEffect(()=>{
        getNiveau()
    },[])
    const getNiveau=async()=>{
        const req = await  fetch(`${config.apiBaseUrl}/niveau.php/`)
        const res = await req.json()
        setNiveau(res)
    }
    const handleNiveau = async (e)=>{
        const niveauId = e.target.value
        if (niveauId !== "") {
            setSubData(subject.filter(s => s.niv === (e.target.value)))
            setEnable(false)
            setText('Selectionnez la matiere')
            
        }else{
            setText('Selectionnez d\'abord le niveau')
            setSubData([])
            setEnable(true)
        }

        // console.log(niveauId)
    }   
    return(
        
        <main className="main-container">
            <div className="col-md-12 mt-4">
                <h2>Modifier l'evaluation</h2>
                <p className="text-success">{message}</p>
                <form onSubmit={handleSubmit}>
                <div className="col-sm-12">
          
                <div className="row mb-3">
                    
                    <div className="form-group col-md-4">
                    <label className="mb-2">niveau</label>
                    <select name='niveau' id='niveau' value={formvalue.niveau}  onChange={handleNiveau} className="form-control">
                        <option value="">choisissez un niveau</option>
                        {
                        niveau.map((nData, index) =>(
                        <option key={index}  value={nData.id}>{nData.libellee_niveau}</option>
                            )
                        )}
                        
                    </select> 
                    </div>
                    <div className="form-group col-md-4">
                    <label className="mb-2">matiere</label>
                    <select name='matiere' id='matiere' value={formvalue.idMat} disabled={enable}  onChange={handleInput} className="form-control">
                        <option value="">{text}</option>
                        {
                        subData.map((nData, index) =>(
                        <option key={index}  value={nData.idMat}>{nData.nom}</option>
                            )
                        )}
                        
                    </select> 
                    </div>
                    <div className="form-group col-md-4">
                    <label className="mb-2">nom_Evaluation</label>
                    <select name='nom' id='nom' value={formvalue.nom} onChange={handleInput} className="form-control">
                        <option value="">choisissez une valuation</option>
                        <option value="Orale"> Orale</option>
                        <option value="Pratique"> Pratique</option>
                        <option value="Ecrit"> Ecrit</option>
                        <option value="Savoir Etre"> Savoir Etre</option>
                        <option value="Oral"> Oral</option>
                        <option value="Oral"> Practical</option>
                        <option value="Writing"> Writing</option>
                        <option value="Attitude"> Attitude</option>
                        
                    </select>      
                    </div>
                    <div className="form-group col-md-4">
                    <label className="mb-2">bareme</label>
                        <input type="text" className="form-control" name="bareme" id="bareme" value={formvalue.bareme}  onChange={handleInput}/>

                    </div>
                </div>
                    
            </div>
            <div className='buttons'>
                <button className='btn btn-secondary' onClick={()=>{navigate('/evaluations')}}>Retour</button>
                <button type='submit' name='submit' className="btn btn-success">Enregister </button>
               
            </div> 
            </form>

            </div>
        </main>
    )
}