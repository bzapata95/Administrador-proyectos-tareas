import React, { useState } from "react";
import { Link } from "react-router-dom";
// import { Container } from './styles';

export default function Login() {
  const [usuario, setUsuario] = useState({ email: "", password: "" });

  const handleInputs = e => {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const { email, password } = usuario;

    if (!email || !password) {
    }
  };

  return (
    <div className="form-usuario">
      <div className="contenedor-form sombra-dark">
        <h1>Iniciar sesión</h1>

        <form onSubmit={handleSubmit}>
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
            <input
              type="submit"
              className="btn btn-primario btn-block"
              value="Iniciar sesión"
            />
          </div>
        </form>

        <Link to="/nueva-cuenta" className="enlace-cuenta">
          Obtener una cuenta
        </Link>
      </div>
    </div>
  );
}
