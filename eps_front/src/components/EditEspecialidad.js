import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './EditDoctor.css'; // Asegúrate de tener la ruta correcta a tu archivo CSS
import logo from '../logo5.png'; // Asegúrate de tener la ruta correcta a tu logo
import { Link } from 'react-router-dom';
const endpoint = 'http://localhost:8000/api/especialidades/';

const EditEspecialidad = () => {
    const [name, setName] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const getEspecialidadById = async () => {
            try {
                const response = await axios.get(`${endpoint}${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setName(response.data.name);
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    navigate('/login'); // Redirige al usuario al login si no está autorizado
                } else {
                    console.error('Error al obtener la especialidad', error);
                }
            }
        };

        getEspecialidadById();
    }, [id, navigate]);

    const update = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`${endpoint}${id}`, {
                name: name,
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            navigate('/especialidades');
        } catch (error) {
            if (error.response && error.response.status === 401) {
                navigate('/login'); // Redirige al usuario al login si no está autorizado
            } else {
                console.error('Error al actualizar la especialidad', error);
            }
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/login'; // Redirige al usuario al login después de hacer logout
    };
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div>
            <nav className="navbar">
                <div className="logo-container">
                    <img src={logo} alt="Logo EPS Sanadora" className="logo" />
                    <h6>EPS Health Haven</h6>
                </div>
                <button className="hamburger-button" onClick={toggleMenu}>
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
                <div className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
                    <Link to="/especialidades" className="btn btn-outline-light btn-nav">Lista de Especialidades</Link>
                    <button onClick={handleLogout} className="btn btn-outline-light btn-nav">
                        Logout
                    </button>
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
                    <button type='submit' className='btn btn-success'>Actualizar</button>
                </form>
                <footer className="footer">
                    <h6>EPS Health Haven © 2024</h6>
                </footer>
            </div>
        </div>
    );
};

export default EditEspecialidad;
