import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './ShowDoctor.css'; // Asegúrate de ajustar el nombre del archivo si es diferente
import logo from '../logo1.png'; // Asegúrate de tener la ruta correcta a tu logo

const endpoint = 'http://localhost:8000/api';

const ShowDoctors = () => {
    const [doctores, setDoctores] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        getAllDoctores();
    }, []);

    const getAllDoctores = async () => {
        try {
            const response = await axios.get(`${endpoint}/doctores`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (Array.isArray(response.data)) {
                setDoctores(response.data);
            } else {
                setError('La respuesta de la API no es un array');
            }
        } catch (error) {
            setError('Error al obtener los doctores');
        }
    };

    const deleteDoctor = async (id) => {
        try {
            await axios.delete(`${endpoint}/doctores/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            getAllDoctores();
        } catch (error) {
            setError('Error al eliminar el doctor');
        }
    };

    return (
        <div>
            <nav className="navbar">
                <div className="logo-container">
                    <img src={logo} alt="Logo EPS Sanadora" className="logo" />
                    <h6>EPS Health Haven</h6>
                </div>
                <div className="links">
                    <Link to="/especialidades" className="nav-link">Lista de especialidades</Link>
                </div>
            </nav>

            <div className="container py-4">
                <div className="d-grid gap-2">
                    <Link to="/create" className="btn btn-primary btn-lg mt-2 mb-4">
                        Crear Doctor
                    </Link>
                </div>

                {error && <div className="alert alert-danger">{error}</div>}

                <div className="table-responsive">
                    <table className="table table-striped table-hover">
                        <thead className="table-primary">
                            <tr>
                                <th>Nombre</th>
                                <th>Apellido</th>
                                <th>Edad</th>
                                <th>Especialidad</th>
                                <th>Correo</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(doctores) && doctores.map((doctor) => (
                                <tr key={doctor.id}>
                                    <td>{doctor.first_name}</td>
                                    <td>{doctor.last_name}</td>
                                    <td>{doctor.age}</td>
                                    <td>{doctor.especialidad_id}</td>
                                    <td>{doctor.email}</td>
                                    <td>
                                        <Link to={`/edit/${doctor.id}`} className="btn btn-warning btn-edit">
                                            Editar
                                        </Link>
                                        <button onClick={() => deleteDoctor(doctor.id)} className="btn btn-danger btn-delete">
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

export default ShowDoctors;
