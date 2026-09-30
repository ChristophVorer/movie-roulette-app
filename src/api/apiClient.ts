import { ApiProblem } from '@/types/api';
import { ApiError } from './ApiError';

const API_URL = process.env.EXPO_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error('API URL is not defined in the environment variables!');
}

type ApiOptions = RequestInit;

export async function apiClient<T>(
  endpoint: string,
  options?: ApiOptions,
): Promise<T> {
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  if (!response.ok) {
    let problem: ApiProblem | undefined;

    try {
      problem = (await response.json()) as ApiProblem;
    } catch {
      problem = undefined;
    }

    throw new ApiError(response.status, problem);
  }

  return response.json() as Promise<T>;
}
