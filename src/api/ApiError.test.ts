import type { ApiProblem } from '@/types/api';
import { ApiError } from './ApiError';

describe('ApiError', () => {
  it('uses the problem detail as message', () => {
    const problem: ApiProblem = {
      title: 'Conflict',
      status: 409,
      detail: 'Der Benutzername ist bereits vergeben.',
    };

    const error = new ApiError(409, problem);

    expect(error.message).toBe('Der Benutzername ist bereits vergeben.');
    expect(error.status).toBe(409);
    expect(error.problem).toBe(problem);
  });

  it('falls back to a generic message without problem', () => {
    const error = new ApiError(500);

    expect(error.message).toBe('API request failed with status 500');
    expect(error.problem).toBeUndefined();
  });

  it('is an instance of Error and ApiError', () => {
    const error = new ApiError(404);

    expect(error).toBeInstanceOf(Error);
    expect(error).toBeInstanceOf(ApiError);
    expect(error.name).toBe('ApiError');
  });
});
