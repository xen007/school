// importation des diferents modules
import React, { useState, useEffect } from "react";
import { Link, useNavigate} from "react-router-dom";
import {PencilSquare, Plus} from 'react-bootstrap-icons';
import config from './config';
export default function CategCl(){ //creation de la fonction principaLe
    // fonction pour recuperer les donnees de la classe

    
    
    const[categ,setCategData] = useState([])
    useEffect( () => {
        const getCateg = async()=>{
        const reqdata = await fetch(`${config.apiBaseUrl}/categCl.php`)
        const resdata = await reqdata.json()
        // console.log(resdata)
        setCategData(resdata)
        }
        getCateg()
    },[])
    //declarations des constantes pour message et tri
   const navigate = useNavigate() 
   if (categ.resultat === 'Verifiez les informations SVP') {
    return(
        <main className="main-container">
       <h3>Definir les categories pour les informations de Scolatité </h3>
        <div className="col-sm-12">       
      
                  
          </div>
                                     
                <div className='container'>
                    <div className='row'>
                        <p className='text-danger text-center'></p>
                        <h3><strong>Ajouter une nouvelle categorie</strong> <Link to='/catInsert' className="btn btn-success"><Plus/>Ajouter</Link></h3>
                        <p id='vide'>AUCUNE CATEGORIE DISPONIBLE POUR L'INSTANT</p>
                    </div>
                </div>
        </main>
    )
    
 } else {
  return(
    // balise principale et ensemble de la page
    <main className="main-container">
        <h3>Definir les categories pour les informations de Scolatité </h3>
            <div className='container'>
                <div className='row'>
                <h3><strong>Ajouter une nouvelle categorie</strong> <Link to='/catInsert' className="btn btn-success"><Plus/>Ajouter</Link></h3>
                    <h3>Informations Disponibles</h3>
                    <table className='table table-striped table-bordered w-auto'>
                        <thead>
                            <tr>
                                <th>Sr No</th>
                                <th>libellé</th>
                                <th>description</th>
                                <th>Frais_ins</th>
                                <th>Frais_sco</th>
                                <th>1ere_Tran</th>
                                <th>2e_Tran</th>
                                <th>3e_Tran</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                           
                            {//afficher les donnees recuperes de la bd  
                                categ.map((ClData,index) =>( 
                                <tr key={index}>
                                <td>{index+1}</td>
                                <td>{ClData.libellee}</td>
                                <td>{ClData.des}</td>
                                <td>{ClData.ins} F</td>
                                <td>{ClData.sco} F</td>
                                <td>{ClData.tr1} F</td>
                                <td>{ClData.tr2} F</td>
                                <td>{ClData.tr3} F</td>
                                <td className=''>
                                    <div className="btn-group " role="toolbar" aria-label="Toolbar with button groups">
                                        <div role="group" aria-label="Second group">
                                            <Link to={"/catEdit/"+ClData.id}  className="btn btn-success mx-2"><PencilSquare /></Link>
                                        </div>
                                    </div>
                                </td>
                                </tr>
                                ))
                            }
                        </tbody>
                        </table>
                        <div className='buttons'>
                            <button className='btn btn-secondary' onClick={()=>{navigate('/settings')}}>Retour</button>
                        </div> 
                </div>

            </div>
    </main>
  )
}
} 
