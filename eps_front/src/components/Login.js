import React, { useState } from 'react';
import './Login.css'; // Importa el archivo CSS para los estilos
import logo from '../logo1.png';
import { Link } from 'react-router-dom'; // Importa Link desde react-router-dom

const Login = () => {
  const [formData, setFormData] = useState({
    correo: '',
    contraseña: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para manejar el inicio de sesión
    console.log('Datos del formulario:', formData);
  };

  return (
    <div>
      <nav className="navbar">
        <div className="logo-container">
          <img src={logo} alt="Logo EPS Sanadora" className="logo1" />
          <h6>EPS Sanadora</h6>
        </div>
        <Link to="/register" className="login-button">Regresar</Link>
      </nav>
      <div className="login-container">
        <h2>Iniciar Sesión como Administrador</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Correo:</label>
            <input 
              type="email" 
              name="correo" 
              value={formData.correo} 
              onChange={handleChange} 
              required 
            />
          </div>
          <div className="form-group">
            <label>Contraseña:</label>
            <input 
              type="password" 
              name="contraseña" 
              value={formData.contraseña} 
              onChange={handleChange} 
              required 
            />
          </div>
          <button type="submit" className="submit-button">Iniciar Sesión</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
