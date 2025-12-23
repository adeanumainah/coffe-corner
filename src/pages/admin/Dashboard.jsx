import { useContext } from "react";
import { MenuContext } from "../../context/MenuContext";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Dashboard() {
  const { menus } = useContext(MenuContext);

  // Statistics
  const totalMenu = menus.length;
  const tersedia = menus.filter(m => m.status === "tersedia").length;
  const habis = menus.filter(m => m.status === "habis").length;
  const persentaseTersedia = totalMenu === 0 ? 0 : Math.round((tersedia / totalMenu) * 100);

  // Top selling items (you can replace with actual sales data)
  const topSelling = menus
    .sort(() => Math.random() - 0.5)
    .slice(0, 3)
    .map(menu => ({
      ...menu,
      sold: Math.floor(Math.random() * 100) + 50 // Mock sales data
    }));

  return (
    <div className="min-h-screen bg-linear-to-br from-amber-50/50 to-brown-50/30 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-linear-to-r from-amber-600 to-amber-400 bg-clip-text text-transparent">
              Cafe Dashboard
            </h1>
            <p className="text-gray-990 mt-2">Manage your cafe efficiently and effectively</p>
          </div>
          <div className="mt-4 md:mt-0 text-sm text-amber-700 bg-amber-100/50 px-4 py-2 rounded-full border border-amber-200">
            📅 {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            whileHover={{ y: -5, scale: 1.02 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-2">Total Menu</p>
                <h3 className="text-3xl font-bold text-gray-800">{totalMenu}</h3>
              </div>
              <div className="w-12 h-12 bg-linear-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center">
                <span className="text-2xl text-blue-600">📊</span>
              </div>
            </div>
            <div className="mt-4 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500" style={{ width: '100%' }}></div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -5, scale: 1.02 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-2">Available</p>
                <h3 className="text-3xl font-bold text-green-600">{tersedia}</h3>
              </div>
              <div className="w-12 h-12 bg-linear-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center">
                <span className="text-2xl text-green-600">✅</span>
              </div>
            </div>
            <div className="mt-4 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-green-500" style={{ width: `${persentaseTersedia}%` }}></div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -5, scale: 1.02 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-2">Out of Stock</p>
                <h3 className="text-3xl font-bold text-red-500">{habis}</h3>
              </div>
              <div className="w-12 h-12 bg-linear-to-br from-red-100 to-red-200 rounded-xl flex items-center justify-center">
                <span className="text-2xl text-red-500">⛔</span>
              </div>
            </div>
            <div className="mt-4 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-red-500" style={{ width: `${totalMenu ? (habis / totalMenu) * 100 : 0}%` }}></div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -5, scale: 1.02 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-2">Availability Rate</p>
                <h3 className="text-3xl font-bold text-amber-600">{persentaseTersedia}%</h3>
              </div>
              <div className="w-12 h-12 bg-linear-to-br from-amber-100 to-amber-200 rounded-xl flex items-center justify-center">
                <span className="text-2xl text-amber-600">📈</span>
              </div>
            </div>
            <div className="mt-4 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-amber-500" style={{ width: `${persentaseTersedia}%` }}></div>
            </div>
          </motion.div>
        </div>

        {/* Alert for Out of Stock */}
        {habis > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-linear-to-r from-red-50/80 to-red-100/50 backdrop-blur-sm border-l-4 border-red-500 rounded-r-xl p-4 mb-8 shadow"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <span className="text-red-600 text-xl">⚠️</span>
              </div>
              <div>
                <p className="font-semibold text-red-800">Attention Required!</p>
                <p className="text-red-600">
                  There are <span className="font-bold">{habis}</span> menu items out of stock. 
                  Please restock and update their availability status.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Top Selling Items */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Top Selling */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
              <span className="mr-2">🏆</span> Top Selling Items
            </h2>
            <div className="space-y-4">
              {topSelling.map((item, index) => (
                <div key={item.id} className="flex items-center p-3 rounded-xl hover:bg-amber-50/50 transition-colors">
                  <div className="w-12 h-12 rounded-lg overflow-hidden mr-4">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-800">{item.name}</h3>
                    <p className="text-sm text-gray-500">{item.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-amber-700">Rp {item.price.toLocaleString()}</p>
                    <p className="text-sm text-gray-500">{item.sold} sold</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Menu Status Overview */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
              <span className="mr-2">📊</span> Menu Status Overview
            </h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">Available Items</span>
                  <span className="text-sm font-bold text-green-600">{persentaseTersedia}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${persentaseTersedia}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="h-3 rounded-full bg-linear-to-r from-green-400 to-green-500"
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">Out of Stock</span>
                  <span className="text-sm font-bold text-red-500">{totalMenu ? Math.round((habis / totalMenu) * 100) : 0}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${totalMenu ? (habis / totalMenu) * 100 : 0}%` }}
                    transition={{ duration: 1, delay: 0.7 }}
                    className="h-3 rounded-full bg-linear-to-r from-red-400 to-red-500"
                  />
                </div>
              </div>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-xl">
                <p className="text-2xl font-bold text-green-600">{tersedia}</p>
                <p className="text-sm text-gray-600">Available</p>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-xl">
                <p className="text-2xl font-bold text-red-500">{habis}</p>
                <p className="text-sm text-gray-600">Out of Stock</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* All Menu Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center">
              <span className="mr-2">☕</span> All Menu Items
              <span className="ml-2 text-sm font-normal text-gray-500">({totalMenu} items)</span>
            </h2>
            <Link to="/admin/menu">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-sm px-4 py-2 bg-amber-100 text-amber-700 rounded-lg hover:bg-amber-200 transition-colors"
              >
                View All →
              </motion.button>
            </Link>
          </div>

          {menus.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 mx-auto mb-4 bg-amber-100 rounded-full flex items-center justify-center">
                <span className="text-3xl">📋</span>
              </div>
              <p className="text-gray-500 mb-2">No menu items yet</p>
              <Link to="/admin/menu/add">
                <button className="text-amber-600 font-medium hover:text-amber-700">
                  Add your first menu item →
                </button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {menus.slice(0, 8).map((menu, index) => (
                <motion.div
                  key={menu.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="group"
                >
                  <div className="bg-linear-to-b from-white to-amber-50 rounded-xl overflow-hidden border border-amber-100 shadow-sm hover:shadow-lg transition-all duration-300">
                    <div className="relative h-40 overflow-hidden">
                      <img
                        src={menu.image}
                        alt={menu.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-2 right-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          menu.status === "tersedia" 
                            ? "bg-green-100 text-green-800" 
                            : "bg-red-100 text-red-800"
                        }`}>
                          {menu.status}
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-800 truncate">{menu.name}</h3>
                      <p className="text-sm text-gray-500 mb-2">{menu.category}</p>
                      <div className="flex justify-between items-center">
                        <p className="font-bold text-amber-700">
                          Rp {menu.price.toLocaleString()}
                        </p>
                   
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        
      </motion.div>
    </div>
  );
}

export default Dashboard;

