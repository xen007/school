//importation des differents modules
import axios from 'axios'
import React, {useEffect, useRef, useState } from 'react'
import { Eye, PencilSquare, Plus, PrinterFill, Trash } from 'react-bootstrap-icons'
import {Link, useNavigate} from 'react-router-dom'
import InsAdd from '../undercompo/insAdd'
import { FaCheck } from 'react-icons/fa'
import ReactToPrint from "react-to-print";
export default function StudentList(){ //declaration de la fonction principale
    // declaration de la  constante pour naviguuer entre les pages
    const navigate = useNavigate()
    // declaration de la constant pour stcocker les donnees relatifs aux eleves
    const[studentData, setStudentData] = useState([])
    const[ins, setInsData] = useState([])
    const[record,setRecord] = useState([])
    useEffect( ()=> {
        getStudentData()
    },[])
    const getStudentData = async() =>{
        const requestData = await fetch("http://localhost/ssm/api/l.php")
        const responseData = await requestData.json()
        if(responseData.resultat !== 'Verifiez les informations SVP'){
            const result = responseData.sort((a,b) => a.nom.localeCompare(b.nom))
            setRecord(result) 
            setStudentData(result)
            } 
        
    }

    useEffect( ()=>{
        getInsData()
    },[])
    const getInsData =async()=>{
        const req= await fetch("http://localhost/ssm/api/ins.php")
        const res = await req.json()
        setInsData(res)
    }
        // fonction de suppression
  
    const handleDelete = async(matricule) =>{
        let isDel = window.confirm("Voulez-vous vraiment supprimer cet élève? Cette action est irreversible");
        if(isDel){
      const req= await axios.delete("http://localhost/ssm/api/l.php/"+matricule)
      if(req.data.success){
          alert(req.data.success)
          setTimeout(() => {
            getStudentData()
        }, 500);
      };
    }
    }
    //declaration des autrea contantes
    const[classe,setClData]=useState([])
    const[classData,setClassData] = useState([])
    const[niveauData,setNiveauData] = useState([])
    const[enable,setEnable] = useState(true)
    const[text,setText] = useState('Selectionnez d\'abord le niveau')
    // fonction de recuperation des niveaux
      useEffect( () => {
        const getNiveau = async()=>{
            const reqdata = await fetch("http://localhost/ssm/api/niveau.php")
            const resdata = await reqdata.json()
            // console.log(resdata)
            setNiveauData(resdata)
          }
        getNiveau()
        // fonction de recuperation des classes
        const getclasse= async()=>{
            const reqdata = await fetch("http://localhost/ssm/api/classe.php")
            const resdata = await reqdata.json()
            setClData(resdata)
        }
        getclasse()
      },[])
    //   fonction de tri des classe a partir du niveau
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
      let componentPdf = useRef()
  
    // constante pour stockr les donnees tries eet fonctions de tris
    if (studentData.resultat === 'Verifiez les informations SVP') {
        return(
            <main className="main-container">
            <h3>Bienvenu sur la gestion des Elèves </h3>
            <div className="col-sm-12">       
          
                      
              </div>
                                         
                    <div className='container'>
                        <div className='row'>
                            <p className='text-danger text-center'></p>
                            <h3><strong>Ajouter un élève</strong> <Link to='/studInsert' className="btn btn-success"><span className="bi bi-plus"></span>Ajouter</Link></h3>
                    
                            <p id='vide'>AUCUN ELEVE DISPONIBLE POUR L'INSTANT</p>
                        
                        </div>
        
                    </div>
            </main>
        )
    } else {

    const handleTri = (e) =>{
        setRecord(studentData.filter(s => s.classe === (e.target.value)))
    }
    const Tri = (e) =>{
        setRecord(studentData.filter(s => s.nom.toLowerCase().includes(e.target.value) || s.nom.toUpperCase().includes(e.target.value)))
    }
    // fonction pour avtiver et deactiver l'eleve
    const HandleStat = async(stat,matricule) =>{  //parametres a prendre en compte
        if(stat === '1'){ //statut 1 pour actif
            var msg = prompt('motif obligatoire')
            if(msg === ""){ //si le motif est vide annuler
                alert('cancel')
            }
            else{ //sinon le statut passe a 0 et 
                stat=0
                alert('efectué')
            }
        }else{ //sil etait inactif il est actif desormais le statut passe a  1
            stat=1
            msg = ""
        }
        //recupere les informations pour mettre a jour la able
            const formData = {
                iduser:matricule,
                stat:stat,
                msg:msg
            }
            const res = await axios.put('http://localhost/ssm/api/niv.php', formData)
            if(res.data.success){
                setTimeout(() => {
                    navigate('/students')
                }, 2000);   
            }
            getStudentData()
    }
   

    return(
        <main className='main-container'>
            <h3>Bienvenu sur la gestion des Elèves</h3>
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
                                 
            <div className='container'>
                <div className='row'>
                    <h3><strong>Ajouter un élève</strong> <Link to='/studInsert' className="btn btn-success"><Plus/>Ajouter</Link></h3>
                    
                    <table className='table table-striped table-bordered w-auto'>
                        <thead>
                            <tr>
                                <th>Sr No</th>
                                <th>Photo</th>
                                <th>Matricule</th>
                                <th>Nom</th>
                                <th>Prénom</th>
                                <th>Genre</th>
                                <th>date_Naiss</th>
                                <th>classe</th>
                                <th>Statut</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                           
                            {//aficher les donnees recuperes et filtres
                                record.map((stuData,index) =>(
                                <tr key={index}>
                                <td>{index+1}</td>
                                <td className='ima'><img src={`http://localhost/ssm/api/image/${stuData.photo}`}    alt={stuData.photo} /></td>
                                <td>{stuData.matricule}</td>
                                <td>{stuData.nom}</td>
                                <td>{stuData.prenom}</td>
                                <td>{stuData.genre}</td>
                                <td>{stuData.dateNaiss}</td>
                                <td>{stuData.classe}</td>
                                <td>{stuData.stat === '1'? "Actif" : "Inactif"}</td>
                                <td className=''>
                                    
                                    <div className="btn-group " role="toolbar" aria-label="Toolbar with button groups">
                                    
                                        <div role="group" aria-label="First group">
                                            <Link to={"/studView/"+stuData.matricule}   className="btn btn-light mx-2"><Eye /></Link>
                                        </div>
                                        <div role="group" aria-label="Second group">
                                            <Link to={"/studEdit/"+stuData.matricule} className="btn btn-success mx-2"><PencilSquare /></Link>
                                        </div>
                                        <div  role="group" aria-label="Third group">
                                            <button onClick={()=> handleDelete(stuData.matricule)} className="btn  btn-danger mx-2"><Trash/></button>       
                                        </div>
                                        <div role="group" aria-label="Second group">
                                            {
                                                ins.resultat === 'Verifiez les informations SVP'? <InsAdd data={stuData} />:
                                            ins.find((el)=> el.matricule === stuData.matricule)? <div style={{color: 'green',fontSize:'15px'}}><FaCheck /></div>: <InsAdd data={stuData} />

                                            }
                                        </div>
                                    </div>
                                </td>
                                </tr>
                                ))
                            }
                        </tbody>


                    </table>
                
                </div>
                <div style={{ display: "none" }}>
                <table ref={(el) => (componentPdf = el)} style={{width:'100%',padding:'0px 12px',fontSize:'10px'}} className='table table-striped table-bordered '>
                        <thead>
                            <tr>
                                <th>Sr No</th>
                                <th>Matricule</th>
                                <th>Nom</th>
                                <th>Prénom</th>
                                <th>Genre</th>
                                <th>date_Naiss</th>
                                <th>classe</th>
                            </tr>
                        </thead>

                        <tbody>
                           
                            {//aficher les donnees recuperes et filtres
                                record.map((stuData,index) =>(
                                <tr key={index}>
                                <td>{index+1}</td>
                                <td>{stuData.matricule}</td>
                                <td>{stuData.nom}</td>
                                <td>{stuData.prenom}</td>
                                <td>{stuData.genre}</td>
                                <td>{stuData.dateNaiss}</td>
                                <td>{stuData.classe}</td>
                               
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
}