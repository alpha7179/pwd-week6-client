import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ClipLoader } from 'react-spinners';
import styled from '@emotion/styled';

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
  gap: 1rem;
`;

const LoadingText = styled.p`
  color: #666;
  font-size: 1.1rem;
`;

/**
 * 로그인이 필요한 페이지를 보호하는 컴포넌트
 * @param {Object} props
 * @param {React.ReactNode} props.children - 보호할 컴포넌트
 * @param {string} props.redirectTo - 로그인되지 않은 경우 리다이렉트할 경로 (기본: '/login')
 */
function ProtectedRoute({ children, redirectTo = '/login' }) {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  // 인증 상태를 확인하는 중
  if (loading) {
    return (
      <LoadingContainer>
        <ClipLoader color="#667eea" size={50} />
        <LoadingText>로그인 상태를 확인하는 중...</LoadingText>
      </LoadingContainer>
    );
  }

  // 로그인되지 않은 경우 로그인 페이지로 리다이렉트
  // 현재 위치를 state로 전달하여 로그인 후 원래 페이지로 돌아올 수 있도록 함
  if (!isAuthenticated) {
    return (
      <Navigate 
        to={redirectTo} 
        state={{ from: location }} 
        replace 
      />
    );
  }

  // 로그인된 경우 보호된 컴포넌트 렌더링
  return children;
}

export default ProtectedRoute;