import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
export const AuthContext = createContext();
import UserService from "../services/UsuariosServices";
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (credentials) => {
    try {
      const response = await UserService.login(credentials);
      const { token, use } = response;
      localStorage.setItem("authToken", response.token);
      const decodedUser = jwtDecode(response.token);
      setUser({ ...decodedUser, ...user });
    } catch (error) {
      console.error("Erro ao fazer login:", error.message);
      throw new Error("Não foi possível realizar o login.");
    }
  };

  const logout = () => {
    try {
      localStorage.removeItem("authToken");
      setUser(null);
      console.log("Usuário deslogado com sucesso.");
    } catch (error) {
      console.error("Erro ao fazer logout:", error.message);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      try {
        const decodedUser = jwtDecode(token);
        setUser(decodedUser);
      } catch (error) {
        console.error("Erro ao decodificar o token:", error.message);
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};
