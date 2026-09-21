import axios from 'axios';

export const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});


httpClient.interceptors.request.use(
  (config) => {
    console.log("interceptor avant l'envoi de la requête");
    return config;
  },
  (error) => Promise.reject(error)
)