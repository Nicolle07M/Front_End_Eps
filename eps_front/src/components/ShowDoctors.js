import React , {useEffect, useState} from 'react'
import axios from 'axios'

import { Link } from 'react-router-dom'

const endpoint = 'http://localhost:8000/api'
const ShowDoctors = () => {

    const [doctores, setDoctores] = useState( [] )

    useEffect ( () => {
        getAllDoctores()
    }, [])



    const getAllDoctores = async () => {
        const response = await axios.get(`${endpoint}/doctores`)
        setDoctores(response.data)
    }

    const deleteDoctor = async (id) => {
        await axios.delete(`${endpoint}/doctores/${id}`)
        getAllDoctores()

    }

  return (
    <div>
        <div className='d-grind gap-2'>
        <Link to="/create" className='btn btn-success btn-lg mt-2 mb-2 text-black'>Crear</Link>
        </div>

        <table className='table table-striped'>
            <thead className='bg-primary text-white'>
                <tr>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Edad</th>
                    <th>Especialidad</th>
                    <th>Correo</th>
                    <th>Accion</th>
                </tr>
            </thead>
            <tbody>
                { doctores.map((doctor) => (
                    <tr key={doctor.id}>
                        <td> {doctor.first_name} </td>
                        <td> {doctor.last_name} </td>
                        <td> {doctor.age} </td>
                        <td> {doctor.especialidad_id} </td>
                        <td> {doctor.email} </td>
                        
                        <td>
                            <Link to={`/edit/${doctor.id}`} className='btn btn-warning'>Editar</Link>
                            <button onClick={ ()=>deleteDoctor(doctor.id) } className='btn btn-danger'>Eliminar</button>
                        </td>
                    </tr>
                    
                )) }
            </tbody>
        </table>
    </div>
  )
}

export default ShowDoctors
