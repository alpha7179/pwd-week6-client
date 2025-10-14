// 연결 테스트 유틸리티
import { apiUrl } from '../config/environment';

export const testConnection = async () => {
  try {
    console.log('🔍 Testing connection to:', apiUrl);
    
    const response = await fetch(`${apiUrl}/health`, {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log('✅ Connection successful:', data);
    return { success: true, data };
    
  } catch (error) {
    console.error('❌ Connection failed:', error);
    return { 
      success: false, 
      error: error.message,
      apiUrl 
    };
  }
};

export const testApiEndpoints = async () => {
  const endpoints = [
    '/api/restaurants',
    '/api/auth/me'
  ];
  
  const results = {};
  
  for (const endpoint of endpoints) {
    try {
      const response = await fetch(`${apiUrl}${endpoint}`, {
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
      });
      
      results[endpoint] = {
        status: response.status,
        ok: response.ok,
        statusText: response.statusText
      };
      
    } catch (error) {
      results[endpoint] = {
        error: error.message
      };
    }
  }
  
  console.log('🔍 API Endpoints Test Results:', results);
  return results;
};