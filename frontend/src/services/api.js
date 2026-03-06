import axios from 'axios';
import { getToken } from './auth.js';

const api = axios.create({
  baseURL: 'http://localhost:5000/api/v1'
});

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const registerUser = (payload) => api.post('/auth/register', payload);

export const loginUser = (payload) => api.post('/auth/login', payload);

export const getTasks = () => api.get('/tasks');

export const createTask = (payload) => api.post('/tasks', payload);

export const updateTask = (id, payload) => api.put(`/tasks/${id}`, payload);

export const deleteTask = (id) => api.delete(`/tasks/${id}`);

export default api;

