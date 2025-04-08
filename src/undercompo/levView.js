// importation de sdifferents modules
import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import ClassView from "./classView"
import config from '../component/config';
// fonction principale
export default function LevView(){

// déclaration des constantes 
const navigate = useNavigate()
const[clval,setClVal] = useState([])
const {idNiv} = useParams()
useEffect(()=>{
    // installation
    const getClas =async()=>{
        const req = await fetch(`${config.apiBaseUrl}/nivView.php/`+idNiv)
        const resul = await req.json()
        setClVal(resul)
     }
    getClas()
},[idNiv])
    return(
        <main className="main-container">
            <div>
            <h3>Informations sur le niveau choisis<span></span> </h3>             
            </div>
            <div className='container'>
                <div className='row'>
                    <h3><strong>Liste des classes disponibles</strong></h3>  
                    <table className='table table-striped table-bordered w-auto'>
                        <thead>
                            <tr>
                                <th>Sr No</th>
                                <th>libellé_Classe</th>
                                {/* <th>Nom_E</th> */}
                                <th>nombre_élèves</th>
                                <th>Action</th>
                                {/* <th>Capacité</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {    
                            // donnees a afficher
                        
                                clval.map((ClData,index) =>(
                            
                                <tr key={index}>
                                <td>{index+1}</td>
                                <td>{ClData.libellé_classe}</td>
                                {/* <td>{ClData.nomprof}</td> */}
                                <td>{ClData.nombre_élève}</td>
                                <td>
                                    <div role="group" aria-label="First group">
                                            <ClassView data={ClData}  />
                                    </div>
                                </td>
                                </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
                <div className='buttons'>
                    <button className='btn btn-secondary' onClick={()=>{navigate('/levels')}}>Retour</button>
                </div>
            </div>
        </main>
    )
} 