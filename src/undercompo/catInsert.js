// importation des different modules
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import config from '../component/config';
// fonction principale
export default function CatInsert(){
    // declaration des contantes
    const navigate = useNavigate()
    const [message,setMessage] = useState('')
    const[formvalue,setFormvalue] = useState({
        nom:'',
        des:'',
        frais:'',
    })


    //prise en charge des informations saisies
    const handleInput =(e) =>{
        setFormvalue({...formvalue,[e.target.name] : e.target.value})
    }
    // fonction pour soumettre le formulaire
    const handleSubmit =async(e)=>{
        e.preventDefault()
        //console.log(formvalue)
        if(e.target.value==="" || (Number(formvalue.tr1) + Number(formvalue.tr2) + Number(formvalue.tr3)) !== Number(formvalue.sco)) {
            alert('verifiez les montants')
        }else{

        const formData = {
            nom:formvalue.nom,
            ins:formvalue.ins,
            sco:formvalue.sco,
            tr1:formvalue.tr1,
            tr2:formvalue.tr2,
            tr3:formvalue.tr3,
            des:formvalue.des,
        }
        const res = await axios.post(`${config.apiBaseUrl}/categCl.php`, formData)
        if(res.data.success){
            setMessage(res.data.success)
            setTimeout(() => {
                navigate('/categCl')
            }, 1000);    
        }}
   }

    return(
        
        <main className="main-container">
            <div className="col-md-12 mt-4">
                <h2>Nouvelle Categorie</h2>
                <p className="text-success">{message}</p>
                <form onSubmit={handleSubmit}>
                <div className="col-sm-12">
          
                <div className="row mb-3">
                    
                    <div className="form-group col-md-4">
                    <label className="mb-2">libellé</label>
                    <input type="text" className="form-control" name="nom" id="nom" value={formvalue.nom} onChange={handleInput}  required/>
                    </div>
                    <div className="form-group col-md-4">
                    <label className="mb-2">description</label>
                    <input type="text" className="form-control" name="des" id="des" value={formvalue.des} onChange={handleInput} required/>
                    </div>
                    <div className="form-group col-md-4">
                    <label className="mb-2">Frais_ins</label>
                        <input type="number" className="form-control" name="ins" id="ins" value={formvalue.ins}  onChange={handleInput}required/>
                    </div>
                    <div className="form-group col-md-4">
                    <label className="mb-2">Frais_sco</label>
                        <input type="number" className="form-control" name="sco" id="sco" value={formvalue.sco}  onChange={handleInput}required/>
                    </div>
                    <div className="form-group col-md-4">
                    <label className="mb-2">1ere_Tranche</label>
                        <input type="number" className="form-control" name="tr1" id="tr1" value={formvalue.tr1}  onChange={handleInput}required/>
                    </div>
                    <div className="form-group col-md-4">
                    <label className="mb-2">2e_Tranche</label>
                        <input type="number" className="form-control" name="tr2" id="tr2" value={formvalue.tr2}  onChange={handleInput}required/>
                    </div>
                    <div className="form-group col-md-4">
                    <label className="mb-2">3e_Tranche</label>
                        <input type="number" className="form-control" name="tr3" id="tr3" value={formvalue.tr3}  onChange={handleInput}required/>
                    </div>
                </div>
                    
            </div>
            <div className='buttons'>
                <button className='btn btn-secondary' onClick={()=>{navigate('/categCl')}}>Retour</button>
                <button type='submit' name='submit' className="btn btn-success">Enregister </button>
               
            </div> 
            </form>

            </div>
        </main>
    )
}