/* src/components/Header.jsx */
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import styled from '@emotion/styled';
import { FaHome, FaList, FaFire, FaPlus, FaUser, FaSignOutAlt, FaCrown } from 'react-icons/fa';
import { toast } from 'react-toastify';

const HeaderContainer = styled.header`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1rem;
`;

const HeaderTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const Logo = styled.h1`
  margin: 0;
  font-size: 1.5rem;
`;

const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 20px;
`;

const UserAvatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  font-weight: bold;
`;

const UserName = styled.span`
  font-size: 0.9rem;
`;

const AuthButtons = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const AuthButton = styled(Link)`
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  text-decoration: none;
  border-radius: 20px;
  font-size: 0.9rem;
  transition: background 0.3s;
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;

const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: rgba(255, 107, 107, 0.8);
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background 0.3s;
  
  &:hover {
    background: rgba(255, 107, 107, 1);
  }
`;

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
`;

const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  transition: background 0.3s;
  text-decoration: none;
  color: white;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
  
  &.active {
    background: rgba(255, 255, 255, 0.3);
  }
`;

const AdminBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.5rem;
  background: #ff6b6b;
  border-radius: 10px;
  font-size: 0.75rem;
  margin-left: 0.5rem;
`;

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout, isAdmin } = useAuth();

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('로그아웃되었습니다.');
      navigate('/');
    } catch (error) {
      toast.error('로그아웃 중 오류가 발생했습니다.');
    }
  };

  return (
    <HeaderContainer>
      <HeaderTop>
        <Logo>Ajou Campus Foodmap</Logo>
        
        <UserSection>
          {isAuthenticated ? (
            <>
              <UserInfo>
                <UserAvatar>
                  {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                </UserAvatar>
                <UserName>{user?.name}</UserName>
                {isAdmin() && (
                  <AdminBadge>
                    <FaCrown />
                    Admin
                  </AdminBadge>
                )}
              </UserInfo>
              <LogoutButton onClick={handleLogout}>
                <FaSignOutAlt />
                로그아웃
              </LogoutButton>
            </>
          ) : (
            <AuthButtons>
              <AuthButton to="/login">로그인</AuthButton>
              <AuthButton to="/register">회원가입</AuthButton>
            </AuthButtons>
          )}
        </UserSection>
      </HeaderTop>

      <Nav>
        <NavLink to="/" className={isActive('/')}>
          <FaHome /> Home
        </NavLink>
        <NavLink to="/list" className={isActive('/list')}>
          <FaList /> List
        </NavLink>
        <NavLink to="/popular" className={isActive('/popular')}>
          <FaFire /> Popular Top 5
        </NavLink>
        {isAuthenticated && (
          <NavLink to="/submit" className={isActive('/submit')}>
            <FaPlus /> Submit
          </NavLink>
        )}
        {isAuthenticated && (
          <NavLink to="/dashboard" className={isActive('/dashboard')}>
            <FaUser /> Dashboard
          </NavLink>
        )}
        {isAdmin() && (
          <NavLink to="/admin" className={isActive('/admin')}>
            <FaCrown /> Admin
          </NavLink>
        )}
      </Nav>
    </HeaderContainer>
  );
}

export default Header;