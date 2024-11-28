export const convertToBase64 = (file) => {
  // Verificamos que sea un archivo válido
  if (!(file instanceof File) && !(file instanceof Blob)) {
    throw new Error("Se requiere un archivo válido");
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      try {
        const base64String = reader.result.split(",")[1];
        resolve(base64String);
      } catch (error) {
        reject(new Error("Error al procesar la imagen"));
      }
    };

    reader.onerror = (error) => {
      reject(new Error("Error al leer el archivo"));
    };

    reader.readAsDataURL(file);
  });
};
