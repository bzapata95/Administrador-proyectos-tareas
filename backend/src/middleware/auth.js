const jwt = require("jsonwebtoken");

module.exports = {
  auth(request, response, next) {
    const token = request.header("x-auth-token"); // Leer el token del header
    // const authHeader = request.header.authorization;

    if (!token) return response.status(401).json({ msg: "No tienes permiso" }); // Revisar si no hay token

    try {
      const cifrado = jwt.verify(token, process.env.SIGNATURE); // Verificamos el cifrado y la firma
      request.usuario = cifrado.usuario; // Guardamos en el request es usuario que contiene parametros
      next(); // Si todo esta bien continuamos
    } catch (error) {
      response.status(401).json({ msg: "Token no válido" }); // En caso de error - mostramos en el Front-End
    }
  }
};
