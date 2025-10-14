/* src/components/PopularRestaurants.jsx */
import React from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { FaTrophy, FaStar } from 'react-icons/fa';

const Container = styled.div`
  padding: 2rem 0;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2rem;
  color: #333;
`;

const RankingList = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1rem;
`;

const RankingItem = styled(Link)`
  display: flex;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #f5f5f5;
  transition: background 0.3s;
  
  &:hover {
    background: #f9f9f9;
  }
  
  &:last-child {
    border-bottom: none;
  }
`;

const RankBadge = styled.div`
  font-size: 1.5rem;
  width: 50px;
  text-align: center;
  
  svg {
    font-size: 1.5rem;
  }
`;

const RestaurantInfo = styled.div`
  flex: 1;
  margin-left: 1rem;
  
  h3 {
    margin-bottom: 0.5rem;
    color: #333;
  }
  
  p {
    color: #666;
    font-size: 0.9rem;
  }
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #666;
`;

function PopularRestaurants({ restaurants }) {
  const getRankIcon = (rank) => {
    if (rank === 0) return <FaTrophy color="gold" />;
    if (rank === 1) return <FaTrophy color="silver" />;
    if (rank === 2) return <FaTrophy color="#CD7F32" />;
    return rank + 1;
  };

  return (
    <Container>
      <Title>🔥 이번 주 인기 TOP 5</Title>
      
      <RankingList>
        {restaurants.map((restaurant, index) => (
          <RankingItem key={restaurant.id} to={`/restaurant/${restaurant.id}`}>
            <RankBadge>{getRankIcon(index)}</RankBadge>
            <RestaurantInfo>
              <h3>{restaurant.name}</h3>
              <p>{restaurant.category} • {restaurant.location}</p>
            </RestaurantInfo>
            <Rating>
              <FaStar color="gold" />
              {restaurant.rating}
            </Rating>
          </RankingItem>
        ))}
      </RankingList>
    </Container>
  );
}

export default PopularRestaurants;