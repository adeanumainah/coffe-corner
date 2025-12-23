import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function UserProfile() {
  const { currentUser } = useContext(AuthContext);
  const [userStats, setUserStats] = useState({
    totalOrders: 0,
    completedOrders: 0,
    pendingOrders: 0,
    favoriteCategory: "None",
  });

  useEffect(() => {
    const allOrders = JSON.parse(localStorage.getItem("orders")) || [];
    const userOrders = allOrders.filter(
      (order) => order.userId === currentUser.username
    );

    if (userOrders.length > 0) {
      const totalOrders = userOrders.length;
      const completedOrders = userOrders.filter(o => o.status === "COMPLETED").length;
      const pendingOrders = userOrders.filter(o => o.status === "PENDING").length;

      const categoryCount = {};
      userOrders.forEach(order => {
        order.items.forEach(item => {
          if (item.category) {
            categoryCount[item.category] = (categoryCount[item.category] || 0) + item.qty;
          }
        });
      });

      const favoriteCategory = Object.keys(categoryCount).length > 0 
        ? Object.keys(categoryCount).reduce((a, b) => 
            categoryCount[a] > categoryCount[b] ? a : b
          )
        : "None";

      setUserStats({
        totalOrders,
        completedOrders,
        pendingOrders,
        favoriteCategory,
      });
    }
  }, [currentUser]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-amber-50 to-white pb-16">
      {/* Hero Header */}
      <div className="bg-linear-to-r from-amber-800 to-amber-900 shadow-2xl">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row items-center justify-between"
          >
            <div className="text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                My Profile
              </h1>
              <p className="text-amber-200 mt-2 text-base md:text-lg opacity-90">
                Manage your account & track your orders
              </p>
            </div>
            <div className="mt-6 md:mt-0">
              <span className="px-5 py-2 bg-amber-700/40 backdrop-blur-md rounded-full text-amber-100 font-medium text-sm shadow-md">
                ⭐ Premium Member
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 -mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-3xl shadow-2xl border border-amber-100 overflow-hidden">
              {/* Profile Header */}
              <div className="bg-linear-to-br from-amber-700 to-amber-800 p-8 text-center relative">
                <div className="w-24 h-24 mx-auto bg-linear-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center shadow-2xl border-4 border-white mb-5">
                  <span className="text-white text-3xl font-bold">
                    {currentUser?.username?.charAt(0).toUpperCase()}
                  </span>
                </div>
                
                <h2 className="text-2xl font-bold text-white mb-1">{currentUser?.username}</h2>
                <p className="text-amber-200 text-base">{currentUser?.email}</p>
                
                {currentUser?.phone && (
                  <div className="flex items-center justify-center space-x-2 mt-3 text-amber-100">
                    <span className="text-lg">📱</span>
                    <p className="text-base">{currentUser.phone}</p>
                  </div>
                )}
              </div>

              {/* Profile Info */}
              <div className="p-8">
                <div className="space-y-6 mb-8">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Account Type</p>
                      <div className="flex items-center space-x-3">
                        <span className={`text-xl ${currentUser?.role === "admin" ? "text-purple-600" : "text-amber-600"}`}>
                          {currentUser?.role === "admin" ? "👑" : "👤"}
                        </span>
                        <p className="font-semibold text-gray-800 capitalize text-base">
                          {currentUser?.role || "Member"}
                        </p>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Member Since</p>
                      <p className="font-semibold text-gray-800 text-base">
                        {formatDate(currentUser?.createdAt || new Date().toISOString())}
                      </p>
                    </div>
                  </div>
                </div>

                <Link
                  to="/user/orders"
                  className="w-full py-3.5 bg-amber-600 text-white font-medium rounded-2xl hover:bg-amber-700 transition-all duration-300 flex items-center justify-center space-x-3 shadow-md hover:shadow-lg text-base"
                >
                  <span className="text-lg">📦</span>
                  <span>View My Orders</span>
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Stats & Overview */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="lg:col-span-2 space-y-8"
          >
            {/* Quick Stats */}
            <div className="bg-white rounded-3xl shadow-2xl border border-amber-100 p-8">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Order Overview</h3>
              
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                  icon="📦"
                  bg="from-amber-50 to-amber-100"
                  border="amber-200"
                  number={userStats.totalOrders}
                  label="Total Orders"
                  desc="All time"
                  color="amber-700"
                />
                <StatCard
                  icon="✅"
                  bg="from-green-50 to-green-100"
                  border="green-200"
                  number={userStats.completedOrders}
                  label="Completed"
                  desc="Accepted orders"
                  color="green-700"
                />
                <StatCard
                  icon="⏳"
                  bg="from-blue-50 to-blue-100"
                  border="blue-200"
                  number={userStats.pendingOrders}
                  label="Pending"
                  desc="Awaiting approval"
                  color="blue-700"
                />
                <StatCard
                  icon="❤️"
                  bg="from-purple-50 to-purple-100"
                  border="purple-200"
                  number={userStats.favoriteCategory}
                  label="Favorite"
                  desc="Most ordered category"
                  color="purple-700"
                />
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-3xl shadow-2xl border border-amber-100 p-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-800">Recent Activity</h3>
                <Link 
                  to="/user/orders"
                  className="text-amber-700 hover:text-amber-800 font-medium text-sm flex items-center space-x-2 hover:underline"
                >
                  <span>View All</span>
                  <span>→</span>
                </Link>
              </div>

              <div className="space-y-5">
                {userStats.totalOrders === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 mx-auto mb-6 bg-amber-100 rounded-full flex items-center justify-center">
                      <span className="text-amber-600 text-3xl">📝</span>
                    </div>
                    <p className="text-gray-700 text-base mb-3">No activity yet</p>
                    <p className="text-gray-500 text-sm mb-6">Your order history will appear here</p>
                    <Link
                      to="/user/menu/all"
                      className="inline-block px-8 py-3 bg-amber-600 text-white rounded-2xl hover:bg-amber-700 transition-all shadow-md hover:shadow-lg text-base"
                    >
                      Start Ordering
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {(() => {
                      const allOrders = JSON.parse(localStorage.getItem("orders")) || [];
                      const userOrders = allOrders
                        .filter(order => order.userId === currentUser.username)
                        .sort((a, b) => new Date(b.date) - new Date(a.date))
                        .slice(0, 3);

                      return userOrders.map((order) => (
                        <motion.div
                          key={order.id}
                          whileHover={{ scale: 1.02, y: -2 }}
                          className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-5 bg-gray-50 rounded-2xl hover:bg-amber-50 transition-all duration-300 border border-gray-100"
                        >
                          <div className="flex items-center space-x-4 mb-3 sm:mb-0">
                            <div className="w-12 h-12 bg-linear-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center shadow-md">
                              <span className="text-white text-xl">☕</span>
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-800 text-base">
                                Order #{order.id}
                              </h4>
                              <p className="text-sm text-gray-500">
                                {order.items.length} items • {formatDate(order.date)}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-amber-700 text-lg">
                              Rp {order.total.toLocaleString()}
                            </p>
                            <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                              order.status === "COMPLETED" 
                                ? "bg-green-100 text-green-700"
                                : order.status === "PENDING"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-red-100 text-red-700"
                            }`}>
                              {order.status}
                            </span>
                          </div>
                        </motion.div>
                      ));
                    })()}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, bg, border, number, label, desc, color }) {
  return (
    <div className={`bg-linear-to-br ${bg} rounded-2xl p-5 border ${border} shadow-md hover:shadow-lg transition-shadow`}>
      <div className="flex items-center justify-between mb-3">
        <div className={`w-10 h-10 bg-${color.replace('-700', '-500')} rounded-lg flex items-center justify-center shadow-md`}>
          <span className="text-white text-xl">{icon}</span>
        </div>
        <span className={`text-2xl font-bold text-${color}`}>{number}</span>
      </div>
      <p className="text-base font-medium text-gray-700">{label}</p>
      <p className="text-xs text-gray-500 mt-1">{desc}</p>
    </div>
  );
}

export default UserProfile;

