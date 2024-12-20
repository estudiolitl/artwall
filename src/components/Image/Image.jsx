import React from 'react';
import styled from 'styled-components';

const ImageWrapper = styled.div`
  position: absolute;
  cursor: pointer;
  overflow: hidden;
  transition: transform 0.2s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 4px;

  &:hover {
    transform: scale(1.02);
    z-index: 1000;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  }
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 4px;
`;

const ImageOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.2s ease;
  padding: 20px;
  text-align: center;

  ${ImageWrapper}:hover & {
    opacity: 1;
  }
`;

const Title = styled.h3`
  margin: 0;
  font-size: 18px;
  color: #000;
  font-weight: bold;
  margin-bottom: 10px;
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
  margin-bottom: 10px;
`;

const Tag = styled.span`
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
`;

const Date = styled.p`
  margin: 0;
  font-size: 14px;
  color: #333;
`;

const Author = styled.p`
  margin: 5px 0 0;
  font-size: 14px;
  color: #666;
  font-style: italic;
`;

const Image = ({ image, style }) => {
  const formattedDate = image.date || 'Fecha no disponible';

  return (
    <ImageWrapper style={style}>
      <StyledImage src={image.url} alt={image.title} />
      <ImageOverlay>
        <Title>{image.title}</Title>
        <Tags>
          {image.tags && image.tags.map((tag, index) => (
            <Tag key={index}>#{tag}</Tag>
          ))}
        </Tags>
        <Date>{formattedDate}</Date>
        {image.author && <Author>by {image.author}</Author>}
      </ImageOverlay>
    </ImageWrapper>
  );
};

export default Image; 