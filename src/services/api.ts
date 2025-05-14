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
  if (token && !config.url?.includes('/user/register') && 
      !config.url?.includes('/user/register-student') && 
      !config.url?.includes('/auth/')) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = async (email: string, password: string) => {
  const response = await api.post('/auth/login', { email, password });
  return response.data; // Espera { token, user }
};

export const register = async (name: string, email: string, password: string) => {
  const formData = new FormData();
  formData.append('name', name);
  formData.append('email', email);
  formData.append('password', password);

  const response = await api.post('/user/register', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data; // Espera { token, user }
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