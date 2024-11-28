export const formatDate = (dateString) => {
  // Validación inicial
  if (!dateString) {
    return "Fecha no disponible";
  }

  try {
    const date = new Date(dateString);

    // Verificar si la fecha es válida
    if (isNaN(date.getTime())) {
      return "Fecha inválida";
    }

    return new Intl.DateTimeFormat("es", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  } catch (error) {
    console.error("Error al formatear la fecha:", error);
    return "Error al formatear la fecha";
  }
};
