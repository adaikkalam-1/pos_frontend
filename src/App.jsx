import React from "react";
import AdminLayout from "./pages/AdminLayout";
import { Navigate, Route, Routes } from "react-router-dom";
import Sale from "./pages/sale/Sale";
import Products from "./pages/products/Products";
import Reports from "./pages/reports/Reports";

import Dashboard from "./pages/dashboard/Dashboard";
import Login from "./pages/auth/Login";
import { useSelector } from "react-redux";

const App = () => {
  const token = useSelector((state) => state.theme.accessToken);
  const ProtectedRoute = ({ children }) => {
    if (!token) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<Dashboard />} />
          <Route path="/sale" element={<Sale />} />
          <Route path="/products" element={<Products />} />
          <Route path="/reports" element={<Reports />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
