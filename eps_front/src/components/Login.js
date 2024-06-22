import React, { useState } from 'react';
import './Login.css'; // Importa el archivo CSS para los estilos

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
  );
};

export default Login;
