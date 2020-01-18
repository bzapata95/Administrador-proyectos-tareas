import React, { useContext } from "react";

import proyectoContext from "../../context/proyectos/proyectoContext";
// import { Container } from './styles';

export default function FormTarea() {
  const { proyecto } = useContext(proyectoContext);

  // Si no hay proyecto seleccionado
  if (!proyecto) return null;
  // Destructuring al array
  const [proyectoActual] = proyecto;

  return (
    <div className="formulario">
      <form>
        <div className="contenedor-input">
          <input
            type="text"
            className="input-text"
            placeholder="Nombre de la tarea"
            name="nombre"
          />
        </div>

        <div className="contenedor-input">
          <input
            type="submit"
            className="btn btn-primario btn-submit btn-block"
            value="Agregar tarea"
          />
        </div>
      </form>
    </div>
  );
}
