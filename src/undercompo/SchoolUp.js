import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

// Main function
export default function DateEdit() {
  // Declaration of constants
  const [formvalue, setFormvalue] = useState({
    nomec: '',
    devise: '',
  });
  const [logoVal, setLogo] = useState({ logo: '' });
  const location = useLocation();
  const data = location.state;
  const { id } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');

  const handlePhoto = (e) => {
    setLogo({ [e.target.name]: e.target.files[0] });
  };

  // Handling input information
  const handleInput = (e) => {
    setFormvalue({ ...formvalue, [e.target.name]: e.target.value });
  };

  // Function to fetch class information
  useEffect(() => {
    const getnoData = async () => {
      const requestData = await fetch("http://localhost/ssm/api/schoolUp.php/" + id);
      const responseData = await requestData.json();
      setFormvalue(responseData);
      setLogo(responseData);
    };
    getnoData();
  }, [id]);

  // Function to submit the form
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('id', id);
    formData.append('nomec', formvalue.nomec);
    formData.append('devise', formvalue.devise);
    if (logoVal.logo) {
      formData.append('logo', logoVal.logo);
    }

    try {
      const res = await axios({
        method: 'post',
        url: 'http://localhost/ssm/api/schoolUp.php',
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (res.data.success) {
        setMessage(res.data.success);
        setTimeout(() => {
          navigate('/settings/');
        }, 1000);
      }
    } catch (error) {
      setMessage('Error updating data');
      console.error('Error:', error);
    }
  };

  return (
    <main className="main-container">
      <div className="col-md-12 mt-4">
        <h2>Modifier</h2>
        <p className="text-success">{message}</p>
        <form onSubmit={handleSubmit}>
          <div className="col-sm-12">
            <div className="row mb-3">
              <div className="form-group col-md-5">
                <label className="mb-2">Nom</label>
                <input type="text" className="form-control" name="nomec" id="nomec" value={formvalue.nomec} onChange={handleInput} />
              </div>
              <div className="form-group col-md-4">
                <label className="mb-2">Devise</label>
                <input type="text" className="form-control" name="devise" id="devise" value={formvalue.devise} onChange={handleInput} />
              </div>
              <div className="form-group col-md-3">
                <label className="mb-2">Logo</label>
                <input type="file" className="form-control" name="logo" id="logo" onChange={handlePhoto} />
              </div>
            </div>
          </div>
          <div className='buttons'>
            <button className='btn btn-secondary m-3' onClick={() => { navigate('/settings/') }}>Retour</button>
            <button type='submit' name='submit' className="btn btn-success">Définir</button>
          </div>
        </form>
      </div>
    </main>
  );
}
