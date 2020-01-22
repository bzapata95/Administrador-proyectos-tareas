import React, { useState } from "react";
import { Link } from "react-router-dom";

import AlertaContext from "../../context/alertas/alertaContext";
import AuthContext from "../../context/autenticacion/authContext";

export default function NuevaCuenta({ history }) {
  const { alerta, mostrarAlerta } = React.useContext(AlertaContext);
  const { mensaje, autenticado, registrarUsuario } = React.useContext(
    AuthContext
  );

  React.useEffect(() => {
    if (autenticado) history.push("/proyectos");

    if (mensaje) mostrarAlerta(mensaje.msg, mensaje.categoria);
  }, [mensaje, autenticado, history]);

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
      mostrarAlerta("Todos los campos son obligatorios", "alerta-error");
      return;
    }

    if (password.length < 6) {
      mostrarAlerta(
        "El password debe ser de al menos 6 caracteres",
        "alerta-error"
      );
      return;
    }

    if (password !== confirmar) {
      mostrarAlerta("Los passwords no son iguales", "alerta-error");
      return;
    }

    registrarUsuario({
      nombre,
      email,
      password
    });
  };

  return (
    <div className="form-usuario">
      {alerta && (
        <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>
      )}
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
