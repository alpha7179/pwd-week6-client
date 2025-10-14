import React, { createContext, useState, useContext, useEffect } from 'react';
import { authAPIService } from '../services/authApi';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth는 AuthProvider 내에서 사용되어야 합니다.');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // 앱 시작 시 현재 로그인 상태 확인
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      setLoading(true);
      const response = await authAPIService.getCurrentUser();
      if (response.data.success) {
        setUser(response.data.data.user);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.log('로그인 상태 확인 실패:', error);
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    try {
      const response = await authAPIService.login(credentials);
      if (response.data.success) {
        setUser(response.data.data.user);
        setIsAuthenticated(true);
        return { success: true, message: response.data.message };
      }
    } catch (error) {
      const message = error.response?.data?.message || '로그인에 실패했습니다.';
      return { success: false, message };
    }
  };

  const register = async (userData) => {
    try {
      const response = await authAPIService.register(userData);
      if (response.data.success) {
        setUser(response.data.data.user);
        setIsAuthenticated(true);
        return { success: true, message: response.data.message };
      }
    } catch (error) {
      const message = error.response?.data?.message || '회원가입에 실패했습니다.';
      return { success: false, message };
    }
  };

  const logout = async () => {
    try {
      await authAPIService.logout();
    } catch (error) {
      console.log('로그아웃 요청 실패:', error);
    } finally {
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  // 관리자 권한 확인 함수
  const isAdmin = () => {
    return user && user.userType === 'admin';
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    register,
    logout,
    checkAuthStatus,
    isAdmin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};