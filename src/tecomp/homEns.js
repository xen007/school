import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import notes3 from '../others/images/notes3.jpg';
import timetable from '../others/images/timetable.jpg'

import {FaPen} from '@react-icons/all-files/fa/FaPen';
import { FaCalendarAlt } from '@react-icons/all-files/fa/FaCalendarAlt';
import { Link, useParams } from 'react-router-dom';
import SidebarTeacher from '../dashboard/SidebarTeacher';

export default function HomeEns() {
  
    const {matricule} = useParams(); //récupération du matricule sur le lien
  console.log(matricule)

  return (
    
    <>
    <SidebarTeacher />
    <div className='main-container row d-flex '>
        
        <div className='col-lg-6 col-md-6 col-sm-6'>
          <img src={notes3} alt="notes" className='emploi' />
          <Link to={`/notes/${matricule}`} className=' btn btn-primary'>Saisie des notes  <FaPen/></Link> {/*/note/$matricule nous donne le lien avec le matricule  */}
        </div>
        <div className='col-lg-6 col-md-6 col-sm-6'>
          <img src={timetable} alt="time-table" className='emploi' />
          <Link to={`/ScheduleTeacher/${matricule}`} className=' btn btn-primary'>Consulter votre emploi du temps  <FaCalendarAlt/></Link>
        </div>
      </div>
       
    </>
    
  )
}
