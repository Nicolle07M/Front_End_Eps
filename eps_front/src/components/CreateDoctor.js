import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CreateStyle.css'; // Importar el archivo de estilos
import logo from '../logo1.png'; // Asegúrate de tener la ruta correcta a tu logo

const endpoint = 'http://localhost:8000/api/doctores';
const especialidadesEndpoint = 'http://localhost:8000/api/especialidades';

const CreateDoctor = () => {
    const [first_name, setFirst_name] = useState('');
    const [last_name, setLast_name] = useState('');
    const [age, setAge] = useState('');
    const [especialidad_id, setEspecialidad_id] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [especialidades, setEspecialidades] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchEspecialidades = async () => {
            const response = await axios.get(especialidadesEndpoint);
            setEspecialidades(response.data);
        };

        fetchEspecialidades();
    }, []);

    const store = async (e) => {
        e.preventDefault();
        await axios.post(endpoint, {
            first_name,
            last_name,
            age,
            especialidad_id,
            email,
            password
        });
        navigate('/doctors');
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
                <h3>Crear Doctor</h3>
                <form onSubmit={store}>
                    <div className='form-group'>
                        <label className='form-label'>Nombre</label>
                        <input
                            value={first_name}
                            onChange={(e) => setFirst_name(e.target.value)}
                            type="text"
                            className='form-control'
                        />
                    </div>
                    <div className='form-group'>
                        <label className='form-label'>Apellido</label>
                        <input
                            value={last_name}
                            onChange={(e) => setLast_name(e.target.value)}
                            type="text"
                            className='form-control'
                        />
                    </div>
                    <div className='form-group'>
                        <label className='form-label'>Edad</label>
                        <input
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            type="number"
                            className='form-control'
                        />
                    </div>
                    <div className='form-group'>
                        <label className='form-label'>Especialidad</label>
                        <select
                            value={especialidad_id}
                            onChange={(e) => setEspecialidad_id(e.target.value)}
                            className='form-control'
                        >
                            <option value="">Selecciona una especialidad</option>
                            {especialidades.map((especialidad) => (
                                <option key={especialidad.id} value={especialidad.id}>
                                    {especialidad.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className='form-group'>
                        <label className='form-label'>Correo electrónico</label>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            className='form-control'
                        />
                    </div>
                    <div className='form-group'>
                        <label className='form-label'>Contraseña</label>
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
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

export default CreateDoctor;
