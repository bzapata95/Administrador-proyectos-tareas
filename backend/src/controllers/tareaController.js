const { validationResult } = require("express-validator");

const Tarea = require("../models/Tarea");
const Proyecto = require("../models/Proyecto");

module.exports = {
  async index(request, response) {
    const { proyecto } = request.query; // Extraemos los datos
    const existeProyecto = await Proyecto.findById(proyecto); // Verificando si el proyecto existe
    if (!existeProyecto)
      return response.status(404).json({ msg: "El proyeto no existe" });

    if (existeProyecto.creador.toString() !== request.usuario.id)
      return response.status(401).json({ msg: "No estas autorizado" }); // Revisamos si el proyecto actual pertenece al usuario autenticado

    const tareas = await Tarea.find({ proyecto });

    return response.json({ tareas });
  },

  async store(request, response) {
    const errores = validationResult(request);

    if (!errores.isEmpty())
      return response.status(400).json({ errores: errores.array() });

    const { proyecto, nombre } = request.body; // Extraemos los datos
    const existeProyecto = await Proyecto.findById(proyecto); // Verificando si el proyecto existe
    if (!existeProyecto)
      return response.status(404).json({ msg: "El proyeto no existe" });

    if (existeProyecto.creador.toString() !== request.usuario.id)
      return response.status(401).json({ msg: "No estas autorizado" }); // Revisamos si el proyecto actual pertenece al usuario autenticado

    const tarea = await Tarea.create({
      nombre,
      proyecto
    });

    return response.json({ tarea });
  },

  async update(request, response) {
    const errores = validationResult(request);

    if (!errores.isEmpty())
      return response.status(400).json({ errores: errores.array() });

    const { _id } = request.params;
    let tarea = await Tarea.findById({ _id });
    if (!tarea)
      return response.status(404).json({ msg: "No existe esa tarea" });

    const { proyecto, nombre, estado } = request.body; // Extraemos los datos
    const existeProyecto = await Proyecto.findById(proyecto); // Verificando si el proyecto existe

    if (existeProyecto.creador.toString() !== request.usuario.id)
      return response.status(401).json({ msg: "No estas autorizado" }); // Revisamos si el proyecto actual pertenece al usuario autenticado

    const nuevaTarea = {};

    nuevaTarea.nombre = nombre;
    nuevaTarea.estado = estado;

    tarea = await Tarea.findByIdAndUpdate({ _id }, nuevaTarea, { new: true });

    return response.json({ tarea });
  },

  async delete(request, response) {
    const { _id } = request.params;
    let tarea = await Tarea.findById({ _id });
    if (!tarea)
      return response.status(404).json({ msg: "No existe esa tarea" });

    const { proyecto } = request.query; // Extraemos los datos
    const existeProyecto = await Proyecto.findById(proyecto); // Verificando si el proyecto existe

    if (existeProyecto.creador.toString() !== request.usuario.id)
      return response.status(401).json({ msg: "No estas autorizado" }); // Revisamos si el proyecto actual pertenece al usuario autenticado

    await Tarea.findByIdAndRemove({ _id });
    return response.json({ msg: "Tarea eliminada" });
  }
};
