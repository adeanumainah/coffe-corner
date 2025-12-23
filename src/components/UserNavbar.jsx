import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import { ThemeContext } from "../context/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";

function UserNavbar() {
  const { currentUser, logout } = useContext(AuthContext);
  const { cart, clearCart } = useContext(CartContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const totalCart = cart.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  const handleLogout = () => {
    logout();
    clearCart();
    navigate("/login");
  };

  return (
    <>
      {/* Main Navbar */}
      <nav className={`sticky top-0 z-50 px-4 sm:px-6 py-3 backdrop-blur-lg border-b shadow-sm transition-colors duration-300 ${
        theme === 'dark' 
          ? 'bg-linear-to-r from-gray-800/90 to-gray-900/80 border-gray-700' 
          : 'bg-linear-to-r from-amber-50/90 to-amber-100/80 border-amber-200'
      }`}>
        <div className="max-w-7xl mx-auto">
          {/* Top Row - Logo and Actions */}
          <div className="flex justify-between items-center">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-3 cursor-pointer"
              onClick={() => navigate("/user/menu")}
            >
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
                  Premium Cafe
                </p>
              </div>
            </motion.div>

            {/* Desktop Navigation - Center */}
            <div className="hidden md:flex items-center space-x-1">
              <NavLink
                to="/user/menu"
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
                <span>🏠</span>
                <span>Home</span>
              </NavLink>

              <NavLink
                to="/user/menu/all"
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
                <span>📋</span>
                <span>Menu</span>
              </NavLink>

              <NavLink
                to="/user/orders"
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
                <span>📦</span>
                <span>Orders</span>
              </NavLink>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-3 sm:space-x-4">
              {/* Theme Toggle Button */}
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

              {/* Cart Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsCartOpen(true)}
                className="relative p-2"
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg ${
                  theme === 'dark'
                    ? 'bg-linear-to-br from-gray-700 to-gray-800'
                    : 'bg-linear-to-br from-amber-600 to-amber-800'
                }`}>
                  <span className="text-white text-xl">🛒</span>
                </div>
                {totalCart > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className={`absolute -top-1 -right-1 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center shadow ${
                      theme === 'dark'
                        ? 'bg-linear-to-r from-red-600 to-red-700'
                        : 'bg-linear-to-r from-red-500 to-red-600'
                    }`}
                  >
                    {totalCart}
                  </motion.span>
                )}
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
                      Member
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
                        } truncate`}>
                          {currentUser?.email}
                        </p>
                        <div className={`mt-2 px-2 py-1 text-xs rounded-full inline-block ${
                          theme === 'dark'
                            ? 'bg-gray-700 text-gray-300'
                            : 'bg-amber-100 text-amber-700'
                        }`}>
                          {currentUser?.role}
                        </div>
                      </div>
                      
                      <NavLink
                        to="/user/profile"
                        onClick={() => setIsProfileOpen(false)}
                        className={`block px-4 py-3 transition-colors duration-200 ${
                          theme === 'dark'
                            ? 'text-gray-300 hover:bg-gray-700'
                            : 'text-gray-700 hover:bg-amber-50'
                        }`}
                      >
                        <span className="mr-2">👤</span>
                        My Profile
                      </NavLink>
                      
                      <button
                        onClick={toggleTheme}
                        className={`w-full px-4 py-3 text-left transition-colors duration-200 ${
                          theme === 'dark'
                            ? 'text-gray-300 hover:bg-gray-700'
                            : 'text-gray-700 hover:bg-amber-50'
                        }`}
                      >
                        <span className="mr-2">{theme === "dark" ? "☀️" : "🌙"}</span>
                        Switch to {theme === "dark" ? "Light" : "Dark"} Mode
                      </button>
                      
                      <button
                        onClick={handleLogout}
                        className={`w-full px-4 py-3 text-left transition-colors duration-200 border-t ${
                          theme === 'dark'
                            ? 'border-gray-700 text-red-400 hover:bg-red-900/30'
                            : 'border-amber-100 text-red-600 hover:bg-red-50'
                        }`}
                      >
                        <span className="mr-2">🚪</span>
                        Sign Out
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
                    to="/user/menu"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `block px-4 py-3 rounded-lg transition-all duration-300 ${
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
                    <span className="mr-2">🏠</span>
                    Home
                  </NavLink>

                  <NavLink
                    to="/user/menu/all"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `block px-4 py-3 rounded-lg transition-all duration-300 ${
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
                    <span className="mr-2">📋</span>
                    Menu
                  </NavLink>

                  <NavLink
                    to="/user/orders"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `block px-4 py-3 rounded-lg transition-all duration-300 ${
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
                    <span className="mr-2">📦</span>
                    Orders
                  </NavLink>

                  {/* Mobile Theme Toggle */}
                  <button
                    onClick={toggleTheme}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 flex items-center ${
                      theme === 'dark'
                        ? "text-gray-300 hover:bg-gray-700"
                        : "text-gray-700 hover:bg-amber-100"
                    }`}
                  >
                    <span className="mr-2">{theme === "dark" ? "☀️" : "🌙"}</span>
                    Switch to {theme === "dark" ? "Light" : "Dark"} Mode
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      {/* Cart Sidebar Modal */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
              onClick={() => setIsCartOpen(false)}
            />
            
            {/* Cart Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              className={`fixed top-0 right-0 h-full w-full sm:w-96 shadow-2xl z-50 flex flex-col ${
                theme === 'dark' ? 'bg-gray-900' : 'bg-white'
              }`}
            >
              {/* Cart Header */}
              <div className={`p-6 text-white ${
                theme === 'dark'
                  ? 'bg-linear-to-r from-gray-800 to-gray-900'
                  : 'bg-linear-to-r from-amber-700 to-amber-800'
              }`}>
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      theme === 'dark' ? 'bg-gray-700/50' : 'bg-white/20'
                    }`}>
                      <span className="text-xl">🛒</span>
                    </div>
                    <div>
                      <h2 className="text-xl font-bold">Your Cart</h2>
                      <p className={`text-sm ${
                        theme === 'dark' ? 'text-gray-300' : 'text-amber-100'
                      }`}>
                        {totalCart} items
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className={theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-amber-100 hover:text-white'}
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* Cart Items */}
              <div className={`flex-1 overflow-y-auto p-4 sm:p-6 ${
                theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
              }`}>
                {cart.length === 0 ? (
                  <div className="text-center py-12">
                    <div className={`w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center ${
                      theme === 'dark' ? 'bg-gray-800' : 'bg-amber-100'
                    }`}>
                      <span className="text-3xl">🛒</span>
                    </div>
                    <h3 className={`text-xl font-semibold mb-2 ${
                      theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
                    }`}>
                      Your cart is empty
                    </h3>
                    <p className={`mb-6 ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      Add some delicious items to get started!
                    </p>
                    <button
                      onClick={() => {
                        setIsCartOpen(false);
                        navigate("/user/menu/all");
                      }}
                      className={`px-6 py-3 text-white rounded-xl hover:shadow-lg transition-all duration-300 ${
                        theme === 'dark'
                          ? 'bg-linear-to-r from-gray-700 to-gray-800'
                          : 'bg-linear-to-r from-amber-600 to-amber-700'
                      }`}
                    >
                      Browse Menu
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={`flex items-center space-x-4 p-4 rounded-xl border ${
                          theme === 'dark'
                            ? 'bg-gray-800 border-gray-700'
                            : 'bg-gray-50 border-gray-200'
                        }`}
                      >
                        <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className={`font-semibold ${
                            theme === 'dark' ? 'text-gray-200' : 'text-gray-800'
                          }`}>
                            {item.name}
                          </h3>
                          <p className={`text-sm ${
                            theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                          }`}>
                            {item.category}
                          </p>
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center space-x-2">
                              <button className={`w-7 h-7 rounded-full flex items-center justify-center ${
                                theme === 'dark'
                                  ? 'bg-gray-700 text-gray-300'
                                  : 'bg-gray-200 text-gray-700'
                              }`}>
                                -
                              </button>
                              <span className="font-bold">{item.qty}</span>
                              <button className={`w-7 h-7 rounded-full flex items-center justify-center ${
                                theme === 'dark'
                                  ? 'bg-gray-700 text-gray-300'
                                  : 'bg-amber-100 text-amber-700'
                              }`}>
                                +
                              </button>
                            </div>
                            <p className={`font-bold ${
                              theme === 'dark' ? 'text-amber-400' : 'text-amber-700'
                            }`}>
                              Rp {(item.price * item.qty).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Cart Footer */}
              {cart.length > 0 && (
                <div className={`border-t p-6 ${
                  theme === 'dark'
                    ? 'border-gray-700 text-gray-200'
                    : 'border-gray-200 text-gray-600'
                }`}>
                  <div className="flex justify-between items-center mb-4">
                    <span>Subtotal</span>
                    <span className={`text-xl font-bold ${
                      theme === 'dark' ? 'text-amber-400' : 'text-amber-700'
                    }`}>
                      Rp {totalPrice.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mb-6">
                    <span>Items</span>
                    <span className="font-semibold">{totalCart} items</span>
                  </div>
                  
                  <div className="space-y-3">
                    <button
                      onClick={() => {
                        setIsCartOpen(false);
                        navigate("/user/cart");
                      }}
                      className={`w-full py-3.5 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 ${
                        theme === 'dark'
                          ? 'bg-linear-to-r from-gray-700 to-gray-800'
                          : 'bg-linear-to-r from-amber-600 to-amber-700'
                      }`}
                    >
                      View Full Cart
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default UserNavbar;
