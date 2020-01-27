const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const Usuario = require("../models/Usuario");

module.exports = {
  async store(request, response) {
    const { nombre, email, password } = request.body;

    let usuario = await Usuario.findOne({ email });

    if (!usuario) {
      // Revisar si hay errores
      const errors = validationResult(request);
      if (!errors.isEmpty()) {
        return response.status(400).json({ errores: errors.array() });
      }

      //Hasheando el password
      const salt = await bcryptjs.genSalt(10);
      const passwordHash = await bcryptjs.hash(password, salt);

      usuario = await Usuario.create({
        nombre,
        email,
        password: passwordHash
      });

      // Crear el JWT
      const payload = {
        usuario: {
          id: usuario.id
        }
      };
      // Firmar el token
      jwt.sign(
        payload,
        process.env.SIGNATURE,
        {
          expiresIn: 3600 // 1hora
        },
        (error, token) => {
          if (error) throw error;

          //Mensaje de cofirmación
          return response.json({ token });
        }
      );
    } else {
      return response.status(400).json({ msg: "El usuario ya existe" });
    }
  }
};
