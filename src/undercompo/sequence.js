// importation des diferents modules
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {PencilSquare} from 'react-bootstrap-icons';
import config from '../component/config';

export default function Sequence(){ //creation de la fonction principaLe
    //declaration de la variable pour stocker les classes 
    const[classe,setClData]=useState([])
    // fonction pour recuperer les donnees de la classe
    const {id} = useParams()
    useEffect( ()=>{
      const getclasse= async()=>{
          const reqdata = await fetch(`${config.apiBaseUrl}/dates.php/` +id)
          const resdata = await reqdata.json()
          setClData(resdata)
          }
          getclasse()
    },[id])
    //declarations des constantes pour message et tri
   const navigate = useNavigate() 
  return(
    // balise principale et ensemble de la page
    <main className="main-container">
        <h3>Definir des dates pour les informations </h3>
            <div className='container'>
                <div className='row'>
                    <h3><strong>Informations Disponibles</strong></h3>
                    <table className='table table-striped table-bordered w-auto'>
                        <thead>
                            <tr>
                                <th>Sr No</th>
                                <th>libellé</th>
                                <th>Date_debut</th>
                                <th>Date_Fin</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                           
                            {//afficher les donnees recuperes de la bd  
                                classe.map((ClData,index) =>( 
                                <tr key={index}>
                                <td>{index+1}</td>
                                <td>{ClData.libellee}</td>
                                <td>{ClData.debut}</td>
                                <td>{ClData.fin}</td>
                                <td className=''>
                                    <div className="btn-group " role="toolbar" aria-label="Toolbar with button groups">
                                        <div role="group" aria-label="Second group">
                                            <Link to={"/sequence/dateEdit/"+ClData.id} state={id} className="btn btn-success mx-2"><PencilSquare /></Link>
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
