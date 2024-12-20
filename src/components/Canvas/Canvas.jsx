import React, { useState, useEffect } from 'react';
import { useGesture } from 'react-use-gesture';
import * as S from './Canvas.styles';
import Image from '../Image/Image';
import useCanvas from '../../hooks/useCanvas';

const CANVAS_SIZE = 20000;
const MIN_ZOOM = 0.1;  // Zoom mínimo (más lejos)
const MAX_ZOOM = 2;    // Zoom máximo (más cerca)

const Canvas = () => {
  const { images } = useCanvas();
  const [position, setPosition] = useState({ x: -10000, y: -10000 });
  const [zoom, setZoom] = useState(1);
  const [wrappedPositions, setWrappedPositions] = useState([]);

  useEffect(() => {
    const wrapPositions = () => {
      const baseX = position.x;
      const baseY = position.y;
      
      return [
        { x: baseX - CANVAS_SIZE, y: baseY - CANVAS_SIZE },
        { x: baseX, y: baseY - CANVAS_SIZE },
        { x: baseX + CANVAS_SIZE, y: baseY - CANVAS_SIZE },
        { x: baseX - CANVAS_SIZE, y: baseY },
        { x: baseX, y: baseY },
        { x: baseX + CANVAS_SIZE, y: baseY },
        { x: baseX - CANVAS_SIZE, y: baseY + CANVAS_SIZE },
        { x: baseX, y: baseY + CANVAS_SIZE },
        { x: baseX + CANVAS_SIZE, y: baseY + CANVAS_SIZE },
      ];
    };

    setWrappedPositions(wrapPositions());
  }, [position]);

  const bind = useGesture({
    onDrag: ({ delta: [dx, dy] }) => {
      setPosition(current => {
        const newX = current.x + dx / zoom;  // Ajustar movimiento según zoom
        const newY = current.y + dy / zoom;
        
        return {
          x: newX - Math.floor(newX / CANVAS_SIZE) * CANVAS_SIZE,
          y: newY - Math.floor(newY / CANVAS_SIZE) * CANVAS_SIZE
        };
      });
    },
    onPinch: ({ offset: [d], origin: [ox, oy], event }) => {
      event.preventDefault();
      
      setZoom(Math.min(Math.max(d, MIN_ZOOM), MAX_ZOOM));
    },
    onWheel: ({ event }) => {
      event.preventDefault();
      
      const newZoom = zoom * (1 - event.deltaY * 0.001);
      setZoom(Math.min(Math.max(newZoom, MIN_ZOOM), MAX_ZOOM));
    }
  }, {
    drag: {
      filterTaps: true,
      rubberband: true
    },
    pinch: {
      filterTaps: true,
      rubberband: true
    },
    wheel: {
      filterTaps: true
    }
  });

  return (
    <S.Viewport>
      <S.ZoomContainer
        style={{
          transform: `scale(${zoom})`
        }}
      >
        {wrappedPositions.map((pos, index) => (
          <S.CanvasContainer
            key={index}
            {...bind()}
            style={{
              transform: `translate(${pos.x}px, ${pos.y}px)`
            }}
          >
            {images.map(image => (
              <Image
                key={image.id}
                image={image}
                style={{
                  position: 'absolute',
                  left: image.x,
                  top: image.y,
                  width: image.width,
                  height: image.height
                }}
              />
            ))}
          </S.CanvasContainer>
        ))}
      </S.ZoomContainer>
      
      <S.Controls>
        <S.ZoomButton onClick={() => setZoom(z => Math.min(z * 1.2, MAX_ZOOM))}>+</S.ZoomButton>
        <S.ZoomButton onClick={() => setZoom(z => Math.max(z / 1.2, MIN_ZOOM))}>-</S.ZoomButton>
      </S.Controls>
      
      <S.Coordinates>
        x: {Math.round(-position.x)}, y: {Math.round(-position.y)}, zoom: {zoom.toFixed(2)}
      </S.Coordinates>
    </S.Viewport>
  );
};

export default Canvas; 