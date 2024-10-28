// importation des modules
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// fonction principale
export default function SubInsert(){
    // declaration des constantes
    const[formvalue,setFormvalue] = useState({
        nom:'',
        classe:'',
        filiere:'',
        description:'',
    })
    const[classData,setClassData] = useState([])
    const[niveauData,setNiveauData] = useState([])
    useEffect( () => { 
        // recuperation des noveaux
        const getNiveau = async()=>{
        const reqdata = await fetch("http://localhost/ssm/api/niveau.php")
        const resdata = await reqdata.json()
        // console.log(resdata)
        setNiveauData(resdata)
        }
        getNiveau()
    },[])
// declaration des  constantes et recuperation des classes
    const[classe,setClData]=useState([])
    useEffect( ()=>{
      
          getclasse()
      },[])
      const getclasse= async()=>{
          const reqdata = await fetch("http://localhost/ssm/api/classe.php")
          const resdata = await reqdata.json()
          setClData(resdata) 
          }

    const handleNiveau = async (e)=>{
        const niveauId = e.target.value
        setFormvalue({...formvalue,[e.target.name] : e.target.value})
        if (niveauId !== "") {
            setClassData(classe.filter(s => s.niveau === (e.target.value)))
            setEnable(false)
            setText('Selectionnez la classe')
            
        }else{
            setText('Selectionnez d\'abord le niveau')
            setClassData([])
            setEnable(true)
        }
        // console.log(niveauId)
    }
    const navigate = useNavigate()
    const [message,setMessage] = useState('')

    const handleInput =(e) =>{
        setFormvalue({...formvalue,[e.target.name] : e.target.value})
    }
    // envoie des informations du formulaire
    const handleSubmit =async(e)=>{
        e.preventDefault()
        //console.log(formvalue)
        const formData = {
            nom:formvalue.nom,
            // classe:formvalue.classe,
            niveau:formvalue.niveau,
            ens: formvalue.ens,
            filiere: formvalue.filiere,
            description: formvalue.description,
        }
        const res = await axios.post('http://localhost/ssm/api/mat.php', formData)
        if(res.data.success){
            setMessage(res.data.success)
            setTimeout(() => {
                navigate('/subjects')
            }, 2000);    
        }
    }
    const[filiereData,setFiliereData] = useState([])
    useEffect( () => {
        const getFiliere = async()=>{
        const reqdata = await fetch("http://localhost/ssm/api/filiere.php")
        const resdata = await reqdata.json()
        // console.log(resdata)
        setFiliereData(resdata)
        }
        getFiliere()
    },[])
    const[enable,setEnable] = useState(true)
    const[text,setText] = useState('Selectionnez d\'abord la filiere')
    const[niveau,setNiveau] = useState([])
    const handleFiliere = async (e)=>{
        setFormvalue({...formvalue,[e.target.name] : e.target.value})
     const filiereId = e.target.value
     if (filiereId !== "") {
         setNiveau(niveauData.filter(s => s.filiere === (e.target.value)))
         setEnable(false)
         setText('Selectionnez le niveau')
         
     }else{
         setText('Selectionnez d\'abord le niveau')
         setNiveau([])
         setEnable(true)
     }
     // console.log(niveauId)
 }

    return(
        
        <main className="main-container">
            <div className="col-md-12 mt-4">
                <h2>Ajouter une matiere</h2>
                <p className="text-success">{message}</p>
                <form onSubmit={handleSubmit}>
                <div className="col-sm-12">
          
                <div className="row mb-3">
                <div className="form-group col-md-4">
                    <label className="mb-2">Filiere</label>
                    <select name="filiere" id="filiere" className="form-control"  onChange={(e)=>handleFiliere(e)}>
                    <option value="">Selectionnez la Filiere</option>
                        {
                        filiereData.map((nData, index) =>(
                        <option key={index}  value={nData.id}>{nData.libellee_filiere}</option>
                            )
                        )}
                    </select>
                    </div>
                    <div className="form-group col-md-4">
                    <label className="mb-2">Niveau</label>
                    <select name="niveau" id="niveau" className="form-control" disabled={enable} value={formvalue.niveau} onChange={(e)=>handleInput(e)}>
                    <option value="">{text}</option>
                        {
                        niveau.map((nData, index) =>(
                        <option key={index}  value={nData.id}>{nData.libellee_niveau}</option>
                            )
                        )}
                    </select>
                    </div>
                    {/* <div className="form-group col-md-4">
                    <label className="mb-2">Classe</label>
                    <select name='classe' id='classe' disabled={enable} onChange={handleInput} className="form-control">
                                        <option value="">{text}</option>
                                        {
                                        classData.map((nData, index) =>(
                                        <option key={index}  value={nData.id}>{nData.libellé_classe}</option>
                                            )
                                        )}
                                       
                                    </select> 
                    </div> */}
                    <div className="form-group col-md-4">
                    <label className="mb-2">libellé_Matière</label>
                    <input type="text" className="form-control" name="nom" id="nom" value={formvalue.nom} onChange={handleInput} />
                    </div>
                    <div className="form-group col-md-4">
                    <label className="mb-2">description</label>
                        <input type="text" className="form-control" name="description" id="description" value={formvalue.description}  onChange={handleInput}/>

                    </div>
                </div>
                    
            </div>
            <div className='buttons'>
                <button className='btn btn-secondary' onClick={()=>{navigate('/subjects')}}>Retour</button>
                <button type='submit' name='submit' className="btn btn-success">Enregister </button>
               
            </div> 
            </form>

            </div>
        </main>
    )
}