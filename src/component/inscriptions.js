// importation des differents modules
import React, { useEffect, useRef, useState } from 'react'
import ScoAdd from '../undercompo/scoAdd';
import { FaCheck } from 'react-icons/fa';
import PdfTemplate from '../undercompo/Template';
import ReactToPrint from "react-to-print";
import { PrinterFill } from 'react-bootstrap-icons';
import InsAdd from '../undercompo/insAdd';
export default function Inscriptions(){//creation de la fonction principaae
     //declaration de la variable pour stocker les celeves recuperes
     const[studentData,setStudentData] = useState([])
     const[insData,setInsData] = useState([])
     const[sco,setScoData] = useState([])
     
     // fonction pour recuperer les donnees de la classe
     useEffect( ()=>{
         getStudentData()
        
         getScoData()
     },[])

   
  
     const getScoData =async()=>{
         const req= await fetch("http://localhost/ssm/api/sco.php")
         const res = await req.json()
         if(res.resultat !== 'Verifiez les informations SVP'){
            const result = res.sort((a,b) => a.nom.localeCompare(b.nom))
            setScoData(result)
            } 
         
     }
    
     const getStudentData = async() =>{
         const requestData = await fetch("http://localhost/ssm/api/l.php")
         const responseData = await requestData.json()
         if(responseData.resultat !== 'Verifiez les informations SVP'){
            const result = responseData.sort((a,b) => a.nom.localeCompare(b.nom))
            setStudentData(result)
            } 
     }
 
     const[classe,setClData]=useState([])
     // fonction pour recuperer les classes
     useEffect( ()=>{
         getclasse()
     },[])
     const getclasse= async()=>{
         const reqdata = await fetch("http://localhost/ssm/api/classe.php")
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
         const reqdata = await fetch("http://localhost/ssm/api/niveau.php")
         const resdata = await reqdata.json()
         // console.log(resdata)
         setNiveauData(resdata)
         }
         getNiveau()
     },[])
   
     const handleNiveau = async (e)=>{
         const niveauId = e.target.value
         if (niveauId !== "") {
             setClassData(classe.filter(s => s.niveau === (e.target.value)))
             setEnable(false)
             setText('Selectionnez la classe')
         }else{
             setText('Selectionnez d\'abord le niveau')
             setClassData([])
             setEnable(true)
         }
         // console.log(niveauId)
     }
     // autres contantes pour messages et tri
 
     const[record,setRecord] = useState([])
     const handleTri = (e) =>{
         setRecord(insData.filter(s => s.classe === (e.target.value)))
     }
     const Tri = (e) =>{
         setRecord(insData.filter(s => s.nom.toLowerCase().includes(e.target.value) || s.nom.toUpperCase().includes(e.target.value)))
     }
     const handleInscrits = (()=>{
      const getInsData =async()=>{
        const req= await fetch("http://localhost/ssm/api/ins.php")
        const res = await req.json()
        if(res.resultat !== 'Verifiez les informations SVP'){
            const result = res.sort((a,b) => a.nom.localeCompare(b.nom))
            setInsData(result)
            setRecord(result)
            } 
        
    }
        getInsData()
 
     })
     const handleNonInscrits = (()=>{

      // const compareArrays = (arr1, arr2) => {
      //   const onlyInFirst = arr1.filter(obj1 => !arr2.some(obj2 => obj1.nom === obj2.nom));
      //   const onlyInSecond = arr2.filter(obj2 => !arr1.some(obj1 => obj1.nom === obj2.nom));
      //   return { onlyInFirst, onlyInSecond };
      // };
      const getNonInsData =async()=>{
        const req= await fetch("http://localhost/ssm/api/ins.php")
        const res = await req.json()
        setInsData(studentData.filter(obj1 => !res.some(obj2 => obj1.matricule === obj2.matricule)))
        setRecord(studentData.filter(obj1 => !res.some(obj2 => obj1.matricule === obj2.matricule)))
    }
         getNonInsData()

    })       
    let componentPdf = useRef()

    
    if (insData.resultat === 'Verifiez les informations SVP') {
        return(
            <main className="main-container">
            <h3>Bienvenu sur la gestion des Inscriptions </h3>
            <div className="col-sm-12">    
              </div>         
                    <div className='container'>
                        <div className='row'>
                            <p id='vide'>AUCUNE INSCRIPTION EN COURS</p>
                        </div>
                    </div>
            </main>
        )
    } else {

    return(
        
    <main className='main-container'>

        <h3>Bienvenu sur la gestion des Inscriptions</h3>

        <div className="col-sm-12">
            
            <div className="row mb-3">
                <div className="form-group col-md-4">
                <label className="mb-2">Niveau</label>
                <select name="niveau" className="form-control" onChange={(e)=>handleNiveau(e)}>
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
                <option key={index} >{nData.libellé_classe}</option>
                    )
                )}
                </select>
              </div>
              <div className="form-group col-md-4">
              <label className="mb-2">Rechercher</label>
              <input type="search" placeholder="Tapez le nom" aria-label="Search" onChange={Tri} className="form-control" />
              </div> 
              <div className="btn-group col-md-4" role="group" aria-label="Basic outlined example">
                <button type="button" className="btn btn-outline-primary" onClick={handleInscrits}>Inscrits</button>
                <button type="button" className="btn btn-outline-primary" onClick={handleNonInscrits}>non inscrits</button>
            </div>
            <div className="btn-group col-md-4" role="group">
              <ReactToPrint
                trigger={() => 
                    <button className="btn btn-success"> <PrinterFill /> Imprimer</button>
                }
                content={() => componentPdf}
                />
           </div>
           </div>
           
            
      </div>
      
        <h3><strong>Liste des élèves</strong></h3>
                                
        <table style={{width:'100%',padding:'0px 12px'}} className='table table-striped table-bordered w-auto'>
            <thead>
                <tr>
                   <th>Sr No</th>
                   <th>Matricule</th>
                   <th>Nom</th>
                   <th>Classe</th>
                   <th>Versé</th>
                   <th>Reste</th>
                   <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {//affichage des donnees recuperes de la bd
                record.map((stuData,index)=>(
                <tr key={index}>
                    <td>{index+1}</td>
                    <td>{stuData.matricule}</td>
                    <td>{stuData.nom}</td>
                    <td>{stuData.classe}</td>
                    <td>{stuData.montant} FCFA </td>
                    <td>{stuData.reste} FCFA </td>
                    <td>       {
                             sco.resultat === 'Verifiez les informations SVP' ? 
                             <div className="btn-group " role="toolbar" aria-label="Toolbar with button groups">
                             <div role="group" aria-label="First group">
                                <div className='btn'><ScoAdd data={stuData} /></div>
                             </div>
                             <div  role="group" aria-label="Third group">
                                 <PdfTemplate data={stuData}/> 
                             </div>
                            </div>: 
                             sco.find((el)=> el.matricule === stuData.matricule)?
                             <div className="btn-group " role="toolbar" aria-label="Toolbar with button groups">
                             <div role="group" aria-label="First group">
                                 <div className='btn' style={{color: 'green',fontSize:'15px'} }><FaCheck /></div>
                             </div>
                             <div  role="group" aria-label="Third group">
                                 <PdfTemplate data={stuData}/> 
                             </div>
                            </div>:
                            insData.find((el)=> el.matricule !== stuData.matricule) ?<div className="btn-group " role="toolbar" aria-label="Toolbar with button groups">
                            <div role="group" aria-label="First group">
                                <ScoAdd data={stuData} />        </div>
                           </div>:<div></div> 
   
                        }    
                    </td>
                </tr>
                )) 
                    
                }
            </tbody>
        </table>
        
        <div  style={{ display: "none" }}>
        <table  ref={(el) => (componentPdf = el)} style={{width:'100%',padding:'0px 12px',fontSize:'10px'}}  className='table table-striped table-bordered w-auto'>
            <thead>
                <tr>
                   <th>Sr No</th>
                   <th>Matricule</th>
                   <th>Nom</th>
                   <th>Classe</th>
                   <th>Versé</th>
                   <th>Reste</th>
                </tr>
            </thead>
            <tbody>
                {//affichage des donnees recuperes de la bd
                record.map((stuData,index)=>(
                <tr key={index}>
                    <td>{index+1}</td>
                    <td>{stuData.matricule}</td>
                    <td>{stuData.nom}</td>
                    <td>{stuData.classe}</td>
                    <td>{stuData.montant} FCFA </td>
                    <td>{stuData.reste} FCFA </td>
                </tr>
                )) 
                    
                }
            </tbody>
        </table>
        </div>
    </main>
    )
}
}