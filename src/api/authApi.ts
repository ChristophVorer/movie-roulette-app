import { AuthResponse, LoginRequest, RegisterRequest } from '@/types/auth';
import { apiClient } from './apiClient';

const apiPrefix = '/authentication';

export function login(data: LoginRequest) {
  return apiClient<AuthResponse>(`${apiPrefix}/login`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export function register(data: RegisterRequest) {
  return apiClient<AuthResponse>(`${apiPrefix}/register`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}
