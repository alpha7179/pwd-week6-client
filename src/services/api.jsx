//src/services/api.jsx
import axios from 'axios';

// Axios 인스턴스 생성
const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com', // 실습용 가짜 API
  timeout: 10000,
});

// 요청 인터셉터
api.interceptors.request.use(
  (config) => {
    console.log('API 요청:', config.url);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API 에러:', error);
    return Promise.reject(error);
  }
);

// API 함수들
export const restaurantAPI = {
  // 맛집 목록 가져오기 (가짜 데이터)
  getRestaurants: async () => {
    // 실제로는 백엔드 API를 호출하지만, 실습용으로 가짜 데이터 반환
    return {
      data: [
        {
          id: 1,
          name: "송림식당",
          category: "한식",
          location: "경기 수원시 영통구 월드컵로193번길 21 원천동",
          priceRange: "7,000-13,000원",
          rating: 4.99,
          description: "맛있는 한식 맛집입니다.",
          recommendedMenu: ["순두부", "김치찌개","소불고기", "제육볶음"],
          likes: 0,
          image: "https://mblogthumb-phinf.pstatic.net/MjAyMjA2MTJfODEg/MDAxNjU0OTYzNTM3MjE1.1BfmrmOsz_B6DBHAnhQSs6qfNIDnssofR-DrzMfigIIg.JHHDheG6ifJjtfKUqLss_mLXWFE9fNJ5BmepNUVXSOog.PNG.cary63/image.png?type=w966"
        },
        {
          id: 2,
          name: "별미떡볶이",
          category: "분식",
          location: "경기 수원시 영통구 아주로 42 아카데미빌딩",
          priceRange: "7,000-10,000원",
          rating: 4.98,
          description: "바삭한 튀김과 함께하는 행복한 한입",
          recommendedMenu: ["떡볶이", "튀김", "순대", "어묵"],
          likes: 0,
          image: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNTA4MTJfMjcg%2FMDAxNzU0OTQ5ODk1Mjg0.GR6i3mNpJJXyqQrozGEJ65InCDBGlEmxc0aCeVHncJgg.sduDPX67J8hhoGxq4vLohpS4dXk1w-706dQLPfVs1iwg.JPEG%2Foutput%25A3%25DF1564208956.jpg"
        },
        {
          id: 3,
          name: "Sogo",
          category: "일식",
          location: "경기 수원시 영통구 월드컵로193번길 7",
          priceRange: "10,000-16,000원",
          rating: 4.89,
          description: "일식 맛집, 구 허수아비,",
          recommendedMenu: ["냉모밀", "김치돈까스나베", "코돈부르"],
          likes: 0,
          image: "https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20190707_63%2F1562462598960nPDMy_JPEG%2FW7iKQEhTMzCF3flC1t0pzgzF.jpeg.jpg"
        }
      ]
    };
  },

  // 맛집 상세 정보 가져오기
  getRestaurantById: async (id) => {
    const restaurants = await restaurantAPI.getRestaurants();
    const restaurant = restaurants.data.find(r => r.id === parseInt(id));
    return { data: restaurant };
  },

  // 인기 맛집 가져오기
  getPopularRestaurants: async () => {
    const restaurants = await restaurantAPI.getRestaurants();
    const sorted = [...restaurants.data].sort((a, b) => b.rating - a.rating);
    return { data: sorted.slice(0, 5) };
  }
};

export default api;