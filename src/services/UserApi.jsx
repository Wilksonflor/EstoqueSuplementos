import axios from "axios";

// Cria uma instância do Axios específica para usuários
const UserApi = axios.create({
  baseURL: "http://localhost:3000/api/usuarios", 
});

// Intercepta requisições para adicionar o token de autenticação (se necessário)
UserApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken"); 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Adiciona o token no cabeçalho
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default UserApi;
