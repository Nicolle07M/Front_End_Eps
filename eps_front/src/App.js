import './App.css';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import NavBar from './components/NavBar'; // Importa el componente NavBar
import EditDoctor from './components/EditDoctor';
import CreateDoctor from './components/CreateDoctor';
import ShowDoctors from './components/ShowDoctors';
import RegisterDoctor from './components/RegisterDoctor';
import Login from './components/Login';
import Welcome from './components/Welcome';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
         {/* Añade la barra de navegación aquí */}
        <Routes>
        <Route path="/" element={<Welcome/>} />
          <Route path="/registro" element={<RegisterDoctor/>} />
          <Route path="/create" element={<CreateDoctor />} />
          <Route path="/edit/:id" element={<EditDoctor />} />
          <Route path="/doctors" element={<ShowDoctors />} />
          {/* Añade una ruta para el componente de Log In */}
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
