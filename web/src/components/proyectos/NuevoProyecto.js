import React, { useState, useContext } from "react";

import proyectoContext from "../../context/proyectos/proyectoContext";

// import { Container } from './styles';

export default function NuevoProyecto() {
  const proyectosContext = useContext(proyectoContext);
  const {
    formulario,
    errorformulario,
    mostrarFormulario,
    agregarNuevoProyecto,
    mostrarError
  } = proyectosContext;

  const [proyecto, guardarProyecto] = useState({
    nombre: ""
  });

  const hanldeInputs = e => {
    guardarProyecto({
      ...proyecto,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const { nombre } = proyecto;
    if (!nombre) {
      mostrarError();
      return;
    }
    agregarNuevoProyecto(proyecto);
    guardarProyecto({
      nombre: ""
    });
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-block btn-primario"
        onClick={() => mostrarFormulario()}
      >
        Nuevo proyecto
      </button>
      {formulario && (
        <form className="formulario-nuevo-proyecto" onSubmit={handleSubmit}>
          <input
            type="text"
            className="input-text"
            placeholder="Nombre de tu proyecto"
            name="nombre"
            value={proyecto.nombre}
            onChange={hanldeInputs}
          />
          <input
            type="submit"
            className="btn btn-primario btn-block"
            value="Agregar proyecto"
          />
        </form>
      )}
      {errorformulario && (
        <p className="mensaje error">El nombre del proyecto es obligatorio</p>
      )}
    </>
  );
}
