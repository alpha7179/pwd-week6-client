# 🍽️ PWD Week 6 - Ajou Campus Foodmap Client

아주대학교 캠퍼스 푸드맵 프론트엔드 - React 기반 웹 애플리케이션

> 📝 **이 README만으로 완전한 클라이언트를 구축할 수 있습니다!**  
> 모든 필요한 코드와 설정이 포함되어 있습니다.

## 📋 목차

- [프로젝트 소개](#-프로젝트-소개)
- [기술 스택](#-기술-스택)
- [주요 기능](#-주요-기능)
- [페이지 구성](#-페이지-구성)
- [컴포넌트 구조](#-컴포넌트-구조)
- [상태 관리](#-상태-관리)
- [설치 및 실행](#-설치-및-실행)
- [환경 변수 설정](#-환경-변수-설정)
- [프로젝트 구조](#-프로젝트-구조)
- [전체 코드 구현](#-전체-코드-구현)
- [배포](#-배포)

## 🎯 프로젝트 소개

아주대학교 주변 맛집을 탐색하고 제보할 수 있는 웹 애플리케이션입니다.

### 핵심 기능
- 🔐 **완전한 인증 시스템** (로컬 + OAuth)
- 🍜 **맛집 탐색 및 상세 정보**
- 🔥 **인기 맛집 랭킹**
- 📝 **맛집 제보 시스템**
- 👑 **관리자 대시보드**
- 📱 **반응형 디자인**

## 🛠️ 기술 스택

### **프론트엔드 프레임워크**
- **React** 19.1.1 - 최신 React 기능 활용
- **Vite** 7.1.2 - 초고속 개발 서버 및 빌드 도구
- **React Router** 7.9.1 - 최신 라우팅 시스템

### **상태 관리**
- **Context API** - 인증 상태 전역 관리
- **TanStack Query** 5.87.4 - 서버 상태 캐싱 및 동기화
- **React Hook Form** 7.62.0 - 성능 최적화된 폼 관리

### **스타일링 & UI**
- **Emotion** 11.14.0 - CSS-in-JS 스타일링
- **React Icons** 5.5.0 - 아이콘 라이브러리
- **React Spinners** 0.17.0 - 로딩 애니메이션
- **React Toastify** 11.0.5 - 사용자 피드백 알림

### **HTTP 통신**
- **Axios** 1.12.1 - HTTP 클라이언트
- **쿠키 기반 인증** - withCredentials 설정

### **개발 도구**
- **ESLint** - 코드 품질 관리
- **Vite Plugin React SWC** - 빠른 개발 빌드

## 🚀 주요 기능

### 🔐 **인증 시스템**
- **로컬 인증**: 이메일/비밀번호 기반 회원가입/로그인
- **OAuth 인증**: Google, Naver 소셜 로그인
- **자동 로그인**: 페이지 새로고침 시 세션 복원
- **보호된 라우트**: 로그인 필요 페이지 자동 보호
- **권한별 UI**: 관리자/일반 사용자 구분된 인터페이스

### 🍜 **맛집 탐색**
- **전체 맛집 목록**: 카테고리별 필터링
- **상세 정보**: 위치, 가격대, 추천 메뉴, 평점
- **인기 랭킹**: TOP 5 인기 맛집 표시
- **반응형 카드**: 모바일/데스크톱 최적화

### 📝 **맛집 제보**
- **제보 폼**: 로그인한 사용자만 제보 가능
- **자동 정보 입력**: 제보자 정보 자동 완성
- **실시간 검증**: React Hook Form 기반 폼 검증

### 👑 **관리자 기능**
- **사용자 관리**: 권한 변경, 사용자 목록
- **제보 관리**: 제보 승인/거부
- **데이터 관리**: 맛집 정보 수정/삭제

### 📱 **사용자 경험**
- **반응형 디자인**: 모바일 퍼스트 디자인
- **로딩 상태**: 스마트 로딩 스피너
- **에러 처리**: 친화적인 에러 메시지
- **토스트 알림**: 성공/실패 피드백
## 📄 페이지 구성

### **공개 페이지**
- **홈페이지** (`/`) - 서비스 소개 및 주요 기능
- **맛집 목록** (`/list`) - 전체 맛집 목록 및 필터링
- **맛집 상세** (`/restaurant/:id`) - 개별 맛집 상세 정보
- **인기 맛집** (`/popular`) - TOP 5 인기 맛집 랭킹
- **로그인** (`/login`) - 사용자 로그인
- **회원가입** (`/register`) - 새 사용자 등록

### **보호된 페이지** (로그인 필요)
- **대시보드** (`/dashboard`) - 사용자 개인 대시보드
- **맛집 제보** (`/submit`) - 새 맛집 제보

### **관리자 페이지** (관리자 권한 필요)
- **관리자 패널** (`/admin`) - 사용자 및 데이터 관리
- **제보 관리** (`/submissions`) - 제보된 맛집 승인/거부

## 🧩 컴포넌트 구조

### **레이아웃 컴포넌트**
- **Header**: 네비게이션 메뉴, 로그인 상태 표시
- **Footer**: 저작권 정보
- **NotFound**: 404 에러 페이지

### **인증 컴포넌트**
- **ProtectedRoute**: 로그인 필요 페이지 보호
- **AdminRoute**: 관리자 권한 페이지 보호
- **LoginPage**: 로그인 폼 및 OAuth 버튼
- **RegisterPage**: 회원가입 폼

### **맛집 관련 컴포넌트**
- **RestaurantCard**: 개별 맛집 카드
- **RestaurantList**: 맛집 목록 표시
- **PopularRestaurants**: 인기 맛집 랭킹
- **SubmitRestaurant**: 맛집 제보 폼

### **공통 컴포넌트**
- **LoadingSpinner**: 로딩 애니메이션
- **ErrorMessage**: 에러 메시지 표시
- **Toast**: 알림 메시지

## 🔄 상태 관리

### **전역 상태 (Context API)**
```javascript
// AuthContext - 인증 상태 관리
{
  user: Object,           // 현재 로그인한 사용자 정보
  isAuthenticated: Boolean, // 로그인 상태
  isLoading: Boolean,     // 인증 상태 확인 중
  login: Function,        // 로그인 함수
  register: Function,     // 회원가입 함수
  logout: Function,       // 로그아웃 함수
  isAdmin: Function       // 관리자 권한 확인
}
```

### **서버 상태 (TanStack Query)**
```javascript
// 맛집 데이터 캐싱
useQuery(['restaurants'], restaurantAPI.getRestaurants)
useQuery(['popular-restaurants'], restaurantAPI.getPopularRestaurants)
useQuery(['restaurant', id], () => restaurantAPI.getRestaurantById(id))

// 제보 데이터 관리
useMutation(submissionAPI.createSubmission)
```

### **로컬 상태 (useState)**
- 폼 입력 상태
- UI 상태 (모달, 드롭다운 등)
- 로딩 상태

## 🎨 스타일링

### **Emotion CSS-in-JS**
```javascript
// 스타일드 컴포넌트 예시
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;
```

### **전역 스타일**
- **GlobalStyles.jsx**: 전역 CSS 리셋 및 기본 스타일
- **반응형 디자인**: 모바일 퍼스트 접근
- **다크 모드**: 추후 구현 예정

### **테마 시스템**
```javascript
const theme = {
  colors: {
    primary: '#667eea',
    secondary: '#764ba2',
    success: '#4caf50',
    error: '#ff4757',
    warning: '#ffa726'
  },
  breakpoints: {
    mobile: '768px',
    tablet: '1024px',
    desktop: '1200px'
  }
};
```

## 🚀 배포

### **Vercel 배포**
1. Vercel에 GitHub 저장소 연결
2. 환경 변수 설정
3. 자동 배포 활성화

### **배포 설정 (vercel.json)**
```json
{
  "framework": "vite",
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### **환경 변수 (Vercel)**
```
VITE_API_URL=https://your-server-domain.render.com
VITE_CLIENT_URL=https://your-client-domain.vercel.app
```

## 🛠️ 개발 가이드

### **사용 가능한 스크립트**
```bash
npm run dev          # 개발 서버 시작
npm run build        # 프로덕션 빌드
npm run build:dev    # 개발 모드 빌드
npm run build:prod   # 프로덕션 모드 빌드
npm run preview      # 빌드 결과 미리보기
npm run lint         # ESLint 검사
```

### **개발 규칙**
1. **컴포넌트 명명**: PascalCase 사용
2. **파일 구조**: 기능별 폴더 분리
3. **스타일링**: Emotion styled-components 사용
4. **상태 관리**: Context API + TanStack Query
5. **에러 처리**: try-catch + 사용자 친화적 메시지

### **코드 스타일**
- **ESLint**: 코드 품질 검사
- **Prettier**: 코드 포맷팅 (권장)
- **함수형 컴포넌트**: React Hooks 사용
- **TypeScript**: 추후 마이그레이션 예정

### **성능 최적화**
- **React.memo**: 불필요한 리렌더링 방지
- **useMemo/useCallback**: 연산 최적화
- **Code Splitting**: 라우트별 코드 분할
- **Image Optimization**: 이미지 최적화

## 🔧 API 통신

### **Axios 설정**
```javascript
// 기본 설정
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,  // 쿠키 포함
  timeout: 10000
});

// 요청 인터셉터
api.interceptors.request.use(config => {
  console.log('API 요청:', config.url);
  return config;
});

// 응답 인터셉터
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      // 세션 만료 시 로그인 페이지로 리다이렉트
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
```

### **API 서비스 구조**
```javascript
export const restaurantAPI = {
  getRestaurants: () => api.get('/api/restaurants'),
  getPopularRestaurants: () => api.get('/api/restaurants/popular'),
  getRestaurantById: (id) => api.get(`/api/restaurants/${id}`),
  createRestaurant: (data) => api.post('/api/restaurants', data),
  updateRestaurant: (id, data) => api.put(`/api/restaurants/${id}`, data),
  deleteRestaurant: (id) => api.delete(`/api/restaurants/${id}`)
};
```

## 🚀 설치 및 실행

### 1. 프로젝트 생성
```bash
mkdir pwd-week6-client
cd pwd-week6-client
npm create vite@latest . -- --template react
```

### 2. 의존성 설치
```bash
npm install @emotion/react @emotion/styled @tanstack/react-query axios react-hook-form react-icons react-router-dom react-spinners react-toastify
```### 3.
 package.json 설정
```json
{
  "name": "pwd-week6-client",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "build:dev": "vite build --mode development",
    "build:prod": "vite build --mode production",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "@emotion/react": "^11.14.0",
    "@emotion/styled": "^11.14.1",
    "@tanstack/react-query": "^5.87.4",
    "axios": "^1.12.1",
    "react": "^19.1.1",
    "react-dom": "^19.1.1",
    "react-hook-form": "^7.62.0",
    "react-icons": "^5.5.0",
    "react-router-dom": "^7.9.1",
    "react-spinners": "^0.17.0",
    "react-toastify": "^11.0.5"
  },
  "devDependencies": {
    "@eslint/js": "^9.33.0",
    "@types/react": "^19.1.10",
    "@types/react-dom": "^19.1.7",
    "@vitejs/plugin-react-swc": "^4.0.0",
    "eslint": "^9.33.0",
    "eslint-plugin-react-hooks": "^5.2.0",
    "eslint-plugin-react-refresh": "^0.4.20",
    "globals": "^16.3.0",
    "vite": "^7.1.2"
  }
}
```

## ⚙️ 환경 변수 설정

`.env` 파일을 생성하고 다음 내용을 추가하세요:

```env
# 서버 API URL
VITE_API_URL=http://localhost:5000

# 클라이언트 URL (OAuth 리다이렉트용)
VITE_CLIENT_URL=http://localhost:5173

# 개발 환경 설정
NODE_ENV=development
```

## 📁 프로젝트 구조

다음 폴더 구조를 생성하세요:

```
pwd-week6-client/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/
│   │   └── react.svg
│   ├── components/
│   │   ├── AdminRoute.jsx
│   │   ├── Header.jsx
│   │   ├── NotFound.jsx
│   │   ├── PopularRestaurants.jsx
│   │   ├── ProtectedRoute.jsx
│   │   ├── RestaurantCard.jsx
│   │   ├── RestaurantList.jsx
│   │   └── SubmitRestaurant.jsx
│   ├── config/
│   │   └── environment.js
│   ├── contexts/
│   │   └── AuthContext.jsx
│   ├── pages/
│   │   ├── DashboardPage.jsx
│   │   ├── DetailPage.jsx
│   │   ├── HomePage.jsx
│   │   ├── ListPage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── PopularPage.jsx
│   │   ├── RegisterPage.jsx
│   │   └── SubmitPage.jsx
│   ├── services/
│   │   ├── api.jsx
│   │   └── authApi.js
│   ├── styles/
│   │   └── GlobalStyles.jsx
│   ├── utils/
│   │   └── connectionTest.js
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .env
├── .gitignore
├── index.html
├── package.json
├── vercel.json
└── vite.config.js
```

폴더 생성 명령어:
```bash
mkdir -p src/{components,config,contexts,pages,services,styles,utils}
```## 💻 전체 코드 
구현

### 1. 메인 진입점 (src/main.jsx)

```jsx
// src/main.jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

### 2. 메인 앱 컴포넌트 (src/App.jsx)

```jsx
// src/App.jsx
import React, { useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import { testConnection } from './utils/connectionTest';

// Context
import { AuthProvider } from './contexts/AuthContext';

// Pages
import HomePage from './pages/HomePage';
import ListPage from './pages/ListPage';
import DetailPage from './pages/DetailPage';
import PopularPage from './pages/PopularPage';
import SubmitPage from './pages/SubmitPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';

// Components
import Header from './components/Header';
import NotFound from './components/NotFound';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';

// Styles
import GlobalStyles from './styles/GlobalStyles';

// React Query Client 생성
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5분
      retry: 1,
    },
  },
});

function App() {
  // 앱 시작 시 연결 테스트
  useEffect(() => {
    testConnection();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <HashRouter>
          <GlobalStyles />
          <div className="app">
            <Header />
            <main className="main-content">
              <Routes>
                {/* 공개 라우트 */}
                <Route path="/" element={<HomePage />} />
                <Route path="/list" element={<ListPage />} />
                <Route path="/restaurant/:id" element={<DetailPage />} />
                <Route path="/popular" element={<PopularPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                
                {/* 보호된 라우트 (로그인 필요) */}
                <Route 
                  path="/dashboard" 
                  element={
                    <ProtectedRoute>
                      <DashboardPage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/submit" 
                  element={
                    <ProtectedRoute>
                      <SubmitPage />
                    </ProtectedRoute>
                  } 
                />
                
                {/* 404 페이지 */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <footer className="footer">
              <p>© 2025 Ajou Campus Foodmap | Made with React</p>
            </footer>
          </div>
          <ToastContainer 
            position="bottom-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </HashRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
```

### 3. 환경 설정 (src/config/environment.js)

```javascript
// src/config/environment.js
const getEnvironmentConfig = () => {
  const isDevelopment = import.meta.env.DEV;
  const isProduction = import.meta.env.PROD;
  
  const config = {
    development: {
      apiUrl: 'http://localhost:5000',
      clientUrl: 'http://localhost:5173',
    },
    production: {
      apiUrl: import.meta.env.VITE_API_URL || 'https://pwd-week6-server.onrender.com',
      clientUrl: import.meta.env.VITE_CLIENT_URL || 'https://pwd-week6-client.vercel.app',
    }
  };

  if (import.meta.env.VITE_API_URL) {
    config.development.apiUrl = import.meta.env.VITE_API_URL;
    config.production.apiUrl = import.meta.env.VITE_API_URL;
  }

  if (import.meta.env.VITE_CLIENT_URL) {
    config.development.clientUrl = import.meta.env.VITE_CLIENT_URL;
    config.production.clientUrl = import.meta.env.VITE_CLIENT_URL;
  }

  return isDevelopment ? config.development : config.production;
};

const env = getEnvironmentConfig();

export default env;
export const { apiUrl, clientUrl } = env;
```### 4. 인
증 컨텍스트 (src/contexts/AuthContext.jsx)

```jsx
// src/contexts/AuthContext.jsx
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

  const login = async (email, password) => {
    try {
      const response = await authAPIService.login({ email, password });
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

  const register = async (name, email, password) => {
    try {
      const response = await authAPIService.register({ name, email, password });
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
```

### 5. API 서비스 (src/services/api.jsx)

```jsx
// src/services/api.jsx
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
    const errorMessage = error.response?.data?.message || error.message || '네트워크 오류가 발생했습니다.';
    console.error('API error:', errorMessage);
    
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
```### 6.
 인증 API 서비스 (src/services/authApi.js)

```javascript
// src/services/authApi.js
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

  // OAuth 로그인 URL 생성 (직접 URL 반환)
  getGoogleLoginUrl: () => `${API_BASE_URL}/api/auth/google`,
  getNaverLoginUrl: () => `${API_BASE_URL}/api/auth/naver`,

  // OAuth 로그인 URL 생성 (API 응답 형태로 반환 - LoginPage/RegisterPage 호환)
  getGoogleAuthUrl: async () => {
    return { data: { url: `${API_BASE_URL}/api/auth/google` } };
  },
  getNaverAuthUrl: async () => {
    return { data: { url: `${API_BASE_URL}/api/auth/naver` } };
  },

  // 관리자 전용 API
  getAllUsers: async () => {
    return await api.get('/api/users/all');
  },

  changeUserType: async (userId, userType) => {
    return await api.put(`/api/users/${userId}/type`, { userType });
  },
};

// 기존 api 인스턴스를 authAPI로도 내보내기 (하위 호환성)
export { api as authAPI };
```

### 7. 연결 테스트 유틸리티 (src/utils/connectionTest.js)

```javascript
// src/utils/connectionTest.js
import axios from 'axios';
import { apiUrl } from '../config/environment';

// 서버 연결 상태 테스트
export const testConnection = async () => {
  try {
    console.log('🔍 서버 연결 테스트 시작...');
    
    // 1. 헬스체크
    const healthResponse = await axios.get(`${apiUrl}/health`);
    console.log('✅ 서버 헬스체크 성공:', healthResponse.data);
    
    // 2. API 엔드포인트 테스트
    const apiResponse = await axios.get(`${apiUrl}/api/restaurants`);
    console.log('✅ API 엔드포인트 테스트 성공:', apiResponse.data);
    
    return {
      success: true,
      message: '서버 연결이 정상입니다.',
      data: {
        health: healthResponse.data,
        api: apiResponse.data
      }
    };
  } catch (error) {
    console.error('❌ 서버 연결 실패:', error);
    return {
      success: false,
      message: '서버 연결에 실패했습니다.',
      error: error.message
    };
  }
};

// 특정 엔드포인트 테스트
export const testEndpoint = async (endpoint) => {
  try {
    const response = await axios.get(`${apiUrl}${endpoint}`);
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
};
```

### 8. 전역 스타일 (src/styles/GlobalStyles.jsx)

```jsx
// src/styles/GlobalStyles.jsx
import { Global, css } from '@emotion/react';

const GlobalStyles = () => (
  <Global
    styles={css`
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
          'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
          sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        background-color: #f8f9fa;
        color: #333;
        line-height: 1.6;
      }

      .app {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
      }

      .main-content {
        flex: 1;
        padding: 2rem 1rem;
        max-width: 1200px;
        margin: 0 auto;
        width: 100%;
      }

      .footer {
        background: #333;
        color: white;
        text-align: center;
        padding: 1rem;
        margin-top: auto;
      }

      .loading {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: 200px;
        gap: 1rem;
      }

      .error {
        color: #ff4757;
        text-align: center;
        padding: 2rem;
        background: #fff5f5;
        border: 1px solid #fed7d7;
        border-radius: 8px;
        margin: 1rem 0;
      }

      a {
        color: #667eea;
        text-decoration: none;
      }

      a:hover {
        text-decoration: underline;
      }

      button {
        cursor: pointer;
        border: none;
        border-radius: 8px;
        font-size: 1rem;
        transition: all 0.3s ease;
      }

      button:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }

      input, textarea, select {
        font-family: inherit;
        font-size: 1rem;
      }

      @media (max-width: 768px) {
        .main-content {
          padding: 1rem 0.5rem;
        }
      }
    `}
  />
);

export default GlobalStyles;
```### 9. 보
호된 라우트 컴포넌트 (src/components/)

#### ProtectedRoute (src/components/ProtectedRoute.jsx)
```jsx
// src/components/ProtectedRoute.jsx
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

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  // 로딩 중일 때
  if (loading) {
    return (
      <LoadingContainer>
        <ClipLoader color="#667eea" size={50} />
        <LoadingText>인증 상태를 확인하는 중...</LoadingText>
      </LoadingContainer>
    );
  }

  // 인증되지 않은 경우 로그인 페이지로 리다이렉트
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 인증된 경우 자식 컴포넌트 렌더링
  return children;
};

export default ProtectedRoute;
```

#### AdminRoute (src/components/AdminRoute.jsx)
```jsx
// src/components/AdminRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
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

const AccessDeniedContainer = styled.div`
  text-align: center;
  padding: 4rem 1rem;
`;

const AccessDeniedTitle = styled.h1`
  color: #ff4757;
  margin-bottom: 1rem;
`;

const AccessDeniedMessage = styled.p`
  color: #666;
  margin-bottom: 2rem;
`;

const AdminRoute = ({ children }) => {
  const { isAuthenticated, loading, isAdmin } = useAuth();

  // 로딩 중일 때
  if (loading) {
    return (
      <LoadingContainer>
        <ClipLoader color="#667eea" size={50} />
        <LoadingText>권한을 확인하는 중...</LoadingText>
      </LoadingContainer>
    );
  }

  // 인증되지 않은 경우 로그인 페이지로 리다이렉트
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // 관리자 권한이 없는 경우 접근 거부
  if (!isAdmin()) {
    return (
      <AccessDeniedContainer>
        <AccessDeniedTitle>🚫 접근 권한이 없습니다</AccessDeniedTitle>
        <AccessDeniedMessage>
          이 페이지는 관리자만 접근할 수 있습니다.
        </AccessDeniedMessage>
      </AccessDeniedContainer>
    );
  }

  // 관리자 권한이 있는 경우 자식 컴포넌트 렌더링
  return children;
};

export default AdminRoute;
```