import React, { useState } from "react";
import Login from "./components/Login"; // Importar el componente de Login
import Register from "./components/Register"; // Importar el componente de Register
import Illustration from "./components/Illustration"; // Importar el componente de ilustración
import "./index.css"; // Importar estilos globales

function App() {
    const [isLogin, setIsLogin] = useState(true); // Estado para alternar entre Login y Register

    return (
        <div className="container">
            {/* Sección para alternar entre Login y Register */}
            <div className="form-container">
                {isLogin ? (
                    <Login setIsLogin={setIsLogin} /> // Mostrar Login si isLogin es true
                ) : (
                    <Register setIsLogin={setIsLogin} /> // Mostrar Register si isLogin es false
                )}
            </div>

            {/* Sección para la ilustración a la derecha */}
            <Illustration />
        </div>
    );
}

export default App;
