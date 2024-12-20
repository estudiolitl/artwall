import { useState, useEffect } from 'react';
import imagesData from '../assets/images.json';

const useCanvas = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const CANVAS_CENTER = 10000;
    const SPACING = 800;
    
    const generateSpiralPosition = (index) => {
      const goldenAngle = Math.PI * (3 - Math.sqrt(5));
      const distance = SPACING * Math.sqrt(index);
      const angle = index * goldenAngle;
      
      return {
        x: CANVAS_CENTER + distance * Math.cos(angle),
        y: CANVAS_CENTER + distance * Math.sin(angle)
      };
    };

    // Usar las imágenes del JSON
    const positionedImages = imagesData.images.map((image, index) => {
      const position = generateSpiralPosition(index);
      console.log(`Posicionando imagen ${image.id} en:`, position);
      
      return {
        ...image,
        x: position.x,
        y: position.y,
        width: 400,  // Tamaño fijo para todas las imágenes
        height: 300, // Puedes ajustar estos valores
        zIndex: index
      };
    });
    
    console.log('Imágenes posicionadas:', positionedImages);
    setImages(positionedImages);
  }, []);

  return { images };
};

export default useCanvas; 