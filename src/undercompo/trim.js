// importation des diferents modules
import React, {useEffect, useState,useRef } from 'react'
import '../undercompo/mod.css'
import { useReactToPrint } from "react-to-print";
import { useParams } from 'react-router-dom';
import Bullt from '../component/bullt';
import { PrinterFill } from 'react-bootstrap-icons';
import { format } from "date-fns";

export default function Notes(){//creation de la fonction principaae
    //declaration de la variable pour stocker les notes
    const[noData, setnoData] = useState([])
    const {nt} = useParams()
    useEffect( ()=> {
    const getnoData = async() =>{
        const requestData = await fetch("http://localhost/ssm/api/trim.php/?" + new URLSearchParams({
            nt: nt,
        }).toString())
        // recupération du résultat
          const responseData = await requestData.json()
        setnoData(responseData)
        setRecord(responseData)  
    }
    getnoData()
},[nt])
   
    
   
    // declaration de differentes constates
    const[date,setDate] = useState([])
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
      
      const data = 'trimestre'
      const id = nt
      useEffect( ()=>{ 
        const getdate= async()=>{
            const reqdata = await fetch("http://localhost/ssm/api/dates.php/?" + new URLSearchParams({
                id:id,
                tab : data
            }).toString())
            const resdata = await reqdata.json()
            setDate(resdata)
        }
        getdate()
    },[id,data])
    let dte = new Date()
   const formdate = format(dte,"yyyy-MM-dd")
  
       

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
      })

    const[record,setRecord] = useState([])
    // tri a partir de la classe
    const handleTri = (e) =>{
        setRecord(noData.filter(s => s.idcl.includes(e.target.value)))
    }
    const Tri = (e) =>{ //tri a aprtir du nom de l'eleve
        setRecord(noData.filter(s => s.nom.toLowerCase().includes(e.target.value)))
    }

    if ((noData.resultat === 'Verifiez les informations SVP' )|| (date.debut == null && date.fin == null) || (formdate < date.debut  || formdate > date.fin)) {
        return(
            <main className="main-container">
                <h3>Bienvenu sur la gestion des Bulletins </h3>
            <div className="col-sm-12">      
              </div>    
                    <div className='container'>
                        <div className='row'>
                            <p id='vide'>AUCUN BULLETIN DISPONIBLE... VEUILLEZ REMPLIR LES NOTES</p>
                        </div>
                    </div>
            </main>
        )
    } else{
        
        let n = 0
        noData.sort((a,b) => {
            
            if(a.moy > b.moy){
            return -1;
            }
            return n++
        })
    return(
        
        <main className='main-container'>
            <h3>Bienvenu sur la page des bulletins</h3>
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
                <option key={index} value={nData.idClasse} >{nData.libellé_classe}</option>
                    )
                )}
                </select>
              </div>
              <div className="form-group col-md-4">
              <label className="mb-2">Rechercher</label>
              <input type="text" placeholder="Tapez le nom" aria-label="Search" onChange={Tri} className="form-control" />
              </div>
              <div role="group" aria-label="Second group">
              <button className="btn btn-success" onClick={generatePdf}> <PrinterFill/> Imprimer</button>
            </div>
           </div>

              
      </div>                 
            <div className='container'>
                <div className='row' >  
                    <table className='table table-striped table-bordered w-auto'>
                        <thead>
                            <tr>
                             
                            </tr>
                        </thead>
                        {/* <tbody ref={componentPdf} style={{width:'100%',padding:'0px 12px'}}>
                
                            { //afficher les donnees recuperes
                                record.map((no,index) =>(
                                <tr key={index}>
                                <td>{index+1}</td>
                                <td>{no.matricule}</td>
                                
                                <td className=''>
                                    <div className="btn-group " role="toolbar" aria-label="Toolbar with button groups">
                                            <Bullt data={no} num={index+1} nt={nt}/>
                                    </div>
                                </td>
                                </tr>
                                ))
                            }
                        </tbody> */}
                    </table>
                </div>
                <div ref={componentPdf} style={{width:'100%',padding:'0px 12px'}} className='table table-striped table-bordered w-auto'> 
                { //afficher les donnees recuperes
                                record.map((no,index) =>(
                                <tr key={index}>
                               
                                
                               <td className=''>
                                    <div className="btn-group " role="toolbar" aria-label="Toolbar with button groups">
                                            <Bullt data={no} num={index+1} nt={nt}/>
                                    </div>
                                </td>
                                </tr>
                                ))
                            }
                </div>
            </div>
   
        </main>
    )
}
}