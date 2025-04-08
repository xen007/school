// importation des differents modules
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ClassAffect from "../undercompo/classAffect";
import ClassView from "../undercompo/classView";
import {PencilSquare, Plus} from 'react-bootstrap-icons';
import config from './config';

export default function Classe() { // Creation de la fonction principale
    // Déclaration des variables pour stocker les classes
    const [classe, setClData] = useState([]);
    const [record, setRecord] = useState([]);
    
    // Fonction pour récupérer les données de la classe
    useEffect(() => {
        getClasse();
    }, []);
    
    const getClasse = async () => {
        const reqdata = await fetch(`${config.apiBaseUrl}/classe.php`);
        const resdata = await reqdata.json();
        setClData(resdata);
        setRecord(resdata);
    };

    // Déclaration des variables pour stocker les niveaux
    const [niveauData, setNiveauData] = useState([]);
    
    // Fonction pour récupérer les données des niveaux
    useEffect(() => {
        const getNiveau = async () => {
            const reqdata = await fetch(`${config.apiBaseUrl}/niveau.php`);
            const resdata = await reqdata.json();
            setNiveauData(resdata);
        };
        getNiveau();
    }, []);

    if (classe.resultat === 'Verifiez les informations SVP') {
        return (
            // Balise principale et ensemble de la page
            <main className="main-container">
                <h3>Bienvenu sur la gestion des Classes</h3>
                <div className="col-sm-12"></div>                    
                <div className='container'>
                    <div className='row'>
                        <p className='text-danger text-center'></p>
                        <h3><strong>Ajouter une nouvelle Classe</strong> <Link to='/ClassInsert' className="btn btn-success"><span className="bi bi-plus"></span>Ajouter</Link></h3>
                        <p id="vide">AUCUNE CLASSE DISPONIBLE POUR L'INSTANT</p>
                    </div>
                </div>
            </main>
        );
    } else {
        // Déclarations des constantes pour message et tri
        // Fonction de tri par niveau
        const handleTri = (e) => {
            setRecord(classe.filter(s => s.niveau === e.target.value));
        };
   
        // Fonction de tri par nom de classe
        const Tri = (e) => {
            setRecord(classe.filter(s => s.libellé_classe.toLowerCase().includes(e.target.value) || s.libellé_classe.toUpperCase().includes(e.target.value)));
        };

        return (
            // Balise principale et ensemble de la page
            <main className="main-container">
                <h3>Bienvenu sur la gestion des Classes</h3>
                <div className="col-sm-12">
                    <div className="row mb-3">
                        <div className="form-group col-md-4">
                            <label className="mb-2">Niveau</label>
                            <select name="niveau" className="form-control" onChange={(e) => handleTri(e)}>
                                <option value="">Selectionnez le Niveau</option>
                                {niveauData.map((nData, index) => (
                                    <option key={index} value={nData.id}>{nData.libellee_niveau}</option>
                                ))}
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
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {record.map((ClData, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{ClData.libellé_classe}</td>
                                        <td>{ClData.niveau}</td>
                                        <td>{ClData.cat}</td>
                                        <td>{ClData.enseignant}</td>
                                        <td>{ClData.nomprof}</td>
                                        <td>{ClData.nombre_élève}</td>
                                        <td>{ClData.capacité}</td>
                                        <td className=''>
                                            <div className="btn-group" role="toolbar" aria-label="Toolbar with button groups">
                                                <div role="group" aria-label="First group">
                                                    <ClassView data={ClData} />
                                                </div>
                                                <div role="group" aria-label="Second group">
                                                    <ClassAffect data={ClData} refreshData={getClasse} />
                                                </div>
                                                <div role="group" aria-label="Second group">
                                                    <Link to={"/classEdit/" + ClData.idClasse} className="btn btn-success mx-2"><PencilSquare /></Link>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        );
    }
}
