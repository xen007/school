// importation des differents modules
import React, { useEffect, useState } from "react"
import './stview.css'
import { useNavigate, useParams } from "react-router-dom"
import config from '../component/config';
// fonction principale
export default function StudView(){
    // declaration des constantes
    const navigate = useNavigate()
    const[formvalue,setFormvalue]=useState({
        matricule:'',
        nom:'',
        prénom:'',
        dateNaiss:'',
        lieuNaiss:'',
        adresse:'',
        genre:'',
        tuteur:'',
        phone:'',
        classe:'',
        infoSup:'',
        photo:''
    })
    const {matricule} = useParams()
    useEffect ( () => {
        const userRowdata = async() =>{
            const getUserdata = await fetch(`${config.apiBaseUrl}/vue.php/`+matricule)
            const resuserdata = await getUserdata.json()
            // console.log(resuserdata)
            setFormvalue(resuserdata)
        }
        userRowdata()
    },[matricule])

    return(

        <main className="main-container">
           <div className=" row">

<div className="modal-header">
    <h4 className="modal-title">Profil de l'élève <strong>{formvalue.nom}</strong> </h4>
</div>

<div className="card imgholder imgholder  col-md-4 col-lg-4">
    <img src={`${config.apiBaseUrl}/image/${formvalue.photo}`} alt={formvalue.photo} width="200" height="200" className="showImg" />
</div>

<div className="modal-body col-sm-6">

    <form action="#" id="myForm">
           <div className="inputField">
            <div>
                <label >Matricule:</label>
                <input type="text" value={formvalue.matricule}  name="" id="showName" disabled />
            </div>
            <div>
                <label >Nom:</label>
                <input type="text" value={formvalue.nom} name="" id="showName" disabled />
            </div>
            <div>
                <label >Prénom:</label>
                <input type="text" value={formvalue.prénom}  name="" id="showAge" disabled />
            </div>
            <div>
                <label >Date de Naissance:</label>
                <input type="date" value={formvalue.dateNaiss} name="" id="dateNaiss" disabled />
            </div>
            <div>
                <label >lieu de Naissance:</label>
                <input type="text" value={formvalue.lieuNaiss} name="" id="lieuNaiss" disabled />
            </div>
            <div>
                <label >Genre:</label>
                <input type="text" value={formvalue.genre} name=""  id="phone"  disabled/>
            </div>
            <div>
                <label >Adrese:</label>
                <input type="text" value={formvalue.adresse} name="" id="adress" disabled/>
            </div>
            <div>
                <label >Classe:</label>
                <input type="text" value={formvalue.classe} name="" id="classe" disabled/>
            </div>
            <div>
                <label >Tuteur:</label>
                <input type="text" value={formvalue.tuteur} name="" id="tuteur" disabled/>
            </div>
            <div>
                <label >Numéro du tuteur:</label>
                <input type="tel" value={formvalue.phone} name="" id="phone" disabled/>
            </div>
            <div>
                <label >Infos Supplémentaires:</label>
                <input type="text" value={formvalue.infoSup} name="" id="infos" disabled/>
            </div>
        </div>
        
    </form>
    </div>
    <div className="modal-footer">
        <button type="button" className="btn btn-secondary"onClick={()=>{navigate('/students')}}>Fermer</button>
    </div> 
    </div>
    </main>
      

    )
}