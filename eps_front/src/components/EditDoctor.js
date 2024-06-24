import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './EditDoctor.css'; // Asegúrate de tener la ruta correcta a tu archivo CSS
import logo from '../logo1.png'; // Asegúrate de tener la ruta correcta a tu logo

const endpoint = 'http://localhost:8000/api/doctores/';
const especialidadesEndpoint = 'http://localhost:8000/api/especialidades';

const EditDoctor = () => {
    const [first_name, setFirst_name] = useState('');
    const [last_name, setLast_name] = useState('');
    const [age, setAge] = useState('');
    const [especialidad_id, setEspecialidad_id] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [especialidades, setEspecialidades] = useState([]);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const getEspecialidades = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('No token found');
                }

                const response = await axios.get(especialidadesEndpoint, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setEspecialidades(response.data);
            } catch (error) {
                console.error(error);
                alert('Error al obtener especialidades. Por favor, inicia sesión nuevamente.');
                navigate('/login');
            }
        };

        const getDoctorById = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('No token found');
                }

                const response = await axios.get(`${endpoint}${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setFirst_name(response.data.first_name);
                setLast_name(response.data.last_name);
                setAge(response.data.age);
                setEspecialidad_id(response.data.especialidad_id);
                setEmail(response.data.email);
                setPassword(response.data.password);
            } catch (error) {
                console.error(error);
                alert('Error al obtener los detalles del doctor. Por favor, inicia sesión nuevamente.');
                navigate('/login');
            }
        };

        getEspecialidades();
        getDoctorById();
    }, [id, navigate]);

    const update = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No token found');
            }

            await axios.put(`${endpoint}${id}`, {
                first_name: first_name,
                last_name: last_name,
                age: age,
                especialidad_id: especialidad_id,
                email: email,
                password: password
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            navigate('/doctors');
        } catch (error) {
            console.error(error);
            alert('Error al actualizar el doctor. Por favor, intenta nuevamente.');
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
                    <a href="/doctors" className="btn btn-outline-light btn-nav1">Lista de Doctores</a>
                </div>
            </nav>
            <div className="container">
                <h3>Actualizar Doctor</h3>
                <form onSubmit={update}>
                    <div className='mb-3'>
                        <label className='form-label'>Nombre</label>
                        <input
                            value={first_name}
                            onChange={(e) => setFirst_name(e.target.value)}
                            type="text"
                            className='form-control'
                        />
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>Apellido</label>
                        <input
                            value={last_name}
                            onChange={(e) => setLast_name(e.target.value)}
                            type="text"
                            className='form-control'
                        />
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>Edad</label>
                        <input
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            type="number"
                            className='form-control'
                        />
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>Especialidad</label>
                        <select
                            value={especialidad_id}
                            onChange={(e) => setEspecialidad_id(e.target.value)}
                            className='form-control select-specialty'
                        >
                            <option value="">Selecciona una especialidad</option>
                            {especialidades.map((especialidad) => (
                                <option key={especialidad.id} value={especialidad.id}>
                                    {especialidad.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>Correo electrónico</label>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            className='form-control'
                        />
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>Contraseña</label>
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
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

export default EditDoctor;
