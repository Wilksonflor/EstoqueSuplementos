import React from "react";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Form, Input, Button, Alert, Card, Spin, Divider, Space } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import CustomButton from "../../components/Buttons/CustomButton";
import "./Login.css";

const Login = () => {
  const { login, user, loading } = useContext(AuthContext);
  const [loadingForm, setLoadingForm] = useState(false);
  // const [hasRedirected, setHasRedirected] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const onFinish = async (values) => {
    setLoadingForm(true);
    try {
      const loggedInUser = await login({
        email: values.email,
        senha: values.password,
      });
      if (loggedInUser) {
        navigate("/"); // Redirecione após o login bem-sucedido
      }
    } catch (error) {
      setError(
        error.response?.data?.error || "Erro ao fazer login. Tente novamente."
      );
    } finally {
      setLoadingForm(false);
    }
  };

  useEffect(() => {
    if (user && location.pathname === "/login") {
      navigate("/");
    }
  }, [user, location.pathname, navigate]);

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

        <Space className="footerLogin">
          <a className="forgetPass">Esqueceu a senha?</a>
          <a className="register">Cadastre-se</a>
        </Space>
      </Card>
    </div>
  );
};

export default Login;
