import { createContext, useContext, useState, useEffect } from "react";
import UserService from "../services/UsuariosServices";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = async (credentials) => {
    setLoading(true);
    try {
      const data = await UserService.login(credentials);
      console.log("Enviando credenciais", credentials);
      console.log("data", data);

      localStorage.setItem("authToken", data.token);
      setUser(data.user); // Atualiza o estado
    } catch (error) {
      console.error("Erro ao fazer login:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await UserService.logout();
      localStorage.removeItem("authToken");
      setUser(null);
    } catch (error) {
      console.error("Erro ao fazer logout:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("Usuário atualizado no contexto:", user);
  }, [user]); // Monitora mudanças no estado `user`

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para acessar o AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};
