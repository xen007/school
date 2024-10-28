import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
export default function Setting(){
    const seq = 'sequence'
    const trim = 'trimestre'
    const annee = 'annee_scolaire'
    const handleSave =async()=>{
        const res = await axios.post('http://localhost/ssm/api/sauve.php')
        if(res.data.success){
            alert('sauvegarde reussi')
        }
    }
    return(
        <main className="main-container">
             <h3>Effectuez des réglages Ici</h3>
             <div className="container">
                <h4>Definir les dates</h4>
                <div className="btn-group "  role="group" aria-label="Basic toggle button group">
                    <Link to={'/sequence/'+ seq} class="btn btn-outline-primary">Séquence</Link>
                    <Link to={'/sequence/'+ trim} class="btn btn-outline-primary">Trimestre</Link>
                    <Link to={'/sequence/'+ annee} class="btn btn-outline-primary">Année_scolaire</Link>
                </div>
                <h4>Definir les categories des classes</h4>
                <div>
                    <Link to={'/categCl/'} class="btn btn-outline-primary">Categories</Link>
                </div>
                <h4>Faire une suvegarde</h4>
                    <button className="btn btn-success" onClick={handleSave}>Sauvegarder</button>
             </div>
        </main>
    )
}

