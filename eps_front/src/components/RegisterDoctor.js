import React, { useState, useEffect } from 'react';
import './StyleRegister.css';
import axios from 'axios';

const RegisterDoctor = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    age: '',
    especialidad_id: '',
    email: '',
    password: ''
  });

  const endpoint = 'http://localhost:8000/api';
  const [especialidades, setEspecialidades] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const fetchEspecialidades = async () => {
      try {
        const response = await axios.get(`${endpoint}/especialidades`);
        setEspecialidades(response.data);
      } catch (error) {
        console.error('Error al obtener las especialidades:', error);
        setError('No se pudo cargar la lista de especialidades');
      }
    };

    fetchEspecialidades();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${endpoint}/doctores`, formData);
      console.log('Datos del formulario enviados:', response.data);
      setSuccess('Registro exitoso');
      setError(null);
    } catch (err) {
      console.error('Error al enviar los datos:', err);
      setError('Hubo un problema con el registro');
      if (err.response && err.response.data) {
        console.error('Detalles del error:', err.response.data);
      }
      setSuccess(null);
    }
  };

  return (
    <div className="form-container">
      <h2>Registro de Doctor</h2>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre:</label>
          <input 
            type="text" 
            name="first_name" 
            value={formData.first_name} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Apellido:</label>
          <input 
            type="text" 
            name="last_name" 
            value={formData.last_name} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Edad:</label>
          <input 
            type="number" 
            name="age" 
            value={formData.age} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Especialidad:</label>
          <select 
            name="especialidad_id" 
            value={formData.especialidad_id} 
            onChange={handleChange} 
            required
          >
            <option value="">Selecciona una especialidad</option>
            {especialidades.map((especialidad) => (
              <option key={especialidad.id} value={especialidad.id}>
                {especialidad.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Correo:</label>
          <input 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Contraseña:</label>
          <input 
            type="password" 
            name="password" 
            value={formData.password} 
            onChange={handleChange} 
            required 
          />
        </div>
        <button type="submit" className="submit-button">Registrar</button>
      </form>
    </div>
  );
};

export default RegisterDoctor;
