import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./RegisterPage.css";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    mobile: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type} = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    

    setLoading(true);
    try {
      const response = await axios.post("http://localhost:3001/api/users/register", formData);
      alert(response.data.message);
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    }
    setLoading(false);
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2 className="register-title">Sign Up</h2>

        <form onSubmit={handleRegister} className="register-form">
          <div className="input-group">
            <input type="text" name="username" placeholder="Enter username" onChange={handleChange} required />
          </div>

          <div className="input-group">
   
            <input type="email" name="email" placeholder="Enter email" onChange={handleChange} required />
          </div>

          <div className="input-group">
           
            <input type="password" name="password" placeholder="Enter password" onChange={handleChange} required />
          </div>

          <div className="input-group">
     
            <input type="tel" name="mobile" placeholder="Enter mobile number" onChange={handleChange} required />
          </div>

          

          <button type="submit" className="register-button" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="register-footer">
          Already a member? <a href="/login">Login here</a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;