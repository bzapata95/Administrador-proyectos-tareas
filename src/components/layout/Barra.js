import React from "react";

// import { Container } from './styles';

export default function Barra() {
  return (
    <header className="app-header">
      <p className="nombre-usuario">
        Hola <span>Bryan zapata</span>
      </p>

      <nav className="nav-principal">
        <a href="#!">Cerrar sesión</a>
      </nav>
    </header>
  );
}
