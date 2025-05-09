import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar token de autenticação
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = async (username: string, password: string) => {
  const response = await api.post('/auth/login', { username, password });
  return response.data; // Retorne o token e as informações do usuário
};

export const register = async (username: string, password: string) => {
  const response = await api.post('/auth/register', { username, password });
  return response.data;
};

export const getHome = async () => {
  const response = await api.get('/user/home');
  return response.data;
};

export const registerStudent = async (formData: FormData) => {
  const response = await api.post('/user/register-student', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

export const getStudents = async () => {
  const response = await api.get('/admin/students');
  return response.data;
};

export const approveStudent = async (id: number) => {
  const response = await api.post(`/admin/approve-student/${id}`);
  return response.data;
};

export default api;