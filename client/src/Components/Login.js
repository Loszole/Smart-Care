import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from "./login.module.css";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('');
    try {
      const res = await axios.post('http://localhost:6005/api/login', form);
      if (res.data && res.data.message === 'Login successful') {
        setStatus('Login successful!');
        // Admin check (update as per your admin logic)
        if (
          res.data.role === "admin" ||
          (form.email === "admin@smartcare.com" && form.password === "Admin@123")
        ) {
          navigate('/admin');
        } else {
          navigate('/dashboard');
        }
      } else {
        setStatus(res.data.message || 'Login failed');
      }
    } catch (err) {
      setStatus('Invalid credentials or server error');
    }
  };

  const loginwithgoogle = () => {
    window.open("http://localhost:6005/auth/google/callback", "_self");
  };

  return (
    <div className={styles.login_page}>
      <h1 style={{ textAlign: "center", color: "#0d6efd" }}>Smart Care Login</h1>
      <div className={styles.form}>
        {status && <div style={{ color: status === 'Login successful!' ? 'green' : 'red', textAlign: 'center', marginBottom: 10 }}>{status}</div>}
        <form className={styles.login_form} onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Enter your Smart Care email"
            value={form.email}
            onChange={handleChange}
            required
            autoComplete="username"
          />
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={form.password}
            onChange={handleChange}
            required
            autoComplete="current-password"
          />
          <button type="submit" style={{ background: "#0d6efd", color: "#fff" }}>Login</button>
          <p className='message'>
            Not Registered? <a href="/signup" style={{ color: "#0d6efd" }}>Create an account</a>
          </p>
        </form>
        <button
          className='login-with-google-btn'
          onClick={loginwithgoogle}
          style={{
            marginTop: 10,
            background: "#fff",
            color: "#0d6efd",
            border: "1px solid #0d6efd",
            borderRadius: 5,
            padding: "8px 0",
            fontWeight: 500,
            cursor: "pointer"
          }}
        >
          <img
            src="/img/google-icon.svg"
            alt="Google"
            style={{ width: 20, marginRight: 8, verticalAlign: "middle" }}
          />
          Sign In With Google
        </button>
      </div>
      <div style={{ textAlign: "center", marginTop: 30, color: "#888" }}>
        <small>
          © {new Date().getFullYear()} Smart Care. Secure, confidential, and patient-focused healthcare platform.
        </small>
      </div>
    </div>
  );
};

export default Login;