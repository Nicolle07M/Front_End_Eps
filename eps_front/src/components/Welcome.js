import React from 'react';
import './Welcome.css'; // Archivo de estilos para la vista de bienvenida
import logo from '../logo1.png'; // Importa tu logo

const Welcome = () => {
  return (
    <div className="welcome-container">
      <nav className="navbar">
        <div className="logo-container">
          <img src={logo} alt="Logo EPS Sanadora" className="logo" />
          <h6>EPS Sanadora</h6>
        </div>
        <a href="/registro" className="login-button1">Registrate Doctor!</a>
        <a href="/login" className="login-button">Login</a>
      </nav>
      <div className="content">
        <h2>Bienvenido a EPS Sanadora</h2>
        <p>
          En EPS Sanadora nos dedicamos a garantizar tu bienestar integral con un enfoque humano y profesional. Nuestro compromiso va más allá de la atención médica; nos esforzamos por ofrecer servicios de calidad que se adapten a tus necesidades individuales y familiares.
        </p>
        <p>
          Nuestro equipo de especialistas altamente capacitados está listo para cuidar de ti en cada etapa de tu vida. Desde consultas médicas hasta tratamientos especializados, estamos aquí para proporcionarte la mejor atención posible. Nos enorgullece ser parte de tu camino hacia una vida más saludable y feliz.
        </p>
        <p>
          Únete a la familia EPS Sanadora y experimenta la diferencia en la atención médica que mereces. Estamos aquí para cuidarte hoy, mañana y siempre.
        </p>
      </div>
      <footer className="footer">
        <h6>Derechos reservados © 2024 EPS Sanadora</h6>
      </footer>
    </div>
  );
};

export default Welcome;
