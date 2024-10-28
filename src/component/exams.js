// importation des diferents modules
import React, {useEffect, useState,useRef } from 'react'
// import {Link} from 'react-router-dom'
// import SeeBulls from '../undercompo/seebulls'
import Bull from '../component/bulls'
import '../undercompo/mod.css'
import { useReactToPrint } from "react-to-print";

export default function Notes(){//creation de la fonction principaae
    //declaration de la variable pour stocker les notes
    const[noData, setnoData] = useState([])
    useEffect( ()=> {
        getnoData()
    },[])
    const getnoData = async() =>{
        const requestData = await fetch("http://localhost/ssm/api/pie.php")
        const responseData = await requestData.json()
        setnoData(responseData)
        setRecord(responseData)  
    }
    let n = 0
    noData.sort((a,b) => {
        
        if(a.moy > b.moy){
        return -1;
        }
        return n++
    })
    
   
    // declaration de differentes constates
    const[classe,setClData]=useState([])
    const[classData,setClassData] = useState([])
    const[niveauData,setNiveauData] = useState([])
    const[enable,setEnable] = useState(true)
    const[text,setText] = useState('Selectionnez d\'abord le niveau')
    // fonction pour recuperer les niveaux
      useEffect( () => {
        const getNiveau = async()=>{
            const reqdata = await fetch("http://localhost/ssm/api/niveau.php")
            const resdata = await reqdata.json()
            // console.log(resdata)
            setNiveauData(resdata)
          }
          
        getNiveau()
        // fontion pour recuperer les classes
        const getclasse= async()=>{
            const reqdata = await fetch("http://localhost/ssm/api/classe.php")
            const resdata = await reqdata.json()
            setClData(resdata)
        }
        getclasse()
      },[])
    //  fonction de tri a partir du niveau
      const handleNiveau = async (e)=>{
          const niveauId = e.target.value
          if (niveauId !== "") {
              setClassData(classe.filter(s => s.niveau.includes(e.target.value)))
              setEnable(false)
              setText('Selectionnez la classe')
              
          }else{
              setText('Selectionnez d\'abord le niveau')
              setClassData([])
              setEnable(true)
          }
          // console.log(niveauId)
      }
      const componentPdf = useRef()
      const generatePdf = useReactToPrint({
        content: ()=>componentPdf.current,
        documentTitle: "Userdata",
        onAfterPrint:()=>alert("data saved  ")
      })
  
    
    const[record,setRecord] = useState([])
    // tri a partir de la classe
    const handleTri = (e) =>{
        setRecord(noData.filter(s => s.idcl.includes(e.target.value)))
    }
    const Tri = (e) =>{ //tri a aprtir du nom de l'eleve
        setRecord(noData.filter(s => s.nom.toLowerCase().includes(e.target.value)))
    }
    
    return(
        <main className='main-container'>
            <h3>Welcome to Student Management</h3>
            <div className="col-sm-12">
          
            <div className="row mb-3">
                <div className="form-group col-md-4">
                <label className="mb-2">Level</label>
                <select name="niveau" className="form-control" onChange={(e)=>handleNiveau(e)}>
                <option value="">Select the Level</option>
                    {
                    niveauData.map((nData, index) =>(
                    <option key={index}  value={nData.id}>{nData.libellé_niveau}</option>
                        )
                    )}
                </select>
              </div>
              <div className="form-group col-md-4">
              <label className="mb-2">Class</label>
              <select name="classe" disabled={enable} onChange={handleTri} className="form-control">
              <option value="">{text}</option>
                {
                classData.map((nData, index) =>(
                <option key={index} value={nData.idClasse} >{nData.libellé_classe}</option>
                    )
                )}
                </select>
              </div>
              <div className="form-group col-md-4">
              <label className="mb-2">Searche</label>
              <input type="text" placeholder="Tapez le nom" aria-label="Search" onChange={Tri} className="form-control" />
              </div>
              <div role="group" aria-label="Second group">
              <button className="btn btn-success" onClick={generatePdf}>Print</button>
            </div>
           </div>
      </div>
                                 
            <div className='container'>
                <div className='row' ref={componentPdf} style={{width:'100%',padding:'0px 12px'}}>  
                    <table className='table table-striped table-bordered w-auto'>
                        <thead>
                            <tr>
                                <th>Sr No</th>
                                <th>Matricule</th>
                          
                            </tr>
                        </thead>
                        <tbody>
                
                            { //afficher les donnees recuperes
                                record.map((no,index) =>(
                                <tr key={index}>
                                <td>{index+1}</td>
                                <td>{no.matricule}</td>
                                
                                <td className=''>
                                    <div className="btn-group " role="toolbar" aria-label="Toolbar with button groups">
                                            <Bull data={no} num={index+1}/>
                                    </div>
                                </td>
                                </tr>
                                ))
                            }
                        </tbody>


                    </table>
                
                </div>

            </div>
              
            {/* <div className="modal fade" id="userForm">
                {<StudView />}
            </div> */}
   
        </main>
    )
}