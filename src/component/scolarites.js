// importation des differents modules
import React, { useEffect, useRef, useState } from 'react'
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import ScoSuite from '../undercompo/scoSuite';
import ScoView from '../undercompo/scoView';
import ReactToPrint from "react-to-print";
import { PrinterFill } from 'react-bootstrap-icons';

export default function Scolarite(){//creation de la fonction principaae
    //declaration de la variable pour stocker les celeves recuperes
    const[scoData,setscoData] = useState([])
    // const [Dates, setDates] = useState('');
    // fonction pour recuperer les donnees de la classe
    // useEffect( ()=>{
    //     getscoData()
    // },[])
    // const getscoData =async()=>{
    //     const req= await fetch("http://localhost/ssm/api/sco.php")
    //     const res = await req.json()
    //     //console.log(res.length)
    //     setscoData(res)
        
    // }
    // let newDate = new Date()
    // //  let date = newDate.getDate();
    //  useEffect(() => {

    //     const current = new Date();
    //     const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;
    //     // setDates(date)
    
    // },[])

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
    const[ecData,setecData]=useState([])
    useEffect( () => {
    const getNiveau = async()=>{
        const reqdata = await fetch("http://localhost/ssm/api/niveau.php")
        const resdata = await reqdata.json()
        // console.log(resdata)
        setNiveauData(resdata)
        }
        getNiveau()
        const getecole= async()=>{
            const reqdata = await fetch("http://localhost/ssm/api/schoolUp.php/"+ 1)
            const resdata = await reqdata.json()
            setecData(resdata)
          }
        getecole()
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
        setRecord(scoData.filter(s => s.classe === (e.target.value)))
    }
    const Tri = (e) =>{
        setRecord(scoData.filter(s => s.nom.toLowerCase().includes(e.target.value) || s.nom.toUpperCase().includes(e.target.value)))
    }
    // const tr1 =()=>{
    //     setRecord(scoData.filter(s => s.tranche === "1"))
    // }
    // const tr2 =()=>{
    //     setRecord(scoData.filter(s => s.tranche === "2"))
    // }
    // const tr3 =()=>{
    //     setRecord(scoData.filter(s => s.tranche === "3"))
    // }

    const handleTr1 = (()=>{
        const getscoData =async()=>{
          const req= await fetch("http://localhost/ssm/api/sco.php")
          const res = await req.json()
          if(res.resultat !== 'Verifiez les informations SVP'){
              const result = res.sort((a,b) => a.nom.localeCompare(b.nom))
              setscoData(result.filter(s => s.tranche === "1"))
              setRecord(result.filter(s => s.tranche === "1"))
              } 
          
      }
          getscoData()
   
       })
       const handleTr2 = (()=>{
        const  getscoData =async()=>{
          const req= await fetch("http://localhost/ssm/api/sco.php")
          const res = await req.json()
          if(res.resultat !== 'Verifiez les informations SVP'){
            const result = res.sort((a,b) => a.nom.localeCompare(b.nom))
            setscoData(result.filter(s => s.tranche === "2"))
            setRecord(result.filter(s => s.tranche === "2"))
            } 
      }
            getscoData()
  
      }) 
       const handleTr3 = (()=>{
        const  getscoData =async()=>{
          const req= await fetch("http://localhost/ssm/api/sco.php")
          const res = await req.json()
          if(res.resultat !== 'Verifiez les informations SVP'){
            const result = res.sort((a,b) => a.nom.localeCompare(b.nom))
            setscoData(result.filter(s => s.tranche === "3"))
            setRecord(result.filter(s => s.tranche === "3"))
            } 
      }
            getscoData()
  
      }) 

    let componentPdf = useRef()


    if (scoData.resultat === 'Verifiez les informations SVP') {
        return(
            <main className="main-container">
            <h3>Bienvenu sur la gestion des frais de scolarités </h3>
            <div className="col-sm-12">    
              </div>         
                    <div className='container'>
                        <div className='row'>
                            <p id='vide'>AUCUNE DONNEE EN COURS</p>
                        </div>
                    </div>
            </main>
        )
    } else {

    return(
    <main className='main-container'>

        <h3>Bienvenu sur la gestion des frais de scolarités </h3>
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
              <div className="form-group btn-group col-md-4" role="group" aria-label="Basic outlined example">
                <button type="button" class="btn btn-outline-primary" onClick={handleTr1}>Tranche1</button>
                <button type="button" class="btn btn-outline-primary" onClick={handleTr2}>Tranche2</button>
                <button type="button" class="btn btn-outline-primary" onClick={handleTr3}>Tranche3</button>
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
        <h3><strong>Liste en cours</strong></h3>
                                
        <table className='table table-striped table-bordered w-auto'>
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
                    <td>{stuData.verser} FCFA </td>
                    <td>{stuData.reste} FCFA </td>
                    <td>
                        <div className="btn-group " role="toolbar" aria-label="Toolbar with button groups">
                            <div role="group" aria-label="First group">
                            {stuData.reste === 0 ?  <div style={{color: 'green',fontSize:'15px'}}><IoCheckmarkDoneSharp  /></div>: <ScoSuite data={stuData} />}    
                            </div>
                            
                            <div  role="group" aria-label="Third group">
                                <ScoView data={stuData}/> 
                            </div>
                        
                        </div>
                    </td>
                </tr>
                )) 
                    
                }
            </tbody>
        </table>
        <div style={{ display: "none" }}  >
            <div ref={(el) => (componentPdf = el)} style={{width:'100%',padding:'0px 12px',fontSize:'10px'}} >
            <div id="head">
              {/* entete du bulletin */}
              <div>
                <p className="fw-bold">REPUBLIQUE DU CAMEROUN</p>
                <p>Paix Travail Patrie</p>
                <p className="fw-bold">MINISTERE DE L'EDUCATION DE BASE</p>
                <p>Délégation Régionale de l'Est</p>
                <p>Délégation Départementale du Lom et Djerem</p>
              </div>
              <div>
                <img src={`http://localhost/ssm/api/logo/${ecData.logo}`} style={{ width: "80px" }} alt="Logo" />
              </div>
              <div>
                <p className="fw-bold">REPUBLIC OF CAMEROON</p>
                <p>Peace Work Fatherland</p>
                <p className="fw-bold">MINISTRY OF BASIC EDUCATION</p>
                <p>East Regional Delegation</p>
                <p>Lom and Djerem Divisional Delegation</p>
              </div>
            </div>
            <div id='middle'>
              <p id='tiEcol'>{ecData.nomec} </p>
            </div>
        <table   className='table table-striped table-bordered w-auto'>
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
                    <td>{stuData.verser} FCFA </td>
                    <td>{stuData.reste} FCFA </td>
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