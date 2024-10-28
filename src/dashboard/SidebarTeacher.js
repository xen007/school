import React, {useContext, useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import 
{ BsGrid1X2Fill, BsFillGrid3X3GapFill, BsListCheck, BsMenuButtonWideFill, BsPeopleFill} from 'react-icons/bs'
 import { IoSchool } from "react-icons/io5";
 import { PiStudentFill } from "react-icons/pi";
 import { FaMoneyCheck } from "react-icons/fa";
 import { FaCalendarPlus } from "react-icons/fa";
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthProvider.js';

function SidebarTeacher() {
    const {auth} = useContext(AuthContext);
    const {authteacher} = useContext(AuthContext);
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
    const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };
 
    
    const {matricule} = useParams()
  return (
    
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive": ""}>
            <div className='sidebar-title'>
                <div className='sidebar-brand'>
                    <IoSchool className='icon_header'/> SCHOOL
                </div>
                <span className='icon close_icon' onClick={OpenSidebar}>X</span>
            </div>
    
            <ul className='sidebar-list'>
                <li className='sidebar-list-item'>
                    <Link to={`/homEns/${matricule}`}>
                        <BsGrid1X2Fill className='icon'/> Dashboard
                    </Link>
                </li>
                <li className='sidebar-list-item'>
                    <Link to={`/ScheduleTeacher/${matricule}`}>
                        <FaCalendarPlus className='icon'/> Schedule
                    </Link>
                </li>
                <li className='sidebar-list-item'>
                    <Link to={`/notes/${matricule}`}>
                        <FaMoneyCheck className='icon'/> Notes
                    </Link>
                </li>
            </ul>
        </aside>
  )
}

export default SidebarTeacher