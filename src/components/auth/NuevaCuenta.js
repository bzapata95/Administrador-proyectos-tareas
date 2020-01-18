import React, { useState } from "react";
import { Link } from "react-router-dom";
// import { Container } from './styles';

export default function NuevaCuenta() {
  const [usuario, setUsuario] = useState({
    nombre: "",
    email: "",
    password: "",
    confirmar: ""
  });

  const handleInputs = e => {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const { nombre, email, password, confirmar } = usuario;

    if (!nombre || !email || !password || !confirmar) {
    }
  };

  return (
    <div className="form-usuario">
      <div className="contenedor-form sombra-dark">
        <h1>Obtener una cuenta</h1>

        <form onSubmit={handleSubmit}>
          <div className="campo-form">
            <label htmlFor="nombre">Nombre:</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              placeholder="Ingresa tu nombre completo"
              value={usuario.nombre}
              onChange={handleInputs}
            />
          </div>

          <div className="campo-form">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Ingresa tu email"
              value={usuario.email}
              onChange={handleInputs}
            />
          </div>

          <div className="campo-form">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Ingresa tu password"
              value={usuario.password}
              onChange={handleInputs}
            />
          </div>

          <div className="campo-form">
            <label htmlFor="confirmar">Confirmar confirmar:</label>
            <input
              type="password"
              id="confirmar"
              name="confirmar"
              placeholder="Repita su password"
              value={usuario.confirmar}
              onChange={handleInputs}
            />
          </div>

          <div className="campo-form">
            <input
              type="submit"
              className="btn btn-primario btn-block"
              value="Registrarme"
            />
          </div>
        </form>

        <Link to="/" className="enlace-cuenta">
          Tengo una cuenta, inicia sesion
        </Link>
      </div>
    </div>
  );
}
