// importation des modules
import React, { useEffect, useState } from 'react';
import { Link} from 'react-router-dom';
import { Plus } from 'react-bootstrap-icons';
import NoteEdit from '../undercompo/noteEdit';
// fonction principale
export default function NoteAdmin() {
    // déclaration des constantes
    const [seq, setSeq] = useState([]);
  
    const [niveau, setNiveau] = useState([]);
    const [evaluation, setEvaluation] = useState([]);
    const [evalData, setEvalData] = useState([]);
    const [student, setStudent] = useState([]);
  
    const[subject,setSubject]=useState([])
    const[subData,setSubData]=useState([])
      const[classData,setClassData] = useState([])
      const[classe,setClasse] = useState([])
      const[enable,setEnable] = useState(true)
      const[text,setText] = useState('Selectionnez d\'abord le niveau')
  
  
      const[formvalue,setFormvalue] = useState({
        seq:'',
        evaluation:'',
        classe:'',
        matiere:'',
        })
        const handleInput =(e) =>{
          setFormvalue({...formvalue,[e.target.name] : e.target.value})
        }
      useEffect(() => {
        getNiveau(); // Fetch classes and sequences on mount
        getSubject(); // Fetch classes and sequences on mount
        getclasse(); // Fetch classes and sequences on mount
        getEval(); // Fetch classes and sequences on mount
        getSeq(); // Fetch classes and sequences on mount
       
      }, []);
    
      const getNiveau=async()=>{
        const req = await  fetch('http://localhost/ssm/api/niveau.php/')
        const res = await req.json()
        setNiveau(res)
    }
    const getSubject= async()=>{
      const reqdata = await fetch("http://localhost/ssm/api/mat.php")
      const resdata = await reqdata.json()
      setSubject(resdata)
    }
    const getclasse= async()=>{
      const reqdata = await fetch("http://localhost/ssm/api/classe.php")
      const resdata = await reqdata.json()
      setClasse(resdata)
    }
    const getEval= async()=>{
      const reqdata = await fetch("http://localhost/ssm/api/eval.php")
      const resdata = await reqdata.json()
      setEvaluation(resdata)
    }
    const getSeq= async()=>{
      const reqdata = await fetch("http://localhost/ssm/api/sequence.php")
      const resdata = await reqdata.json()
      setSeq(resdata)
    }
    const handleNiveau = async (e)=>{
      const niveauId = e.target.value
      if (niveauId !== "") {
          setSubData(subject.filter(s => s.niv === (e.target.value)))
          setClassData(classe.filter(s => s.niveau === (e.target.value)))
          setEnable(false)
          setText('Selectionnez')
          // setEvalData(evaluation.filter(s => s.matiere === (e.target.value)))
  
      }else{
          setText('Selectionnez d\'abord le niveau')
          setSubData([])
          setEnable(true)
      }
      // console.log(niveauId)
  } 
  const handleEval = (e) =>{
    setFormvalue({...formvalue,[e.target.name] : e.target.value})
    setEvalData(evaluation.filter(s => s.idMat === (e.target.value)))
  }
  // const handleStud = (e) =>{
  //   setFormvalue({...formvalue,[e.target.name] : e.target.value})
  //   setStudentData(student.filter(s => s.cl === (e.target.value)))
  //   console.log(studentData)
  // }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost/ssm/api/ViewNote.php', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json', 
        }, body: JSON.stringify(formvalue), 
      });
      const result = await res.json(); 
      if (result.error) {
        console.error(result.error); 
        return; 
      }
      // setResponse(result); // Update the response state with the result
      if(result.resultat !== 'Verifiez les informations SVP'){
        const resultat = result.sort((a,b) => a.nom.localeCompare(b.nom))
        setStudent(resultat)
        }  // Call your custom function with the result
    } catch (error) {
      console.error('Error:', error);
    }
  };
  return (
<>
<main className='main-container'>
    <div className="enseignant row"><h3>Bienvenu sur la gestion des Notes</h3>
    <div className="row ">
                <div className="form-group col-md-2">
                <label className="mb-2">Niveau</label>
                <select id='niveau' name="niveau" className="form-control" onChange={handleNiveau}>
                <option value="">Selectionnez le Niveau</option>
                    {
                    niveau.map((nData, index) =>(
                    <option key={index}  value={nData.id}>{nData.libellee_niveau}</option>
                        )
                    )}
                </select>
              </div>

              <div className="form-group col-md-2">
                <label className="mb-2">Sequence</label>
                <select id='seq' name='seq' className="form-select"  onChange={handleInput} >
                  <option>Choix Sequence</option>
                  {seq.map((seq, key) => (
                    <option key={key} value={seq.id}>{seq.libellee_seq}</option>
                  ))}
                </select>
              </div>
              <div className="form-group col-md-2">
              <label className="mb-2">matiere</label>
              <select id='matiere' name="matiere" disabled={enable} onChange={handleEval} className="form-control">
              <option value="">{text}</option>
                {
                subData.map((nData, index) =>(
                <option key={index} value={nData.idMat} >{nData.nom}</option>
                    )
                )}
                </select>
              </div>
              <div className="form-group col-md-2">
                <label className="mb-2">Evaluation</label>
                <select id='evaluation' name='evaluation' className="form-select" onChange={handleInput} disabled={enable}>
                  <option >Select the Evaluation</option>
                  {
                evalData.map((nData, index) =>(
                <option key={index} value={nData.ideval} >{nData.nom}</option>
                    )
                )}
                </select>
              </div>
              <div className="form-group col-md-2">
              <label className="mb-2">Classe</label>
              <select id='classe' name="classe" disabled={enable} onChange={handleInput} className="form-control">
              <option value="">{text}</option>
                {
                classData.map((nData, index) =>(
                <option key={index} value={nData.idClasse}>{nData.libellé_classe}</option>
                    )
                )}
                </select>
              </div> 
              <div className=" col-md-1">
              <label className="mb-2"></label>
              <button className="btn btn-success" onClick={handleSubmit}>valider</button>
              </div>
            </div>
          </div>
    <div className="container">
    <h3><strong>Ajouter une note</strong> <Link to={`/studentmarks`} className="btn btn-success"><Plus />Ajouter</Link></h3>
     <table className="table table-striped table-bordered  w-auto">
                <thead>
                
                <tr>
                    <th>Matricule</th>
                    <th>Nom</th>
                    <th>Prenom</th>
                    <th>Note</th>
                    <th>Action</th>
                </tr>
                
            </thead>
            <tbody>{student.map((notes, key)=>
                <tr className='text-dark' key={key}>
                    <td>{notes.matricule}</td>
                    <td>{notes.nom}</td>
                    <td>{notes.prenom}</td>
                    <td>{notes.note1}</td>
                    <td><div className="btn-group " role="toolbar" aria-label="Toolbar with button groups">
                      <div role="group" aria-label="Second group">
                          <NoteEdit data={notes} ud={formvalue} />
                      </div>
                    </div></td> 
              </tr>)}
          </tbody> 
      </table>
  </div>
  <div>
            {/* <Popup openPopup = {openPopup}
                setOpenPopup = {setOpenPopup}
                title ='Modify the note'
                >
            <ModificationNote />
        </Popup> */}
        </div> 

    </main>
    </>
  )
}
