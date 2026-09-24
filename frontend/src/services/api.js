import axios from 'axios';

// Get base API URL from environment variable or proxy
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000
});

// API helper methods for F1 Review Hub
export const getHealth = () => api.get('/health').then(res => res.data);

export const getTeams = () => api.get('/teams').then(res => res.data);
export const getTeamById = (id) => api.get(`/teams/${id}`).then(res => res.data);

export const getDrivers = () => api.get('/drivers').then(res => res.data);
export const getDriverById = (id) => api.get(`/drivers/${id}`).then(res => res.data);

export const getCars = () => api.get('/cars').then(res => res.data);
export const getCarById = (id) => api.get(`/cars/${id}`).then(res => res.data);

export const getRaces = () => api.get('/races').then(res => res.data);
export const getRaceById = (id) => api.get(`/races/${id}`).then(res => res.data);

export const getDriverStandings = () => api.get('/standings/drivers').then(res => res.data);
export const getConstructorStandings = () => api.get('/standings/constructors').then(res => res.data);

export const getReviews = (category) => {
  const url = category && category !== 'All' ? `/reviews?category=${category}` : '/reviews';
  return api.get(url).then(res => res.data);
};
export const getReviewById = (id) => api.get(`/reviews/${id}`).then(res => res.data);
export const createReview = (reviewData) => api.post('/reviews', reviewData).then(res => res.data);

export default api;
