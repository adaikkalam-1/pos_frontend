import React from "react";
import AdminLayout from "./pages/AdminLayout";
import { Route, Routes } from "react-router-dom";
import Sale from "./pages/sale/Sale";
import Products from "./pages/products/Products";
import Reports from "./pages/reports/Reports";
import { ConfigProvider } from "antd";

const App = () => {
  return (
    <div>
      <ConfigProvider
        theme={{
          components: {
            Button: {
              colorPrimary: "#a2c423",
              colorPrimaryHover: "#a2c423",
              colorPrimaryActive: "#a2c423",
              borderRadius: 6,
            },
          },
        }}
      >
        <Routes>
          <Route element={<AdminLayout />}>
            <Route path="/" element={<Sale />} />
            <Route path="/products" element={<Products />} />
            <Route path="/reports" element={<Reports />} />
          </Route>
        </Routes>
      </ConfigProvider>
    </div>
  );
};

export default App;
