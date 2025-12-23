import React, { useContext } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/admin/Dashboard";
import MenuList from "./pages/admin/MenuList";
import Profile from "./pages/admin/Profile";
import UserMenuHome from "./pages/user/UserMenuHome";
import UserMenuDetail from "./pages/user/UserMenuDetail";
import UserCart from "./pages/user/UserCart";
import UserProfile from "./pages/user/UserProfile";

import ProtectedRoute from "./components/ProtectedRoute";
import AuthProvider from "./context/AuthProvider";
import { MenuProvider } from "./context/MenuContext";
import { CartProvider } from "./context/CartContext";
import { AuthContext } from "./context/AuthContext";
import "./index.css";
import AdminOrders from "./pages/admin/AdminOrders";
import UserOrders from "./pages/user/UserOrders";
import { ThemeProvider } from "./context/ThemeContext";

function RouterWithCart() {
  const { currentUser } = useContext(AuthContext);

  return (
    <CartProvider key={currentUser?.username || "guest"}>
      <Routes>
        {/* ===== PUBLIC ===== */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ===== ADMIN ===== */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <App />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="menu" element={<MenuList />} />
          <Route path="profile" element={<Profile />} />
          <Route path="orders" element={<AdminOrders />} />
        </Route>

        {/* ===== USER ===== */}
        <Route
          path="/user"
          element={
            <ProtectedRoute role="user">
              <App />
            </ProtectedRoute>
          }
        >
          <Route path="menu" element={<UserMenuHome />} />
          <Route path="menu/:category" element={<UserMenuDetail />} />
          <Route path="cart" element={<UserCart />} />
          <Route path="profile" element={<UserProfile />} />
          <Route path="orders" element={<UserOrders />} />
        </Route>
      </Routes>
    </CartProvider>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <MenuProvider>
        <ThemeProvider>
          <RouterWithCart />
        </ThemeProvider>
      </MenuProvider>
    </AuthProvider>
  </BrowserRouter>
);
