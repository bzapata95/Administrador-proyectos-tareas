const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const Usuario = require("../models/Usuario");

module.exports = {
  async howIam(request, response) {
    const usuario = await Usuario.findById(request.usuario.id).select(
      "-password"
    );

    response.json({ usuario });
  },

  async login(request, response) {
    // Revisar si hay errores
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errores: errors.array() });
    }

    const { email, password } = request.body;

    let usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return response.status(400).json({ msg: "Verifique sus credenciales" });
    }

    const passCorrecto = await bcryptjs.compare(password, usuario.password);
    if (!passCorrecto) {
      return response.status(400).json({ msg: "Verifique sus credenciales" });
    }

    const payload = {
      usuario: {
        id: usuario.id
      }
    };

    jwt.sign(
      payload,
      process.env.SIGNATURE,
      {
        expiresIn: 3600
      },
      (error, token) => {
        if (error) throw error;
        return response.json({ token });
      }
    );
  }
};
