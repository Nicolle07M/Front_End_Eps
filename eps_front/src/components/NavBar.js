import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css'; // Importa el archivo CSS para los estilos
import logo from '../logo1.png'; // Importa la imagen del logo

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img src={logo} alt="Logo" className="logo-image" />
          Eps Sanadora
        </Link>
        <div className="navbar-buttons">
          <Link to="/login" className="navbar-button">
            Log In
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

