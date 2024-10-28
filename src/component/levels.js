// importation des differents modules
import React, { useState, useEffect } from "react"
import './Modal.css'
import { Link } from "react-router-dom"
import LevEdit from "../undercompo/levEdit"
import { Eye } from "react-bootstrap-icons"

export default function Levels(){  //creation de la fonction principaae
    //declaration de la variable pour stocker les noveaux 
    const[niveau,setNiveau] = useState([])
    // fonction pour recuperer les donnees de la classe
    useEffect(()=>{
        getNiveau()
    },[])
    const getNiveau=async()=>{
        const req = await  fetch('http://localhost/ssm/api/niveau.php/')
        const res = await req.json()
        setNiveau(res)
    }

    return(
        <main className="main-container">
            <h3>Bienvenu sur la gestion des niveaux</h3>
            <div className='container'>
                <div className='row'>
                    <p className='text-danger text-center'></p>
                    <h3><strong>Liste des niveaux</strong></h3>
                    
                    <table className='table table-striped table-bordered w-auto'>
                        <thead>
                            <tr>
                                <th>Sr No</th>
                                <th>libellé_Niveau</th>
                                <th>cycle</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                              {  //afficher les donnees recuperes de la base de donnees  
                                niveau.map((ClData,index) =>(
                                <tr key={index}>
                                <td>{index+1}</td>
                                <td>{ClData.libellee_niveau}</td>
                                <td>{ClData.cycle}</td>
                                <td className=''>
                                    <div className="btn-group " role="toolbar" aria-label="Toolbar with button groups">
                                        <div role="group" aria-label="First group">
                                            <Link to={"/levView/"+ClData.id}   className="btn btn-light mx-2"><Eye /></Link>
                                        </div>
                                        <div role="group" aria-label="Second group">
                                            {/* <CAffect data={ClData}/> */}
                                        </div>
                                        <div role="group" aria-label="Second group">
                                            < LevEdit data={ClData} />
                                        </div>
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