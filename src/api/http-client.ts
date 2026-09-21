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
    const statusCode = error.response.status;
    const errorMessage = error.response.data.message || 'An error occurred';
    const isLoginRequest = error.config?.url?.includes('/auth/login');

    if (statusCode === 401) {
      console.error(isLoginRequest?"Mauvais identifiants" : "Token absent, invalide ou expiré")
    } else if (statusCode === 403) {
      console.error("Action Interdite")
    } else {
      console.error(`Error ${statusCode}: ${errorMessage}`)
    }
    return Promise.reject(error)
  }
)
