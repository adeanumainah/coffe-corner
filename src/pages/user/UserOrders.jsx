import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { motion } from "framer-motion";

function UserOrders() {
  const { currentUser } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const allOrders = JSON.parse(localStorage.getItem("orders")) || [];
    const myOrders = allOrders.filter(
      (order) => order.userId === currentUser.username
    );
    // Urutkan berdasarkan tanggal terbaru
    setOrders(myOrders.sort((a, b) => new Date(b.date) - new Date(a.date)));
  }, [currentUser]);

  const getStatusConfig = (status) => {
    switch (status) {
      case "ACCEPTED":
        return {
          text: "Order Successfully Created",
          bg: "bg-green-100",
          textColor: "text-green-700",
          border: "border-green-200",
          icon: "✅",
          label: "Success"
        };
      case "PENDING":
        return {
          text: "Waiting for Admin Confirmation",
          bg: "bg-yellow-100",
          textColor: "text-yellow-700",
          border: "border-yellow-200",
          icon: "⏳",
          label: "Pending"
        };
      case "REJECTED":
        return {
          text: "Order Rejected",
          bg: "bg-red-100",
          textColor: "text-red-700",
          border: "border-red-200",
          icon: "❌",
          label: "Rejected"
        };
      case "COMPLETED":
        return {
          text: "Your Order Was Completed",
          bg: "bg-gray-100",
          textColor: "text-gray-700",
          border: "border-gray-200",
          icon: "✅",
          label: "Completed"
        };
      default:
        return {
          text: status,
          bg: "bg-gray-100",
          textColor: "text-gray-700",
          border: "border-gray-200",
          icon: "❓",
          label: "Unknown"
        };
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return "Today, " + date.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
      });
    } else if (diffDays === 1) {
      return "Yesterday, " + date.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
      });
    } else if (diffDays < 7) {
      return date.toLocaleDateString('en-US', { 
        weekday: 'short',
        hour: '2-digit',
        minute: '2-digit'
      });
    } else {
      return date.toLocaleDateString('en-US', { 
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  };

  const getTotalItems = (items) => {
    return items.reduce((sum, item) => sum + item.qty, 0);
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-amber-50/20 to-white pb-12">
      {/* Header */}
      <div className="bg-linear-to-r from-amber-700 bg-orange-900 to-amber-800 shadow-lg">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center space-x-4"
          >
            <div className="w-12 h-12 bg-linear-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white text-xl">📦</span>
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white">
                My Orders
              </h1>
              <p className="text-amber-100 text-sm">
                Track and manage all your orders in one place
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 -mt-4">
        {/* Summary Stats */}
        {orders.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            <div className="bg-linear-to-r from-amber-50 to-amber-100 rounded-xl p-4 border border-amber-200">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center">
                  <span className="text-white">📦</span>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Orders</p>
                  <p className="text-2xl font-bold text-amber-700">{orders.length}</p>
                </div>
              </div>
            </div>

            <div className="bg-linear-to-r from-green-50 to-green-100 rounded-xl p-4 border border-green-200">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                  <span className="text-white">✅</span>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Completed</p>
                  <p className="text-2xl font-bold text-green-700">
                    {orders.filter(o => o.status === "COMPLETED").length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-linear-to-r from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                  <span className="text-white">⏳</span>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Pending</p>
                  <p className="text-2xl font-bold text-blue-700">
                    {orders.filter(o => o.status === "PENDING").length}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Orders List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {orders.length === 0 ? (
            <div className="bg-white rounded-xl shadow-lg border border-amber-100 p-8 text-center">
              <div className="w-20 h-20 mx-auto mb-4 bg-linear-to-br from-amber-100 to-amber-200 rounded-full flex items-center justify-center">
                <span className="text-amber-600 text-2xl">📦</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">No orders yet</h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                Your order history will appear here once you start ordering from our menu.
              </p>
              <a
                href="/user/menu/all"
                className="inline-block px-6 py-3 bg-linear-to-r from-amber-600 to-amber-700 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300"
              >
                Browse Menu
              </a>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order, index) => {
                const statusConfig = getStatusConfig(order.status);
                const totalItems = getTotalItems(order.items);
                
                return (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-xl shadow-lg border border-amber-100 overflow-hidden hover:shadow-xl transition-shadow duration-300"
                  >
                    {/* Order Header */}
                    <div className="p-5 border-b border-amber-100">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                          <div className="flex items-center space-x-3 mb-2">
                            <div className={`px-3 py-1.5 rounded-full ${statusConfig.bg} ${statusConfig.textColor} ${statusConfig.border} border flex items-center space-x-1.5`}>
                              <span>{statusConfig.icon}</span>
                              <span className="font-semibold text-sm">{statusConfig.label}</span>
                            </div>
                            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                              #{order.id}
                            </span>
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <div className="flex items-center space-x-1">
                              <span>📅</span>
                              <span>{formatDate(order.date)}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <span>🛒</span>
                              <span>{totalItems} items</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <p className="text-2xl font-bold text-amber-700">
                            Rp {order.total.toLocaleString()}
                          </p>
                          <p className="text-sm text-gray-500 mt-1">Total amount</p>
                        </div>
                      </div>
                    </div>

                    {/* Order Items */}
                    <div className="p-5">
                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                          <span className="mr-2">📋</span>
                          Order Items
                        </h4>
                        <div className="space-y-3">
                          {order.items.map((item, itemIndex) => (
                            <div 
                              key={item.id} 
                              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-amber-50/50 transition-colors"
                            >
                              <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-linear-to-br from-amber-500 to-amber-600 rounded-lg flex items-center justify-center">
                                  <span className="text-white text-sm">☕</span>
                                </div>
                                <div>
                                  <p className="font-medium text-gray-800">{item.name}</p>
                                  <p className="text-xs text-gray-500">{item.category || "Beverage"}</p>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="font-semibold text-gray-800">
                                  Rp {(item.price * item.qty).toLocaleString()}
                                </p>
                                <div className="flex items-center space-x-2 text-sm text-gray-600">
                                  <span>×{item.qty}</span>
                                  <span className="text-gray-400">•</span>
                                  <span>Rp {item.price.toLocaleString()} each</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Order Details Footer */}
                      <div className="pt-4 border-t border-amber-100">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="text-sm text-gray-600">
                            <p className="mb-1">
                              <span className="font-medium">Order Status:</span>{" "}
                              <span className={`font-semibold ${statusConfig.textColor}`}>
                                {statusConfig.text}
                              </span>
                            </p>
                            {order.status === "PENDING" && (
                              <p className="text-amber-600">
                                ⏳ Your order is being processed
                              </p>
                            )}
                            {order.status === "ACCEPTED" && (
                              <p className="text-green-600">
                                ✅ Your order has been accepted
                              </p>
                            )}
                            {order.status === "REJECTED" && (
                              <p className="text-red-600">
                                ❌ Your order was rejected
                              </p>
                            )}
                          </div>
                          
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default UserOrders;
