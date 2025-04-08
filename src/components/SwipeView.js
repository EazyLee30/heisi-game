import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useSwipeable } from 'react-swipeable';

const SwipeContainer = styled.div`
  min-height: 100vh;
  padding: 2rem;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const PhotoCard = styled(motion.div)`
  position: relative;
  width: 90%;
  max-width: 400px;
  height: 600px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  overflow: hidden;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  margin: 0 auto;
`;

const Photo = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const GalleryButton = styled.button`
  position: fixed;
  top: 2rem;
  right: 2rem;
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

const LikeDislikeButtons = styled.div`
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 1rem;
`;

const ActionButton = styled.button`
  padding: 1rem 2rem;
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid ${props => props.like ? '#00ff00' : '#ff0000'};
  color: #fff;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(5px);
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: scale(1.05);
  }
`;

const Instructions = styled.div`
  position: fixed;
  bottom: 6rem;
  left: 50%;
  transform: translateX(-50%);
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  text-align: center;
  backdrop-filter: blur(5px);
  padding: 0.5rem 1rem;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.2);
`;

function SwipeView({ favorites = [], addToFavorites }) {
  const [photos, setPhotos] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState('right');
  const navigate = useNavigate();

  const handlers = useSwipeable({
    onSwipedLeft: () => handleSwipe('left'),
    onSwipedRight: () => handleSwipe('right'),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true
  });

  const fetchPhotos = useCallback(async () => {
    try {
      const response = await fetch('https://v2.api-m.com/api/heisi');
      const result = await response.json();
      
      if (result.code === 200 && result.data) {
        const newPhoto = {
          id: result.request_id || Date.now().toString(),
          url: result.data
        };
        setPhotos(prevPhotos => [...prevPhotos, newPhoto]);
      } else {
        throw new Error(result.msg || 'Failed to fetch photo');
      }
    } catch (error) {
      console.error('Error fetching photos:', error);
      setPhotos(prevPhotos => [...prevPhotos, {
        id: Date.now().toString(),
        url: 'https://v2.api-m.com/api/heisi'
      }]);
    }
  }, []);

  useEffect(() => {
    fetchPhotos();
  }, [fetchPhotos]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowLeft') {
        handleSwipe('left');
      } else if (e.key === 'ArrowRight') {
        handleSwipe('right');
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  const handleSwipe = useCallback((direction) => {
    if (currentIndex < photos.length) {
      const currentPhoto = photos[currentIndex];
      setDirection(direction);
      if (direction === 'left' && currentPhoto) {
        addToFavorites(currentPhoto);
      }
      setCurrentIndex(prev => prev + 1);
      
      if (currentIndex === photos.length - 1) {
        fetchPhotos();
      }
    }
  }, [currentIndex, photos, addToFavorites, fetchPhotos]);

  return (
    <SwipeContainer {...handlers}>
      <GalleryButton onClick={() => navigate('/gallery')}>
        收藏夹
      </GalleryButton>

      <AnimatePresence>
        {currentIndex < photos.length && photos[currentIndex] && (
          <PhotoCard
            key={currentIndex}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ x: direction === 'left' ? 300 : -300, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Photo src={photos[currentIndex].url} alt="Photo" />
          </PhotoCard>
        )}
      </AnimatePresence>

      <Instructions>
        左右滑动或点击下方按钮进行选择
      </Instructions>

      <LikeDislikeButtons>
        <ActionButton like onClick={() => handleSwipe('right')}>
          喜欢
        </ActionButton>
        <ActionButton onClick={() => handleSwipe('left')}>
          不喜欢
        </ActionButton>
      </LikeDislikeButtons>
    </SwipeContainer>
  );
}

export default SwipeView; 