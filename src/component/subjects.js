// importation des diferents modules

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SubAffect from "../undercompo/subAffect";
import { PencilSquare, Plus } from "react-bootstrap-icons";
import config from './config';

export default function Subject(){ //fonction principale
    // declaration de la consrante pour stocker les matieres
  const[subject,setSubData]=useState([])
    // fonction pour recuperer les matieres
    useEffect( ()=>{
        getSubject()
    },[])
    const getSubject= async()=>{
        const reqdata = await fetch(`${config.apiBaseUrl}/mat.php`)
        const resdata = await reqdata.json()
            if(resdata.resultat !== 'Verifiez les informations SVP'){
            const result = resdata.sort((a,b) => a.nom.localeCompare(b.nom))
            setRecord(result) 
            setSubData(result)
            } 
            
        }
    // constante pour stocker les differentes classes
    const[classe,setClData]=useState([])
    // fonction pour recuperer les classes
    useEffect( ()=>{
        getclasse()
    },[])
    const getclasse= async()=>{
        const reqdata = await fetch(`${config.apiBaseUrl}/classe.php`)
        const resdata = await reqdata.json()
        setClData(resdata)
    }
    // declaration des autres constantes
    const[classData,setClassData] = useState([])
    const[niveauData,setNiveauData] = useState([])
    const[enable,setEnable] = useState(true)
    const[text,setText] = useState('Selectionnez d\'abord le niveau')
  
    useEffect( () => {
    const getNiveau = async()=>{
        const reqdata = await fetch(`${config.apiBaseUrl}/niveau.php`)
        const resdata = await reqdata.json()
        // console.log(resdata)
        setNiveauData(resdata)
        }
        getNiveau()
    },[])
  
 
    // autres contantes pour messages et tri

    const[record,setRecord] = useState([])
    const handleTri = (e) =>{
        setRecord(subject.filter(s => s.classe === (e.target.value)))
    }
    const Tri = (e) =>{
        setRecord(subject.filter(s => s.nom.toLowerCase().includes(e.target.value) || s.nom.toUpperCase().includes(e.target.value)))
    }
    // fonction de suppression
    // const handleDelete = async(idMat) =>{
    // const req= await axios.delete(`${config.apiBaseUrl}/mat.php/`+idMat)
    // setMessage(req.data.success)
    //     if(req.data.success){
    //         setMessage(req.data.success)
    //         setTimeout(() => {
    //         getSubject()
    //     }, 2000);
    //     }
    // }
     if (subject.resultat === 'Verifiez les informations SVP') {
        return(
            <main className="main-container">
            <h3>Bienvenu sur la gestion des Matières </h3>
            <div className="col-sm-12">       
          
                      
              </div>
                                         
                    <div className='container'>
                        <div className='row'>
                            <p className='text-danger text-center'></p>
                            <h3><strong>Ajouter une matière</strong> <Link to='/subInsert' className="btn btn-success"><span className="bi bi-plus"></span>Ajouter</Link></h3>
                    
                            <p id='vide'>AUCUNE MATIERE DISPONIBLE POUR L'INSTANT</p>
                        
                        </div>
        
                    </div>
            </main>
        )
        
     } else {
   
        const handleNiveau = async (e)=>{
            const niveauId = e.target.value
            if (niveauId !== "") {
                setRecord(subject.filter(s => s.niv === (e.target.value)))
                setEnable(false)
                setText('Selectionnez la classe')
                setClassData(classe.filter(s => s.niveau === (e.target.value)))
                
            }else{
                setText('Selectionnez d\'abord le niveau')
                setClassData([])
                setEnable(true)
            }
            // console.log(niveauId)
        }
     
    return(
    <main className="main-container">

        <h3>Bienvenu sur la gestion des Matières</h3>
            <div className="col-sm-12">
            
            <div className="row mb-3">
                <div className="form-group col-md-4">
                <label className="mb-2">Niveau</label>
                <select name="niveau" className="form-control" onChange={handleNiveau}>
                <option value="">Selectionnez le Niveau</option>
                    {
                    niveauData.map((nData, index) =>(
                    <option key={index}  value={nData.id}>{nData.libellee_niveau}</option>
                        )
                    )}
                </select>
              </div>
              <div className="form-group col-md-4">
              <label className="mb-2">Classe</label>
              <select name="classe" disabled={enable} onChange={handleTri} className="form-control">
              <option value="">{text}</option>
                {
                classData.map((nData, index) =>(
                <option key={index} value={nData.idClasse}>{nData.libellé_classe}</option>
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
                    <h3><strong>Ajouter une nouvelle matière</strong> <Link to='/subInsert' className="btn btn-success"><Plus /> Ajouter</Link></h3>
                    
                    <table className='table table-striped table-bordered w-auto'>
                        <thead>
                            <tr>
                                <th>Sr No</th>
                                <th>libellé_Matière</th>
                                <th>Niveau</th>
                                <th>Enseignant</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                           
                            {
                                
                                record.map((subData,index) =>(
                                
                                <tr key={index}>
                                <td>{index+1}</td>
                                <td>{subData.nom}</td>
                                <td>{subData.niveau}</td>
                                <td>{subData.nomE}{' '}{subData.prenomE}</td>
                                <td className=''>
                                    <div className="btn-group " role="toolbar" aria-label="Toolbar with button groups">
                                        {/* <div role="group" aria-label="First group">
                                            <Link to={"/subView/"+subData.idMat}   className="btn btn-light mx-2"><i className="bi bi-eye" /></Link>
                                        </div> */}
                                        <div role="group" aria-label="Second group">
                                            <SubAffect data={subData} />
                                        </div>
                                        <div role="group" aria-label="Second group">
                                            <Link to={"/subEdit/"+subData.idMat} className="btn btn-success mx-2"><PencilSquare /></Link>
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