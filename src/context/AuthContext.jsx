import React, { createContext, useState, useContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    setLoading(true);
    // Simulação de uma chamada de API para login
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === "admin@example.com" && password === "password") {
          setUser({ email });
          resolve();
        } else {
          reject(new Error("Credenciais inválidas"));
        }
        setLoading(false);
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);