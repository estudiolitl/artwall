import React, { useState, useEffect } from 'react';
import { useGesture } from 'react-use-gesture';
import * as S from './Canvas.styles';
import Image from '../Image/Image';
import useCanvas from '../../hooks/useCanvas';

const CANVAS_SIZE = 20000;
const MIN_ZOOM = 0.1;
const MAX_ZOOM = 2;
const ZOOM_SPEED = 0.005; // Ajuste más suave para el zoom

const Canvas = () => {
  const { images } = useCanvas();
  const [position, setPosition] = useState({ x: -10000, y: -10000 });
  const [zoom, setZoom] = useState(1);
  const [wrappedPositions, setWrappedPositions] = useState([]);
  const [lastDistance, setLastDistance] = useState(null);

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
    onDrag: ({ delta: [dx, dy], event }) => {
      event.preventDefault();
      setPosition(current => {
        const newX = current.x + dx / zoom;
        const newY = current.y + dy / zoom;
        
        return {
          x: newX - Math.floor(newX / CANVAS_SIZE) * CANVAS_SIZE,
          y: newY - Math.floor(newY / CANVAS_SIZE) * CANVAS_SIZE
        };
      });
    },
    onPinch: ({ event, offset: [d], movement: [md], memo }) => {
      event.preventDefault();

      if (!memo) {
        memo = zoom;
      }

      const newZoom = Math.min(Math.max(memo + md * ZOOM_SPEED, MIN_ZOOM), MAX_ZOOM);
      setZoom(newZoom);

      return memo;
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
      rubberband: true,
      threshold: 0
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
        {Math.round(-position.x)}, {Math.round(-position.y)} ({zoom.toFixed(1)}x)
      </S.Coordinates>
    </S.Viewport>
  );
};

export default Canvas; 