/* src/pages/DetailPage.jsx */
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import styled from '@emotion/styled';
import { restaurantAPI } from '../services/api';
import { FaStar, FaMapMarkerAlt, FaDollarSign, FaArrowLeft } from 'react-icons/fa';
import { ClipLoader } from 'react-spinners';

const DetailContainer = styled.div`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
  padding: 0.5rem 1rem;
  border: none;
  background: #f5f5f5;
  border-radius: 8px;
  cursor: pointer;
  
  &:hover {
    background: #e0e0e0;
  }
`;

const RestaurantImage = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 12px;
  margin-bottom: 2rem;
`;

const InfoSection = styled.div`
  margin: 2rem 0;
`;

const MenuList = styled.ul`
  list-style: none;
  padding: 0;
  
  li {
    padding: 0.5rem 0;
    border-bottom: 1px solid #f5f5f5;
  }
`;

function DetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, error } = useQuery({
    queryKey: ['restaurant', id],
    queryFn: () => restaurantAPI.getRestaurantById(id),
  });

  if (isLoading) {
    return (
      <div className="loading">
        <ClipLoader color="#667eea" size={50} />
      </div>
    );
  }

  if (error || !data?.data) {
    return <div className="error">맛집을 찾을 수 없습니다.</div>;
  }

  const restaurant = data.data;

  return (
    <DetailContainer>
      <BackButton onClick={() => navigate(-1)}>
        <FaArrowLeft /> 뒤로 가기
      </BackButton>
      
      <h1>{restaurant.name}</h1>
      
      <RestaurantImage src={restaurant.image} alt={restaurant.name} />
      
      <InfoSection>
        <h3>기본 정보</h3>
        <p><FaMapMarkerAlt /> {restaurant.location}</p>
        <p><FaDollarSign /> {restaurant.priceRange}</p>
        <p><FaStar color="gold" /> {restaurant.rating}/5.0</p>
      </InfoSection>
      
      <InfoSection>
        <h3>소개</h3>
        <p>{restaurant.description}</p>
      </InfoSection>
      
      <InfoSection>
        <h3>추천 메뉴</h3>
        <MenuList>
          {restaurant.recommendedMenu.map((menu, index) => (
            <li key={index}>{menu}</li>
          ))}
        </MenuList>
      </InfoSection>
    </DetailContainer>
  );
}

export default DetailPage;