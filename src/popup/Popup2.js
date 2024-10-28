import React from 'react';
import {Dialog, DialogTitle, DialogContent, Typography } from '@mui/material';
import '../style/popup.css';
import Buton from '../others/button';
import { useNavigate } from 'react-router-dom';





export default function Popup2(props) {

const navigate = useNavigate();

    const {title, children, openPopup, setOpenPopup} = props;
    const handleClose = (e)=>{
      e.preventDefault();
      setOpenPopup(false)
      navigate('/home')
      navigate('/emplois')
    }

    


  return (
    <Dialog open={openPopup} fullWidth="md">
        <DialogTitle className='dialog'> 
            <div className='title' style={{display:'flex'}}><Typography variant="h6" style={{flexGrow:1}} component='div'>{title}</Typography><Buton text="x" onClick={handleClose} /> {/*for title of the popup */}
            
            </div>  
        </DialogTitle>
        <DialogContent dividers className='pop'>
            {children} {/*here parameter children permets us to access the module passed in function pop of enseign */}
        </DialogContent>
    </Dialog>
  )
}
