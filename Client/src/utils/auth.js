// src/utils/auth.js
export const getAuthToken = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }
    return token;
  };
  
  export const handleAuthError = (error) => {
    if (error.message.includes('authentication') || error.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    throw error;
  };