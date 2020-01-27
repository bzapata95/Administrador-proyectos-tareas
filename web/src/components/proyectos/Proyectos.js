import React from "react";

import Sidebar from "../layout/Sidebar";
import Barra from "../layout/Barra";
import FormTarea from "../tareas/FormTarea";
import ListadoTareas from "../tareas/ListadoTareas";

import AuthContext from "../../context/autenticacion/authContext";

export default function Proyectos() {
  const { usuarioAutenticado } = React.useContext(AuthContext);

  React.useEffect(() => {
    const autenticacion = async () => {
      await usuarioAutenticado();
    };
    autenticacion();

    // eslint-disable-next-line
  }, []);

  return (
    <div className="contenedor-app">
      <Sidebar />
      <div className="seccion-principal">
        <Barra />
        <main>
          <FormTarea />
          <div className="contenedor-tareas">
            <ListadoTareas />
          </div>
        </main>
      </div>
    </div>
  );
}
