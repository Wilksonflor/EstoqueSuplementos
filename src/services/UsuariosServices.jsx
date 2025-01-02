import UserApi from "./UserApi";

const UserService = {
  login: async (credentials) => {
    const response = await UserApi.post("/login", credentials);
    console.log("resposta do UsuarioService", response.data);
    return response.data;
  },

  register: async (userData) => {
    const response = await UserApi.post("/register", userData);
    return response.data;
  },

  getUserProfile: async () => {
    const response = await UserApi.get("/me"); // Endpoint para buscar perfil do usuário
    return response.data;
  },

  logout: async () => {
    const response = await UserApi.post("/logout");
    return response.data;
  },
};

export default UserService;
