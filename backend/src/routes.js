const { Router } = require("express");

const usuarioController = require("./controllers/usuarioController");
const authController = require("./controllers/authController");
const proyectoController = require("./controllers/proyectoController");
const tareaController = require("./controllers/tareaController");
const { check } = require("express-validator");

const { auth } = require("./middleware/auth");

const routes = Router();

// Rutas de authentication
routes.get("/auth", auth, authController.howIam);
routes.post("/auth", [
  check("email", "Agreaga un email válido").isEmail(),
  check("password", "El password debe ser mínimo de 6 caracteres").isLength({
    min: 6
  }),
  authController.login
]);

// Rutas del usuario
routes.post(
  "/usuarios",
  [
    check("nombre", "El nombre es obligatorio")
      .not()
      .isEmpty(),
    check("email", "Agreaga un email válido").isEmail(),
    check("password", "El password debe ser mínimo de 6 caracteres").isLength({
      min: 6
    })
  ],
  usuarioController.store
);

// Rutas del royectos
routes.get("/", auth, proyectoController.index);
routes.post(
  "/proyectos",
  auth,
  [
    check("nombre", "El nombre es requerido")
      .not()
      .isEmpty()
  ],
  proyectoController.store
);
routes.put(
  "/proyectos/:_id",
  auth,
  [
    check("nombre", "El nombre es requerido")
      .not()
      .isEmpty()
  ],
  proyectoController.update
);
routes.delete("/proyectos/:_id", auth, proyectoController.delete);

// Rutas de las tareas
routes.get("/tareas", auth, tareaController.index);
routes.post(
  "/tareas",
  auth,
  [
    check("nombre", "El nombre es obligatorio")
      .not()
      .isEmpty()
  ],
  tareaController.store
);
routes.put("/tareas/:_id", auth, tareaController.update);
routes.delete("/tareas/:_id", auth, tareaController.delete);

module.exports = routes;
