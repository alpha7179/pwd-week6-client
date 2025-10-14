/* src/pages/PopularPage.jsx */
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import PopularRestaurants from '../components/PopularRestaurants';
import { restaurantAPI } from '../services/api';
import { ClipLoader } from 'react-spinners';

function PopularPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['popular-restaurants'],
    queryFn: restaurantAPI.getPopularRestaurants,
  });

  if (isLoading) {
    return (
      <div className="loading">
        <ClipLoader color="#667eea" size={50} />
        <p>인기 맛집을 불러오는 중...</p>
      </div>
    );
  }

  if (error) {
    return <div className="error">에러가 발생했습니다: {error.message}</div>;
  }

  return <PopularRestaurants restaurants={data?.data || []} />;
}

export default PopularPage;