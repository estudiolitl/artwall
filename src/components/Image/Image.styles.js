import styled from 'styled-components';

export const ImageWrapper = styled.div`
  position: absolute;
  cursor: move;
  transition: box-shadow 0.2s ease;
  
  &:hover {
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  }
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  pointer-events: none;
`;

export const ImageInfo = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 8px;
  opacity: 0;
  transition: opacity 0.2s ease;

  ${ImageWrapper}:hover & {
    opacity: 1;
  }
`;

export const Title = styled.h3`
  margin: 0;
  font-size: 14px;
`;

export const Tags = styled.p`
  margin: 4px 0 0;
  font-size: 12px;
  opacity: 0.8;
`; 