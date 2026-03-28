import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_URL });

api.interceptors.request.use((config) => {
  const token = Cookies.get('accessToken');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      Cookies.remove('accessToken');
      window.location.href = '/login';
    }
    return Promise.reject(err);
  },
);

export default api;
