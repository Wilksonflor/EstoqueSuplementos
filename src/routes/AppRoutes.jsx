// import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MainLayout } from "../layouts/MainLayout";
// import { AuthProvider } from "../context/AuthContext";
import Dashboard from "../pages/Dashboard/Dashboard";
import Produtos from "../pages/Produtos/Produtos";
import Categorias from "../pages/Categorias/Categorias";
import Login from "../pages/Login/Login";
import ProtectedRoute from "./ProtectedRoute";
const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="produtos" element={<Produtos />} />
          <Route path="categorias" element={<Categorias />} />
          {/* <Route path="usuarios" element={<Usuarios />} /> */}
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
