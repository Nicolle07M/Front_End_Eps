import React, { useState } from 'react';
import './Login.css'; // Importa el archivo CSS para los estilos
import logo from '../logo5.png';
import { Link } from 'react-router-dom'; // Importa Link desde react-router-dom
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post('http://localhost:8000/api/login', {
            email,
            password
        });
        localStorage.setItem('token', response.data.token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
        navigate('/doctors');
    } catch (error) {
        console.error('Error logging in', error);
    }
};

// Configuración de Axios para usar el token de autenticación en todas las solicitudes
const token = localStorage.getItem('token');
if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

  return (
    <div>
      <nav className="navbar">
        <div className="logo-container">
          <img src={logo} alt="Logo EPS Sanadora" className="logo1" />
          <h6>EPS Health Haven</h6>
        </div>
        <Link to="/registro" className="login-button">Regresar</Link>
      </nav>
      <div className="login-container">
        <h2>Iniciar Sesión como Administrador</h2>
        <form onSubmit={handleLogin}>
        <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
          <button type="submit" className="submit-button">Iniciar Sesión</button>
        </form>
      </div>
      <footer className="footer">
        <h6>EPS Health Haven © 2024</h6>
      </footer>
    </div>
  );
};

export default Login;
