import React, { useState } from "react"; // Importa React y el hook useState.

function Login({ setIsLogin }) {
    const [email, setEmail] = useState(""); // Estado para el correo.
    const [password, setPassword] = useState(""); // Estado para la contraseña.

    const handleLogin = async (e) => {
        e.preventDefault(); // Previene la recarga de la página al enviar el formulario.
        try {
            const response = await fetch("http://localhost:5000/api/auth/login", { // Solicitud al backend.
                method: "POST", // Método POST.
                headers: { "Content-Type": "application/json" }, // Encabezados para enviar JSON.
                body: JSON.stringify({ email, password }), // Datos enviados al backend.
            });
            const data = await response.json(); // Respuesta del servidor.
            alert(data.message); // Muestra un mensaje al usuario.
        } catch (error) {
            alert("Error al iniciar sesión."); // Manejo de errores.
        }
    };

    return (
        <div>
            <h2>Sign in</h2> {/* Título del formulario */}
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Sign in</button> {/* Botón de envío */}
            </form>
            <p onClick={() => setIsLogin(false)}>No Account? Sign up</p> {/* Enlace para alternar a Register */}
        </div>
    );
}

export default Login; // Exporta el componente Login.
