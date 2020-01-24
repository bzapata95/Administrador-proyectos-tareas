import React, { useContext, useState, useEffect } from "react";

import proyectoContext from "../../context/proyectos/proyectoContext";
import tareaContext from "../../context/tareas/tareaContext";
// import { Container } from './styles';

export default function FormTarea() {
  const { proyecto } = useContext(proyectoContext);
  const {
    tareaseleccionada,
    errortarea,
    agregarTarea,
    validarTarea,
    obtenerTareas,
    actualizarTarea,
    limpiarTarea
  } = useContext(tareaContext);

  const [tarea, setTarea] = useState({
    nombre: ""
  });

  useEffect(() => {
    if (tareaseleccionada) {
      setTarea(tareaseleccionada);
    } else {
      setTarea({
        nombre: ""
      });
    }
  }, [tareaseleccionada]);

  // Si no hay proyecto seleccionado
  if (!proyecto) return null;
  // Destructuring al array
  const [proyectoActual] = proyecto;

  const onSubmit = e => {
    e.preventDefault();

    if (!tarea.nombre) {
      validarTarea();
      return;
    }

    // Revisa si es edición o si es nueva tarea
    if (!tareaseleccionada) {
      // tarea nueva
      tarea.proyecto = proyectoActual._id;

      agregarTarea(tarea);
    } else {
      // Actualizar tarea existente
      actualizarTarea(tarea);

      //Elimina tarea seleccionada del state
      limpiarTarea();
    }

    // Obtener y filtrar las tareas del proyecto actual
    obtenerTareas(proyectoActual.id);

    setTarea({
      nombre: ""
    });
  };

  const handleInput = e => {
    setTarea({
      ...tarea,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="formulario">
      <form onSubmit={onSubmit}>
        <div className="contenedor-input">
          <input
            type="text"
            className="input-text"
            placeholder="Nombre de la tarea"
            value={tarea.nombre}
            onChange={handleInput}
            name="nombre"
          />
        </div>

        <div className="contenedor-input">
          <input
            type="submit"
            className="btn btn-primario btn-submit btn-block"
            value={tareaseleccionada ? "Editar tarea" : "Agregar tarea"}
          />
        </div>
      </form>
      {errortarea && (
        <p className="mensaje error">El nombre de la tarea es obligatorio</p>
      )}
    </div>
  );
}
