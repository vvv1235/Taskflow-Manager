import axios from 'axios';

// Configuração central do Axios para lidar com as chamadas de API para o Backend
const api = axios.create({
  baseURL: 'http://localhost:3001', // URL base onde o servidor NestJS está rodando
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache',
    'Expires': '0',
  },
});

// Interceptor para adicionar timestamp em todas as requisições GET, fulminando o cache do navegador
api.interceptors.request.use((config) => {
  if (config.method === 'get') {
    config.params = {
      ...config.params,
      _t: new Date().getTime(),
    };
  }
  return config;
});

export default api;
