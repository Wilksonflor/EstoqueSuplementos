import React from "react";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Form, Input, Button, Alert, Card, Spin, Divider } from "antd";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import CustomButton from "../../components/Buttons/CustomButton";
const Login = () => {
  const { login, user, loading } = useContext(AuthContext);
  const [loadingForm, setLoadingForm] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoadingForm(true);
    try {
      await login(values.email, values.password);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoadingForm(false);
    }
  };

  useEffect(() => {
    if (user && !loading) {
      navigate("/");
    }
  }, [user, loading, navigate]);

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
            <CustomButton
              // type="primary"
              htmlType="submit"
              block
              loading={loadingForm}
            >
              {loadingForm ? "Carregando...." : "Entrar"}
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
