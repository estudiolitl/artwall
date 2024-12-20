import styled from 'styled-components';

export const Viewport = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;
  background: #fbf2f9;
`;

export const ZoomContainer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  transform-origin: center;
  transition: transform 0.1s ease-out;
`;

export const CanvasContainer = styled.div`
  width: 20000px;
  height: 20000px;
  position: absolute;
  cursor: grab;
  touch-action: none;
  user-select: none;
  background-color: #fbf2f9;
  
  &:active {
    cursor: grabbing;
  }
`;

export const Controls = styled.div`
  position: fixed;
  bottom: 20px;
  left: 20px;
  z-index: 1000;
  display: flex;
  gap: 10px;
`;

export const ZoomButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  font-size: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background: rgba(0, 0, 0, 0.8);
  }
`;

export const Coordinates = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 10px;
  border-radius: 5px;
  font-family: monospace;
  z-index: 1000;
`; 