import axios, { AxiosRequestConfig } from 'axios';

export class HttpClient {
  constructor(private baseUrl: string, private getToken?: () => string | null) {}

  private buildConfig(config?: AxiosRequestConfig): AxiosRequestConfig {
    const token = this.getToken?.();
    return {
      ...config,
      headers: {
        ...(config?.headers ?? {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    };
  }

  get<T>(url: string, config?: AxiosRequestConfig) {
    return axios
      .get<T>(`${this.baseUrl}${url}`, this.buildConfig(config))
      .then(r => r.data);
  }

  post<T>(url: string, body: any, config?: AxiosRequestConfig) {
    return axios
      .post<T>(`${this.baseUrl}${url}`, body, this.buildConfig(config))
      .then(r => r.data);
  }

  // put, delete, ...
}