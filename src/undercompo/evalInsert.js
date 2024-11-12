// importation des modules
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// fonction principale
export default function EvalInsert(){
    // declaration des constantes
    const[formvalue,setFormvalue] = useState({
        nom:'',
        matiere:'',
        bareme:'',
    })
    const[subject,setSubjectData] = useState([])
    useEffect( ()=>{
        getSubject()
    },[])
    const getSubject= async()=>{
        const reqdata = await fetch("http://localhost/ssm/api/mat.php")
        const resdata = await reqdata.json()
            setSubjectData(resdata)
        }
// declaration des  constantes et recuperation des matieres
    const navigate = useNavigate()
    const [message,setMessage] = useState('')

    const handleInput =(e) =>{
        setFormvalue({...formvalue,[e.target.name] : e.target.value})
    }
    // envoie des informations du formulaire
    const handleSubmit =async(e)=>{
        e.preventDefault()
        //console.log(formvalue)
        const formData = {
            nom:formvalue.nom,
            matiere:formvalue.matiere,
           bareme:formvalue.bareme,
           niveau:formvalue.niveau,
            
        }
        const res = await axios.post('http://localhost/ssm/api/eval.php', formData)
        if(res.data.success){
            setMessage(res.data.success)
            setTimeout(() => {
                navigate('/evaluations')
            }, 2000);    
        }
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
        const req = await  fetch('http://localhost/ssm/api/niveau.php/')
        const res = await req.json()
        setNiveau(res)
    }
    const handleNiveau = async (e)=>{
        const niveauId = e.target.value
        if (niveauId !== "") {
            setSubData(subject.filter(s => s.niv === (e.target.value)))
            setEnable(false)
            setText('Selectionnez la matiere')
            setFormvalue({...formvalue,[e.target.name] : e.target.value})
            
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
                <h2>Ajouter une evaluation</h2>
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
                    <select name='matiere' id='matiere' disabled={enable}  onChange={handleInput} className="form-control">
                        <option value="">{text}</option>
                        {
                        subData.map((nData, index) =>(
                        <option key={index}  value={nData.id}>{nData.nom}</option>
                            )
                        )}
                        
                    </select> 
                    </div>
                    <div className="form-group col-md-4">
                    <label className="mb-2">nom_Evaluation</label>
                    <select name='nom' id='nom'  onChange={handleInput} className="form-control">
                        <option value="">choisissez une valuation</option>
                        <option value="Oral"> Oral</option>
                        <option value="Ecrit/ Writing"> Ecrit/Writing</option>
                        <option value="Pratique/ Practical"> Pratique/ Practical</option>
                        <option value="Savoir Etre/ Attitude"> Savoir Etre/Attitude</option>
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