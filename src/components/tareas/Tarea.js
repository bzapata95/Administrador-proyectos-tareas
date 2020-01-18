import React from "react";

// import { Container } from './styles';

export default function Tarea({ tarea }) {
  return (
    <li className="tarea sombra">
      <p>{tarea.nombre}</p>
      <div className="estado">
        {tarea.estado ? (
          <button type="button" className="completo">
            Completo
          </button>
        ) : (
          <button type="button" className="incompleto">
            Incompleto
          </button>
        )}
      </div>

      <div className="acciones">
        <button type="button" className="btn btn-primario">
          Editar
        </button>
        <button type="button" className="btn btn-secundario">
          Eliminar
        </button>
      </div>
    </li>
  );
}
