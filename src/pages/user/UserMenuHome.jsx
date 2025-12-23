import { useContext, useState } from "react";
import { MenuContext } from "../../context/MenuContext";
import { CartContext } from "../../context/CartContext";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

function UserMenuHome() {
  const { menus } = useContext(MenuContext);
  const { addToCart } = useContext(CartContext);
  
  // State untuk notification
  const [notification, setNotification] = useState(null);

  // Featured items (bisa pakai rating atau popularitas)
  const featuredItems = menus.slice(0, 4);
  
  // Categories dengan count
  const categoryCount = menus.reduce((acc, menu) => {
    acc[menu.category] = (acc[menu.category] || 0) + 1;
    return acc;
  }, {});
  
  const categories = [...new Set(menus.map(m => m.category))];

  // Function untuk show notification
  const showNotification = (message) => {
    setNotification({ message });
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  // Handle add to cart dengan notification
  const handleAddToCart = (item) => {
    if (item.status === "habis") return;
    
    addToCart(item);
    showNotification(`Added ${item.name} to cart! 🛒`);
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-amber-50/50 to-white">
      {/* Notification Toast */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -50, x: 50 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            className="fixed top-6 right-6 z-50 px-5 py-3 rounded-xl shadow-lg backdrop-blur-sm flex items-center space-x-2 bg-linear-to-r from-green-500 to-green-600 text-white"
          >
            <span className="text-lg">🛒</span>
            <span className="font-medium text-sm">{notification.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-linear-to-r from-amber-900/90 to-brown-800/90">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=1600')] bg-cover bg-center opacity-20" />
        
        <div className="relative max-w-7xl mx-auto px-6 py-16 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Discover Your Perfect Brew ☕
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-amber-100 mb-8 max-w-2xl mx-auto"
          >
            Handcrafted with passion, served with perfection. Experience coffee like never before.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex justify-center space-x-4"
          >
            <Link
              to="/user/menu/all"
              className="px-8 py-3 bg-white text-amber-800 font-semibold rounded-full hover:bg-amber-50 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Explore Menu →
            </Link>
           
          </motion.div>
        </div>
      </div>

      {/* Featured Section */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex justify-between items-center mb-8"
        >
          <div>
            <h2 className="text-3xl font-bold text-gray-800">🌟 Featured Items</h2>
            <p className="text-gray-600">Our most loved creations by customers</p>
          </div>
          <Link
            to="/user/menu/all"
            className="text-amber-700 hover:text-amber-800 font-semibold flex items-center space-x-2"
          >
            <span>View All</span>
            <span>→</span>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group"
            >
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 h-full">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3">
                    <span className="px-3 py-1 bg-linear-to-r from-amber-500 to-amber-600 text-white text-xs font-semibold rounded-full shadow">
                      Popular
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3 flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-yellow-400">★</span>
                    ))}
                  </div>
                </div>
                
                <div className="p-5">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-bold text-lg text-gray-800 truncate">{item.name}</h3>
                    <span className="text-sm px-2 py-1 bg-amber-100 text-amber-800 rounded-full">
                      {item.category}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-gray-500 text-sm">Starting from</p>
                      <p className="text-2xl font-bold text-amber-700">
                        Rp {item.price.toLocaleString()}
                      </p>
                    </div>
                    <button
                      onClick={() => handleAddToCart(item)}
                      disabled={item.status === "habis"}
                      className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                        item.status === "habis"
                          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                          : "bg-linear-to-r from-amber-600 to-amber-700 text-white hover:shadow-lg hover:from-amber-700 hover:to-amber-800"
                      }`}
                    >
                      {item.status === "habis" ? "Sold Out" : "Add +"}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Categories Section */}
      <div className="to-amber-50/30 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">✨ Browse by Category</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our carefully curated collection of beverages and treats, each crafted to perfection
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <Link
                  to={`/user/menu/${category}`}
                  className="block group"
                >
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/50 group-hover:border-amber-200">
                    <div className="w-16 h-16 mx-auto mb-4 bg-linear-to-br from-amber-100 to-amber-200 rounded-xl flex items-center justify-center">
                      <span className="text-2xl">
                        {category === "Coffee" && "☕"}
                        {category === "Tea" && "🍵"}
                        {category === "Dessert" && "🍰"}
                        {category === "Juice" && "🍹"}
                        {category === "Food" && "🍴"}
                        {!["Coffee", "Tea", "Dessert", "Juice", "Food"].includes(category) && "✨"}
                      </span>
                    </div>
                    <h3 className="font-semibold text-gray-800 text-center mb-1">{category}</h3>
                    <p className="text-sm text-gray-500 text-center">
                      {categoryCount[category] || 0} items
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-gray-200 bg-linear-to-r from-amber-600/10 to-brown-600/10 rounded-3xl p-8 md:p-12 text-center border border-amber-200"
        >
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            Ready to Order Your Favorite Brew?
          </h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who start their day with our premium coffee experience.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/user/menu/all"
              className="px-8 py-3 bg-linear-to-r from-amber-700 to-amber-800 text-white font-semibold rounded-full hover:shadow-xl transition-all duration-300"
            >
              View Full Menu
            </Link>
            <Link
              to="/user/cart"
              className="px-8 py-3 bg-white text-amber-700 font-semibold rounded-full border-2 border-amber-700 hover:bg-amber-50 transition-all duration-300"
            >
              Check Cart
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default UserMenuHome;
