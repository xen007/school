
import React, { useEffect, useState,useRef } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useReactToPrint } from "react-to-print";
export default function Mod({data}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

const id= data.matricule

    const[noData, setnoData] = useState([])
    useEffect ( () => {
        const getnoData = async() =>{
            const requestData = await fetch("http://localhost/ssm/api/notes.php/"+ id)
            const responseData = await requestData.json()
            setnoData(responseData)
            // setFormvalue(responseData)
            // console.log(responseData)
        }
        getnoData()
    },[id])
    let tcoef = 0
    let tmoy = 0
    let moy = 0
    let ar = []
    noData.forEach(no =>{
        tcoef += Number(no.coef)
        tmoy += (Number(no.note1) + Number(no.note2)) /2 * no.coef
        moy = (tmoy/tcoef).toFixed(3 )
        console.log(ar.push(moy))
    })
    

    const componentPdf = useRef()
  const generatePdf = useReactToPrint({
    content: ()=>componentPdf.current,
    documentTitle: "Userdata",
    onAfterPrint:()=>alert("data saved  ")
  })
  console.log(generatePdf)


  return (
    <>
      <Button variant="primary" onClick={handleShow}>
      <i className="bi bi-pen"></i>
      </Button>
      
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        
     <div className="containers">
     <div className="titleCloseBtn">
          <button
            onClick={() => {
             handleClose()
            }}
          >
            X
          </button>
        </div>
        <div ref={componentPdf} style={{width:'100%',padding:'0px 12px'}}>
            <div id="head">
              <div id="Fr">
                <p >REPUBLIQUE DU CAMEROUN</p>
                <p id="f1">Paix Travail Patrie</p>
                <p>MINISTERE DES ENSEIGNENTS SESCONDAIRES</p>
                <p id="f1">ARCHIDIOCESSE DE BERTOUA</p>
                <p id="f1">SECRETARIAT A L'EDUCATION</p>
              </div>
              <div id="Fr">
                <p>REPUBLIC OF CAMEROON</p>
                <p id="f1">Peace Work Fatherland</p>
                <p>MINISTORY OF SECONDARY EDUCATION</p>
                <p id="f1">ARCHIDIOCESE OF BERTOUA</p>
                <p id="f1">EDUCATION SECRETARY</p>
              </div>
            </div>
            <div >
              <p id="ti">3e Trimestre</p>
              <p id="tii"> Année-scolaire: 2023-2024</p>
            </div>
            <div id="t1">
              <div id="t11">
                <p><strong>Nom et Prénoms:</strong> {data.nom} {data.prénom} </p>
                <p><strong>Né(e) le :</strong> {data.dateNaiss} à {data.lieuNaiss} </p>
                <p><strong>Effectif :</strong> {23} </p>
              </div>
              <div id="t11">
                <p><strong>Matricule:</strong> {id} </p>
                <p><strong>Sex:</strong> {data.genre} </p>
                <p><strong>Classe:</strong> {data.libcl} </p>
              </div>
            </div>
            
            <div>
            <table className="table table-bordered table-striped w-auto">
                    
                    <thead>
                    <tr>
                        <th>Matiere/Enseignant</th>
                        <th>Note 1</th>
                        <th>Note 2</th>
                        <th>Moy/20</th>
                        <th>Coef</th>
                        <th>Moy x</th>
                        <th>Observation</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        noData.map((no,index)=>
                    <tr key={index}>
                        
                        <td>{no.nomMat}/{no.nomEn} </td>
                        <td>{no.note1}</td>
                        <td>{no.note2}</td>
                        <td>{(Number(no.note1) + Number(no.note2)) /2} </td>
                        <td>{no.coef} </td>
                        <td>{(Number(no.note1) + Number(no.note2)) /2 * no.coef} </td>
                        <td>{no.app}</td>
                    </tr>
                    
                        )
                    }
                    <tr>
                        <th>TOTAL</th>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>{tcoef}</td>
                        <td>{tmoy}</td>
                        <td></td>
                    </tr>
              
                    </tbody>
                </table>
            </div>
            <div id="to">
              <p><strong>Moyenne:</strong>{moy} </p>
              <p><strong>Rang:</strong>{} </p>
              <p><strong>Moy.Clas:</strong>{} </p>
            </div>
            <div id="bott">
              <div id="discipline">
                <p id="p">DISCIPLINE</p>
                <div id="d1">
                  <p id="d11">Retards</p>
                  <p id="d12"></p>
                  <p id="d12"></p>
                </div>
                <div id="d1">
                  <p id="d11">Absences(En heures)</p>
                  <p id="d12"></p>
                  <p id="d12"></p>
                </div>
                <div id="d1">
                  <p id="d111">Retenus</p>
                  <p id="d12"></p>
                </div>
                <div id="d2">
                  <p id="p">RECAPITULATIF ANNUEL</p>
                  <div id="d21">
                    <div>
                      <p id="trim">1er trim.</p>
                      <p>12,09</p>
                    </div>
                    <div>
                      <p id="trim">2e trim.</p>
                      <p>12,09</p>
                    </div>
                    <div>
                      <p id="trim">3e trim.</p>
                      <p>{moy}</p>
                    </div>
                  </div>
                  <div id="d3">
                    <p>Moyenne Annuelle: </p>
                    <p>Rang Annuel: </p>
                  </div>
                </div>
              </div>

              <div id="travail">
                <p id="p">TRAVAIL</p>
                <p>APPRECIATIONS</p>
                <p>Acquis</p>
              </div>

              <div id="C3">
                <p id="p">APPRECIATIONS GENERALES</p>
                <div id="c33"><input type="checkbox"></input>Promue(e) en classe de: </div>
                <div id="c33"><input type="checkbox"></input>Examen de rattrapage en: </div>
                <div id="c33"><input type="checkbox"></input>Admis(e) à reprendre la classe de: </div>
                <div id="c33"><input type="checkbox"></input>Exclu(e) pour: </div>
                <h6>OBSERVATIONS ET SIGNATURE DU CHEF D'ETABLISSEMENT</h6>
                <p id="p">Le Principal/ The Principal</p>
              </div>

            </div>
            </div>
            {/* <div role="group" aria-label="Second group">
              <button className="btn btn-success" onClick={generatePdf}>Print</button>
            </div> */}
     </div>
    
      </Modal>

    </>
  );
}
