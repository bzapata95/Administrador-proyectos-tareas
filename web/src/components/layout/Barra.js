import React from "react";

import AuthContext from "../../context/autenticacion/authContext";

import { isAuthenticated } from "../../services/auth";

export default function Barra({ history }) {
  const { usuario, usuarioAutenticado, cerrarSesion } = React.useContext(
    AuthContext
  );

  React.useEffect(() => {
    const autenticacion = async () => {
      await usuarioAutenticado();
    };
    autenticacion();

    // eslint-disable-next-line
  }, []);

  const handleExit = () => {
    cerrarSesion();
  };

  return (
    <header className="app-header">
      {usuario && (
        <p className="nombre-usuario">
          Hola <span>{usuario.nombre}</span>
        </p>
      )}

      <nav className="nav-principal">
        <button className="btn btn-blank cerrar-sesion" onClick={handleExit}>
          Cerrar sesión
        </button>
      </nav>
    </header>
  );
}
