const CANVAS_SIZE = 20000; // Canvas de 20000x20000 pixels

/**
 * Genera una posición aleatoria dentro de los límites del canvas virtual
 */
export const generateRandomPosition = () => {
  return {
    x: Math.random() * CANVAS_SIZE - CANVAS_SIZE/2, // Centrado en el origen
    y: Math.random() * CANVAS_SIZE - CANVAS_SIZE/2  // Centrado en el origen
  };
};

/**
 * Inicializa las posiciones para un conjunto de imágenes
 * @param {Array} images - Array de objetos de imagen
 * @returns {Array} - Array de imágenes con posiciones
 */
export const initializeImagePositions = (images) => {
  return images.map((image, index) => ({
    ...image,
    ...generateRandomPosition(),
    zIndex: index
  }));
}; 