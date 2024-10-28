// importation des modules
import React from "react";
import { Link } from "react-router-dom";

//fonction principale
export default function Bulls(){

  return(
    <main className="main-container" >
    <h3>Bienvenu sur la gestion des bulletins</h3> 
      <div className="col-sm-12">
        <div className="row mb-3">
         <div className="btn-group col-md-3">
          <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" >
            Type de bulletins
          </button>
          <ul className="dropdown-menu">
            {/* //menu déroulant */}
            <li> <Link className="dropdown-item">Trimestriel </Link>
              <ul className="dropdown-menu dropdown-submenu">  
              {/* liste des trimestres dans le menu déroulant */}
                 <Link to={"trim/"+ 1} className="dropdown-item">Trimestre 1</Link> 
                 <Link to={'trim/'+ 2}className="dropdown-item">Trimestre 2</Link> 
                 <Link to={'trim/'+ 3} className="dropdown-item">Trimestre 3</Link>   
              </ul>
            </li>
            <li><Link className="dropdown-item">Séquenciel</Link>
            <ul className="dropdown-menu dropdown-submenu">
            {/* liste des séquences dans le menu déroulant */}
                 <Link to={'seq/'+ 1} className="dropdown-item">Séquence 1</Link> 
                 <Link to={'seq/'+ 2} className="dropdown-item">Séquence 2</Link> 
                 <Link to={'seq/'+ 3} className="dropdown-item">Séquence 3</Link>   
                 <Link to={'seq/'+ 4} className="dropdown-item">Séquence 4</Link>   
                 <Link to={'seq/'+ 5} className="dropdown-item">Séquence 5</Link>   
                 <Link to={'seq/'+ 6} className="dropdown-item">Séquence 6</Link>   
              </ul>
            </li>
            </ul>
          </div>
           </div>
          
      </div>
  </main>
  )
}