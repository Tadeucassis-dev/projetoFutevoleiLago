export interface User {
  id: number;
  name: string;
  email: string;
  roles?: { name: string }[];
}

export interface Student {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  dataNascimento: string;
  idade: number;
  instituicaoEnsino: string;
  statusSolicitacao: 'PENDENTE' | 'APROVADO' | 'REJEITADO';
  dataSolicitacao: string;
  dataAprovacao?: string | null;
  motivoRejeicao?: string | null;
  ativo: boolean;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  id: number;
  name: string;
  email: string;
}

export interface StudentCreateRequest {
  nome: string;
  email: string;
  telefone: string;
  dataNascimento: string;
  idade: number;
  instituicaoEnsino: string;
}

export interface ProcessStudentRequest {
  aprovado: boolean;
  motivoRejeicao?: string;
}

export interface RejectStudentRequest {
  motivoRejeicao: string;
}