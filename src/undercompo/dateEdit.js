// importation des modules
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import config from '../component/config';
//fonction principale
export default function DateEdit(){
    // déclaration des constantes
    const[formvalue,setFormvalue] = useState({
        libellé:'',
        debut:'',
        fin:''
    })
    const location = useLocation();
    const data = location.state;
    const {id} = useParams()

    const navigate = useNavigate()
    const [message,setMessage] = useState('')
// prise en charge des informations entrées
    const handleInput =(e) =>{
        setFormvalue({...formvalue,[e.target.name] : e.target.value})
    }
    //fonction de récupération des in formations de la classe
    const[noData, setnoData] = useState([])
    useEffect ( () => {
        const getnoData = async() =>{
          // recherche  dans la table avec les parametres envoyés
            const requestData = await fetch(`${config.apiBaseUrl}/dates.php/?` + new URLSearchParams({
             id:id,
             tab : data
          }).toString())
          // recupération du résultat
            const responseData = await requestData.json()
            setnoData(responseData)
            setFormvalue(responseData) 
          
            // setFormvalue(responseData)
             console.log(responseData)
        }
        getnoData()
    },[])
//fonction de soumissions du dormulaire
      const handleSubmit =async(e)=>{
        e.preventDefault()
        if(e.target.value===""){
            setMessage('verifiez les valeurs')
        }else{

        const formData = {
            tab: data,
            id:id,
            debut:formvalue.debut,
            fin:formvalue.fin,
            
        }
        const res = await axios.put(`${config.apiBaseUrl}/dates.php`, formData)
        if(res.data.success){
            setMessage(res.data.success)
            setTimeout(() => {
                navigate('/sequence/'+data)
            }, 2000);
            
        }
    }

    }

    return(
        <main className="main-container">
            <div className="col-md-12 mt-4">
                <h2>Modifier</h2>
                <p className="text-success">{message}</p>
                <form onSubmit={handleSubmit}>
                <div className="col-sm-12">
          
                <div className="row mb-3">
                
                    <div className="form-group col-md-4">
                    <label className="mb-2">libellé</label>
                    <input type="text" className="form-control" name="libellé" id="libellé" value={formvalue.libellee} onChange={handleInput} readOnly />
                    </div>
                 
                    <div className="form-group col-md-4">
                    <label className="mb-2">Date_Debut</label>
                        <input type="date" className="form-control" name="debut" id="debut" value={formvalue.debut}  onChange={handleInput}/>
                    </div>
                    <div className="form-group col-md-4">
                    <label className="mb-2">Date_Fin</label>
                        <input type="date" className="form-control" name="fin" id="fin" value={formvalue.fin}  onChange={handleInput}/>
                    </div>
                </div>
                    
            </div>
            <div className='buttons'>
                <button className='btn btn-secondary' onClick={()=>{navigate('/sequence/'+data)}}>Retour</button>
                <button type='submit' name='submit' className="btn btn-success">Definir </button>
               
            </div> 
            </form>

            </div>
        </main>
    )
}