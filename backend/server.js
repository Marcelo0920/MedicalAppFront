const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

console.log("Iniciando servidor...");

const app = express();
const PORT = 5000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Importar rutas
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
