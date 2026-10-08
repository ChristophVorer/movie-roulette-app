import type { ApiProblem } from '@/types/api';

export class ApiError extends Error {
  constructor(
    public status: number,
    public problem?: ApiProblem,
  ) {
    super(problem?.detail ?? `API request failed with status ${status}`);

    this.name = 'ApiError';
  }
}
