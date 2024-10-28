// importation des diferents modules
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ClassAffect from "../undercompo/classAffect";
import ClassView from "../undercompo/classView";
import {PencilSquare, Plus} from 'react-bootstrap-icons';

export default function Classe(){ //creation de la fonction principaLe
    //declaration de la variable pour stocker les classes 
    const[classe,setClData]=useState([])
    const[record,setRecord] = useState([])
    // fonction pour recuperer les donnees de la classe
    useEffect( ()=>{
          getclasse()
      },[])
      const getclasse= async()=>{
          const reqdata = await fetch("http://localhost/ssm/api/classe.php")
          const resdata = await reqdata.json()
          setClData(resdata)
          setRecord(resdata)  
  
          }
    //declaration de la variable pour stocker les niveaux
      const[niveauData,setNiveauData] = useState([])
      // fonction pour recuperer les donnees de la classe
      useEffect( () => {
          const getNiveau = async()=>{
          const reqdata = await fetch("http://localhost/ssm/api/niveau.php")
          const resdata = await reqdata.json()
          // console.log(resdata)
          setNiveauData(resdata)
          }
          getNiveau()
      },[])
      if (classe.resultat ===  'Verifiez les informations SVP') {
        return(
            // balise principale et ensemble de la page
            <main className="main-container">
            <h3>Bienvenu sur la gestion des Classes</h3>
            <div className="col-sm-12">       
              </div>                    
                    <div className='container'>
                        <div className='row'>
                            <p className='text-danger text-center'></p>
                            <h3><strong>Ajouter une nouvelle Classe</strong> <Link to='/ClassInsert' className="btn btn-success"><span className="bi bi-plus"></span>Ajouter</Link></h3>
                            
                            <p id="vide">AUCUNE CLASSE DISPONIBLE POUR L'INSTANT</p>
                        
                        </div>
        
                    </div>
            </main>
          )
      } else {
        
      
    //declarations des constantes pour message et tri
    
    // fonction de tri par nniveau
    const handleTri = (e) =>{
        setRecord(classe.filter(s => s.niveau === (e.target.value)))

    }
   
    // fonction de tri par nom de classe
    const Tri = (e) =>{
        setRecord(classe.filter(s => s.libellé_classe.toLowerCase().includes(e.target.value) || s.libellé_classe.toUpperCase().includes(e.target.value)))
    }
    // fonction de suppression
    // const handleDelete = async(idClasse) =>{
    //   const req= await axios.delete("http://localhost/ssm/api/classe.php/"+idClasse)
    //   setMessage(req.data.success)
    //   if(req.data.success){
    //       setMessage(req.data.success)
    //       setTimeout(() => {
    //         getclasse()
    //     }, 2000);
    //   }
    // }

  return(
    // balise principale et ensemble de la page
    <main className="main-container">
    <h3>Bienvenu sur la gestion des Classes</h3>
    <div className="col-sm-12">       
    <div className="row mb-3">
                <div className="form-group col-md-4">
                <label className="mb-2">Niveau</label>
                <select name="niveau" className="form-control" onChange={(e)=>handleTri(e)}>
                <option value="">Selectionnez le Niveau</option>
                    {
                    niveauData.map((nData, index) =>(
                    <option key={index}  value={nData.id}>{nData.libellee_niveau}</option>
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
                    <h3><strong>Ajouter une nouvelle Classe</strong> <Link to='/ClassInsert' className="btn btn-success"><Plus />Ajouter</Link></h3>
                    
                    <table className='table table-striped table-bordered w-auto'>
                        <thead>
                            <tr>
                                <th>Sr No</th>
                                <th>libellé_C</th>
                                <th>Niveau</th>
                                <th>Categorie</th>
                                <th>Code_E</th>
                                <th>Nom_E</th>
                                <th>nombre_El</th>
                                <th>Capacité</th>
                                {/* <th>frais_Ins</th>
                                <th>frais_Sc</th> */}
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                           
                            {//afficher les donnees recuperes de la bd  
                                record.map((ClData,index) =>( 
                                <tr key={index}>
                                <td>{index+1}</td>
                                <td>{ClData.libellé_classe}</td>
                                <td>{ClData.niveau}</td>
                                <td>{ClData.cat}</td>
                                <td>{ClData.enseignant}</td>
                                <td>{ClData.nomprof}</td>
                                <td>{ClData.nombre_élève}</td>
                                <td>{ClData.capacité}</td>
                                {/* <td>{ClData.ins} F</td>
                                <td>{ClData.sco} F</td> */}
                                <td className=''>
                                    <div className="btn-group " role="toolbar" aria-label="Toolbar with button groups">
                                        <div role="group" aria-label="First group">
                                            <ClassView data={ClData}  />
                                        </div>
                                        <div role="group" aria-label="Second group">
                                            <ClassAffect data={ClData}/>
                                        </div>
                                        <div role="group" aria-label="Second group">
                                            <Link to={"/classEdit/"+ClData.idClasse} className="btn btn-success mx-2"><PencilSquare /></Link>
                                        </div>
                                        {/* <div  role="group" aria-label="Third group">
                                            <button onClick={()=> handleDelete(ClData.idClasse)} className="btn  btn-danger mx-2"><Trash/></button>       
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