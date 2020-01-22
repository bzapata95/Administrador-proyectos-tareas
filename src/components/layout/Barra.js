import React from "react";

import AuthContext from "../../context/autenticacion/authContext";

export default function Barra() {
  const { usuario, usuarioAutenticado, cerrarSesion } = React.useContext(
    AuthContext
  );

  React.useEffect(() => {
    const autenticacion = async () => {
      await usuarioAutenticado();
    };
    autenticacion();
  }, []);

  return (
    <header className="app-header">
      {usuario && (
        <p className="nombre-usuario">
          Hola <span>{usuario.nombre}</span>
        </p>
      )}

      <nav className="nav-principal">
        <button
          className="btn btn-blank cerrar-sesion"
          onClick={() => cerrarSesion()}
        >
          Cerrar sesión
        </button>
      </nav>
    </header>
  );
}
