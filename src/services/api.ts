import axios from 'axios';
import { 
  LoginRequest, 
  LoginResponse, 
  RegisterRequest, 
  RegisterResponse, 
  Student, 
  StudentCreateRequest,
  ProcessStudentRequest,
  RejectStudentRequest
} from '../types';

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

// Autenticação
export const login = async (credentials: LoginRequest): Promise<LoginResponse> => {
  const response = await api.post('/login', credentials);
  return response.data;
};

export const register = async (userData: RegisterRequest): Promise<RegisterResponse> => {
  const response = await api.post('/register', userData);
  return response.data;
};

// Gestão de Alunos
export const createStudent = async (studentData: StudentCreateRequest): Promise<Student> => {
  const response = await api.post('/alunos/cadastrar', studentData);
  return response.data;
};

export const getAllStudents = async (): Promise<Student[]> => {
  const response = await api.get('/alunos');
  return response.data;
};

export const getPendingStudents = async (): Promise<Student[]> => {
  const response = await api.get('/alunos/solicitacoes/pendentes');
  return response.data;
};

export const getActiveStudents = async (): Promise<Student[]> => {
  const response = await api.get('/alunos/ativos');
  return response.data;
};

export const getStudentById = async (id: number): Promise<Student> => {
  const response = await api.get(`/alunos/${id}`);
  return response.data;
};

export const getStudentByEmail = async (email: string): Promise<Student> => {
  const response = await api.get(`/alunos/email/${email}`);
  return response.data;
};

export const approveStudent = async (id: number): Promise<Student> => {
  const response = await api.put(`/alunos/${id}/aprovar`);
  return response.data;
};

export const rejectStudent = async (id: number, reason: RejectStudentRequest): Promise<Student> => {
  const response = await api.put(`/alunos/${id}/rejeitar`, reason);
  return response.data;
};

export const processStudent = async (id: number, processData: ProcessStudentRequest): Promise<Student> => {
  const response = await api.put(`/alunos/${id}/processar`, processData);
  return response.data;
};

export default api;