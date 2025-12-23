import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [stats, setStats] = useState({
    pending: 0,
    accepted: 0,
    rejected: 0,
    completed: 0,
    total: 0
  });

  useEffect(() => {
    const loadOrders = () => {
      const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
      setOrders(storedOrders);
      
      // Calculate stats
      const stats = {
        pending: storedOrders.filter(o => o.status === "PENDING").length,
        accepted: storedOrders.filter(o => o.status === "ACCEPTED").length,
        rejected: storedOrders.filter(o => o.status === "REJECTED").length,
        completed: storedOrders.filter(o => o.status === "COMPLETED").length,
        total: storedOrders.length
      };
      setStats(stats);
    };

    loadOrders();
    window.addEventListener("storage", loadOrders);

    return () => window.removeEventListener("storage", loadOrders);
  }, []);

  // Hitung revenue hanya dari order yang COMPLETED
  const calculateRevenue = () => {
    return orders
      .filter(order => order.status === "COMPLETED")
      .reduce((sum, order) => sum + (order.total || 0), 0);
  };

  const updateStatus = (id, newStatus) => {
    const updatedOrders = orders.map((order) =>
      order.id === id ? { ...order, status: newStatus } : order
    );

    setOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
    
    // Update selected order if it's open
    if (selectedOrder?.id === id) {
      setSelectedOrder({...selectedOrder, status: newStatus});
    }
  };

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "Invalid date";
      
      const options = { 
        month: 'short', 
        day: '2-digit', 
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      };
      return date.toLocaleDateString('en-US', options).replace(',', ' •');
    } catch {
      return "Date not available";
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case "PENDING": return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "ACCEPTED": return "bg-blue-100 text-blue-800 border-blue-300";
      case "COMPLETED": return "bg-green-100 text-green-800 border-green-300";
      case "REJECTED": return "bg-red-100 text-red-800 border-red-300";
      default: return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case "PENDING": return "⏱️";
      case "ACCEPTED": return "✅";
      case "COMPLETED": return "🏁";
      case "REJECTED": return "❌";
      default: return "📦";
    }
  };

  const filteredOrders = filter === "all" 
    ? orders 
    : orders.filter(order => order.status === filter);

  return (
    <div className="min-h-screen bg-linear-to-b from-amber-50/30 to-white">
      {/* Header */}
      {/* <div className="bg-linear-to-r from-amber-700 to-amber-800"> */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-3xl font-bold bg-linear-to-r from-amber-600 to-amber-400 bg-clip-text text-transparent">Order Management</h1>
              <p className="text-gray-990 mt-2">Monitor and manage customer orders</p>
            </div>
            
            {/* Stats Overview */}
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <div className="text-center px-4 py-2  bg-yellow-500/20 backdrop-blur-sm rounded-xl">
                <p className="text-2xl font-bold text-amber-400">{stats.total}</p>
                <p className="text-xs text-amber-400">Total Orders</p>
              </div>
              <div className="text-center px-4 py-2 bg-yellow-500/20 backdrop-blur-sm rounded-xl">
                <p className="text-2xl font-bold text-amber-400">{stats.pending}</p>
                <p className="text-xs text-amber-400">Pending</p>
              </div>
            </div>
          </div>
        </div>
      {/* </div> */}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Notification Banner */}
        {stats.pending > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 bg-linear-to-r from-yellow-50 to-yellow-100 border-l-4 border-yellow-500 rounded-r-xl p-6 shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xl">🔔</span>
                </div>
                <div>
                  <h3 className="font-bold text-yellow-800 text-lg">
                    {stats.pending} New Order{stats.pending > 1 ? 's' : ''} Awaiting Confirmation
                  </h3>
                  <p className="text-yellow-700">
                    Quick action required to process pending orders
                  </p>
                </div>
              </div>
              <button
                onClick={() => setFilter("PENDING")}
                className="px-6 py-2.5 bg-linear-to-r from-yellow-600 to-yellow-700 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
              >
                View Pending
              </button>
            </div>
          </motion.div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {[
            { label: "Pending", value: stats.pending, color: "yellow", icon: "⏱️" },
            { label: "Accepted", value: stats.accepted, color: "blue", icon: "✅" },
            { label: "Completed", value: stats.completed, color: "green", icon: "🏁" },
            { label: "Rejected", value: stats.rejected, color: "red", icon: "❌" },
            { 
              label: "Total Revenue", 
              value: `Rp ${calculateRevenue().toLocaleString()}`, 
              color: "amber", 
              icon: "💰", 
              isRevenue: true,
              tooltip: "Only from completed orders"
            }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white/90 backdrop-blur-sm rounded-xl p-4 border border-gray-200 shadow-sm relative group"
            >
              <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
              <div className="flex items-center justify-between">
                <p className={`text-2xl font-bold ${
                  stat.color === "yellow" ? "text-yellow-600" :
                  stat.color === "blue" ? "text-blue-600" :
                  stat.color === "green" ? "text-green-600" :
                  stat.color === "red" ? "text-red-600" :
                  "text-amber-700"
                } ${stat.isRevenue ? "text-xl" : "text-2xl"}`}>
                  {stat.value}
                </p>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  stat.color === "yellow" ? "bg-yellow-100" :
                  stat.color === "blue" ? "bg-blue-100" :
                  stat.color === "green" ? "bg-green-100" :
                  stat.color === "red" ? "bg-red-100" :
                  "bg-amber-100"
                }`}>
                  <span className={
                    stat.color === "yellow" ? "text-yellow-600" :
                    stat.color === "blue" ? "text-blue-600" :
                    stat.color === "green" ? "text-green-600" :
                    stat.color === "red" ? "text-red-600" :
                    "text-amber-600"
                  }>{stat.icon}</span>
                </div>
              </div>
              {stat.tooltip && (
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                  {stat.tooltip}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-800"></div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Filter Tabs */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 mb-6">
            {["all", "PENDING", "ACCEPTED", "COMPLETED", "REJECTED"].map((status) => (
              <motion.button
                key={status}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFilter(status)}
                className={`px-5 py-2.5 rounded-xl font-medium transition-all duration-300 ${
                  filter === status
                    ? "bg-linear-to-r from-amber-600 to-amber-700 text-white shadow-md"
                    : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                }`}
              >
                {status === "all" ? "All Orders" : status}
                {status !== "all" && (
                  <span className="ml-2 px-2 py-0.5 bg-white/20 rounded-full text-xs">
                    {orders.filter(o => o.status === status).length}
                  </span>
                )}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-amber-100"
          >
            <div className="w-24 h-24 mx-auto mb-4 bg-amber-100 rounded-full flex items-center justify-center">
              <span className="text-3xl">📦</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No {filter !== "all" ? filter.toLowerCase() : ""} orders found
            </h3>
            <p className="text-gray-500">
              {filter === "all" 
                ? "No orders have been placed yet" 
                : `No ${filter.toLowerCase()} orders at the moment`}
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AnimatePresence>
              {filteredOrders.map((order, index) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  onClick={() => setSelectedOrder(order)}
                  className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-amber-100 overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300"
                >
                  {/* Order Header */}
                  <div className={`p-6 border-b ${getStatusColor(order.status).split(' ')[2]}/30`}>
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-bold text-lg text-gray-800">
                          Order #{order.orderCode || `ORD-${order.id.toString().slice(-6)}`}
                        </h3>
                        <p className="text-sm text-gray-500">{formatDate(order.date)}</p>
                      </div>
                      <span className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </div>

                    {/* Customer Info */}
                    <div className="flex items-center space-x-3">
                      <div className="text-black w-10 h-10 bg-linear-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold">
                          {order.userId?.charAt(0).toUpperCase() || "U"}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">
                          {order.customerDetails?.name || order.userId || "Unknown Customer"}
                        </p>
                        <p className="text-xs text-gray-500">
                          {order.orderType === 'dine-in' 
                            ? `Table ${order.customerDetails?.tableNumber || "N/A"}` 
                            : order.orderType || "Takeaway"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="p-6">
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-700 mb-2">Items ({order.items?.length || 0})</h4>
                      <div className="space-y-2">
                        {(order.items || []).slice(0, 2).map((item, idx) => (
                          <div key={idx} className="flex justify-between text-sm">
                            <span className="text-gray-600 truncate">{item.name}</span>
                            <span className="text-black font-medium">×{item.qty}</span>
                          </div>
                        ))}
                        {(order.items || []).length > 2 && (
                          <p className="text-sm text-gray-500">+{(order.items || []).length - 2} more items</p>
                        )}
                      </div>
                    </div>

                    {/* Total and Actions */}
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-gray-500">Total Amount</p>
                        <p className="text-xl font-bold text-amber-700">
                          Rp {(order.total || 0).toLocaleString()}
                        </p>
                      </div>

                      {/* Quick Actions */}
                      {order.status === "PENDING" && (
                        <div className="flex space-x-2">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={(e) => {
                              e.stopPropagation();
                              updateStatus(order.id, "ACCEPTED");
                            }}
                            className="px-4 py-2 bg-linear-to-r from-green-500 to-green-600 text-white text-sm font-semibold rounded-lg hover:shadow-md transition-shadow"
                          >
                            Accept
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={(e) => {
                              e.stopPropagation();
                              updateStatus(order.id, "REJECTED");
                            }}
                            className="px-4 py-2 bg-linear-to-r from-red-500 to-red-600 text-white text-sm font-semibold rounded-lg hover:shadow-md transition-shadow"
                          >
                            Reject
                          </motion.button>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Order Detail Modal */}
      <AnimatePresence>
        {selectedOrder && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
              onClick={() => setSelectedOrder(null)}
            />
            
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedOrder(null)}
            >
              <div
                className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
                onClick={e => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div className={`p-8 rounded-t-3xl ${
                  selectedOrder.status === "PENDING" ? "bg-linear-to-r from-yellow-600 to-yellow-700" :
                  selectedOrder.status === "ACCEPTED" ? "bg-linear-to-r from-blue-600 to-blue-700" :
                  selectedOrder.status === "COMPLETED" ? "bg-linear-to-r from-green-600 to-green-700" :
                  "bg-linear-to-r from-red-600 to-red-700"
                } text-white`}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-2xl font-bold mb-2">
                        Order #{selectedOrder.orderCode || `ORD-${selectedOrder.id.toString().slice(-6)}`}
                      </h2>
                      <div className="flex items-center space-x-4">
                        <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm">
                          {selectedOrder.status}
                        </span>
                        <span className="text-sm opacity-90">{formatDate(selectedOrder.date)}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedOrder(null)}
                      className="text-white/80 hover:text-white text-2xl"
                    >
                      ✕
                    </button>
                  </div>
                </div>

                {/* Modal Body */}
                <div className="p-8">
                  {/* Customer Info */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Customer Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-50 rounded-xl">
                      <p className="text-sm text-gray-500 mb-1">Customer Name</p>
                      <p className="text-gray-700 font-medium">{selectedOrder.customerDetails?.name || selectedOrder.userId || "N/A"}</p>
                    </div>
                    
                    <div className="p-4 bg-gray-50 rounded-xl">
                      <p className="text-sm text-gray-500 mb-1">Phone Number</p>
                      <p className="text-gray-700 font-medium">
                        {selectedOrder.customerDetails?.phone || 
                        (() => {
                          // Cari user dari localStorage
                          const users = JSON.parse(localStorage.getItem("users")) || [];
                          const user = users.find(u => u.username === selectedOrder.userId);
                          return user?.phone || "Not provided";
                        })()
                        }
                      </p>
                    </div>
                    
                    <div className="p-4 bg-gray-50 rounded-xl">
                      <p className="text-sm text-gray-500 mb-1">Order Type</p>
                      <p className="text-gray-700 font-medium capitalize">{selectedOrder.orderType || "N/A"}</p>
                    </div>
                    
                    {selectedOrder.orderType === 'dine-in' && selectedOrder.customerDetails?.tableNumber && (
                      <div className="p-4 bg-gray-50 rounded-xl">
                        <p className="text-sm text-gray-500 mb-1">Table Number</p>
                        <p className="text-gray-700 font-medium">{selectedOrder.customerDetails.tableNumber}</p>
                      </div>
                    )}
                    
                    <div className="p-4 bg-gray-50 rounded-xl">
                      <p className="text-sm text-gray-500 mb-1">User ID</p>
                      <p className="text-gray-700 font-medium">{selectedOrder.userId || "N/A"}</p>
                    </div>
                  </div>
                </div>
             
                  {/* Order Items */} 
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Order Items</h3>
                    <div className="space-y-3">
                      {(selectedOrder.items || []).map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 rounded-lg overflow-hidden">
                              <img src={item.image || "https://via.placeholder.com/100"} alt={item.name} className="w-full h-full object-cover" />
                            </div>
                            <div>
                              <p className="text-gray-700 font-medium">{item.name}</p>
                              <p className="text-sm text-gray-500">{item.category}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-amber-700">Rp {(item.price * item.qty).toLocaleString()}</p>
                            <p className="text-sm text-gray-500">{item.qty} × Rp {item.price.toLocaleString()}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Order Summary */}
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Order Summary</h3>
                    <div className="bg-linear-to-r from-amber-50 to-amber-100/50 rounded-xl p-6 border border-amber-200">
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Subtotal</span>
                          <span className="text-gray-700 font-medium">Rp {(selectedOrder.subtotal || selectedOrder.total - (selectedOrder.total * 0.1)).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Tax (5%)</span>
                          <span className="text-gray-700 font-medium">Rp {((selectedOrder.total * 0.05) || selectedOrder.total - (selectedOrder.subtotal || 0)).toLocaleString()}</span>
                        </div>
                        <div className="border-t border-amber-300 pt-3">
                          <div className="flex justify-between">
                            <span className="text-lg font-bold text-gray-800">Total Amount</span>
                            <span className="text-2xl font-bold text-amber-700">
                              Rp {(selectedOrder.total || 0).toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Status Actions */}
                  {selectedOrder.status === "PENDING" && (
                    <div className="flex space-x-4">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          updateStatus(selectedOrder.id, "ACCEPTED");
                          setSelectedOrder(null);
                        }}
                        className="flex-1 py-3.5 bg-linear-to-r from-green-600 to-green-700 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300"
                      >
                        ✅ Accept Order
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          updateStatus(selectedOrder.id, "REJECTED");
                          setSelectedOrder(null);
                        }}
                        className="flex-1 py-3.5 bg-linear-to-r from-red-600 to-red-700 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300"
                      >
                        ❌ Reject Order
                      </motion.button>
                    </div>
                  )}

                  {selectedOrder.status === "ACCEPTED" && (
                    <div className="flex space-x-4">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          updateStatus(selectedOrder.id, "COMPLETED");
                          setSelectedOrder(null);
                        }}
                        className="flex-1 py-3.5 bg-linear-to-r from-green-600 to-green-700 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300"
                      >
                        🏁 Mark as Completed
                      </motion.button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default AdminOrders;
