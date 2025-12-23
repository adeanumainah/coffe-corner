import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Profile() {
  const { currentUser } = useContext(AuthContext);

  // Stats untuk admin diambil dari localStorage
  const getAdminStats = () => {
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    const menus = JSON.parse(localStorage.getItem("menus")) || [];
    
    // Hitung revenue hanya dari COMPLETED orders
    const totalRevenue = orders
      .filter(order => order.status === "COMPLETED")
      .reduce((sum, order) => sum + (order.total || 0), 0);
    
    return {
      totalMenus: menus.length,
      pendingOrders: orders.filter(o => o.status === "PENDING").length,
      totalOrders: orders.length,
      completedOrders: orders.filter(o => o.status === "COMPLETED").length,
      totalRevenue: totalRevenue
    };
  };

  const adminStats = getAdminStats();

  return (
    <div className="min-h-screen bg-linear-to-b from-amber-50/30 to-white">
      {/* Header */}
      <div className="bg-linear-to-r from-amber-700 to-amber-700">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-white">Admin Profile</h1>
              <p className="text-amber-100 mt-2">View your account information</p>
            </div>
            
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1"
          >
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-amber-100 overflow-hidden">
              {/* Profile Header */}
              <div className="bg-linear-to-r from-amber-600 to-amber-700 p-8 text-center">
                <div className="relative inline-block">
                  {currentUser?.profileImage ? (
                    <div className="w-32 h-32 mx-auto rounded-full border-4 border-white shadow-2xl overflow-hidden">
                      <img
                        src={currentUser.profileImage}
                        alt="Profile"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          // Fallback ke default avatar jika image error
                        }}
                      />
                    </div>
                  ) : (
                    <div className="w-32 h-32 mx-auto bg-linear-to-br from-amber-400 to-amber-500 rounded-full border-4 border-white shadow-2xl flex items-center justify-center">
                      <span className="text-white text-4xl font-bold">
                        {currentUser?.username?.charAt(0).toUpperCase() || "A"}
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="mt-6">
                  <h2 className="text-2xl font-bold text-white">
                    {currentUser?.username || "Administrator"}
                  </h2>
                  <div className="inline-flex items-center space-x-2 px-4 py-1.5 mt-2 bg-white/20 backdrop-blur-sm rounded-full">
                    <span className="text-amber-100">👑</span>
                    <span className="text-amber-100 font-medium">Administrator</span>
                  </div>
                </div>
              </div>

              {/* Profile Info */}
              <div className="p-6">
                <h3 className="font-semibold text-gray-800 mb-4">Account Information</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Role</p>
                    <div className="inline-flex items-center space-x-2 px-3 py-1 bg-amber-100 text-amber-700 rounded-full">
                      <span>⚡</span>
                      <span className="font-medium">Full Access Admin</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-6 bg-linear-to-r from-amber-50 to-amber-100/50 rounded-2xl border border-amber-200 p-6"
            >
              <h3 className="font-semibold text-amber-800 mb-4">Quick Stats</h3>
              <div className="space-y-3">
                                
                <div className="flex items-center justify-between p-3 bg-white/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                      <span className="text-yellow-600">📦</span>
                    </div>
                    <span className="text-sm text-gray-600">Pending Orders</span>
                  </div>
                  <span className="font-bold text-gray-800">{adminStats.pendingOrders}</span>
                </div>
                
              
                <div className="flex items-center justify-between p-3 bg-white/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <span className="text-blue-600">✅</span>
                    </div>
                    <span className="text-sm text-gray-600">Completed Orders</span>
                  </div>
                  <span className="font-bold text-gray-800">{adminStats.completedOrders}</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Profile Information */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2 space-y-8"
          >
            {/* Revenue Breakdown Card */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-amber-100 p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Revenue Overview</h2>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Total Revenue (Completed Orders Only)
                    </label>
                    <div className="px-4 py-3 bg-linear-to-r from-green-50 to-green-100/50 border border-green-200 rounded-xl">
                      <p className="text-3xl font-bold text-green-700">
                        Rp {adminStats.totalRevenue.toLocaleString()}
                      </p>
                      <div className="flex items-center space-x-2 mt-2">
                        <span className="text-green-600 text-sm">💰</span>
                        <span className="text-sm text-green-600">Only from completed orders</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Completed Orders Count
                    </label>
                    <div className="px-4 py-3 bg-linear-to-r from-blue-50 to-blue-100/50 border border-blue-200 rounded-xl">
                      <div className="flex items-center justify-between">
                        <p className="text-3xl font-bold text-blue-700">{adminStats.completedOrders}</p>
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <span className="text-blue-600 text-xl">✅</span>
                        </div>
                      </div>
                      <p className="text-sm text-blue-600 mt-2">Orders marked as completed</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Profile Information Display */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-amber-100 p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Profile Information</h2>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Username
                    </label>
                    <div className="px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl">
                      <p className="text-gray-700 font-medium">{currentUser?.username}</p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Account Status
                    </label>
                    <div className="px-4 py-3 bg-linear-to-r from-green-50 to-green-100/50 border border-green-200 rounded-xl">
                      <div className="flex items-center space-x-2">
                        <span className="text-green-600">✅</span>
                        <span className="font-medium text-green-700">Active</span>
                      </div>
                      <p className="text-xs text-green-600 mt-1">Account is active and verified</p>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-gray-600 mb-4">
                    Your profile is managed by the system. Contact the system administrator for any profile updates.
                  </p>
                  
                  <div className="flex items-center space-x-3 text-sm text-gray-500">
                    <span>💡</span>
                    <span>Note: Profile settings are read-only in this view</span>
                  </div>
                </div>
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
