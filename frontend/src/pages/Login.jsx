import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

const LoginPage = ({ setUser }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // ✅ Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle Login Form Submission
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:3001/api/users/login", formData, {
        withCredentials: true, // ✅ Ensures cookies are sent and received
      });

      console.log("✅ Login Successful:", response.data);

      // ✅ Store token and user data
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        setUser(response.data);
        navigate("/");
      } else {
        alert("Login failed. Please try again.");
      }
    } catch (error) {
      console.error("❌ Login Error:", error);

      // Display error message
      alert(error.response?.data?.message || "Login failed. Check your credentials.");
    }

    setLoading(false);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Login</h2>

        <form onSubmit={handleLogin} className="login-form">
          <div className="input-group">
  
            <input type="email" name="email" placeholder="Enter email" onChange={handleChange} required />
          </div>

          <div className="input-group">
  
            <input type="password" name="password" placeholder="Enter password" onChange={handleChange} required />
          </div>

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? "Signing in..." : "SIGN IN"}
          </button>
        </form>

        
        <p className="login-footer">
          Don't have an account? <a href="/register">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;

