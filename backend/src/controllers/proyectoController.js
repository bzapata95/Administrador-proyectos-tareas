const Proyecto = require("../models/Proyecto");

const { validationResult } = require("express-validator");

module.exports = {
  async index(request, response) {
    const proyectos = await Proyecto.find({
      creador: request.usuario.id
    }).sort({ creado: -1 });

    return response.json({ proyectos });
  },
  async store(request, response) {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errores: errors.array() });
    }

    // Crear nuevo proyecto
    const { nombre } = request.body;
    // Guardar el creador via JWT
    const creador = request.usuario.id;

    let proyecto = await Proyecto.create({
      nombre,
      creador
    });

    return response.json({ proyecto });
  },
  async update(request, response) {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errores: errors.array() });
    }

    const { _id } = request.params;
    const { nombre } = request.body;

    let nuevoProyecto = {
      nombre
    };
    if (nombre) {
      nuevoProyecto.nombre = nombre;
    }

    let proyecto = await Proyecto.findById(_id);

    if (!proyecto)
      return response.status(404).json({ msg: "Proyecto no encontrado" });

    if (proyecto.creador.toString() !== request.usuario.id) {
      return response.status(401).json({ msg: "No autorizado" });
    }

    proyecto = await Proyecto.findByIdAndUpdate(
      { _id },
      { $set: nuevoProyecto },
      { new: true }
    );

    return response.json(proyecto);
  },
  async delete(request, response) {
    const { _id } = request.params;

    let proyecto = await Proyecto.findById(_id);

    if (!proyecto)
      return response.status(404).json({ msg: "Proyecto no encontrado" });

    if (proyecto.creador.toString() !== request.usuario.id) {
      return response.status(401).json({ msg: "No autorizado" });
    }

    await Proyecto.findByIdAndRemove(_id);
    return response.json({ msg: "proyecto eliminado" });
  }
};
