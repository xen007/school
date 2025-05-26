import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import config from '../component/config';

export default function DateEdit() {
  const [formValue, setFormValue] = useState({
    nomec: '',
    devise: '',
    bp: '',
    contact: '',
    adresse: '',
  });
  
  const [logoVal, setLogo] = useState(null);
  const [signVal, setSign] = useState(null);
  const [message, setMessage] = useState('');
  const location = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();

  // Handle file uploads properly
  const handlePhoto = (e) => {
    const { name, files } = e.target;
    if (name === "logo") setLogo(files[0]);
    if (name === "sign") setSign(files[0]);
  };

  // Handle input changes
  const handleInput = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  // Fetch existing data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const requestData = await fetch(`${config.apiBaseUrl}/schoolUp.php/${id}`);
        const responseData = await requestData.json();
        if (responseData) {
          setFormValue(responseData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setMessage("❌ Error loading school details.");
      }
    };
    fetchData();
  }, [id]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append("id", id);
    Object.keys(formValue).forEach(key => formData.append(key, formValue[key]));
    if (logoVal) formData.append("logo", logoVal);
    if (signVal) formData.append("sign", signVal);

    try {
      const response = await axios.post(`${config.apiBaseUrl}/schoolUp.php`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      if (response.data.success) {
        setMessage("✅ Data successfully updated!");
        setTimeout(() => navigate("/settings/"), 1500);
      } else {
        throw new Error("Update failed.");
      }
    } catch (error) {
      console.error("Error updating data:", error);
      setMessage("❌ Error updating school details.");
    }
  };

  return (
    <main className="main-container">
      <div className="col-md-12 mt-4">
        <h2>Modifier</h2>
        {message && <p className={`text-${message.includes("Error") ? "danger" : "success"}`}>{message}</p>}
        <form onSubmit={handleSubmit}>
          <div className="col-sm-12">
            <div className="row mb-3">
              {["nomec", "devise", "bp", "contact", "adresse"].map((field, idx) => (
                <div key={idx} className="form-group col-md-4">
                  <label className="mb-2">{field.toUpperCase()}</label>
                  <input type="text" className="form-control" name={field} value={formValue[field]} onChange={handleInput} />
                </div>
              ))}
              <div className="form-group col-md-3">
                <label className="mb-2">Logo</label>
                <input type="file" className="form-control" name="logo" onChange={handlePhoto} />
              </div>
              <div className="form-group col-md-3">
                <label className="mb-2">Scan Signature</label>
                <input type="file" className="form-control" name="sign" onChange={handlePhoto} />
              </div>
            </div>
          </div>
          <div className='buttons'>
            <button className='btn btn-secondary m-3' onClick={() => navigate('/settings/')}>Retour</button>
            <button type='submit' className="btn btn-success">Définir</button>
          </div>
        </form>
      </div>
    </main>
  );
}
