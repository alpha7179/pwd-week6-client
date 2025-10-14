import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { FaUser, FaEnvelope, FaCalendarAlt, FaShieldAlt, FaSignOutAlt, FaCog, FaClipboardList } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-toastify';

const DashboardContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`;

const Welcome = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 2rem;
  border-radius: 12px;
  margin-bottom: 2rem;
  text-align: center;
  
  h1 {
    margin-bottom: 0.5rem;
    font-size: 2rem;
  }
  
  p {
    opacity: 0.9;
    font-size: 1.1rem;
  }
`;

const UserCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`;

const CardTitle = styled.h2`
  margin-bottom: 1.5rem;
  color: #333;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const UserInfo = styled.div`
  display: grid;
  gap: 1rem;
`;

const InfoRow = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  background: #f8f9ff;
  border-radius: 8px;
  gap: 1rem;
  
  svg {
    color: #667eea;
    font-size: 1.2rem;
  }
`;

const InfoLabel = styled.span`
  font-weight: 600;
  color: #666;
  min-width: 80px;
`;

const InfoValue = styled.span`
  color: #333;
  flex: 1;
`;

const ProviderBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.25rem 0.75rem;
  background: ${props => {
    switch (props.provider) {
      case 'google':
        return '#db4437';
      case 'naver':
        return '#03c75a';
      case 'admin':
        return '#ff6b35';
      default:
        return '#667eea';
    }
  }};
  color: white;
  border-radius: 15px;
  font-size: 0.875rem;
  font-weight: 600;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-top: 2rem;
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  
  &.primary {
    background: #667eea;
    color: white;
    
    &:hover {
      background: #5a67d8;
    }
  }
  
  &.danger {
    background: #ff4757;
    color: white;
    
    &:hover {
      background: #ff3742;
    }
  }
`;

const UserAvatar = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  margin: 0 auto 1rem;
  display: block;
  border: 3px solid #667eea;
`;

const AvatarPlaceholder = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  font-size: 2rem;
  font-weight: bold;
  color: white;
`;

function DashboardPage() {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    toast.success('로그아웃되었습니다.');
    navigate('/', { replace: true });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getProviderDisplayName = (provider) => {
    switch (provider) {
      case 'google':
        return '구글';
      case 'naver':
        return '네이버';
      case 'local':
        return '이메일';
      default:
        return provider;
    }
  };

  if (!user) {
    return <div>사용자 정보를 불러오는 중...</div>;
  }

  return (
    <DashboardContainer>
      <Welcome>
        <h1>환영합니다, {user.name}님!</h1>
        <p>Ajou Campus Foodmap에 오신 것을 환영합니다.</p>
      </Welcome>

      <UserCard>
        <CardTitle>
          <FaUser /> 프로필 정보
        </CardTitle>
        
        {user.avatar ? (
          <UserAvatar src={user.avatar} alt={user.name} />
        ) : (
          <AvatarPlaceholder>
            {user.name.charAt(0).toUpperCase()}
          </AvatarPlaceholder>
        )}
        
        <UserInfo>
          <InfoRow>
            <FaUser />
            <InfoLabel>이름:</InfoLabel>
            <InfoValue>{user.name}</InfoValue>
          </InfoRow>
          
          <InfoRow>
            <FaEnvelope />
            <InfoLabel>이메일:</InfoLabel>
            <InfoValue>{user.email}</InfoValue>
          </InfoRow>
          
          <InfoRow>
            <FaShieldAlt />
            <InfoLabel>계정 종류:</InfoLabel>
            <InfoValue>
              <ProviderBadge provider={user.provider}>
                {getProviderDisplayName(user.provider)} 계정
              </ProviderBadge>
            </InfoValue>
          </InfoRow>
          
          <InfoRow>
            <FaShieldAlt />
            <InfoLabel>사용자 유형:</InfoLabel>
            <InfoValue>
              <ProviderBadge provider={user.userType === 'admin' ? 'admin' : 'user'}>
                {user.userType === 'admin' ? '관리자' : '일반 사용자'}
              </ProviderBadge>
            </InfoValue>
          </InfoRow>
          
          <InfoRow>
            <FaCalendarAlt />
            <InfoLabel>가입일:</InfoLabel>
            <InfoValue>{formatDate(user.createdAt)}</InfoValue>
          </InfoRow>
        </UserInfo>

        <ActionButtons>
          <ActionButton 
            className="primary"
            onClick={() => navigate('/list')}
          >
            맛집 둘러보기
          </ActionButton>
          
          <ActionButton 
            className="primary"
            onClick={() => navigate('/submit')}
          >
            맛집 제보하기
          </ActionButton>
          
          {isAdmin() && (
            <>
              <ActionButton 
                className="primary"
                onClick={() => navigate('/admin')}
              >
                <FaCog /> 관리자 페이지
              </ActionButton>
              
              <ActionButton 
                className="primary"
                onClick={() => navigate('/submissions')}
              >
                <FaClipboardList /> 제출 관리
              </ActionButton>
            </>
          )}
          
          <ActionButton 
            className="danger"
            onClick={handleLogout}
          >
            <FaSignOutAlt /> 로그아웃
          </ActionButton>
        </ActionButtons>
      </UserCard>
    </DashboardContainer>
  );
}

export default DashboardPage;