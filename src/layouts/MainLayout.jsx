import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DashboardOutlined,
  ShoppingCartOutlined,
  TagsOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { Outlet, Link } from "react-router-dom";
const { Header, Sider, Content } = Layout;

export const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div
          className="demo-logo-vertical"
          style={{
            height: 64,
            background: "rgba(255, 255, 255, 0.2)",
            margin: "16px",
          }}
        />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <DashboardOutlined />,
              label: <Link to="/">Dashboard</Link>,
            },
            {
              key: "2",
              icon: <ShoppingCartOutlined />,
              label: <Link to="/produtos">Produtos</Link>,
            },
            {
              key: "3",
              icon: <TagsOutlined />,
              label: <Link to="/categorias">Categorias</Link>,
            },
            {
              key: "4",
              icon: <UserOutlined />,
              label: <Link to="/usuarios">Usuários</Link>,
            },
          ]}
        />
        <Menu.Item key="5" icon={<LogoutOutlined />}>
          <Button type="text" onClick={logout}>
            Sair
          </Button>
        </Menu.Item>

        {/* Button de sair */}
      </Sider>

      {/* Main Layout */}
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: "flex",
            alignItems: "center",
            paddingLeft: "16px",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <h2 style={{ marginLeft: "16px" }}>Sistema de Estoque</h2>
        </Header>

        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {/* Renderiza as páginas correspondentes às rotas */}
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
