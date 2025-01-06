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
import { Avatar, Button, Layout, Menu, Space, theme } from "antd";
import { Outlet, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./MainLayout.css";

const { Header, Sider, Content } = Layout;

export const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { logout, user } = useAuth();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{ backgroundColor: "#085924" }}
      >
        <div
          className="demo-logo-vertical"
          style={{
            height: 64,
            background: "rgba(255, 255, 255, 0.2)",
            margin: "16px",
          }}
        />
        <Menu
          mode="inline"
          theme="light"
          className="menu"
          items={[
            {
              key: "1",
              icon: <ShoppingCartOutlined className="menu-icon" />,
              label: (
                <Link to="/produtos" className="menu-link">
                  Produtos
                </Link>
              ),
            },
            {
              key: "2",
              icon: <TagsOutlined className="menu-icon" />,
              label: (
                <Link to="/categorias" className="menu-link">
                  Categorias
                </Link>
              ),
            },
            {
              key: "3",
              icon: <UserOutlined className="menu-icon" />,
              label: (
                <Link to="/usuarios" className="menu-link">
                  Usuários
                </Link>
              ),
            },
            {
              key: "4",
              icon: <LogoutOutlined className="logout-icon" />,
              label: (
                <Link to="/login" onClick={logout} className="logout-link">
                  Sair
                </Link>
              ),
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            paddingLeft: "16px",
          }}
          className="headerContainer"
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
          <h2 style={{ marginLeft: "16px" }}>Gerenciamento de estoque</h2>
          <div className="avatar">
            <Space className="avatar-space">
              <Avatar icon={<UserOutlined />} />
              <span>{user?.nome}</span>
              <span>{user?.email}</span>
            </Space>
          </div>
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
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
