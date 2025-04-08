import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useFavorites } from '../context/FavoritesContext';

const Container = styled.div`
  padding: 20px;
  background: #0f1626;
  min-height: 100vh;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  color: #e94560;
  font-size: 1.5rem;
  cursor: pointer;
  margin-right: 20px;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: scale(1.1);
  }
`;

const Title = styled.h1`
  color: #e94560;
  margin: 0;
  font-size: 2rem;
`;

const Gallery = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  padding: 20px;
`;

const ImageContainer = styled.div`
  position: relative;
  aspect-ratio: 3/4;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(233, 69, 96, 0.3);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: scale(1.02);
    box-shadow: 0 0 20px rgba(233, 69, 96, 0.5);
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const EmptyMessage = styled.div`
  color: #e94560;
  text-align: center;
  font-size: 1.2rem;
  margin-top: 50px;
`;

function Favorites() {
  const { favorites } = useFavorites();
  const navigate = useNavigate();

  return (
    <Container>
      <Header>
        <BackButton onClick={() => navigate('/browse')}>←</BackButton>
        <Title>收藏夹</Title>
      </Header>
      {favorites.length === 0 ? (
        <EmptyMessage>还没有收藏的照片</EmptyMessage>
      ) : (
        <Gallery>
          {favorites.map((url, index) => (
            <ImageContainer key={index}>
              <Image src={url} alt="收藏的照片" loading="lazy" />
            </ImageContainer>
          ))}
        </Gallery>
      )}
    </Container>
  );
}

export default Favorites; 