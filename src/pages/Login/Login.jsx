import React from "react";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Form, Input, Button, Alert, Card, Spin, Divider } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import CustomButton from "../../components/Buttons/CustomButton";
import "./Login.css";

const Login = () => {
  const { login, user, loading } = useContext(AuthContext);
  const [loadingForm, setLoadingForm] = useState(false);
  const [hasRedirected, setHasRedirected] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const onFinish = async (values) => {
    setLoadingForm(true);
    try {
      await login({
        email: values.email,
        senha: values.password,
      });
    } catch (error) {
      setError(
        error.response?.data?.error || "Erro ao fazer login. Tente novamente."
      );
    } finally {
      setLoadingForm(false);
    }
  };

  useEffect(() => {
    console.log("Estado do usuário:", user);
    console.log("Estado de carregamento:", loading);

    if (user && !loading && !hasRedirected && location.pathname === "/login") {
      setHasRedirected(true); // Marca como redirecionado antes de navegar
      navigate("/"); // Redireciona para a rota protegida
    }
  }, [user, loading, navigate, hasRedirected, location.pathname]);

  if (loading) {
    return <div className="loading-container">{<Spin size="large" />}</div>;
  }

  return (
    <div className="login-container">
      <Card title="Login" className="login-card">
        {error && <Alert message={error} type="error" showIcon />}
        <Form name="login" onFinish={onFinish} layout="vertical">
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
                type: "email",
                message: "Por favor, insira um email válido!",
              },
            ]}
          >
            <Input placeholder="Digite seu email" className="input" />
          </Form.Item>
          <Form.Item
            name="password"
            label="Senha"
            rules={[
              {
                required: true,
                message: "Por favor, insira sua senha!",
              },
            ]}
          >
            <Input.Password placeholder="Digite sua senha" className="input" />
          </Form.Item>
          <Form.Item>
            <CustomButton htmlType="submit" block loading={loadingForm}>
              {loadingForm ? "Entrando" : "Entrar"}
            </CustomButton>
          </Form.Item>
        </Form>
        <Divider></Divider>

        <div>
          <a>Esqueceu a senha?</a>
          <a>Cadastre-se</a>
        </div>
      </Card>
    </div>
  );
};

export default Login;
