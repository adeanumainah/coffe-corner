import { useContext, useState, useEffect, useRef } from "react";
import { MenuContext } from "../../context/MenuContext";
import { CartContext } from "../../context/CartContext";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

function UserMenuDetail() {
  const { category } = useParams();
  const navigate = useNavigate();
  const { menus } = useContext(MenuContext);
  const { addToCart } = useContext(CartContext);

  // States - TAMBAHKAN state untuk added items
  const [activeCategory, setActiveCategory] = useState(category || "all");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);
  const [selectedItem, setSelectedItem] = useState(null);
  const [notification, setNotification] = useState(null);
  const [likedItems, setLikedItems] = useState({});
  const [addedItems, setAddedItems] = useState({}); // untuk track item yang baru ditambahkan
  
  const ITEMS_PER_PAGE = 12;

  // Categories
  const categories = ["all", ...new Set(menus.map(m => m.category))];
  
  // Filter and sort
  const filtered = menus
    .filter(m => activeCategory === "all" ? true : m.category === activeCategory)
    .filter(m => m.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      if (sort === "name-asc") return a.name.localeCompare(b.name);
      if (sort === "name-desc") return b.name.localeCompare(b.name);
      return 0;
    });

  // Pagination
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  // Handle category change
  const handleCategoryChange = cat => {
    setActiveCategory(cat);
    setPage(1);
    navigate(`/user/menu/${cat}`);
  };

  // Show notification
  const showNotification = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  // Handle like item
  const handleLike = (menu) => {
    const newLikedItems = { ...likedItems };
    if (newLikedItems[menu.id]) {
      delete newLikedItems[menu.id];
      showNotification("like", `Removed ${menu.name} from favorites`);
    } else {
      newLikedItems[menu.id] = true;
      showNotification("like", `Added ${menu.name} to favorites ❤️`);
    }
    setLikedItems(newLikedItems);
    localStorage.setItem("likedItems", JSON.stringify(newLikedItems));
  };

  // Load liked items from localStorage
  useEffect(() => {
    const savedLikes = localStorage.getItem("likedItems");
    if (savedLikes) {
      setLikedItems(JSON.parse(savedLikes));
    }
  }, []);

  // Quick add to cart - DIUBAH TANPA DOM MANIPULATION
  const handleQuickAdd = (menu) => {
    addToCart(menu);
    showNotification("cart", `Added ${menu.name} to cart! 🛒`);
    
    // Set state untuk button effect
    setAddedItems(prev => ({
      ...prev,
      [menu.id]: true
    }));
    
    setTimeout(() => {
      setAddedItems(prev => {
        const newState = { ...prev };
        delete newState[menu.id];
        return newState;
      });
    }, 1500);
  };

  // Quick add from modal
  const handleModalAdd = (menu) => {
    addToCart(menu);
    setSelectedItem(null);
    showNotification("cart", `Added ${menu.name} to cart! 🛒`);
  };

  // Fungsi untuk menentukan button text dan style
  const getButtonState = (menu) => {
    if (menu.status === "habis") {
      return {
        text: "Sold Out",
        className: "bg-linear-to-r from-gray-400 to-gray-500 text-gray-200 cursor-not-allowed"
      };
    }
    
    if (addedItems[menu.id]) {
      return {
        text: "✓ Added!",
        className: "bg-green-500 text-white"
      };
    }
    
    return {
      text: "+ Add",
      className: "bg-linear-to-r from-amber-600 to-amber-700 text-white hover:shadow-lg hover:from-amber-700 hover:to-amber-800"
    };
  };

  return (
    <>
      {/* Notification Toast */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -50, x: 50 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            className={`fixed top-6 right-6 z-50 px-5 py-3 rounded-xl shadow-lg backdrop-blur-sm flex items-center space-x-2 ${
              notification.type === "cart" 
                ? "bg-linear-to-r from-green-500 to-green-600 text-white" 
                : "bg-linear-to-r from-pink-500 to-red-500 text-white"
            }`}
          >
            <span className="text-lg">
              {notification.type === "cart" ? "🛒" : "❤️"}
            </span>
            <span className="font-medium text-sm">{notification.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="min-h-screen bg-linear-to-b from-amber-50/30 to-white">
        {/* Header */}
        <div className="bg-linear-to-r from-amber-800 to-amber-600 relative overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/3 translate-y-1/3"></div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-12 relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-6 md:space-y-0">
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-white capitalize drop-shadow-md">
                  {activeCategory === "all" ? "All Menu Items" : activeCategory}
                </h1>
                <p className="text-amber-200 mt-2 text-base md:text-lg">
                  {filtered.length} items available
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                {/* Sort Dropdown */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-amber-200">↕️</span>
                  </div>
                  <select
                    value={sort}
                    onChange={e => setSort(e.target.value)}
                    className="w-full sm:w-56 pl-10 pr-10 py-3.5 bg-amber-950/50 backdrop-blur-md border border-amber-700/50 rounded-xl text-white placeholder-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-500/70 focus:border-amber-500 shadow-lg transition-all duration-300 appearance-none cursor-pointer"
                  >
                    <option value="" className="bg-white text-black">Sort by: Recommended</option>
                    <option value="price-asc" className="bg-white text-black">Price: Low to High</option>
                    <option value="price-desc" className="bg-white text-black">Price: High to Low</option>
                    <option value="name-asc" className="bg-white text-black">Name: A to Z</option>
                    <option value="name-desc" className="bg-white text-black">Name: Z to A</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span className="text-amber-200">▼</span>
                  </div>
                </div>
                
                {/* Search Bar */}
                <div className="relative w-full md:w-96">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-amber-200">🔍</span>
                  </div>
                  <input
                    type="text"
                    placeholder="Search menu..."
                    className="w-full pl-10 pr-4 py-3.5 bg-amber-950/50 backdrop-blur-md border border-amber-700/50 rounded-xl text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-amber-500/70 focus:border-amber-500 shadow-lg transition-all duration-300"
                    value={search}
                    onChange={e => {
                      setSearch(e.target.value);
                      setPage(1);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 -mt-2">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Sidebar - Categories */}
            <div className="lg:w-64 shrink-0">
              <div className="bg-white backdrop-blur-lg rounded-2xl shadow-lg p-6 sticky top-6 border border-amber-100/50">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-linear-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center mr-3">
                    <span className="text-white">📁</span>
                  </div>
                  <h3 className="font-bold text-gray-800 text-lg">Categories</h3>
                </div>
                
                <div className="space-y-2">
                  {categories.map(cat => (
                    <motion.button
                      key={cat}
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleCategoryChange(cat)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 flex items-center justify-between group ${
                        activeCategory === cat
                          ? "bg-linear-to-r from-amber-600 to-amber-700 text-white shadow-md"
                          : "hover:bg-linear-to-r hover:from-amber-50 hover:to-amber-100/50 text-gray-700 border border-transparent hover:border-amber-200"
                      }`}
                    >
                      <div className="flex items-center">
                        <span className={`mr-2 ${
                          activeCategory === cat ? 'text-white' : 'text-amber-500'
                        }`}>
                        </span>
                        <span className="capitalize font-medium text-sm">
                          {cat === "all" ? "All Items" : cat}
                        </span>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold min-w-8 text-center ${
                        activeCategory === cat
                          ? "bg-white/30 text-white"
                          : "bg-amber-100 text-amber-700"
                      }`}>
                        {cat === "all" ? menus.length : menus.filter(m => m.category === cat).length}
                      </span>
                    </motion.button>
                  ))}
                </div>

                {/* Quick Stats */}
                <div className="mt-8 pt-6 border-t border-gray-100">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 bg-linear-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center mr-2">
                      <span className="text-white text-sm">📊</span>
                    </div>
                    <h4 className="font-bold text-gray-800 text-sm">Quick Stats</h4>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="bg-linear-to-r from-green-50 to-green-100/50 p-3 rounded-xl border border-green-200">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700 font-medium text-xs">Available Items</span>
                        <span className="text-lg font-bold text-green-600">
                          {menus.filter(m => m.status === "tersedia").length}
                        </span>
                      </div>
                    </div>
                    
                    <div className="bg-linear-to-r from-amber-50 to-amber-100/50 p-3 rounded-xl border border-amber-200">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700 font-medium text-xs">Total Categories</span>
                        <span className="text-lg font-bold text-amber-600">
                          {new Set(menus.map(m => m.category)).size}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {/* Filter Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {activeCategory !== "all" && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="px-4 py-1.5 bg-linear-to-r from-amber-600 to-amber-700 text-white rounded-full text-xs font-semibold flex items-center shadow-md"
                  >
                    <span className="mr-1">🏷️</span>
                    {activeCategory}
                    <button
                      onClick={() => handleCategoryChange("all")}
                      className="ml-2 hover:text-amber-200"
                    >
                      ×
                    </button>
                  </motion.span>
                )}
                {search && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="px-4 py-1.5 bg-linear-to-r from-gray-600 to-gray-700 text-white rounded-full text-xs font-semibold flex items-center shadow-md"
                  >
                    <span className="mr-1">🔍</span>
                    Search: "{search}"
                    <button
                      onClick={() => setSearch("")}
                      className="ml-2 hover:text-gray-300"
                    >
                      ×
                    </button>
                  </motion.span>
                )}
                {sort && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="px-4 py-1.5 bg-linear-to-r from-blue-500 to-blue-600 text-white rounded-full text-xs font-semibold flex items-center shadow-md"
                  >
                    <span className="mr-1">↕️</span>
                    {sort === "price-asc" ? "Price: Low to High" :
                     sort === "price-desc" ? "Price: High to Low" :
                     sort === "name-asc" ? "A → Z" : "Z → A"}
                    <button
                      onClick={() => setSort("")}
                      className="ml-2 hover:text-blue-200"
                    >
                      ×
                    </button>
                  </motion.span>
                )}
              </div>

              {/* Menu Grid */}
              {paginated.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-16 bg-linear-to-br from-white to-amber-50/50 backdrop-blur-sm rounded-2xl shadow-lg border border-amber-100"
                >
                  <div className="w-24 h-24 mx-auto mb-4 bg-linear-to-br from-amber-100 to-amber-200 rounded-full flex items-center justify-center shadow-md">
                    <span className="text-4xl">☕</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-700 mb-2">No items found</h3>
                  <p className="text-gray-500 mb-6 text-sm">
                    {search ? "Try a different search term" : "No items in this category"}
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setSearch("");
                      setActiveCategory("all");
                    }}
                    className="px-6 py-3 bg-linear-to-r from-amber-600 to-amber-700 text-white rounded-full hover:shadow-lg transition-all duration-300 text-sm font-semibold shadow-md"
                  >
                    View All Items
                  </motion.button>
                </motion.div>
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                    <AnimatePresence>
                      {paginated.map((menu, index) => {
                        const buttonState = getButtonState(menu);
                        
                        return (
                          <motion.div
                            key={menu.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ delay: index * 0.03 }}
                            layout
                            whileHover={{ y: -5, scale: 1.02 }}
                            className="group"
                          >
                            <div className={`bg-linear-to-b from-white to-amber-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 h-full border ${
                              menu.status === "habis" 
                                ? "border-gray-200 opacity-90" 
                                : "border-amber-100 group-hover:border-amber-300"
                            }`}>
                              {/* Image */}
                              <div className="relative h-40 sm:h-48 overflow-hidden">
                                <img
                                  src={menu.image}
                                  alt={menu.name}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                
                                {/* Status Badge */}
                                <div className="absolute top-2 right-2">
                                  <span className={`px-2 py-1 rounded-full text-xs font-bold shadow-sm ${
                                    menu.status === "tersedia"
                                      ? "bg-linear-to-r from-green-500 to-green-600 text-white"
                                      : "bg-linear-to-r from-gray-600 to-gray-700 text-white"
                                  }`}>
                                    {menu.status === "tersedia" ? "Available" : "Sold Out"}
                                  </span>
                                </div>
                                
                                {/* Quick View Overlay */}
                                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                                  <div className="p-3 w-full">
                                    <motion.button
                                      whileHover={{ scale: 1.02 }}
                                      whileTap={{ scale: 0.98 }}
                                      onClick={() => setSelectedItem(menu)}
                                      className="w-full py-2 bg-white/90 backdrop-blur-sm text-gray-800 rounded-lg font-semibold hover:bg-white transition-all duration-200 text-sm shadow-md"
                                    >
                                      Quick View 👁️
                                    </motion.button>
                                  </div>
                                </div>
                              </div>

                              {/* Content */}
                              <div className="p-4">
                                <div className="mb-3">
                                  <div className="flex justify-between items-start mb-1">
                                    <h3 className="font-bold text-gray-800 text-sm truncate flex-1 mr-2">
                                      {menu.name}
                                    </h3>
                                    <button
                                      onClick={() => handleLike(menu)}
                                      className={`text-lg transition-all duration-200 hover:scale-110 ${
                                        likedItems[menu.id] 
                                          ? "text-red-500 transform scale-105" 
                                          : "text-gray-400"
                                      }`}
                                    >
                                      {likedItems[menu.id] ? "❤️" : "🤍"}
                                    </button>
                                  </div>
                                  <div className="flex items-center">
                                    <span className="px-3 py-1 bg-linear-to-r from-amber-100 to-amber-200 text-amber-700 text-xs font-semibold rounded-full">
                                      {menu.category}
                                    </span>
                                  </div>
                                </div>

                                <div className="flex items-center justify-between pt-3 border-t border-amber-100">
                                  <div>
                                    <p className="text-gray-500 text-xs mb-1">Price</p>
                                    <p className="text-sm font-bold text-amber-700">
                                      Rp {menu.price.toLocaleString()}
                                    </p>
                                  </div>
                                  
                                  <motion.button
                                    whileHover={menu.status !== "habis" ? { scale: 1.05 } : {}}
                                    whileTap={menu.status !== "habis" ? { scale: 0.95 } : {}}
                                    onClick={() => handleQuickAdd(menu)}
                                    disabled={menu.status === "habis"}
                                    className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 shadow-md text-sm ${buttonState.className}`}
                                  >
                                    {buttonState.text}
                                  </motion.button>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </AnimatePresence>
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex justify-center items-center space-x-3 mt-12">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                        disabled={page === 1}
                        className="px-4 py-2.5 bg-white border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors flex items-center font-medium text-sm shadow-sm"
                      >
                        ← Previous
                      </motion.button>

                      <div className="flex items-center space-x-2">
                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                          let pageNum;
                          if (totalPages <= 5) {
                            pageNum = i + 1;
                          } else if (page <= 3) {
                            pageNum = i + 1;
                          } else if (page >= totalPages - 2) {
                            pageNum = totalPages - 4 + i;
                          } else {
                            pageNum = page - 2 + i;
                          }

                          return (
                            <motion.button
                              key={pageNum}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => setPage(pageNum)}
                              className={`w-10 h-10 rounded-lg font-medium transition-all duration-200 shadow-sm text-sm ${
                                page === pageNum
                                  ? "bg-linear-to-r from-amber-600 to-amber-700 text-white scale-105"
                                  : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                              }`}
                            >
                              {pageNum}
                            </motion.button>
                          );
                        })}
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={page === totalPages}
                        className="px-4 py-2.5 bg-white border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors flex items-center font-medium text-sm shadow-sm"
                      >
                        Next →
                      </motion.button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>

        {/* Quick View Modal */}
        <AnimatePresence>
          {selectedItem && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedItem(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 10 }}
                className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-xl"
                onClick={e => e.stopPropagation()}
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h2 className="text-xl font-bold text-gray-800">{selectedItem.name}</h2>
                      <p className="text-gray-600 text-sm">{selectedItem.category}</p>
                    </div>
                    <button
                      onClick={() => setSelectedItem(null)}
                      className="text-gray-400 hover:text-gray-600 bg-gray-100 hover:bg-gray-200 w-8 h-8 rounded-full flex items-center justify-center transition-colors text-lg"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="rounded-xl overflow-hidden shadow-lg">
                      <img
                        src={selectedItem.image}
                        alt={selectedItem.name}
                        className="w-full h-60 object-cover"
                      />
                    </div>
                    
                    <div>
                      <div className="mb-6">
                        <h3 className="font-bold text-gray-700 text-sm mb-2">Description</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          A delicious {selectedItem.category.toLowerCase()} perfect for any time of day. 
                          Carefully crafted with premium ingredients for the best experience.
                        </p>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <p className="text-gray-500 text-xs mb-1">Price</p>
                          <p className="text-2xl font-bold text-amber-700">
                            Rp {selectedItem.price.toLocaleString()}
                          </p>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <p className="text-gray-500 text-xs mb-1">Status</p>
                            <span className={`px-3 py-1.5 rounded-lg text-xs font-semibold w-full block text-center ${
                              selectedItem.status === "tersedia"
                                ? "bg-linear-to-r from-green-100 to-green-200 text-green-800 border border-green-300"
                                : "bg-linear-to-r from-red-100 to-red-200 text-red-800 border border-red-300"
                            }`}>
                              {selectedItem.status === "tersedia" ? "In Stock 🟢" : "Out of Stock 🔴"}
                            </span>
                          </div>
                          
                          <div>
                            <p className="text-gray-500 text-xs mb-1">Category</p>
                            <span className="px-3 py-1.5 bg-linear-to-r from-amber-100 to-amber-200 text-amber-700 rounded-lg text-xs font-semibold w-full block text-center border border-amber-300">
                              {selectedItem.category}
                            </span>
                          </div>
                        </div>

                        <div className="flex space-x-3 pt-4">
                          <button
                            onClick={() => handleLike(selectedItem)}
                            className={`px-4 py-2.5 rounded-lg font-medium transition-all duration-200 flex-1 flex items-center justify-center space-x-2 ${
                              likedItems[selectedItem.id]
                                ? "bg-linear-to-r from-pink-500 to-red-500 text-white shadow-md hover:shadow-lg"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                          >
                            <span>{likedItems[selectedItem.id] ? "❤️" : "🤍"}</span>
                            <span className="text-sm">{likedItems[selectedItem.id] ? "Liked" : "Like"}</span>
                          </button>
                          
                          <button
                            onClick={() => handleModalAdd(selectedItem)}
                            disabled={selectedItem.status === "habis"}
                            className={`px-4 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 flex-1 ${
                              selectedItem.status === "habis"
                                ? "bg-linear-to-r from-gray-400 to-gray-500 text-gray-200 cursor-not-allowed"
                                : "bg-linear-to-r from-amber-600 to-amber-700 text-white hover:shadow-lg hover:from-amber-700 hover:to-amber-800"
                            }`}
                          >
                            {selectedItem.status === "habis" ? "Sold Out" : "Add to Cart 🛒"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

export default UserMenuDetail;
