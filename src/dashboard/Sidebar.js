import React from 'react'
import { BsGrid1X2Fill, BsFillGrid3X3GapFill,BsMenuButtonWideFill, BsPeopleFill} from 'react-icons/bs'
import { PiStudentFill } from "react-icons/pi";
import { FaMoneyCheck, FaCalendarPlus, FaLayerGroup, FaBook } from "react-icons/fa";
import { FaGear, FaHandHoldingDollar, FaSackDollar } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import logo from './LOGO.png'

function Sidebar({openSidebarToggle, OpenSidebar}) {
  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive": ""}>
        <div className='sidebar-title'>
            <div className='sidebar-brand'>
                <img src={logo} style={{width:"70px"}} alt="Logo" />SSM
            </div>
            <span className='icon close_icon' onClick={OpenSidebar}>X</span>
        </div>

        <ul className='sidebar-list'>
            <li className='sidebar-list-item'>
                <Link to='/Home'>
                    <BsGrid1X2Fill className='icon'/> Dashboard
                </Link>
            </li>
            
            <li className='sidebar-list-item'>
                <Link to="/classes">
                    <BsFillGrid3X3GapFill className='icon'/> Classes
                </Link>
            </li>
            <li className='sidebar-list-item'>
                <Link to='/students'>
                    <PiStudentFill className='icon'/> Elèves
                </Link>
            </li>
            <li className='sidebar-list-item'>
                <Link to='/teachers'>
                    <BsPeopleFill className='icon'/> Enseignants
                </Link>
            </li>
            <li className='sidebar-list-item'>                             
                <Link to='/subjects'>
                    <FaBook className='icon'/> Matières
                </Link>
            </li>
            <li className='sidebar-list-item'>                             
                <Link to='/levels'>
                    <FaLayerGroup className='icon'/> Niveaux
                </Link>
            </li>
            <li className='sidebar-list-item'>
                <Link to='bulletins'>
                    <BsMenuButtonWideFill className='icon'/> Bulletins
                </Link>
            </li>
            <li className='sidebar-list-item'>
                <Link to='inscriptions' >
                    <FaSackDollar className='icon'/> Inscriptions
                </Link>
            </li>
            <li className='sidebar-list-item'>
                <Link to='scolarites' >
                    <FaHandHoldingDollar className='icon'/> Scolarités
                </Link>
            </li>
            <li className='sidebar-list-item'>
                <Link to='evaluations' >
                    <FaCalendarPlus className='icon'/> Evaluations matieres
                </Link>
            </li>
            <li className='sidebar-list-item'>
                <Link to='noteAdmin' >
                    <FaMoneyCheck className='icon'/> Notes
                </Link>
            </li>
            <li className='sidebar-list-item'>
                <Link to='settings' >
                    <FaGear className='icon'/> Réglages
                </Link>
            </li>
        </ul>
    </aside>
  )
}

export default Sidebar