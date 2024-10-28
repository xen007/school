import React, { useState, useEffect } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faChildDress, faUser, faChild, faList, faBuildingColumns, faChalkboardTeacher } from '@fortawesome/free-solid-svg-icons'
import axios from "axios"
function Home() {
    const[classe,setClData]=useState([])
    const[studentData, setStudentData] = useState([])
    const[subject,setSubData]=useState([])
    const [enseig, setEnseig] = useState([]);

    useEffect( ()=>{
        const getclasse= async()=>{
            const reqdata = await fetch("http://localhost/ssm/api/classe.php")
            const resdata = await reqdata.json()
            setClData(resdata)
            }
          getclasse()
          const getStudentData = async() =>{
            const requestData = await fetch("http://localhost/ssm/api/l.php")
            const responseData = await requestData.json()
            setStudentData(responseData)
        }
        getStudentData()

        const getSubject= async()=>{
            const reqdata = await fetch("http://localhost/ssm/api/mat.php")
            const resdata = await reqdata.json()
            setSubData(resdata)
            }
            getSubject()
            function tabEnseig(){ // function pour la récupération des données dans la bd
                var headers = {"Accept":"application/json",
                    "Content-Type": "application/json"};
            axios .get(`http://localhost/ssm/api/tabenseig.php`, headers)
            .then(response=>{ //mise à jour des constances déclaré
                setEnseig(response.data);
            })
            }
            tabEnseig()
      },[])

if ((studentData.resultat ===  'Verifiez les informations SVP'  && classe.resultat ===  'Verifiez les informations SVP') || (studentData.resultat ===  'Verifiez les informations SVP'  && classe.resultat !==  'Verifiez les informations SVP') ) {
  return (
    <main className='main-container'>
        <p className="lead d-none d-sm-block">Informations générale sur l'établissement</p>
        <div className="row mb-3">
            <div className="col-xl-3 col-sm-6 py-2">
                <div className="card bg-success text-white h-100">
                    <div className="card-body bg-success" >
                        <div className="rotate">
                            <i className="fa fa-user fa-4x"></i>
                        </div>
                        <h6 className="text-uppercase">Elèves</h6>
                        <h1 className="display-4">0</h1>
                    </div>
                </div>
            </div>
            <div className="col-xl-3 col-sm-6 py-2">
                <div className="card text-white bg-secondary h-100">
                    <div className="card-body bg-secondary">
                        <div className="rotate">
                            <i className="fa-solid fa-child-dress fa-4x"> </i>
                        </div>
                        <h6 className="text-uppercase">FILLES</h6>
                        <h1 className="display-4">0</h1>
                    </div>
                </div>
            </div>
            <div className="col-xl-3 col-sm-6 py-2">
                <div className="card text-white bg-primary h-100">
                    <div className="card-body bg-primary">
                        <div className="rotate">
                        <i className="fa-solid fa-child fa-4x"></i>
                        </div>
                        <h6 className="text-uppercase">GARÇONS </h6>
                        <h1 className="display-4">0</h1>
                    </div>
                </div>
            </div>
            <div className="col-xl-3 col-sm-6 py-2">
                <div className="card text-white bg-danger h-100">
                    <div className="card-body">
                        <div className="rotate">
                            <i className="fa fa-list fa-4x"></i>
                        </div>
                        <h6 className="text-uppercase">Matières</h6>
                        <h1 className="display-4">0</h1>
                    </div>
                </div>
            </div>
            <div className="col-xl-3 col-sm-6 py-2">
                <div className="card text-white bg-warning h-100">
                    <div className="card-body">
                        <div className="rotate">
                          <i className=" fa-solid fa-building-columns fa-4x"></i>
                        </div>
                        <h6 className="text-uppercase">Classes</h6>
                        <h1 className="display-4">0</h1>
                    </div>
                </div>
            </div>
            
            <div className="col-xl-3 col-sm-6 py-2">
                <div className="card text-white bg-info h-100">
                    <div className="card-body">
                        <div className="rotate">
                            <i className="fa-solid fa-chalkboard-user fa-4x"></i>
                        </div>
                        <h6 className="text-uppercase">Enseignants</h6>
                        <h1 className="display-4">22</h1>
                    </div>
                </div>
            </div>
        </div>
    </main>
  )
} else if (studentData.resultat !==  'Verifiez les informations SVP'  && classe.resultat !==  'Verifiez les informations SVP' ){
    const nelv = studentData.length
    const ng = studentData.filter(s=>{
            return s.genre === "M"
          }).length
    const nf = studentData.filter(s=>{
        return s.genre === "F"
        }).length
    const nmat = subject.length
    const ncla = classe.length
    const nprof = enseig.length

    return (
        <main className='main-container'>
             <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><a href="##">Home</a></li>
                <li className="breadcrumb-item"><a href="##">Library</a></li>
                <li className="breadcrumb-item active" aria-current="page">Data</li>
            </ol>
            </nav>
    
            <p className="lead d-none d-sm-block">Informations générale sur l'établissement</p>
    
    
            <div className="row mb-3">
                <div className="col-xl-3 col-sm-6 py-2">
                    <div className="card bg-success text-white h-100">
                        <div className="card-body bg-success" >
                            <div className="rotate">
                                <i className="fa fa-user fa-4x"></i>
                                <FontAwesomeIcon icon={faUser} className="fa-4x"/>
                            </div>
                            <h6 className="text-uppercase">Elèves</h6>
                            <h1 className="display-4">{nelv}</h1>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-sm-6 py-2">
                    <div className="card text-white bg-secondary h-100">
                        <div className="card-body bg-secondary">
                            <div className="rotate">
                                <i className="fa-solid fa-child-dress fa-4x"> </i>
                                <FontAwesomeIcon icon={faChildDress} className="fa-4x"/>
                            </div>
                            <h6 className="text-uppercase">FILLES</h6>
                            <h1 className="display-4">{nf}</h1>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-sm-6 py-2">
                    <div className="card text-white bg-primary h-100">
                        <div className="card-body bg-primary">
                            <div className="rotate">
                            <i className="fa-solid fa-child fa-4x"></i>
                            <FontAwesomeIcon icon={faChild} className="fa-4x"/>
                            </div>
                            <h6 className="text-uppercase">GARÇONS </h6>
                            <h1 className="display-4">{ng}</h1>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-sm-6 py-2">
                    <div className="card text-white bg-danger h-100">
                        <div className="card-body">
                            <div className="rotate">
                                <i className="fa fa-list fa-4x"></i>
                                <FontAwesomeIcon icon={faList} className="fa-4x"/>
                            </div>
                            <h6 className="text-uppercase">Matières</h6>
                            <h1 className="display-4">{nmat}</h1>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-sm-6 py-2">
                    <div className="card text-white bg-warning h-100">
                        <div className="card-body">
                            <div className="rotate">
                              <i className=" fa-solid fa-building-columns fa-4x"></i>
                              <FontAwesomeIcon icon={faBuildingColumns} className="fa-4x"/>
                            </div>
                            <h6 className="text-uppercase">Classes</h6>
                            <h1 className="display-4">{ncla}</h1>
                        </div>
                    </div>
                </div>
                
                <div className="col-xl-3 col-sm-6 py-2">
                    <div className="card text-white bg-info h-100">
                        <div className="card-body">
                            <div className="rotate">
                                <i className="fa-solid fa-chalkboard-user fa-4x"></i>
                                <FontAwesomeIcon icon={faChalkboardTeacher} className="fa-4x"/>
                            </div>
                            <h6 className="text-uppercase">Enseignants</h6>
                            <h1 className="display-4">{nprof}</h1>
                  
                        </div>
                    </div>
                </div>
            </div>
        </main>
      )
}

}

export default Home