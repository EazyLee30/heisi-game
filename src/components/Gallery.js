import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const GalleryContainer = styled.div`
  min-height: 100vh;
  padding: 2rem;
`;

const BackButton = styled.button`
  position: fixed;
  top: 2rem;
  left: 2rem;
  padding: 0.8rem 1.5rem;
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid #00dbde;
  color: #fff;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(5px);
  z-index: 1000;
  
  &:hover {
    background: rgba(0, 219, 222, 0.2);
    transform: scale(1.05);
    box-shadow: 0 0 20px rgba(0, 219, 222, 0.4);
  }
`;

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
  padding: 2rem;
  margin-top: 4rem;
`;

const PhotoCard = styled(motion.div)`
  position: relative;
  aspect-ratio: 3/4;
  border-radius: 15px;
  overflow: hidden;
  cursor: pointer;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const Photo = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
  
  ${PhotoCard}:hover & {
    transform: scale(1.05);
  }
`;

const Modal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalPhoto = styled.img`
  max-width: 90%;
  max-height: 90vh;
  object-fit: contain;
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 50vh;
  color: rgba(255, 255, 255, 0.7);
  text-align: center;
  gap: 1rem;
`;

function Gallery({ favorites = [] }) {
  const navigate = useNavigate();
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  if (!favorites || favorites.length === 0) {
    return (
      <GalleryContainer>
        <BackButton onClick={() => navigate('/swipe')}>
          返回
        </BackButton>
        <EmptyState>
          <h2>暂无收藏</h2>
          <p>快去浏览并收藏你喜欢的照片吧！</p>
        </EmptyState>
      </GalleryContainer>
    );
  }

  return (
    <GalleryContainer>
      <BackButton onClick={() => navigate('/swipe')}>
        返回
      </BackButton>

      <GalleryGrid>
        {favorites.map((photo, index) => (
          photo && photo.url && (
            <PhotoCard
              key={photo.id || index}
              layoutId={`photo-${photo.id || index}`}
              onClick={() => setSelectedPhoto(photo)}
            >
              <Photo src={photo.url} alt="Favorite" />
            </PhotoCard>
          )
        ))}
      </GalleryGrid>

      <AnimatePresence>
        {selectedPhoto && selectedPhoto.url && (
          <Modal
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
          >
            <ModalPhoto src={selectedPhoto.url} alt="Selected" />
          </Modal>
        )}
      </AnimatePresence>
    </GalleryContainer>
  );
}

export default Gallery; 