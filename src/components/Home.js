import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem;
  text-align: center;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
`;

const Title = styled.h1`
  font-size: 3.5rem;
  margin-bottom: 2rem;
  background: linear-gradient(45deg, #00dbde, #fc00ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: glow 2s ease-in-out infinite alternate;
  
  @keyframes glow {
    from {
      text-shadow: 0 0 10px #00dbde, 0 0 20px #fc00ff;
    }
    to {
      text-shadow: 0 0 20px #00dbde, 0 0 30px #fc00ff;
    }
  }
`;

const StartButton = styled.button`
  padding: 1rem 2rem;
  font-size: 1.2rem;
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid #00dbde;
  color: #fff;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(5px);
  
  &:hover {
    background: rgba(0, 219, 222, 0.2);
    transform: scale(1.05);
    box-shadow: 0 0 20px rgba(0, 219, 222, 0.4);
  }
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 2rem;
  animation: fadeIn 1s ease-in;
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

function Home() {
  const navigate = useNavigate();

  return (
    <HomeContainer>
      <Title>有款游戏 越玩越年轻</Title>
      <Subtitle>点击开始，探索精彩世界</Subtitle>
      <StartButton onClick={() => navigate('/swipe')}>
        开始游戏
      </StartButton>
    </HomeContainer>
  );
}

export default Home; 