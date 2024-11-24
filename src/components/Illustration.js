import React from "react"; // Importa React.
import doctorImage from "../assets/doctor.jpg"; // Importa la imagen del doctor.

function Illustration() {
    return (
        <div className="illustration"> {/* Contenedor de la ilustración */}
            <img src={doctorImage} alt="Doctor" /> {/* Muestra la imagen */}
        </div>
    );
}

export default Illustration; // Exporta el componente Illustration.
