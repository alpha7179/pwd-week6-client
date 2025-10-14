//src/services/api.jsx
import axios from 'axios';
import { apiUrl } from '../config/environment';

// 서버 URL 설정 (환경별 자동 감지)
const API_BASE_URL = apiUrl.endsWith('/') ? apiUrl.slice(0, -1) : apiUrl;

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // 쿠키/세션을 포함하여 요청
  timeout: 10000,
});

// 공개 조회 전용 인스턴스: 교차 출처 시 자격증명(쿠키) 제외
const publicApi = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: false,
  timeout: 10000,
});

api.interceptors.request.use(
  (config) => {
    console.log('API request:', config.method?.toUpperCase(), `${config.baseURL}${config.url}`);
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // 서버에서 온 에러 메시지가 있으면 사용, 없으면 기본 메시지
    const errorMessage = error.response?.data?.message || error.message || '네트워크 오류가 발생했습니다.';
    console.error('API error:', errorMessage);
    
    // 에러 객체에 사용자 친화적인 메시지 추가
    error.userMessage = errorMessage;
    return Promise.reject(error);
  }
);

export const restaurantAPI = {
  getRestaurants: async () => {
    const response = await publicApi.get('/api/restaurants', { withCredentials: false });
    return response.data;
  },

  createRestaurant: async (payload) => {
    const response = await api.post('/api/restaurants', payload);
    return response.data;
  },

  updateRestaurant: async (id, payload) => {
    const response = await api.put(`/api/restaurants/${id}`, payload);
    return response.data;
  },

  deleteRestaurant: async (id) => {
    const response = await api.delete(`/api/restaurants/${id}`);
    return response.status;
  },

  getRestaurantById: async (id) => {
    const response = await publicApi.get(`/api/restaurants/${id}`, { withCredentials: false });
    return response.data;
  },

  getPopularRestaurants: async () => {
    const response = await publicApi.get('/api/restaurants/popular', { withCredentials: false });
    return response.data;
  },
};

export const submissionAPI = {
  createSubmission: async (payload) => {
    const response = await api.post('/api/submissions', payload);
    return response.data;
  },
  listSubmissions: async (status) => {
    const response = await api.get('/api/submissions', { params: { status } });
    return response.data;
  },
  updateSubmission: async (id, payload) => {
    const response = await api.put(`/api/submissions/${id}`, payload);
    return response.data;
  },
  deleteSubmission: async (id) => {
    const response = await api.delete(`/api/submissions/${id}`);
    return response.status;
  },
};

export default api;