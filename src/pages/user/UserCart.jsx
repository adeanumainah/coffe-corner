import { useContext, useState } from "react";
import { CartContext } from "../../context/CartContext";
import { MenuContext } from "../../context/MenuContext";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function UserCart() {
  const { cart, removeFromCart, increaseQty, decreaseQty, clearCart } =
    useContext(CartContext);
  const { menus } = useContext(MenuContext);
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [orderDetails, setOrderDetails] = useState({
    name: currentUser?.username || "",
    tableNumber: "",
    notes: "",
    orderType: "dine-in" // 'dine-in', 'takeaway', 'pickup'
  });

  // ================= TOTAL CALCULATION =================
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const tax = total * 0.05;
  const grandTotal = total + tax;

  // ================= CHECK UNAVAILABLE ITEMS =================
  const unavailableItems = cart.filter((cartItem) => {
    const menu = menus.find((m) => m.id === cartItem.id);
    return menu && menu.status === "habis";
  });

  const hasUnavailableItem = unavailableItems.length > 0;

  // ================= SUBMIT ORDER =================
  const handleOrderSubmit = (e) => {
    e.preventDefault();

    if (hasUnavailableItem) {
      alert(
        "❌ Some items are out of stock. Please remove unavailable items before checkout."
      );
      return;
    }

    const order = {
      id: Date.now(),
      userId: currentUser?.username,
      items: cart,
      total: grandTotal,
      tax: tax,
      subtotal: total,
      date: new Date().toISOString(),
      status: "PENDING",
      orderType: orderDetails.orderType,
      customerDetails: {
        name: orderDetails.name,
        phone: currentUser?.phone || "Not provided",
        tableNumber: orderDetails.orderType === 'dine-in' ? orderDetails.tableNumber : null,
        notes: orderDetails.notes,
      },
      orderCode: `ORD-${Math.floor(100000 + Math.random() * 900000)}`
    };

    const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];
    localStorage.setItem("orders", JSON.stringify([...existingOrders, order]));

    alert(`✅ Order #${order.orderCode} successfully created! Please show this code at the counter.`);

    clearCart();
    setShowCheckoutModal(false);
    navigate("/user/orders");
  };

  // ================= EMPTY CART STATE =================
  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-linear-to-b from-amber-50/30 to-white">
        <div className="max-w-6xl mx-auto px-6 py-16 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center max-w-md"
          >
            <div className="w-32 h-32 mx-auto mb-6 bg-linear-to-br from-amber-100 to-amber-200 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-6xl">🛒</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Your Cart is Empty</h1>
            <p className="text-gray-600 mb-8">
              Start your journey with our premium selection of coffees and desserts
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/user/menu/all")}
              className="px-8 py-3.5 bg-linear-to-r from-amber-600 to-amber-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Explore Our Menu →
            </motion.button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-amber-50/30 to-white">
      {/* HEADER SECTION */}
      <div className="bg-linear-to-r from-amber-700 to-amber-800">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-white">Your Shopping Cart</h1>
              <p className="text-amber-100 mt-2">
                {cart.length} item{cart.length > 1 ? 's' : ''} • Ready to order
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate("/user/menu/all")}
                className="px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors"
              >
                ← Continue Shopping
              </button>
              <button
                onClick={clearCart}
                className="px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* CART ITEMS SECTION */}
          <div className="lg:col-span-2">
            {/* Out of Stock Warning */}
            {hasUnavailableItem && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 bg-linear-to-r from-red-50 to-red-100 border border-red-200 rounded-2xl p-6"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center shrink-0">
                    <span className="text-red-600 text-xl">⚠️</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-red-800 mb-2">Unavailable Items</h3>
                    <p className="text-red-700 mb-3">
                      Some items in your cart are currently out of stock. Please remove them to proceed.
                    </p>
                    <div className="space-y-2">
                      {unavailableItems.map((item) => (
                        <div key={item.id} className="flex items-center justify-between p-3 bg-white rounded-lg border border-red-200">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded overflow-hidden">
                              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                            </div>
                            <span className="font-medium">{item.name}</span>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="px-3 py-1 bg-red-100 text-red-700 rounded-lg text-sm hover:bg-red-200 transition-colors"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Cart Items List */}
            <div className="space-y-6">
              <AnimatePresence>
                {cart.map((item, index) => {
                  const menu = menus.find(m => m.id === item.id);
                  const isUnavailable = menu?.status === "habis";
                  
                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -5 }}
                      className={`bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border overflow-hidden ${
                        isUnavailable ? 'border-red-200 bg-red-50/50' : 'border-amber-100'
                      }`}
                    >
                      <div className="flex">
                        {/* Item Image */}
                        <div className="w-32 h-32 shrink-0 relative">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                          {isUnavailable && (
                            <div className="absolute inset-0 bg-red-500/20 backdrop-blur-[1px] flex items-center justify-center">
                              <span className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                                OUT OF STOCK
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Item Details */}
                        <div className="flex-1 p-6">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h3 className="text-xl font-bold text-gray-800">{item.name}</h3>
                              <div className="flex items-center space-x-2 mt-1">
                                <span className="px-3 py-1 bg-amber-100 text-amber-700 text-sm rounded-full">
                                  {item.category}
                                </span>
                                <span className="text-gray-400">•</span>
                                <span className="text-gray-600 text-sm">Item ID: #{item.id}</span>
                              </div>
                            </div>
                            
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-gray-400 hover:text-red-500 transition-colors p-2"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>

                          {/* Quantity Controls and Price */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center space-x-3">
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() => decreaseQty(item.id)}
                                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                                    isUnavailable 
                                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                  }`}
                                  disabled={isUnavailable}
                                >
                                  <span className="text-xl">−</span>
                                </motion.button>
                                
                                <span className={`font-bold text-2xl min-w-10 text-center ${
                                  isUnavailable ? 'text-gray-400' : 'text-gray-800'
                                }`}>
                                  {item.qty}
                                </span>
                                
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() => increaseQty(item.id)}
                                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                                    isUnavailable 
                                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                                      : 'bg-linear-to-r from-amber-500 to-amber-600 text-white hover:shadow-md'
                                  }`}
                                  disabled={isUnavailable}
                                >
                                  <span className="text-xl">+</span>
                                </motion.button>
                              </div>
                              
                              {isUnavailable && (
                                <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-semibold">
                                  Unavailable
                                </span>
                              )}
                            </div>

                            <div className="text-right">
                              <div className="text-sm text-gray-500 mb-1">Subtotal</div>
                              <div className={`text-2xl font-bold ${
                                isUnavailable ? 'text-gray-400' : 'text-amber-700'
                              }`}>
                                Rp {(item.price * item.qty).toLocaleString()}
                              </div>
                              <div className="text-sm text-gray-500">
                                Rp {item.price.toLocaleString()} each
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>

          {/* ORDER SUMMARY SIDEBAR */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-amber-100 p-6 sticky top-8"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Order Summary</h2>
                <div className="w-10 h-10 bg-linear-to-r from-amber-500 to-amber-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-lg">📦</span>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Items ({cart.length})</span>
                  <span className="text-gray-600 font-medium">Rp {total.toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Tax (5%)</span>
                  <span className="text-gray-600 font-medium">Rp {tax.toLocaleString()}</span>
                </div>
                
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-800">Total Amount</span>
                    <div>
                      <p className="text-3xl font-bold text-amber-700">
                        Rp {grandTotal.toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-500 text-right">Including tax</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Checkout Button */}
              <motion.button
                whileHover={!hasUnavailableItem ? { scale: 1.02 } : {}}
                whileTap={!hasUnavailableItem ? { scale: 0.98 } : {}}
                disabled={hasUnavailableItem}
                onClick={() => setShowCheckoutModal(true)}
                className={`w-full py-4 rounded-xl font-bold transition-all duration-300 flex items-center justify-center space-x-2 mb-4 ${
                  hasUnavailableItem
                    ? "bg-linear-to-r from-gray-400 to-gray-500 text-gray-100 cursor-not-allowed"
                    : "bg-linear-to-r from-amber-600 to-amber-700 text-white shadow-lg hover:shadow-xl"
                }`}
              >
                <span>Proceed to Checkout</span>
                <span>→</span>
              </motion.button>

              {/* Order Info */}
              <div className="text-center text-sm text-gray-500">
                <p>Pay at counter • Show order code</p>
                <p className="text-xs mt-1">No online payment required</p>
              </div>

              
            </motion.div>
          </div>
        </div>
      </div>

      {/* CHECKOUT MODAL */}
      <AnimatePresence>
        {showCheckoutModal && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
              onClick={() => setShowCheckoutModal(false)}
            />
            
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              onClick={() => setShowCheckoutModal(false)}
            >
              <div
                className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
                onClick={e => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div className="bg-linear-to-r from-amber-700 to-amber-800 text-white p-8 rounded-t-3xl">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-2xl font-bold mb-2">Complete Your Order</h2>
                      <p className="text-amber-100">One last step to confirm your order</p>
                    </div>
                    <button
                      onClick={() => setShowCheckoutModal(false)}
                      className="text-amber-100 hover:text-white text-2xl"
                    >
                      ✕
                    </button>
                  </div>
                </div>

                {/* Modal Body */}
                <div className="p-8">
                  <form onSubmit={handleOrderSubmit} className="space-y-6">
                    {/* Order Type Selection */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Order Type *
                      </label>
                      <div className="grid grid-cols-3 gap-3">
                        {['dine-in', 'takeaway', 'pickup'].map((type) => (
                          <label key={type} className="relative">
                            <input
                              type="radio"
                              name="orderType"
                              value={type}
                              checked={orderDetails.orderType === type}
                              onChange={(e) => setOrderDetails({...orderDetails, orderType: e.target.value})}
                              className="text-black sr-only peer"
                              required
                            />
                            <div className="text-black p-4 border-2 border-gray-300 rounded-xl text-center cursor-pointer transition-all peer-checked:border-amber-600 peer-checked:bg-amber-50 hover:border-amber-400">
                              <div className="text-2xl mb-2">
                                {type === 'dine-in' && '🍽️'}
                                {type === 'takeaway' && '🥡'}
                                {type === 'pickup' && '🏪'}
                              </div>
                              <span className="font-medium capitalize">{type.replace('-', ' ')}</span>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Name Field */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Enter your name"
                        value={orderDetails.name}
                        onChange={(e) =>
                          setOrderDetails({ ...orderDetails, name: e.target.value })
                        }
                        className="text-black w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all duration-300"
                      />
                    </div>

                    {/* Table Number (only for dine-in) */}
                    {orderDetails.orderType === 'dine-in' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Table Number *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g., Table 12"
                          value={orderDetails.tableNumber}
                          onChange={(e) =>
                            setOrderDetails({
                              ...orderDetails,
                              tableNumber: e.target.value,
                            })
                          }
                          className="text-black w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all duration-300"
                        />
                      </div>
                    )}

                    {/* Notes */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Special Instructions
                      </label>
                      <textarea
                        placeholder="Any special requests or notes for your order"
                        value={orderDetails.notes}
                        onChange={(e) =>
                          setOrderDetails({ ...orderDetails, notes: e.target.value })
                        }
                        rows="3"
                        className="text-black w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all duration-300"
                      />
                    </div>

                    {/* Order Review */}
                    <div className="bg-gray-50 rounded-xl p-6">
                      <h3 className="font-semibold text-gray-800 mb-4">Order Review</h3>
                      <div className="text-gray-800 space-y-3">
                        {cart.map(item => (
                          <div key={item.id} className="flex justify-between text-sm">
                            <span>{item.name} × {item.qty}</span>
                            <span className="font-medium">Rp {(item.price * item.qty).toLocaleString()}</span>
                          </div>
                        ))}
                        <div className="border-t border-gray-300 pt-3">
                          <div className="flex justify-between font-bold text-lg">
                            <span>Total to Pay</span>
                            <span className="text-amber-700">Rp {grandTotal.toLocaleString()}</span>
                          </div>
                          <p className="text-xs text-gray-500 text-right mt-1">Pay at counter</p>
                        </div>
                      </div>
                    </div>

                    {/* Terms & Order Code */}
                    <div className="bg-linear-to-r from-amber-50 to-amber-100/50 rounded-xl p-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-linear-to-r from-amber-500 to-amber-600 rounded-full flex items-center justify-center shrink-0 mt-1">
                          <span className="text-white text-xs">!</span>
                        </div>
                        <div>
                          <p className="text-sm text-gray-700">
                            After confirming, you'll receive an order code. Please show this code at the counter to complete your payment and receive your order.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Terms Agreement */}
                    <div className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        required
                        className="mt-1 text-amber-600 rounded focus:ring-amber-500"
                      />
                      <label className="text-sm text-gray-600">
                        I confirm that my order details are correct and agree to pay at the counter upon order pickup.
                      </label>
                    </div>

                    {/* Submit Button */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="w-full py-4 bg-linear-to-r from-green-600 to-green-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      Confirm & Generate Order Code
                    </motion.button>
                  </form>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default UserCart;

