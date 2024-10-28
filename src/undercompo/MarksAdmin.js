import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthProvider';

export default function MarksAdmin() {
    const { auth } = useContext(AuthContext);
    const { setAuth } = useContext(AuthContext);
    const [classe, setClasse] = useState('');
    const [seq, setSeq] = useState('');
    const [matiere, setMatiere] = useState('');
    const [marks, setMarks] = useState({});
    const [disable, setDisable] = useState(true);
    const [clData, setClData] = useState([]);
    const [clSeq, setClSeq] = useState([]);
    const [matiereData, setMatiereData] = useState([]);
    const [StudentInfo, setStudentInfo] = useState([]);
    const navigate = useNavigate();
    const { matricule } = useParams();
    useEffect(()=>{handlesal();}, []); 
  
    const handlesal = async()=>{
     setClData([]);   
    var headers = {"Accept":"application/json",
        "Content-Type": "application/json"};
       await axios.get(`http://localhost/ssm/api/handleClasseAdmin.php`, headers)
        .then(response=>{
            setClData(response.data);
            handleSeq();
            console.log(response.data)
            
        },[])
        
    }
  //   fonction pour récupérer les séquences
    const handleSeq = async()=>{
      
      var headers = {"Accept":"application/json",
          "Content-Type": "application/json"};
         await axios.get(`http://localhost/ssm/api/Sequence.php`, headers)
          .then(response=>{
              setClSeq(response.data);
          },[])
          
      }
      
      const handleClasse = async(e)=>{
          setMatiereData([])
          setDisable(false)
          var headers = {"Accept":"application/json",
          "Content-Type": "application/json"};
          await setClasse(e.target.value)
          const trial = e.target.value;
          console.log(trial);
          //setmatStudent(trial) 
              if(trial !== ''){ 
                  console.log(trial);
                  axios.get(`http://localhost/ssm/api/ajoutScheduleSub.php/${trial}`, headers)
                  .then(response=>{
                      console.log(response.data);
                      setMatiereData(response.data);
                        
                  }) 
              }
              
          }

          const handleData = async (e) => {
            setStudentInfo([]);
            const subject = e.target.value;
            setMatiere(subject);
    
            try {
                const response = await axios.get(`http://localhost/ssm/api/handleStudents.php/${classe}`, {
                    headers: { "Accept": "application/json", "Content-Type": "application/json" }
                });
                setStudentInfo(response.data);
            } catch (error) {
                console.error('Error fetching students:', error);
            }
        };
        
    const handleMarkChange = (matricule, value) => {
        setMarks(prevMarks => ({
            ...prevMarks,
            [matricule]: value
        }));
    };

    const handleSubmit = async () => {
        if (!seq || !matiere || Object.keys(marks).length === 0) { // VERIFICATION du contenu des champs
            alert('Please fill in all the fields!');
            return;
        }

        const formData = {// stockage des données dans une liste
            seq: seq,
            matiere: matiere,
            markToStore: Object.entries(marks)
        };
        // requete conditionné 
        try { 
            const response = await axios.post(
                'http://localhost/ssm/api/RegisterMarks.php',
                formData,
                {
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    }
                }
            );

            console.log(response.data);
            alert(response.data.status);
            setMarks('');
            setSeq('');
            setMatiere('');
            navigate('/noteAdmin')
            setAuth(true);
        } catch (error) { //syntax pour renvoi de l'erreur en cas d'erreur
            console.error('Error submitting marks:', error);
            alert('Error submitting marks, please try again.');
        }
    };

    return (
        <>
            <main className='main-container'>
            <div className="enseignant row"><h3>Welcome to Notes management</h3>
    <div className="col-sm-12">
  
    <div className="row mb-3">
        <div className="form-group col-md-4">
        <label className="mb-2">Room</label>
        <select className="form-select choice" onChange={handleClasse} name='salle'>
                        <option selected className='m-2' value='0'>Select the Classroom</option>
                        {clData.map((valu, key)=>(
                        <option className='m-2' key={key} value={valu.id_classe}>{valu.libellee_classe}</option>
                        ))}
                    </select>
      </div>
      <div className="form-group col-md-4">
      <label className="mb-2">Sequence</label>
      <select onChange={(e)=>{setSeq(e.target.value); setDisable(false)}} className="form-select choice" name='sequence'disabled={disable}>
                        <option selected className='m-2' value="0">Select Sequence</option>
                        {clSeq.map((valu, key)=>
                        <option className='m-2' key={key} value={valu.id}>{valu.libellee_sequence}</option>  
                        )} 
                    </select>
      </div>
      <div className="form-group col-md-4">
      <label className="mb-2">Subject</label>
      <select className="form-select choice" onChange={handleData} name='mat' disableD={disable}>
                        <option selected className='m-2' value='0'>Select the Subject</option>
                        {matiereData.map((valu, key)=>
                        <option className='m-2' key={key} value={valu.id_matiere}>{valu.nom_matiere}</option>
                    )} 
                    </select>
        </div>
   </div>
                    </div>
                </div>

                <div className="enseignant row main-container">
                    <div className="col-md-9 contain">
                        <table className="table tab my-1 table-striped table-bordered w-100 container">
                            <thead className='fixed'>
                                <tr>
                                    <th>Matricule</th>
                                    <th>Name</th>
                                    <th>First name</th>
                                    <th>Notes</th>
                                </tr>
                            </thead>
                            <tbody>
                                {StudentInfo.map((notes, key) =>
                                    <tr className='text-dark' key={key}>
                                        <td>{notes.matricule_El}</td>
                                        <td>{notes.nom}</td>
                                        <td>{notes.prenom}</td>
                                        <td>
                                            <input
                                                type='text'
                                                name='mark'
                                                value={marks[notes.matricule_El] || ''}
                                                onChange={(e) => handleMarkChange(notes.matricule_El, e.target.value)}
                                            />
                                        </td>  
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                <button onClick={handleSubmit} className="btn btn-primary">Submit</button>
            </main>
        </>
    );
}
