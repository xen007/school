import {React,useContext} from 'react'
import 
 {BsFillBellFill, BsFillEnvelopeFill, BsPersonCircle, BsSearch, BsJustify}
 from 'react-icons/bs'
 import AuthContext from '../context/AuthProvider.js';
import { useNavigate } from 'react-router-dom';

function Header({OpenSidebar}) {
  const {setAuth} = useContext(AuthContext);
    const {auth} = useContext(AuthContext);
    const {setAuthteacher} = useContext(AuthContext);
    const navigate = useNavigate();

  function logout() {
    console.log(auth)
    const conf = window.confirm('Voulez-vous vraiment vous déconnectez ?');
     if (conf) {
      setAuth(false);
      setAuthteacher(false);
        //navigate('/Login', {replace: true});
        const handlePopState = () => {
            // Redirect to home or login page when navigating back
            navigate('/Login');
          };
         
          window.addEventListener('popstate', handlePopState);
          
          // Redirect user to home or login after logout
          navigate('/Login');
      
        return () => {
          window.removeEventListener('popstate', handlePopState);
          
        };
        
     }
}
  return (

    <header className='header'>
        <div className='menu-icon'>
            <BsJustify className='icon' onClick={OpenSidebar}/>
        </div>
        <div className='header-left'>
            <BsSearch  className='icon'/>
        </div>
        <div className='header-right'>
            <BsFillBellFill className='icon'/>
            <BsFillEnvelopeFill className='icon'/>
            <BsPersonCircle className='icon' onClick={logout}/>
        </div>
    </header>
  )
}

export default Header