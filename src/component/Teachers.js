import React from 'react';
import { Link} from 'react-router-dom';
import Modensei from '../undercompo/Modensei';
import View from '../undercompo/View';
import Popup4 from '../popup/Popup4';
import Popup3 from '../popup/popup3';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Eye, PencilSquare, Plus} from 'react-bootstrap-icons';
import config from './config';

export default function Teacher() {

    //déclaration des constances et initialisation
    const [enseig, setEnseig] = useState([]);
    const [openPopup, setOpenPopup] = useState(false);
    const [openPopup2, setOpenPopup2] = useState(false);
    const [record, setRecord] = useState([])
    
    useEffect(()=>{ // function appelé lors que l'utilisateur arrive sur la page
        tabEnseig();}, []);

    function tabEnseig(e){ // function pour la récupération des données dans la bd
        //e.preventDefault();
        var headers = {"Accept":"application/json",
            "Content-Type": "application/json"};
    axios.get(`${config.apiBaseUrl}/tabenseig.php`, headers)
    .then(response=>{ //mise à jour des constances déclaré
        setEnseig(response.data);
        setRecord(response.data)
        setOpenPopup(false);
        setOpenPopup2(false);
    })
    }

    //   const handleTri = (e) =>{
    //     setRecord(studentData.filter(s => s.classe.includes(e.target.value)))
    // }
    const Tri = (e) =>{
        setRecord(enseig.filter(s => s.nomE.toLowerCase().includes(e.target.value) || s.nomE.toUpperCase().includes(e.target.value)))
    }

  return (
    <main className='main-container'>
        
    <div className="enseignant row"><h3>Bienvenu sur la gestion des Enseignants</h3>
    <div className="col-sm-12">
  
    <div className="row mb-3">
     
    <div className="form-group col-md-4">
        <label className="mb-2">Rechercher</label>
        <input type="search" placeholder="Tapez un nom" aria-label="Search" onChange={Tri}  className="form-control" />
    </div>
   </div>
      
</div>
      
        
       
        
            <div className="mt-1 px-3">
                <h3><strong>Ajouter un enseignant</strong> <Link to='/Ajoutenseig' className="btn btn-success"><Plus /> Ajouter</Link></h3>
                    <table className="table tab my-1 table-striped table-bordered  w-100">
                        <thead className='fixed'>
                        
                        <tr>
                            <th>Matricule</th>
                            <th>Nom</th>
                            <th>Prénom</th>
                            <th>Email</th>
                            <th>Contact</th>
                            <th>Action</th>
                        </tr>
                        
                    </thead>
                    <tbody> {record.map((ensei, key ) => // affichage des information dans la bd stocké dans la const enseig avec la function map
                        <tr className='text-dark' key={key}>
                            <td>{ensei.matricule_Ens}</td>
                            <td>{ensei.nomE}</td>
                            <td>{ensei.prenomE}</td>
                            <td>{ensei.email}</td>
                            <td>{ensei.telephone}</td>
                            <td>
                                <div className="btn-group " role="toolbar" aria-label="Toolbar with button groups">
                                    <div role="group" aria-label="First group">
                                        <Link to={`/Teachers/${ensei.matricule_Ens}`} onClick={() => setOpenPopup(true)} className='btn btn-light mx-2 '><Eye  /></Link>
                                    </div>
                                    <div role="group" aria-label="First group">
                                        <Link to={`/Teachers/${ensei.matricule_Ens}`} onClick={() => setOpenPopup2(true)} className='btn btn-success mx-2'><PencilSquare/></Link>{/*/note/$matricule nous donne le lien avec le matricule  et setpopup2 true permet d'ouvrir un popup*/}
                                    </div>
                                </div>
                            </td>
                        </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <Popup4 openPopup = {openPopup}
                setOpenPopup = {setOpenPopup}
                title ='Enseignant'
                >
            <View />
        </Popup4>
        <Popup3 openPopup2 = {openPopup2}
                setOpenPopup2 = {setOpenPopup2}
                title ='Modifier'
                >
            <Modensei />
        </Popup3>      
        
    </div>
    </main>
  );
}
