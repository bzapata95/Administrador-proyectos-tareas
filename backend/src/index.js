const express = require("express");
const cors = require("cors");

const conectarDB = require("./config/bd");

const routes = require("./routes");

const app = express();
conectarDB();

const PORT = process.env.PORT || 3333;

app.use(cors());

app.use(express.json());
app.use(routes);

app.listen(PORT);
