import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { getToken } from '../auth/auth.service';

export const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});


httpClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getToken();
    if (token) {
      config.headers.set("Authorization", `Bearer ${token}`);
    }
    return config;
  },
  (error) => Promise.reject(error)
)

httpClient.interceptors.response.use(
  function (response: AxiosResponse) {
    return response;
  },
  function (error) {
    return Promise.reject(error)
  }
)