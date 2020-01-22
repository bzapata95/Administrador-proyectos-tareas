import React, { useState } from "react";
import { Link } from "react-router-dom";

import AlertaContext from "../../context/alertas/alertaContext";
import AuthContext from "../../context/autenticacion/authContext";

export default function Login({ history }) {
  const { alerta, mostrarAlerta } = React.useContext(AlertaContext);
  const { mensaje, autenticado, iniciarSesion } = React.useContext(AuthContext);

  React.useEffect(() => {
    if (autenticado) history.push("/proyectos");

    if (mensaje) mostrarAlerta(mensaje.msg, mensaje.categoria);
  }, [mensaje, autenticado, history]);

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
      mostrarAlerta("Todos los campos son obligatorio", "alerta-error");
      return;
    }

    iniciarSesion({ email, password });
  };

  return (
    <div className="form-usuario">
      {alerta && (
        <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>
      )}
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
