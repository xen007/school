// importation des modules
import React, { useState, useEffect } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import WebcamCapture from './webcam'
import config from '../component/config';
// fonction principale
export default function StudInsert() {
    // déclaration des contantes
    const [nom, setNom] = useState('')
    const [prénom, setPrénom] = useState('')
    const [dateNaiss, setDatenaiss] = useState('')
    const [lieuNaiss, setLieunaiss] = useState('')
    const [adresse, setAdresse] = useState('')
    const [genre, setGenre] = useState('')
    const [tuteur, setTuteur] = useState('')
    const [phone, setPhone] = useState('')
    const [ptuteur, setPtuteur] = useState('')
    const [mere, setMere] = useState('')
    const [phoneM, setPhoneM] = useState('')
    const [pmere, setPmere] = useState('')
    const [infoSup, setInfosup] = useState('')
    const [photo, setPhoto] = useState('')
    const [matricule, setMatricule] = useState('')
    const [mat, setMat] = useState('')
    const [niveau, setNiveau] = useState('')
    const [classe, setClasse] = useState('')
    const [redoublant, setRedoublant] = useState('')
    const [acte, setActe] = useState('')
    const [ancienete, setAncienete] = useState('')
    const [sante, setSante] = useState('')
    const [ethnie, setEthnie] = useState('')
    const [malade, setMalade] = useState('')
    const scolaire = "2024-2025"

    const [message, setMessage] = useState('')
    const navigate = useNavigate()
    //envoi des informations concernant l'elève
    const uploadStudent = async () => {
        const formData = new FormData()
        formData.append('nom', nom)
        formData.append('prénom', prénom)
        formData.append('dateNaiss', dateNaiss)
        formData.append('lieuNaiss', lieuNaiss)
        formData.append('adresse', adresse)
        formData.append('genre', genre)
        formData.append('tuteur', tuteur)
        formData.append('phone', phone)
        formData.append('ptuteur', ptuteur)
        formData.append('mere', mere)
        formData.append('phoneM', phoneM)
        formData.append('pmere', pmere)
        formData.append('infoSup', infoSup)
        formData.append('photo', photo)
        formData.append('matricule', mat)
        formData.append('niveau', niveau)
        formData.append('classe', classe)
        formData.append('redoublant', redoublant)
        formData.append('acte', acte)
        formData.append('ancienete', ancienete)
        formData.append('sante', sante)
        formData.append('ethnie', ethnie)
        formData.append('malade', malade)
        formData.append('scolaire', scolaire)


        const response = await axios.post(`${config.apiBaseUrl}/i.php`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        })

        if (response.data.success) {
            setMessage(response.data.success)
            setTimeout(() => {
                navigate('/students')
            }, 2000);
        }
    }
    //envoi des informations du formulaire
    const handleSubmit = async (e) => {
        e.preventDefault()
        await uploadStudent()
        console.log(photo)

    }
    /* recuperation des select */

    // declaration des constantes pour récuperer et afficher les informations dans les selects
    const [clData, setClData] = useState([])
    const [classData, setClassData] = useState([])
    const [niveauData, setNiveauData] = useState([])
    const [enable, setEnable] = useState(true)
    const [text, setText] = useState('Selectionnez d\'abord le niveau')


    useEffect(() => {
        const getNiveau = async () => {
            const reqdata = await fetch(`${config.apiBaseUrl}/niveau.php`)
            const resdata = await reqdata.json()
            // console.log(resdata)
            setNiveauData(resdata)
        }
        getNiveau()
        const getclasse = async () => {
            const reqdata = await fetch(`${config.apiBaseUrl}/classe.php`)
            const resdata = await reqdata.json()
            setClData(resdata)

        }
        getclasse()
        const getMat = async () => {
            const reqdata = await fetch(`${config.apiBaseUrl}/get.php`)
            const resdata = await reqdata.json()
            setMatricule(resdata.matricule)
        }
        getMat()
    }, [])
    //   rendre la classe dependante du niveau selectionné
    const handleNiveau = async (e) => {
        const niveauId = e.target.value
        if (niveauId !== "") {
            setClassData(clData.filter(s => s.niveau === (e.target.value)))
            setEnable(false)
            setText('Selectionnez la classe')
            setNiveau(e.target.value)

        } else {
            setText('Selectionnez d\'abord le niveau')
            setClassData([])
            setEnable(true)
        }

        // console.log(niveauId)
    }
    return (
        <main className="main-container">
            <div className="container">
                <p className='text-success text-center'>{message}</p>
                <header>Enregistrement</header>
                <form onSubmit={handleSubmit}>
                    <div className="form first">
                        <div className="details personnal">
                            <span className="title">Details Personnels</span>

                            <div className="fields">

                                <div className="input-field">
                                    <label>Nom</label>
                                    <input type="text" name='nom' id='nom' onChange={(e) => setNom(e.target.value)} placeholder="Entrez le nom" />
                                </div>
                                <div className="input-field">
                                    <label>Prénom</label>
                                    <input type="text" name='prénom' id='prénom' onChange={(e) => setPrénom(e.target.value)} placeholder="Entrez le prénom" />
                                </div>
                                <div className="input-field">
                                    <label>Date de Naissane</label>
                                    <input type="date" name='dateNaiss' id='dateNaiss' onChange={(e) => setDatenaiss(e.target.value)} />
                                </div>
                                <div className="input-field">
                                    <label>Lieu de Naissance</label>
                                    <input type="text" name='lieuNaiss' id='lieuNaiss' onChange={(e) => setLieunaiss(e.target.value)} placeholder="Entrez le lieu de Naissance" />
                                </div>
                                <div className="input-field">
                                    <label>Adresse</label>
                                    <input type="text" name='adresse' id='adresse' onChange={(e) => setAdresse(e.target.value)} placeholder="Entrez l'adresse" />
                                </div>
                                <div className="input-field">
                                    <label>Genre</label>
                                    <select name='genre' id='genre' onChange={(e) => setGenre(e.target.value)}>
                                        <option>Selectionnez le genre</option>
                                        <option value='M'>M</option>
                                        <option value="F">F</option>
                                    </select>
                                </div>
                                <div className="input-field">
                                    <label>Nom Tuteur</label>
                                    <input type="text" name='tuteur' id='tuteur' onChange={(e) => setTuteur(e.target.value)} placeholder="nom du tuteur" />
                                </div>
                                <div className="input-field">
                                    <label>Numéro Tuteur</label>
                                    <input type="number" name='phone' id='phone' onChange={(e) => setPhone(e.target.value)} placeholder="numéro tuteur" />
                                </div>
                                <div className="input-field">
                                    <label>profession Tuteur</label>
                                    <input type="text" name='ptuteur' id='ptuteur' onChange={(e) => setPtuteur(e.target.value)} placeholder="nom du tuteur" />
                                </div>
                                <div className="input-field">
                                    <label>Nom de la Mere</label>
                                    <input type="text" name='mere' id='mere' onChange={(e) => setMere(e.target.value)} placeholder="nom du tuteur" />
                                </div>
                                <div className="input-field">
                                    <label>Numéro mère</label>
                                    <input type="number" name='phoneM' id='phoneM' onChange={(e) => setPhoneM(e.target.value)} placeholder="numéro tuteur" />
                                </div>
                                <div className="input-field">
                                    <label>profession mere</label>
                                    <input type="text" name='pmere' id='pmere' onChange={(e) => setPmere(e.target.value)} placeholder="nom du tuteur" />
                                </div>
                                <div className="input-field">
                                    <label>Autres Informations</label>
                                    <textarea name='infoSup' rows='4' onChange={(e) => setInfosup(e.target.value)} />
                                </div>
                                <div className="">
                                    <label>Prendre une Photo </label>
                                    <WebcamCapture
                                        mat={matricule}
                                    />
                                </div>
                                <div className='file'>
                                    <label>Photo d'Identité</label>
                                    <input type='file' name='photo' id='photo' onChange={(e) => setPhoto(e.target.files[0])} className="form-control"></input>
                                </div>
                            </div>
                        </div>

                        <div className="details ID">
                            <span className="title">Informations Scolaire</span>

                            <div className="fields">
                                <div className="input-field">
                                    <label>Matricule</label>
                                    <input type="text" name='matricule' id='matricule' onChange={(e) => setMat(e.target.value)} />
                                </div>
                                <div className="input-field">
                                    <label>Niveau de Classe</label>
                                    <select name='ninveau' id='niveau' onChange={(e) => handleNiveau(e)}>
                                        <option value="">Selectionnez le Niveau</option>
                                        {
                                            niveauData.map((nData, index) => (
                                                <option key={index} value={nData.id}>{nData.libellee_niveau}</option>
                                            )
                                            )}
                                    </select>
                                </div>
                                <div className="input-field">
                                    <label>Classe</label>
                                    <select name='classe' id='classe' disabled={enable} onChange={(e) => setClasse(e.target.value)}>
                                        <option value="">{text}</option>
                                        {
                                            classData.map((nData, index) => (
                                                <option key={index} value={nData.id}>{nData.libellé_classe}</option>
                                            )
                                            )}

                                    </select>
                                </div>
                                <div className="input-field">
                                    <label>Redoublant</label>
                                    <select name='redoublant' id='redoublant' onChange={(e) => setRedoublant(e.target.value)}>
                                        <option>choisir</option>
                                        <option value="N" >Non</option>
                                        <option value="O" >Oui</option>
                                    </select>
                                </div>
                                <div className="input-field">
                                    <label>Acte</label>
                                    <select name='acte' id='acte' onChange={(e) => setActe(e.target.value)}>
                                        <option>choisir</option>
                                        <option value="N" >Non</option>
                                        <option value="O" >Oui</option>
                                    </select>
                                </div>
                                <div className="input-field">
                                    <label>ancieneté</label>
                                    <select name='ancienete' id='ancienete' onChange={(e) => setAncienete(e.target.value)}>
                                        <option>choisir</option>
                                        <option value="A" >ancien</option>
                                        <option value="N" >nouveau</option>
                                    </select>
                                </div>
                                <div className="input-field">
                                    <label>Infos Santé</label>
                                    <textarea name='sante' rows='4' onChange={(e) => setSante(e.target.value)} />
                                </div>
                                <div className="input-field">
                                    <label>Ethnie</label>
                                    <select name='ethnie' id='ethnie' onChange={(e) => setEthnie(e.target.value)}>
                                        <option>choisir</option>
                                        <option value="Baka" >Baka</option>
                                        <option value="Bororo" >Bororo</option>
                                        <option value="Refugie" >Refugié</option>
                                        <option value="Deplace" >Deplacé interne</option>
                                        <option value="Autre" >Autre</option>
                                    </select>
                                </div>
                                <div className="input-fields">
                                    <label>Malade</label>
                                    <div className="row">
            <div className="col-md-6">
                <div className="form-check">
                    <input className="form-check-input" type="radio" name="malade" value="malEntendant" onChange={(e) => setMalade(e.target.value)} />
                    <label className="form-check-label">Malentendant</label>
                </div>
            </div>
            <div className="col-md-6">
                <div className="form-check">
                    <input className="form-check-input" type="radio" name="malade" value="malVoyant" onChange={(e) => setMalade(e.target.value)} />
                    <label className="form-check-label">Malvoyant</label>
                </div>
            </div>
        </div>
        <div className="row mt-2">
            <div className="col-md-6">
                <div className="form-check">
                    <input className="form-check-input" type="radio" name="malade" value="Handicape" onChange={(e) => setMalade(e.target.value)} />
                    <label className="form-check-label">Handicapé moteur</label>
                </div>
            </div>
            <div className="col-md-6">
                <div className="form-check">
                    <input className="form-check-input" type="radio" name="malade" value="autre" onChange={(e) => setMalade(e.target.value)} />
                    <label className="form-check-label">Autre</label>
                </div>
            </div>
        </div>
                                </div>

                                <div className="input-field">
                                    <label>Année Scolaire</label>
                                    <select name='scolaire' id='scolaire' >
                                        <option value={scolaire} >{scolaire}</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className='buttons'>
                            <button className='btn btn-secondary' onClick={() => { navigate('/students') }}>Retour</button>
                            <button type='submit' name='submit' className="btn btn-success">Enregistrer </button>
                        </div>
                    </div>
                </form>
            </div>
        </main>
    )
}