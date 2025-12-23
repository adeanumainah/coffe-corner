import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeContext } from "../context/ThemeContext";

function Navbar() {
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className={`sticky top-0 z-50 px-4 sm:px-6 py-3 backdrop-blur-lg border-b shadow-sm transition-colors duration-300 ${
      theme === 'dark'
        ? 'bg-linear-to-r from-gray-800/90 to-gray-900/80 border-gray-700'
        : 'bg-linear-to-r from-amber-50/90 to-amber-100/80 border-amber-200'
    }`}>
      <div className="max-w-7xl mx-auto">
        {/* Top Row */}
        <div className="flex items-center justify-between">
          {/* Logo/Brand */}
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg ${
              theme === 'dark'
                ? 'bg-linear-to-br from-gray-700 to-gray-800'
                : 'bg-linear-to-br from-amber-600 to-amber-800'
            }`}>
              <span className="text-white text-xl">☕</span>
            </div>
            <div className="hidden sm:block">
              <h1 className={`text-lg font-bold bg-clip-text text-transparent ${
                theme === 'dark'
                  ? 'bg-linear-to-r from-gray-300 to-gray-400'
                  : 'bg-linear-to-r from-amber-800 to-amber-700'
              }`}>
                Coffee Corner
              </h1>
              <p className={`text-xs font-medium bg-clip-text text-transparent ${
                theme === 'dark'
                  ? 'bg-linear-to-r from-gray-400 to-gray-500'
                  : 'bg-linear-to-r from-amber-600 to-amber-700'
              }`}>
                Admin Dashboard
              </p>
            </div>
          </div>

          {/* Desktop Navigation - Center */}
          <div className="hidden md:flex items-center space-x-1">
            <NavLink
              to="/admin/dashboard"
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg transition-all duration-300 font-medium flex items-center space-x-2 ${
                  isActive
                    ? theme === 'dark'
                      ? "bg-linear-to-r from-gray-700 to-gray-600 text-gray-100 border border-gray-600 shadow-sm"
                      : "bg-linear-to-r from-amber-200 to-amber-300 text-amber-900 border border-amber-300 shadow-sm"
                    : theme === 'dark'
                    ? "text-gray-300 hover:text-gray-100 hover:bg-gray-700/50"
                    : "text-gray-700 hover:text-amber-800 hover:bg-amber-100/60"
                }`
              }
            >
              <span className="text-lg">📊</span>
              <span>Dashboard</span>
            </NavLink>

            <NavLink
              to="/admin/menu"
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg transition-all duration-300 font-medium flex items-center space-x-2 ${
                  isActive
                    ? theme === 'dark'
                      ? "bg-linear-to-r from-gray-700 to-gray-600 text-gray-100 border border-gray-600 shadow-sm"
                      : "bg-linear-to-r from-amber-200 to-amber-300 text-amber-900 border border-amber-300 shadow-sm"
                    : theme === 'dark'
                    ? "text-gray-300 hover:text-gray-100 hover:bg-gray-700/50"
                    : "text-gray-700 hover:text-amber-800 hover:bg-amber-100/60"
                }`
              }
            >
              <span className="text-lg">📋</span>
              <span>Menu</span>
            </NavLink>

            <NavLink
              to="/admin/orders"
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg transition-all duration-300 font-medium flex items-center space-x-2 ${
                  isActive
                    ? theme === 'dark'
                      ? "bg-linear-to-r from-gray-700 to-gray-600 text-gray-100 border border-gray-600 shadow-sm"
                      : "bg-linear-to-r from-amber-200 to-amber-300 text-amber-900 border border-amber-300 shadow-sm"
                    : theme === 'dark'
                    ? "text-gray-300 hover:text-gray-100 hover:bg-gray-700/50"
                    : "text-gray-700 hover:text-amber-800 hover:bg-amber-100/60"
                }`
              }
            >
              <span className="text-lg">📦</span>
              <span>Orders</span>
            </NavLink>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            {/* Theme Toggle Button - Dipindahkan ke kanan */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className={`hidden sm:flex p-2 rounded-lg transition-all duration-300 ${
                theme === 'dark'
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600 border border-gray-600'
                  : 'bg-linear-to-r from-amber-100 to-amber-200 text-amber-700 hover:from-amber-200 hover:to-amber-300 border border-amber-300'
              }`}
              aria-label="Toggle theme"
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={theme}
                  initial={{ rotate: -180, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 180, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-lg"
                >
                  {theme === "dark" ? "☀️" : "🌙"}
                </motion.span>
              </AnimatePresence>
            </motion.button>

            {/* Profile Dropdown */}
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-xl border hover:shadow-md transition-all duration-300 ${
                  theme === 'dark'
                    ? 'bg-linear-to-r from-gray-800 to-gray-900 border-gray-600'
                    : 'bg-linear-to-r from-amber-100 to-amber-200 border-amber-300'
                }`}
              >
                <div className={`w-9 h-9 rounded-full flex items-center justify-center shadow ${
                  theme === 'dark'
                    ? 'bg-linear-to-br from-gray-600 to-gray-700'
                    : 'bg-linear-to-br from-amber-600 to-amber-800'
                }`}>
                  <span className="text-white font-semibold">
                    {currentUser?.username?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="hidden lg:block text-left">
                  <p className={`text-sm font-semibold ${
                    theme === 'dark' ? 'text-gray-200' : 'text-gray-800'
                  }`}>
                    {currentUser?.username}
                  </p>
                  <p className={`text-xs font-medium bg-clip-text text-transparent ${
                    theme === 'dark'
                      ? 'bg-linear-to-r from-gray-400 to-gray-300'
                      : 'bg-linear-to-r from-amber-600 to-amber-700'
                  }`}>
                    Administrator
                  </p>
                </div>
                <motion.span
                  animate={{ rotate: isProfileOpen ? 180 : 0 }}
                  className={theme === 'dark' ? 'text-gray-400' : 'text-amber-700'}
                >
                  ▼
                </motion.span>
              </motion.button>

              {/* Profile Dropdown Menu */}
              <AnimatePresence>
                {isProfileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`absolute right-0 mt-2 w-56 rounded-xl shadow-2xl border overflow-hidden z-50 ${
                      theme === 'dark'
                        ? 'bg-linear-to-b from-gray-800 to-gray-900 border-gray-700'
                        : 'bg-linear-to-b from-amber-50 to-white border-amber-200'
                    }`}
                  >
                    <div className={`p-4 border-b ${
                      theme === 'dark'
                        ? 'border-gray-700 bg-linear-to-r from-gray-800 to-gray-700'
                        : 'border-amber-100 bg-linear-to-r from-amber-50 to-amber-100'
                    }`}>
                      <p className={`font-semibold ${
                        theme === 'dark' ? 'text-gray-200' : 'text-gray-800'
                      }`}>
                        {currentUser?.username}
                      </p>
                      <p className={`text-xs ${
                        theme === 'dark' ? 'text-gray-400' : 'text-amber-700'
                      }`}>
                        {currentUser?.email}
                      </p>
                    </div>
                    
                    <button
                      onClick={() => {
                        navigate("/admin/profile");
                        setIsProfileOpen(false);
                      }}
                      className={`w-full px-4 py-3 text-left transition-all duration-200 flex items-center space-x-2 ${
                        theme === 'dark'
                          ? 'text-gray-300 hover:bg-gray-700/60'
                          : 'text-gray-700 hover:bg-linear-to-r hover:from-amber-100/60 hover:to-amber-200/60'
                      }`}
                    >
                      <span className="text-lg">👤</span>
                      <span>Profile Settings</span>
                    </button>
                    
                    <button
                      onClick={toggleTheme}
                      className={`w-full px-4 py-3 text-left transition-all duration-200 flex items-center space-x-2 border-t ${
                        theme === 'dark'
                          ? 'border-gray-700 text-gray-300 hover:bg-gray-700/60'
                          : 'border-amber-100 text-gray-700 hover:bg-linear-to-r hover:from-amber-100/60 hover:to-amber-200/60'
                      }`}
                    >
                      <span className="text-lg">
                        {theme === "dark" ? "☀️" : "🌙"}
                      </span>
                      <span>Switch to {theme === "dark" ? "Light" : "Dark"} Mode</span>
                    </button>
                    
                    <button
                      onClick={handleLogout}
                      className={`w-full px-4 py-3 text-left transition-all duration-200 flex items-center space-x-3 border-t ${
                        theme === 'dark'
                          ? 'border-gray-700 text-red-400 hover:bg-red-900/30'
                          : 'border-amber-100 text-red-600 hover:bg-linear-to-r hover:from-red-100/60 hover:to-red-200/60'
                      }`}
                    >
                      <span className="text-lg">🚪</span>
                      <span>Logout</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`md:hidden p-2 rounded-lg ${
                theme === 'dark'
                  ? 'text-gray-300 hover:bg-gray-700'
                  : 'text-gray-700 hover:bg-amber-100'
              }`}
            >
              {isMobileMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className={`md:hidden overflow-hidden mt-3 rounded-xl border ${
                theme === 'dark'
                  ? 'bg-gray-800 border-gray-700'
                  : 'bg-amber-50 border-amber-200'
              }`}
            >
              <div className="p-4 space-y-2">
                <NavLink
                  to="/admin/dashboard"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `block px-4 py-3 rounded-lg transition-all duration-300 items-center space-x-2 ${
                      isActive
                        ? theme === 'dark'
                          ? "bg-gray-700 text-gray-100"
                          : "bg-amber-200 text-amber-900"
                        : theme === 'dark'
                        ? "text-gray-300 hover:bg-gray-700"
                        : "text-gray-700 hover:bg-amber-100"
                    }`
                  }
                >
                  <span>📊</span>
                  <span>Dashboard</span>
                </NavLink>

                <NavLink
                  to="/admin/menu"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `block px-4 py-3 rounded-lg transition-all duration-300 items-center space-x-2 ${
                      isActive
                        ? theme === 'dark'
                          ? "bg-gray-700 text-gray-100"
                          : "bg-amber-200 text-amber-900"
                        : theme === 'dark'
                        ? "text-gray-300 hover:bg-gray-700"
                        : "text-gray-700 hover:bg-amber-100"
                    }`
                  }
                >
                  <span>📋</span>
                  <span>Menu</span>
                </NavLink>

                <NavLink
                  to="/admin/orders"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `block px-4 py-3 rounded-lg transition-all duration-300 items-center space-x-2 ${
                      isActive
                        ? theme === 'dark'
                          ? "bg-gray-700 text-gray-100"
                          : "bg-amber-200 text-amber-900"
                        : theme === 'dark'
                        ? "text-gray-300 hover:bg-gray-700"
                        : "text-gray-700 hover:bg-amber-100"
                    }`
                  }
                >
                  <span>📦</span>
                  <span>Orders</span>
                </NavLink>

                {/* Mobile Theme Toggle */}
                <button
                  onClick={toggleTheme}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 flex items-center space-x-2 ${
                    theme === 'dark'
                      ? "text-gray-300 hover:bg-gray-700"
                      : "text-gray-700 hover:bg-amber-100"
                  }`}
                >
                  <span>{theme === "dark" ? "☀️" : "🌙"}</span>
                  <span>Switch to {theme === "dark" ? "Light" : "Dark"} Mode</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}

export default Navbar;
