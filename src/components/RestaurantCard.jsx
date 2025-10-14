/* src/components/RestaurantCard.jsx */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { FaStar, FaHeart, FaMapMarkerAlt, FaWonSign } from 'react-icons/fa';
import { toast } from 'react-toastify';

// Styled Components는 그대로 유지
const Card = styled.div`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const CardContent = styled.div`
  padding: 1.5rem;
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const CardTitle = styled.h3`
  font-size: 1.25rem;
  color: #333;
`;

const CategoryBadge = styled.span`
  background: #667eea;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 15px;
  font-size: 0.875rem;
`;

const InfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0.5rem 0;
  color: #666;
  font-size: 0.9rem;
`;

const ActionRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #eee;
`;

// $liked로 변경 (transient prop)
const LikeButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: 2px solid ${props => props.$liked ? '#ff4757' : '#ddd'};
  background: ${props => props.$liked ? '#ff4757' : 'white'};
  color: ${props => props.$liked ? 'white' : '#666'};
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s;
  
  &:hover {
    border-color: #ff4757;
    background: #ff4757;
    color: white;
  }
`;

const DetailLink = styled(Link)`
  color: #667eea;
  font-weight: 600;
  
  &:hover {
    text-decoration: underline;
  }
`;

function RestaurantCard({ restaurant }) {
  // State 초기화
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(restaurant.likes || 0);

  // 컴포넌트 마운트 시 LocalStorage에서 데이터 복원
  useEffect(() => {
    // 1. 좋아요 여부 복원
    try {
      const likedRestaurants = JSON.parse(
        localStorage.getItem('likedRestaurants') || '[]'
      );
      if (likedRestaurants.includes(restaurant.id)) {
        setLiked(true);
      }

      // 2. 좋아요 수 복원
      const savedLikes = JSON.parse(
        localStorage.getItem('restaurantLikes') || '{}'
      );
      if (savedLikes[restaurant.id] !== undefined) {
        setLikes(savedLikes[restaurant.id]);
      }
    } catch (error) {
      console.error('LocalStorage 읽기 오류:', error);
    }
  }, [restaurant.id, restaurant.likes]);

  const handleLike = (e) => {
    // 이벤트 전파 방지 (중요!)
    e.preventDefault();
    e.stopPropagation();

    try {
      // 새로운 상태 계산
      const newLikedState = !liked;
      const newLikesCount = newLikedState 
        ? likes + 1 
        : Math.max(0, likes - 1); // 음수 방지

      // State 업데이트
      setLiked(newLikedState);
      setLikes(newLikesCount);

      // LocalStorage 업데이트 - 좋아요 여부
      const likedRestaurants = JSON.parse(
        localStorage.getItem('likedRestaurants') || '[]'
      );
      
      if (newLikedState) {
        // 좋아요 추가
        if (!likedRestaurants.includes(restaurant.id)) {
          likedRestaurants.push(restaurant.id);
        }
        toast.success(`${restaurant.name}을(를) 좋아요했습니다! ❤️`);
      } else {
        // 좋아요 취소
        const index = likedRestaurants.indexOf(restaurant.id);
        if (index > -1) {
          likedRestaurants.splice(index, 1);
        }
        toast.info('좋아요를 취소했습니다.');
      }
      
      localStorage.setItem('likedRestaurants', JSON.stringify(likedRestaurants));

      // LocalStorage 업데이트 - 좋아요 수
      const restaurantLikes = JSON.parse(
        localStorage.getItem('restaurantLikes') || '{}'
      );
      restaurantLikes[restaurant.id] = newLikesCount;
      localStorage.setItem('restaurantLikes', JSON.stringify(restaurantLikes));

      // 디버깅용 로그
      console.log('좋아요 업데이트:', {
        restaurantId: restaurant.id,
        liked: newLikedState,
        likes: newLikesCount
      });

    } catch (error) {
      console.error('좋아요 처리 오류:', error);
      toast.error('좋아요 처리 중 오류가 발생했습니다.');
    }
  };

  return (
    <Card>
      <CardImage 
        src={restaurant.image || 'https://via.placeholder.com/300'} 
        alt={restaurant.name} 
      />
      <CardContent>
        <CardHeader>
          <CardTitle>{restaurant.name}</CardTitle>
          <CategoryBadge>{restaurant.category}</CategoryBadge>
        </CardHeader>
        
        <InfoRow>
          <FaMapMarkerAlt /> {restaurant.location}
        </InfoRow>
        <InfoRow>
          <FaWonSign /> {restaurant.priceRange}
        </InfoRow>
        <InfoRow>
          <FaStar color="gold" /> {restaurant.rating}/5.0
        </InfoRow>
        
        <p style={{ margin: '1rem 0', color: '#666' }}>
          {restaurant.description}
        </p>
        
        <ActionRow>
          <LikeButton 
            $liked={liked}  // $ prefix 추가
            onClick={handleLike}
            type="button"  // 명시적 type 지정
          >
            <FaHeart /> {likes}
          </LikeButton>
          <DetailLink to={`/restaurant/${restaurant.id}`}>
            자세히 보기 →
          </DetailLink>
        </ActionRow>
      </CardContent>
    </Card>
  );
}

export default RestaurantCard;