// importation des diferents modules

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { PencilSquare, Plus } from "react-bootstrap-icons";

export default function Evaluation(){ //fonction principale
    // declaration de la consrante pour stocker les matieres
  const[subject,setSubjectData]=useState([])
  const[evaluation,setEvalData]=useState([])
  const[subData,setSubData] = useState([])
  const[enable,setEnable] = useState(true)
    const[text,setText] = useState('Selectionnez d\'abord le niveau')
    
  
  const[record,setRecord] = useState([])
    // fonction pour recuperer les matieres
    useEffect( ()=>{
        getSubject()
        getEval()
    },[])
    const getSubject= async()=>{
        const reqdata = await fetch("http://localhost/ssm/api/mat.php")
        const resdata = await reqdata.json()
            // if(resdata.resultat !== 'Verifiez les informations SVP'){
            // const result = resdata.sort((a,b) => a.niv.localeCompare(b.niv))
            // setRecord(result) 
            // } 
            setSubjectData(resdata)
            
    }
    const getEval= async()=>{
        const reqdata = await fetch("http://localhost/ssm/api/eval.php")
        const resdata = await reqdata.json()
            if(resdata.resultat !== 'Verifiez les informations SVP'){
            const result = resdata.sort((a,b) => a.niveau.localeCompare(b.niveau))
            setRecord(result) 
            } 
            setEvalData(resdata)
            setRecord(resdata)
            
    }
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
  
    // autres contantes pour messages et tri
    
     if (evaluation.resultat === 'Verifiez les informations SVP') {
        return(
            <main className="main-container">
            <h3>Bienvenu sur la gestion des Evaluations </h3>
            <div className="col-sm-12">       
          
                      
              </div>
                                         
                    <div className='container'>
                        <div className='row'>
                            <p className='text-danger text-center'></p>
                            <h3><strong>Ajouter une Evaluation</strong> <Link to='/evalInsert' className="btn btn-success"><span className="bi bi-plus"></span>Ajouter</Link></h3>
                    
                            <p id='vide'>AUCUNE EVALUATION DISPONIBLE POUR L'INSTANT</p>
                        
                        </div>
        
                    </div>
            </main>
        )
        
     } else {
    const handleTri = (e) =>{
        setRecord(evaluation.filter(s => s.idMat === (e.target.value)))
    }
    const Tri = (e) =>{
        setRecord(evaluation.filter(s => s.nom.toLowerCase().includes(e.target.value) || s.nom.toUpperCase().includes(e.target.value)))
    }
    
    
    const handleNiveau = async (e)=>{
        const niveauId = e.target.value
        if (niveauId !== "") {
            setSubData(subject.filter(s => s.niv === (e.target.value)))
            setEnable(false)
            setText('Selectionnez la matiere')
            setRecord(evaluation.filter(s => s.niveau === (e.target.value)))
            
        }else{
            setText('Selectionnez d\'abord le niveau')
            setSubData([])
            setEnable(true)
        }

        // console.log(niveauId)
    }   
        
     
    return(
    <main className="main-container">

        <h3>Bienvenu sur la gestion des Evaluations</h3>
            <div className="col-sm-12">
            
            <div className="row mb-3">
            <div className="form-group col-md-4">
                <label className="mb-2">niveau</label>
                <select name='niveau' id='niveau' onChange={handleNiveau} className="form-control">
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
              <select name="matiere" disabled={enable} onChange={handleTri} className="form-control">
              <option value="">{text}</option>
                {
                subData.map((nData, index) =>(
                <option key={index} value={nData.idMat} >{nData.nom}</option>
                    )
                )}
                </select>
              </div>
              <div className="form-group col-md-4">
              <label className="mb-2">Rechercher</label>
              <input type="search" placeholder="Tapez le nom" aria-label="Search" onChange={Tri} className="form-control" />
              </div> 
           </div>
              
      </div>
                                 
            <div className='container'>
                <div className='row'>
                    <p className='text-danger text-center'></p>
                    <h3><strong>Ajouter une nouvelle evaluation</strong> <Link to='/evalInsert' className="btn btn-success"><Plus /> Ajouter</Link></h3>
                    
                    <table className='table table-striped table-bordered w-auto'>
                        <thead>
                            <tr>
                                <th>Sr No</th>
                                <th>matiere</th>
                                <th>Evaluation</th>
                                <th>bareme</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                           
                            {
                                
                                record.map((subData,index) =>(
                                
                                <tr key={index}>
                                <td>{index+1}</td>
                                <td>{subData.matiere}</td>
                                <td>{subData.nom}</td>
                                <td>{subData.bareme}</td>
                                <td className=''>
                                    <div className="btn-group " role="toolbar" aria-label="Toolbar with button groups">
                                        {/* <div role="group" aria-label="First group">
                                            <Link to={"/subView/"+subData.idMat}   className="btn btn-light mx-2"><i className="bi bi-eye" /></Link>
                                        </div> */}
                                       
                                        <div role="group" aria-label="Second group">
                                            <Link to={"/evalEdit/"+subData.ideval} className="btn btn-success mx-2"><PencilSquare /></Link>
                                        </div>
                                        {/* <div  role="group" aria-label="Third group">
                                            <button onClick={()=> handleDelete(subData.idMat)} className="btn  btn-danger mx-2"><Trash /></button>       
                                        </div> */}
                       
                                    </div>
                                </td>
                                </tr>
                                ))
                            }
                        </tbody>


                    </table>
                
                </div>

            </div>
    </main>
  )
}
}