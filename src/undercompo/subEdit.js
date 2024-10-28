// importation des modules
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// fonction principale
export default function SubEdit(){
    // déclaration des constantes
    const[formvalue,setFormvalue] = useState({
        nom:'',
        classe:'',
        niveau:'',
        
    })
    const navigate = useNavigate()
    const {idMat} = useParams()
    const [message,setMessage] = useState('')
    const[clData,setClData]=useState([])
    const[classData,setClassData] = useState([])
    const[niveauData,setNiveauData] = useState([])
    const handleInput =(e) =>{
        setFormvalue({...formvalue,[e.target.name] : e.target.value})
    }
    useEffect( ()=>{
        // recuperation des données sur la matiere
      const getSubject= async()=>{
          const reqdata = await fetch("http://localhost/ssm/api/mat.php/"+idMat)
          const resdata = await reqdata.json()

          setFormvalue(resdata)
          }
          getSubject()
      },[idMat])
    //   envoie des informations du fomulaire
      const handleSubmit =async(e)=>{
        e.preventDefault()
        if(e.target.value===""){
            setMessage('verifiez les valeurs')
        }else{
        //console.log(formvalue)
        const formData = {
            idMat:formvalue.idMat,
            nom:formvalue.nom,
            classe:formvalue.classe,
            niveau:formvalue.niveau,
            filiere: formvalue.filiere,
            description: formvalue.description,
        }
        const res = await axios.put('http://localhost/ssm/api/mat.php', formData)
        if(res.data.success){
            setMessage(res.data.success)
            setTimeout(() => {
                navigate('/subjects')
            }, 2000);
        }
    }
}
    useEffect( () => {
        const getNiveau = async()=>{
        const reqdata = await fetch("http://localhost/ssm/api/niveau.php")
        const resdata = await reqdata.json()
        // console.log(resdata)
        setNiveauData(resdata)
        setNiveau(resdata)
        }
        getNiveau()
    },[])
    useEffect( ()=>{
        const getClasse= async()=>{
            const reqdata = await fetch("http://localhost/ssm/api/classe.php/")
            const resdata = await reqdata.json()
            setClassData(resdata)
            setClData(resdata)
        }
        getClasse()
    },[])
//fonction pour rendre la classe dependante du niveau choisis

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
console.log(formvalue.classe)

    return(
        <main className="main-container">
            <div className="col-md-12 mt-4">
                <h2>Modifier</h2>
                <p className="text-success">{message}</p>
                <form onSubmit={handleSubmit}>
                <div className="col-sm-12">
                <div className="row mb-3">
                    <div className="form-group col-md-4">
                    <label className="mb-2">Filiere</label>
                    <select name="filiere" id="filiere" className="form-control" value={formvalue.filiere}  onChange={(e)=>handleFiliere(e)}>
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
                    <select name="niveau" id="niveau" className="form-control" disabled={enable} value={formvalue.niveau} onChange={handleInput}>
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
                    <select name="classe" disabled={enable} value={formvalue.classe} onChange={handleInput} className="form-control">
                    <option value="">{text}</option>
                    {
                    clData.map((cData, index) =>(
                    <option key={index} value={cData.idClasse} >{cData.libellé_classe}</option>
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
                <button type='submit' name='submit' className="btn btn-success">Modifier </button>
               
            </div>        
        </form>

            </div>
        </main>
    )
}