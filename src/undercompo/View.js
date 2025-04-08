import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './stview.css'
import config from '../component/config';

export default function View () {
    const[formvalue, setFormvalue] = useState({
        matricule_Ens:'',
        nomE: '',
        prenomE:'',
        data_naiss:'',
        lieu_naiss:'',
        adresse:'',
        email:'',
        pass:'',
        civ:'', 
        tel:'',
        img:'',
        cv:'',
        cni:''
        

    })
    // const [openPopup, setOpenPopup] = useState(true);

    const {matricule} = useParams();
    console.log(matricule);

    useEffect(()=>{
        tabEnseig();}, []);

    function tabEnseig(){
        var headers = {"Accept":"application/json",
            "Content-Type": "application/json"};
    axios.get(`${config.apiBaseUrl}/view.php/${matricule}`, headers)
    .then(response=>{
        console.log(response.data);
        setFormvalue(response.data);
        
        //setOpenPopup(false)
    })
    console.log(formvalue);
    console.log(formvalue.matricule);
    }
  return (

    <div className="pop container">
        <div className='card imgholder'>
                    <img src={`${config.apiBaseUrl}/imageTeacher/${formvalue.photo}`} alt={formvalue.photo} width='200' height='200' classname="showing"/>
              </div>
                <br/>
            <div className="row">
                
                <div className="modal-body ">
                    <form action='' id='myForm'>
                      <div className='inputField'>
                            <div className='form-group'>
                                <label><strong>Matricule</strong></label>
                                <input type="text" name="matricule" id='' value={formvalue.matricule_Ens} className='input' />
                            </div>
                            <div className='form-group'>
                                <label><strong>Civilité </strong></label>
                                <input type="text" name="civ" id='' value={formvalue.civilitee} className='input'/>
                            </div>
                            <div className='form-group'>
                                <label><strong>Nom</strong></label>
                                <input type="text" name="nom" id='' value={formvalue.nomE} className='input' />
                            </div>
                            <div className='form-group'>
                                <label><strong>Prénom</strong></label>
                                <input type="text" name="prenom" id='' value={formvalue.prenomE} className='input'/>
                            </div>
                            <div className='form-group'>
                                <label><strong>Email</strong></label>
                                <input type="text" name="email" id='' value={formvalue.email} className='input'/>
                            </div>
                            <div className='form-group'>
                                <label><strong>Téléphone</strong></label>
                                <input type="text" name="tel" id='' value={formvalue.telephone} className='input'/>
                            </div>
                            <div className='form-group'>
                                <label><strong>Adresse</strong></label>
                                <input type="text" name="adresse" id='' value={formvalue.adresse} className='input'/>
                            </div>
                            <div className='form-group'>
                                <label><strong>Date de Naissance</strong></label>
                                <input type="text" name="date_naiss" id='' value={formvalue.dateNaiss} className='input'/>
                            </div>
                            <div className='form-group'>
                                <label><strong>Lieu de naisssance</strong></label><br/>
                                <input type="text" name="lieu_naiss" id='' value={formvalue.lieuNaiss} className='input'/>
                            </div>
                            <div className='form-group'>
                                <label><strong>CV</strong></label>
                                <input type="text" name="cv" id='' value={formvalue.cv} className='input'/>
                            </div>
                          
                            <div className='form-group'>
                                <label><strong>CNI</strong></label>
                                <input type="text" name="cni" id='' value={formvalue.cni} className='input'/>
                            </div>
                        </div> 
                    </form>
              </div>
            </div>
      </div>
  );
}
