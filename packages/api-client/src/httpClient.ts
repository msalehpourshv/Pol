import { getAccessToken } from '@pol/auth-core';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

const config = {
  baseUrl: '/api',
};

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = await getAccessToken();
  const headers = new Headers(options.headers || {});
  headers.set('Content-Type', 'application/json');
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const res = await fetch(`${config.baseUrl}${path}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    throw new Error(`API error ${res.status}`);
  }

  return (await res.json()) as T;
}

export async function httpGet<T>(path: string): Promise<T> {
  return request<T>(path, { method: 'GET' });
}

export async function httpPost<T>(path: string, body: unknown): Promise<T> {
  return request<T>(path, { method: 'POST', body: JSON.stringify(body) });
}

export { config as apiClientConfig };
