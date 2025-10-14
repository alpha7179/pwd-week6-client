/* src/components/NotFound.jsx */
import React from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { FaExclamationTriangle } from 'react-icons/fa';

const Container = styled.div`
  text-align: center;
  padding: 4rem 1rem;
`;

const Icon = styled(FaExclamationTriangle)`
  font-size: 4rem;
  color: #ff6b6b;
  margin-bottom: 1rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const Message = styled.p`
  color: #666;
  margin-bottom: 2rem;
`;

const HomeLink = styled(Link)`
  display: inline-block;
  padding: 0.75rem 2rem;
  background: #667eea;
  color: white;
  border-radius: 8px;
  transition: background 0.3s;
  
  &:hover {
    background: #5a67d8;
  }
`;

function NotFound() {
  return (
    <Container>
      <Icon />
      <Title>404 - 페이지를 찾을 수 없습니다</Title>
      <Message>요청하신 페이지가 존재하지 않습니다.</Message>
      <HomeLink to="/">홈으로 돌아가기</HomeLink>
    </Container>
  );
}

export default NotFound;