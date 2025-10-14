/* src/pages/HomePage.jsx */
import React from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { FaMapMarkedAlt, FaUtensils, FaStar } from 'react-icons/fa';

const HomeContainer = styled.div`
  text-align: center;
  padding: 3rem 1rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #333;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 3rem;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const Card = styled(Link)`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
  
  &:hover {
    transform: translateY(-5px);
  }
  
  svg {
    font-size: 3rem;
    margin-bottom: 1rem;
    color: #667eea;
  }
  
  h3 {
    margin-bottom: 0.5rem;
  }
  
  p {
    color: #666;
  }
`;

function HomePage() {
  return (
    <HomeContainer>
      <Title>우리 학교 맛집을 찾아보세요!</Title>
      <Subtitle>캠퍼스 주변 숨은 맛집들을 한눈에</Subtitle>
      
      <CardGrid>
        <Card to="/list">
          <FaMapMarkedAlt />
          <h3>맛집 둘러보기</h3>
          <p>카테고리별로 맛집을 찾아보세요</p>
        </Card>
        
        <Card to="/popular">
          <FaStar />
          <h3>인기 맛집 TOP</h3>
          <p>이번 주 가장 인기있는 맛집</p>
        </Card>
        
        <Card to="/submit">
          <FaUtensils />
          <h3>맛집 제보하기</h3>
          <p>새로운 맛집을 알려주세요</p>
        </Card>
      </CardGrid>
    </HomeContainer>
  );
}

export default HomePage;