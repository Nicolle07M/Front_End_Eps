import './App.css';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import NavBar from './components/NavBar'; // Importa el componente NavBar
import EditDoctor from './components/EditDoctor';
import CreateDoctor from './components/CreateDoctor';
import ShowDoctors from './components/ShowDoctors';
import RegisterDoctor from './components/RegisterDoctor';
import Login from './components/Login';
import Welcome from './components/Welcome';
import ShowEspecialidades from './components/ShowEspecialidades';
import CreateEspecialidad from './components/CreateEspecialidad';
import EditEspecialidad from './components/EditEspecialidad';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
         {/* Añade la barra de navegación aquí */}
        <Routes>
        <Route path="/" element={<Welcome/>} />
        <Route path="/login" element={<Login />} />
          <Route path="/doctors" element={<PrivateRoute><ShowDoctors /></PrivateRoute>} />
          <Route path="/registro" element={<RegisterDoctor/>} />
          <Route path="/create" element={<CreateDoctor />} />
          <Route path="/createEspecialidades" element={<CreateEspecialidad />} />
          <Route path="/edit/:id" element={<EditDoctor />} />
          <Route path="/editEspecialidad/:id" element={<EditEspecialidad />} />
          <Route path="/doctors" element={<ShowDoctors />} />
          <Route path="/especialidades" element={<ShowEspecialidades />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
