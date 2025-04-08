import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

export default function Pdmod() {
    const[newpass, setNewpass] = useState('');
    const[confirmpass, setConfirmpass] = useState('');
    const[Msg, setMsg] = useState('');
    const[openPopup, SetOpenPopup] = useState('')
    const {matricule} = useParams();

    const handleSubmit = (e) =>{//envoi des valeurs à l'api et fermeture du popup
        e.preventDefault()
        SetOpenPopup(false)
        //navigate('/noteAdmin')
        const formData = {
          confirmpass : confirmpass
        }
        console.log(formData);
        //window.location.reload();
        if(newpass === confirmpass){
            axios.post(`http://192.168.100.7/ssm/api/modmp.php/${matricule}`,formData,{
                headers:{"Content-Type": "multipart/form-data"},
            })
        }else{
            setMsg('les deux mots de passes ne sont pas identiques veuillez resaisir les mots de passes')
        }
        
    }
    return (
        <div>
            <section className="vh-200 image" style={{backgroundImage: 'url("https://images.unsplash.com/photo-1495195129352-aeb325a55b65")' }}>
                <div className="mask d-flex align-items-center h-100 gradient-custom-3">
                    <div className="container val">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                                <div className="card align-items-center" style={{borderradius: 15}} >
                                    <div className="card-body p-5">
                                        
                                        <p>
                                            {
                                                Msg !== "" ? <span className="success">{Msg}</span> : <span className="error"></span>
                                            }
                                        </p>
                                        
                                        
                                        <div className="form-outline mb-4">
                                            <label htmlFor="matricule" className="form-label">Saisir le nouveau mot de passe:</label>
                                            <input
                                            type="password" name="new_pass" className="form-control form-control-lg" 
                                         onChange={(e)=>setNewpass(e.target.value)} required/>
                                        </div>
                                        <div className="form-outline mb-4">
                                            <label htmlFor="pass" className="form-label">Confirmer le mot de passe:</label>
                                            <input
                                            type="password" name="confirm_pass" className="form-control form-control-lg" onChange={(e)=>setConfirmpass(e.target.value)} required />
                                        </div>
                                        
                                        <div className="d-flex justify-content-center">
                                            <input
                                            type="submit"
                                            defaultValue="Login"
                                            className="btn btn-success btn-block btn-lg gradient-custom-4 text-body"
                                            onClick={handleSubmit}
                                            
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
    
            </section>
        </div>
      )
    }
    
