const express = require("express");
const router = express.Router();

const users = []; // Base de datos simulada en memoria

// Ruta para registrar usuarios
router.post("/register", (req, res) => {
    const { username, email, password, contact } = req.body;

    if (!username || !email || !password || !contact) {
        return res.status(400).json({ message: "Todos los campos son requeridos" });
    }

    users.push({ username, email, password, contact });
    res.status(201).json({ message: "Usuario registrado exitosamente!" });
});

// Ruta para iniciar sesión
router.post("/login", (req, res) => {
    const { email, password } = req.body;

    const user = users.find((u) => u.email === email && u.password === password);
    if (!user) {
        return res.status(401).json({ message: "Credenciales inválidas" });
    }

    res.status(200).json({ message: `Bienvenido, ${user.username}` });
});

module.exports = router;


