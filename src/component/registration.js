import React, {useState, useRef, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/registration.css';
import { useNavigate} from 'react-router-dom';
import axios from 'axios';
import ProtectedRoute from './protectedRoute';




export default function Registration() {
    const [matricule, setMatricule] = useState('');
    const [pass, setPass] = useState('');
    const [Msg, setMsg] = useState('');
    const [err, setErr] = useState('');
    const [toggle, setToggle] = useState(false);
    const [Msg1, setMsg1] = useState('');

    const navigate = useNavigate();
    
    useEffect(() => {
        const handlePopstate = () => {
          // Check if the user is on the login page
          if (window.location.pathname === '/Registration' || window.location.pathname === '/' ) {
            // Navigate forward to another route (e.g., home page)
            navigate('/Registration');
          }
        };
    
        // Add event listener for popstate (hardware back button press)
        window.addEventListener('popstate', handlePopstate);
    
        // Cleanup: Remove event listener when component unmounts
        return () => {
          window.removeEventListener('popstate', handlePopstate);
        };
      }, [navigate]);

    const handleInputChange = (e, type) => {
        
        switch(type){
            case "matricule":
             setErr("");
             setMatricule(e.target.value);
             if(e.target.value === ""){
                setErr("Veuillez entrer un matricule !")
             }
             break;
             case "pass":
             setErr("");
             setPass(e.target.value);
             if(e.target.value === ""){
                //setErr("Vous devez saisir un mot de passe !");
                console.log('bonjour')
             }else{
                setMsg1('')
             }
             break;
            default: 
        }    
        }
    

const handleSubmit = () => {

if(toggle === true){
    var headers = {"Accept":"application/json",
    "Content-Type": "application/json"};
    var donnee = {
    matricule: matricule,
    pass: pass,
    headers: headers}


    axios.post('http://192.168.100.7/files/login.php', donnee) 
    .then(response=>{
    //setMsg(response.data.status);
    console.log(response.data.status);
    if ( response.data.status === 'successfully recorder, redirecting to a new page') {
    navigate(`/Dashbord/${matricule}`);
    }
    else{
        setMsg1('Le matricule ou mot de passe est incorrect')
        console.log("connexion echoué") ; 
        console.log(Msg);
    }
        
        })
        .catch((err)=> console.log(err));

}
    
  
else{
    var headers = {"Accept":"application/json",
    "Content-Type": "application/json"};
    var donnee = {
    matricule: matricule,
    pass: pass,
    headers: headers}


    axios.post('http://192.168.100.7/files/login.php', donnee) 
    .then(response=>{
    console.log(response.data.status);
    if ( response.data.status === 'successfully recorder, redirecting to a new page') {
    ProtectedRoute(false);
    navigate(`/Ensei/${matricule}`);
    
    }
    else if(pass === ''){
        ProtectedRoute(false)
        setErr("You must enter a password!");
         
    }
    else{
        setMsg1('username or password is incorrect')
        console.log("connexion echoué") ;
        ProtectedRoute(false) 
        console.log(Msg);
    }
    
        
        })
        .catch((err)=> console.log(err));
       
        
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
                                            Msg !== "" ? <span className="success">{Msg}</span> : <span className="error">{err}</span>
                                        }
                                    </p>
                                    <p>
                                        {
                                            Msg1 !== "" ? <span className="success" >{Msg1}</span> : <span className="error"></span>
                                        }
                                    </p>
                            
                                    
                                    <div className="form-outline mb-4">
                                        <label htmlFor="matricule" className="form-label">Matricule:</label>
                                        <input
                                        type="text" value={matricule} name="matricule" className="form-control form-control-lg" 
                                     onChange={(e)=>handleInputChange(e, 'matricule')} />
                                    </div>
                                    <div className="form-outline mb-4">
                                        <label htmlFor="pass" className="form-label">PassWord:</label>
                                        <input
                                        type="password" value={pass} name="pass" className="form-control form-control-lg" onChange={(e)=>handleInputChange(e, 'pass')} />
                                    </div>
                                    
                                    <div className="form-check d-flex jsutify-content-center mb-5">
                                        <input className="form-check-input me-2" type="checkbox" defaultValue id="form2Exemple3g" onClick={() => setToggle(!toggle)}/>
                                        <label className="form-check-label" htmlFor="form2Exemple3g">Connexion en tant que d'administrateur</label>
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

