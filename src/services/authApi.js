// 기존 api.jsx에서 api 인스턴스를 가져와서 사용
import api from './api';
import { apiUrl } from '../config/environment';

// 서버 URL 설정 (환경별 자동 감지)
const API_BASE_URL = apiUrl;

// 인증 관련 API 함수들
export const authAPIService = {
  // 회원가입
  register: async (userData) => {
    return await api.post('/api/auth/register', userData);
  },

  // 로그인
  login: async (credentials) => {
    return await api.post('/api/auth/login', credentials);
  },

  // 로그아웃
  logout: async () => {
    return await api.post('/api/auth/logout');
  },

  // 현재 사용자 정보 조회
  getCurrentUser: async () => {
    return await api.get('/api/auth/me');
  },

  // OAuth 로그인 URL 생성
  getGoogleLoginUrl: () => `${API_BASE_URL}/api/auth/google`,
  getNaverLoginUrl: () => `${API_BASE_URL}/api/auth/naver`,

  // 관리자 전용 API
  // 모든 사용자 목록 조회
  getAllUsers: async () => {
    return await api.get('/api/users/all');
  },

  // 사용자 유형 변경
  changeUserType: async (userId, userType) => {
    return await api.put(`/api/users/${userId}/type`, { userType });
  },
};

// 기존 api 인스턴스를 authAPI로도 내보내기 (하위 호환성)
export { api as authAPI };