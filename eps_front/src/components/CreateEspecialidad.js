import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CreateStyle.css'; // Importar el archivo de estilos
import logo from '../logo1.png'; // Asegúrate de tener la ruta correcta a tu logo

const endpoint = 'http://localhost:8000/api/especialidades';


const CreateEspecialidad = () => {
    const [name, setName] = useState('');


    const navigate = useNavigate();


    const store = async (e) => {
        e.preventDefault();
        await axios.post(endpoint, {
            name,
        });
        navigate('/especialidades');
    };

    return (
        <div>
            <nav className="navbar">
                <div className="logo-container">
                    <img src={logo} alt="Logo EPS Sanadora" className="logo" />
                    <h6>EPS Sanadora</h6>
                </div>
                <div className="links">
                    <a href="/doctors" className="nav-link">Lista de Doctores</a>
                </div>
            </nav>
            <div className="container">
                <h3>Crear Especialidad</h3>
                <form onSubmit={store}>
                    <div className='form-group'>
                        <label className='form-label'>Nombre</label>
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            type="text"
                            className='form-control'
                        />
                    </div>
            
                    <button type='submit' className='btn btn-primary'>Guardar</button>
                </form>
            </div>
            <footer className="footer">
                <h6>EPS Sanadora © 2023</h6>
            </footer>
        </div>
    );
};

export default CreateEspecialidad;
