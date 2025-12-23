import React, { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";

const AuthProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // cek login saat reload
  useEffect(() => {
    const savedLogin = localStorage.getItem("isLogin");
    const savedUser = localStorage.getItem("currentUser");

    if (savedLogin === "true" && savedUser) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsLogin(true);
      setCurrentUser(JSON.parse(savedUser));
    }
  }, []);

  // REGISTER -> KHUSUS USER
  const register = ({ username, email, phone, password }) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.find((u) => u.username === username)) {
      return { success: false, message: "Username sudah terdaftar" };
    }

    if (users.find((u) => u.email === email)) {
      return { success: false, message: "Email sudah terdaftar" };
    }

    users.push({
      username,
      email,
      phone,
      password,
      role: "user",
      profileImage: "",
    });

    localStorage.setItem("users", JSON.stringify(users));
    return { success: true };
  };

  // LOGIN -> ADMIN & USER
  const login = (username, password) => {
    // ADMIN PRESET
    if (username === "admin" && password === "admin123") {
      const adminUser = {
        username: "admin",
        role: "admin",
        profileImage: "",
      };

      setIsLogin(true);
      setCurrentUser(adminUser);
      localStorage.setItem("isLogin", "true");
      localStorage.setItem("currentUser", JSON.stringify(adminUser));

      return { success: true, role: "admin" };
    }

    // USER BIASA
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (!user) {
      return { success: false, message: "Username atau password salah" };
    }

    const loggedUser = {
      username: user.username,
      email: user.email,
      phone: user.phone,
      role: "user",
      profileImage: user.profileImage || "",
    };

    setIsLogin(true);
    setCurrentUser(loggedUser);
    localStorage.setItem("isLogin", "true");
    localStorage.setItem("currentUser", JSON.stringify(loggedUser));

    return { success: true, role: "user" };
  };

  // LOGOUT
  const logout = () => {
    setIsLogin(false);
    setCurrentUser(null);
    localStorage.removeItem("isLogin");
    localStorage.removeItem("currentUser");
  };

  return (
    <AuthContext.Provider
      value={{ isLogin, currentUser, register, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
