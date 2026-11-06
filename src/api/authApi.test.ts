import type { AuthResponse, LoginRequest, RegisterRequest } from '@/types/auth';
import { apiClient } from './apiClient';
import { login, register } from './authApi';

jest.mock('./apiClient');

const apiClientMock = jest.mocked(apiClient);

const authResponse: AuthResponse = { accessToken: 'test-token' };

beforeEach(() => {
  apiClientMock.mockReset();
  apiClientMock.mockResolvedValue(authResponse);
});

describe('authApi', () => {
  it('posts login credentials to the login endpoint', async () => {
    const data: LoginRequest = {
      email: 'christoph@example.com',
      password: 'MeinSicheresPasswort123!',
    };

    const result = await login(data);

    expect(apiClientMock).toHaveBeenCalledWith('/authentication/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    expect(result).toEqual(authResponse);
  });

  it('posts registration data to the register endpoint', async () => {
    const data: RegisterRequest = {
      username: 'christoph',
      email: 'christoph@example.com',
      password: 'MeinSicheresPasswort123!',
    };

    const result = await register(data);

    expect(apiClientMock).toHaveBeenCalledWith('/authentication/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    expect(result).toEqual(authResponse);
  });

  it('propagates errors from the API client', async () => {
    const error = new Error('Network error');
    apiClientMock.mockRejectedValue(error);

    await expect(
      login({ email: 'christoph@example.com', password: 'falsch' }),
    ).rejects.toBe(error);
  });
});
