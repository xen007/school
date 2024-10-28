// importation des different modules
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// fonction principale
export default function ClassInsert(){
    // declaration des contantes
    const navigate = useNavigate()
    const [message,setMessage] = useState('')
    const[formvalue,setFormvalue] = useState({
        nom:'',
        niveau:'',
        ens:'',
        capacité:'',
        cat:'',
        filiere:'',
    })


    const[niveauData,setNiveauData] = useState([])
    useEffect( () => {
        const getNiveau = async()=>{
        const reqdata = await fetch("http://localhost/ssm/api/niveau.php")
        const resdata = await reqdata.json()
        // console.log(resdata)
        setNiveauData(resdata)
        }
        getNiveau()
    },[])
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
    const[categ,setCategData] = useState([])
    useEffect( () => {
        const getCateg = async()=>{
        const reqdata = await fetch("http://localhost/ssm/api/categCl.php")
        const resdata = await reqdata.json()
        // console.log(resdata)
        setCategData(resdata)
        }
        getCateg()
    },[])
    //prise en charge des informations saisies
    const handleInput =(e) =>{
        setFormvalue({...formvalue,[e.target.name] : e.target.value})
    }
    // fonction pour soumettre le formulaire
    const handleSubmit =async(e)=>{
        e.preventDefault()
        //console.log(formvalue)

        const formData = {
            nom:formvalue.nom.toUpperCase(),
            capacité:formvalue.capacité,
            niveau:formvalue.niveau,
            ens: formvalue.ens,
            cat: formvalue.cat,
            filiere: formvalue.filiere,
        }
        const res = await axios.post('http://localhost/ssm/api/classe.php', formData)
        if(res.data.success){
            setMessage(res.data.success)
            setTimeout(() => {
                navigate('/classes')
            }, 2000);    
        }
   }

   const[enable,setEnable] = useState(true)
   const[text,setText] = useState('Selectionnez d\'abord la filiere')
   const[niveau,setNiveau] = useState([])
   const handleFiliere = async (e)=>{
    setFormvalue({...formvalue,[e.target.name] : e.target.value})
    const filiereId = e.target.value
    if (filiereId !== "") {
        setNiveau(niveauData.filter(s => s.filiere.includes(e.target.value)))
        setEnable(false)
        setText('Selectionnez le niveau')
        
    }else{
        setText('Selectionnez d\'abord le niveau')
        setNiveau([])
        setEnable(true)
    }
    // console.log(niveauId)
}

   if(categ.resultat === 'Verifiez les informations SVP'){
    return(
        
        <main className="main-container">
            <h4>Creez d'abord une categorie de classe</h4>
        </main>
    )
   }else{
    return(
        
        <main className="main-container">
            <div className="col-md-12 mt-4">
                <h2>Nouvelle salle de Classe</h2>
                <p className="text-success">{message}</p>
                <form onSubmit={handleSubmit}>
                <div className="col-sm-12">
          
                <div className="row mb-3">
                    <div className="form-group col-md-4">
                    <label className="mb-2">Filiere</label>
                    <select name="filiere" className="form-control" value={formvalue.filiere} onChange={(e)=>handleFiliere(e)}>
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
                    <select name="niveau" className="form-control" disabled={enable}  value={formvalue.niveau} onChange={handleInput}>
                    <option value="">{text}</option>
                        {
                        niveau.map((nData, index) =>(
                        <option key={index}  value={nData.id}>{nData.libellee_niveau}</option>
                            )
                        )}
                    </select>
                    </div>
                    <div className="form-group col-md-4">
                    <label className="mb-2">libellé_Classe</label>
                    <input type="text" className="form-control" name="nom" id="nom" value={formvalue.nom} onChange={handleInput} />
                    </div>
                    <div  className="form-group col-md-4">
                    <label className="mb-2">categorie</label>
                    <select name="cat" className="form-control" value={formvalue.cat} onChange={handleInput}>
                    <option value="">Selectionnez la categorie</option>
                        {
                        categ.map((nData, index) =>(
                        <option key={index}  value={nData.id}>{nData.libellee}  ({nData.des})</option>
                            )
                        )}
                    </select>
                    </div>
                    <div className="form-group col-md-4">
                    <label className="mb-2">Capacité_Acceuil</label>
                        <input type="number" className="form-control" name="capacité" id="capacité" value={formvalue.capacité}  onChange={handleInput}/>
                    </div>
                </div>
                    
            </div>
            <div className='buttons'>
                <button className='btn btn-secondary' onClick={()=>{navigate('/classes')}}>Retour</button>
                <button type='submit' name='submit' className="btn btn-success">Enregister </button>
               
            </div> 
            </form>

            </div>
        </main>
    )
}
}