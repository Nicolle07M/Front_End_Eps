import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './ShowDoctor.css'; // Asegúrate de ajustar el nombre del archivo si es diferente
import logo from '../logo5.png'; // Asegúrate de tener la ruta correcta a tu logo

const endpoint = 'http://localhost:8000/api';

const ShowEspecialidades = () => {
    const [especialidades, setEspecialidades] = useState([]);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        getAllEspecialidades();
    }, []);

    const getAllEspecialidades = async () => {
        const response = await axios.get(`${endpoint}/especialidades`);
        setEspecialidades(response.data);
    };

    const deleteEspecialidad = async (id) => {
        await axios.delete(`${endpoint}/especialidades/${id}`);
        getAllEspecialidades();
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/login'; // Redirige al usuario al login después de hacer logout
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
                    <Link to="/doctors" className="btn btn-outline-light btn-nav2">Lista de doctores</Link>
                    <button onClick={handleLogout} className="btn btn-outline-light btn-nav2">
                        Logout
                    </button>
                </div>
            </nav>

            <div className="container py-4">
                <div className="d-grid gap-2">
                    <Link to="/createEspecialidades" className="btn btn-primary btn-lg mt-2 mb-4">
                        Crear Especialidad
                    </Link>
                </div>

                <div className="table-responsive">
                    <table className="table table-striped table-hover">
                        <thead className="table-primary">
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {especialidades.map((especialidades) => (
                                <tr key={especialidades.id}>
                                    <td>{especialidades.id}</td>
                                    <td>{especialidades.name}</td>
                                    <td>
                                        <Link to={`/editEspecialidad/${especialidades.id}`} className="btn btn-warning btn-edit">
                                            Editar
                                        </Link>
                                        <button onClick={() => deleteEspecialidad(especialidades.id)} className="btn btn-danger btn-delete">
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <footer className="footer">
                    <h6>EPS Health Haven © 2024</h6>
                </footer>
            </div>
        </div>
    );
};

export default ShowEspecialidades;
