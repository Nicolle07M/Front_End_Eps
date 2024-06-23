import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './EditDoctor.css'; // Asegúrate de tener la ruta correcta a tu archivo CSS
import logo from '../logo1.png'; // Asegúrate de tener la ruta correcta a tu logo

const endpoint = 'http://localhost:8000/api/especialidades/';


const EditEspecialidad = () => {
    const [name, setName] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {

        const getEspecialidadById = async () => {
            const response = await axios.get(`${endpoint}${id}`);
            setName(response.data.name);
        };


        getEspecialidadById();
    }, [id]);

    const update = async (e) => {
        e.preventDefault();
        await axios.put(`${endpoint}${id}`, {
            name: name,
        });
        navigate('/especialidades');
    };

    return (
        <div>
            <nav className="navbar">
                <div className="logo-container">
                    <img src={logo} alt="Logo EPS Sanadora" className="logo" />
                    <h6>EPS Health Haven</h6>
                </div>
                <div className="links">
                    <a href="/doctors" className="nav-link">Lista de Doctores</a>
                </div>
            </nav>
            <div className="container">
                <h3>Actualizar Especialidad</h3>
                <form onSubmit={update}>
                    <div className='mb-3'>
                        <label className='form-label'>Nombre</label>
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            type="text"
                            className='form-control'
                        />
                    </div>
                    <button type='submit' className='btn btn-primary'>Actualizar</button>
                </form>
                <footer className="footer">
                    <h6>EPS Health Haven © 2024</h6>
                </footer>
            </div>
        </div>
    );
};

export default EditEspecialidad;
