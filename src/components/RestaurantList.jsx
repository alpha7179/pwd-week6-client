/* src/components/RestaurantList.jsx */
import React from 'react';
import styled from '@emotion/styled';
import RestaurantCard from './RestaurantCard';

const ListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
`;

const NoResults = styled.p`
  text-align: center;
  padding: 2rem;
  color: #666;
`;

function RestaurantList({ restaurants }) {
  if (restaurants.length === 0) {
    return <NoResults>해당 카테고리에 맛집이 없습니다.</NoResults>;
  }

  return (
    <ListContainer>
      {restaurants.map(restaurant => (
        <RestaurantCard key={restaurant.id} restaurant={restaurant} />
      ))}
    </ListContainer>
  );
}

export default RestaurantList;