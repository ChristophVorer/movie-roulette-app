import type { ApiProblem } from '@/types/api';
import { apiClient } from './apiClient';
import { ApiError } from './ApiError';

const originalFetch = globalThis.fetch;
const fetchMock = jest.fn();

function mockResponse(status: number, body?: unknown): Response {
  return {
    ok: status >= 200 && status < 300,
    status,
    json:
      body === undefined
        ? jest.fn().mockRejectedValue(new SyntaxError('Unexpected end of JSON'))
        : jest.fn().mockResolvedValue(body),
  } as unknown as Response;
}

beforeEach(() => {
  fetchMock.mockReset();
  globalThis.fetch = fetchMock;
});

afterAll(() => {
  globalThis.fetch = originalFetch;
});

describe('apiClient', () => {
  it('calls the full URL with JSON content type and passes options', async () => {
    fetchMock.mockResolvedValue(mockResponse(200, {}));

    await apiClient('/movies', { method: 'POST', body: '{"a":1}' });

    expect(fetchMock).toHaveBeenCalledWith('http://api.test/movies', {
      method: 'POST',
      body: '{"a":1}',
      headers: { 'Content-Type': 'application/json' },
    });
  });

  it('merges custom headers with the default content type', async () => {
    fetchMock.mockResolvedValue(mockResponse(200, {}));

    await apiClient('/me', { headers: { Authorization: 'Bearer token' } });

    expect(fetchMock).toHaveBeenCalledWith('http://api.test/me', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer token',
      },
    });
  });

  it('returns the parsed JSON body on success', async () => {
    fetchMock.mockResolvedValue(mockResponse(200, { id: 42, title: 'Heat' }));

    const result = await apiClient<{ id: number; title: string }>('/movies/42');

    expect(result).toEqual({ id: 42, title: 'Heat' });
  });

  it('throws an ApiError with the problem details on error responses', async () => {
    const problem: ApiProblem = {
      title: 'Conflict',
      status: 409,
      detail: 'Die E-Mail-Adresse ist bereits vergeben.',
    };
    fetchMock.mockResolvedValue(mockResponse(409, problem));

    const request = apiClient('/authentication/register');

    await expect(request).rejects.toBeInstanceOf(ApiError);
    await expect(request).rejects.toMatchObject({
      status: 409,
      problem,
      message: 'Die E-Mail-Adresse ist bereits vergeben.',
    });
  });

  it('throws an ApiError without problem when the error body is not JSON', async () => {
    fetchMock.mockResolvedValue(mockResponse(502));

    const request = apiClient('/movies');

    await expect(request).rejects.toBeInstanceOf(ApiError);
    await expect(request).rejects.toMatchObject({
      status: 502,
      problem: undefined,
      message: 'API request failed with status 502',
    });
  });
});

describe('apiClient configuration', () => {
  it('throws on import when the API URL is not configured', () => {
    const originalUrl = process.env.EXPO_PUBLIC_API_URL;
    delete process.env.EXPO_PUBLIC_API_URL;

    try {
      jest.isolateModules(() => {
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        expect(() => require('./apiClient')).toThrow('API URL is not defined');
      });
    } finally {
      process.env.EXPO_PUBLIC_API_URL = originalUrl;
    }
  });
});
