import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../API/API";
import "./Auth.css";

const Auth = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        const res = await api.post("users/login", { email, password });
        const token = res.data.token;
        localStorage.setItem("token", token);
        alert("Login successful!");
        navigate("/dashboard");
      } else {
        await api.post("users/register", { name, email, password });
        alert("Registration successful. Please login.");
        setIsLogin(true);
      }
    } catch (error) {
      alert("Error: " + error?.response?.data?.message || "Something went wrong.");
    }
  };

  const handleOAuth = (provider) => {
    window.location.href = `http://localhost:8081/oauth2/authorization/${provider}`;
  };

  return (
    <div className="auth-container">
      <h2>{isLogin ? "Login" : "Register"}</h2>
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        )}
        <input
          type="email"
          placeholder="Yourname@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">{isLogin ? "Login" : "Register"}</button>
      </form>

      <div className="oauth-section">
        <p>or continue with</p>
        <div className="oauth-buttons">
          <button onClick={() => handleOAuth("google")}>Google</button>
          <button onClick={() => handleOAuth("github")}>GitHub</button>
        </div>
      </div>

      <p>
        {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
        <span className="switch-link" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Register here" : "Login here"}
        </span>
      </p>
    </div>
  );
};

export default Auth;
