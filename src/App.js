import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import styled from 'styled-components';
import Home from './components/Home';
import Gallery from './components/Gallery';
import SwipeView from './components/SwipeView';

const AppContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  color: #fff;
  font-family: 'Inter', sans-serif;
`;

function App() {
  const [favorites, setFavorites] = useState([]);

  const addToFavorites = (photo) => {
    if (!favorites.some(fav => fav.id === photo.id)) {
      setFavorites([...favorites, photo]);
    }
  };

  return (
    <AppContainer>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route 
            path="/swipe" 
            element={<SwipeView favorites={favorites} addToFavorites={addToFavorites} />} 
          />
          <Route 
            path="/gallery" 
            element={<Gallery favorites={favorites} />} 
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AppContainer>
  );
}

export default App; 