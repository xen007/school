import { useState, useContext } from 'react';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/js/bootstrap'

// Components
import Header from './dashboard/Header';
import Sidebar from './dashboard/Sidebar';
import Home from './dashboard/Home';
import Teacher from './component/Teachers';
import Student from './component/students';
import Inscriptions from './component/inscriptions';
import Subject from './component/subjects';
import Levels from './component/levels';
import Classe from './component/classes';
import Bull from './component/bulletins';
import Login from './components/Login';
import StudEdit from './undercompo/studEdit';
import StudInsert from './undercompo/studInsert';
import StudView from './undercompo/studView';
import SubInsert from './undercompo/subInsert';
import SubEdit from './undercompo/subEdit';
import ClassInsert from './undercompo/classInsert';
import ClassEdit from './undercompo/classEdit';
import LevView from './undercompo/levView';
import LevEdit from './undercompo/levEdit';
import ClassView from './undercompo/classView';
import Seq from './undercompo/seq';
import Trim from './undercompo/trim';
import Ajoutenseig from './undercompo/Ajoutenseig';
import Modensei from './undercompo/Modensei';
import Schedule from './component/emplois';
import AddSchedule from './undercompo/AddShe';
import ModSchedule from './undercompo/ModSchedule';
import ModificationNote from './undercompo/modificationNote';
import NoteAdmin from './component/noteAdmin';
import HomeEns from './tecomp/homEns';
import Registration from './component/registration';
import Notes from './tecomp/notes';
import ScheduleTeacher from './tecomp/scheduleTeacher';
import Lan from './component/Modal';
import AuthContext from '../src/context/AuthProvider';
import SidebarTeacher from './dashboard/SidebarTeacher';
import Setting from './component/settings';
import Sequence from './undercompo/sequence';
import DateEdit from './undercompo/dateEdit';
import CategCl from './component/categCl';
import CatInsert from './undercompo/catInsert';
import CatEdit from './undercompo/catEdit';
import MarksAdmin from './undercompo/MarksAdmin';
import Scolarite from './component/scolarites';
import PdfTemplate from './undercompo/Template';
import ScoView from './undercompo/scoView';
import Evaluation from './component/evaluations';
import EvalInsert from './undercompo/evalInsert';
import EvalEdit from './undercompo/evalEdit';


function App() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const { auth } = useContext(AuthContext);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <BrowserRouter>
      <div className={auth ? 'grid-container' : 'LoginPage'}>
        {/* Render Header and Sidebar only if authenticated and not on login page */}
        {auth? (
          <>
            <Header OpenSidebar={OpenSidebar} />
            <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
          </>
        ):(<></>)}
        
        
        <Routes>
          {/* en cas d'erreur verifier ces deux lignes*/}
            <Route path='/' element={<Login />} />
            <Route path='/Login' element={<Login />} />
          {auth ? (
            <>
              <Route path='/Home' element={<Home />} />
              <Route path='/classes' element={<Classe />} />
              <Route path='/students' element={<Student />} />
              <Route path='/teachers' element={<Teacher />} />
              <Route path='/teachers/:matricule' element={<Teacher />} />
              <Route path='/bulletins' element={<Bull />} />
              <Route path='/subjects' element={<Subject />} />
              <Route path='/levels' element={<Levels />} />
              <Route path='/inscriptions' element={<Inscriptions />} />
              <Route path='/scolarites' element={<Scolarite />} />
              <Route path='/emplois' element={<Schedule />} />
              {/* <Route path='/emplois/:matricule' element={<Schedule />} /> */}
              <Route path='/noteAdmin' element={<NoteAdmin />} />
              <Route path='/registration' element={<Registration />} />
              <Route path='/notes' element={<Notes />} />
              <Route path='/settings/' element={<Setting />} />
              <Route  path='/categCl/' element={<CategCl />} />
              <Route path='/notes/:matricule' element={<Notes />} />
              <Route path='/notes/:matricule/:matricule_el/:seq_elev/:matiere' element={<Notes />} />
              <Route path='/bulletins/seq/:ns' element={<Seq />} />
              <Route path='/bulletins/trim/:nt' element={<Trim />} />
              <Route path='/noteAdmin/:matricule_El/:seq_elev/:matiere' element={<NoteAdmin />} />
              <Route path='/StudEdit/:matricule' element={<StudEdit />} />
              <Route path='/StudInsert' element={<StudInsert />} />
              <Route path='/StudView/:matricule' element={<StudView />} />
              <Route path='/SubEdit/:idMat' element={<SubEdit />} />
              <Route path='/ClassEdit/:idClasse' element={<ClassEdit />} />
              <Route path='/ClassView/:idClasse' element={<ClassView />} />
              <Route path='/SubInsert' element={<SubInsert />} />
              <Route path='/ClassInsert' element={<ClassInsert />} />
              <Route path='/levView/:idNiv' element={<LevView />} />
              <Route path='/levEdit/:idNiv' element={<LevEdit />} />
              <Route path='/Ajoutenseig' element={<Ajoutenseig />} />
              <Route path='/Modensei' element={<Modensei />} />
              <Route path='/AddShe' element={<AddSchedule />} />
              <Route path='/ModSchedule' element={<ModSchedule />} />
              <Route path='/modificationNote' element={<ModificationNote />} />
              <Route path='/homEns/:matricule' element={<HomeEns />} />
              <Route path='/scheduleTeacher' element={<ScheduleTeacher />} />
              <Route path='/scheduleTeacher/:matricule' element={<ScheduleTeacher />} />
              <Route path='/emplois/:cours' element={<Schedule />} />
              <Route path='/Modal' element={<Lan />} />
              <Route path='/Sequence/:id' element={<Sequence />} />
              <Route path='/sequence/dateEdit/:id' element={<DateEdit />} />
              <Route path='/catInsert' element={<CatInsert />} />
              <Route path='/catEdit/:id' element={<CatEdit />} />
              <Route path='/SidebarTeacher/:matricule' element={<SidebarTeacher />} />
              <Route path='/marksAdmin' element={<MarksAdmin />} />
              <Route path='/Template' element={<PdfTemplate />} />
              <Route path='/scoView' element={<ScoView />} />
              <Route path='/evaluations' element={<Evaluation />} />
              <Route path='/evalInsert' element={<EvalInsert />} />
              <Route path='/evalEdit/:ideval' element={<EvalEdit />} />
            </>
          ): (
            <>
            <Route path='/' element={<Login />} />
            <Route path='/Login' element={<Login />} />
            </>
          )}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;