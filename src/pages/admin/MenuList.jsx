import { useContext, useState } from "react";
import { MenuContext } from "../../context/MenuContext";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

function MenuList() {
  const { menus, setMenus } = useContext(MenuContext);

  const [formData, setFormData] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formError, setFormError] = useState("");

  const ITEMS_PER_PAGE = 8;

  // Categories
  const categories = ["All", ...new Set(menus.map(m => m.category))];

  // Filter + Search
  const filteredMenus = menus
    .filter(m =>
      selectedCategory === "All"
        ? true
        : m.category === selectedCategory
    )
    .filter(m =>
      m.name.toLowerCase().includes(search.toLowerCase())
    );

  // Sorting
  const sortedMenus = [...filteredMenus].sort((a, b) => {
    if (sortBy === "price-asc") return a.price - b.price;
    if (sortBy === "price-desc") return b.price - a.price;
    if (sortBy === "name-asc") return a.name.localeCompare(b.name);
    if (sortBy === "name-desc") return b.name.localeCompare(a.name);
    return 0;
  });

  // Pagination
  const totalPages = Math.ceil(sortedMenus.length / ITEMS_PER_PAGE);
  const paginatedMenus = sortedMenus.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Add Menu dengan VALIDASI
  function handleAdd() {
    // Reset error
    setFormError("");

    // ✅ VALIDASI 1: Input kosong
    if (!formData.name || !formData.category || !formData.price) {
      setFormError("❌ Please fill in all required fields: Name, Category, and Price");
      return;
    }

    // ✅ VALIDASI 2: Nama minimal 3 karakter
    if (formData.name.trim().length < 3) {
      setFormError("❌ Menu name must be at least 3 characters long");
      return;
    }

    // ✅ VALIDASI 3: Harga harus angka positif
    if (formData.price <= 0 || isNaN(formData.price)) {
      setFormError("❌ Price must be a positive number");
      return;
    }

    // ✅ VALIDASI 4: Harga maksimal 10 juta
    if (formData.price > 10000000) {
      setFormError("❌ Price cannot exceed Rp 10,000,000");
      return;
    }

    // ✅ VALIDASI 5: Image URL valid jika diisi
    if (formData.image && !formData.image.startsWith('http')) {
      setFormError("❌ Please enter a valid image URL (must start with http/https)");
      return;
    }

    // ✅ SEMUA VALIDASI LULUS
    const newId = menus.length > 0 ? Math.max(...menus.map(m => m.id)) + 1 : 1;
    setMenus([
      ...menus,
      {
        id: newId,
        ...formData,
      },
    ]);
    setIsModalOpen(false);
    setFormData(null);
    setFormError("");
  }

  // Update Menu dengan VALIDASI
  function handleUpdate() {
    // Reset error
    setFormError("");

    // ✅ VALIDASI 1: Input kosong
    if (!formData.name || !formData.category || !formData.price) {
      setFormError("❌ Please fill in all required fields: Name, Category, and Price");
      return;
    }

    // ✅ VALIDASI 2: Nama minimal 3 karakter
    if (formData.name.trim().length < 3) {
      setFormError("❌ Menu name must be at least 3 characters long");
      return;
    }

    // ✅ VALIDASI 3: Harga harus angka positif
    if (formData.price <= 0 || isNaN(formData.price)) {
      setFormError("❌ Price must be a positive number");
      return;
    }

    // ✅ VALIDASI 4: Harga maksimal 10 juta
    if (formData.price > 10000000) {
      setFormError("❌ Price cannot exceed Rp 10,000,000");
      return;
    }

    // ✅ VALIDASI 5: Image URL valid jika diisi
    if (formData.image && !formData.image.startsWith('http')) {
      setFormError("❌ Please enter a valid image URL (must start with http/https)");
      return;
    }

    // ✅ SEMUA VALIDASI LULUS
    setMenus(menus.map(m => (m.id === formData.id ? formData : m)));
    setIsModalOpen(false);
    setFormData(null);
    setIsEdit(false);
    setFormError("");
  }

  // Delete Menu
  function handleDelete(id) {
    if (window.confirm("Are you sure you want to delete this menu item?")) {
      setMenus(menus.filter(m => m.id !== id));
    }
  }

  // Open Modal
  const openModal = (menu = null) => {
    setFormError(""); // Reset error saat buka modal
    if (menu) {
      setFormData(menu);
      setIsEdit(true);
    } else {
      setFormData({
        name: "",
        category: "",
        price: "",
        image: "",
        status: "tersedia",
      });
      setIsEdit(false);
    }
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-amber-50/30 to-brown-50/20 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold bg-linear-to-r from-amber-600 to-amber-400 bg-clip-text text-transparent">
              Menu Management
            </h1>
            <p className="text-gray-990 mt-2">
              Manage your cafe's menu items, categories, and availability
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => openModal()}
            className="mt-4 md:mt-0 px-6 py-3 bg-linear-to-r from-amber-600 to-amber-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2"
          >
            <span className="text-xl">+</span>
            <span className="font-semibold">Add New Menu</span>
          </motion.button>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/50 shadow-sm">
            <p className="text-sm text-gray-500">Total Items</p>
            <p className="text-2xl font-bold text-gray-800">{menus.length}</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/50 shadow-sm">
            <p className="text-sm text-gray-500">Available</p>
            <p className="text-2xl font-bold text-green-600">
              {menus.filter(m => m.status === "tersedia").length}
            </p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/50 shadow-sm">
            <p className="text-sm text-gray-500">Out of Stock</p>
            <p className="text-2xl font-bold text-red-500">
              {menus.filter(m => m.status === "habis").length}
            </p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/50 shadow-sm">
            <p className="text-sm text-gray-500">Categories</p>
            <p className="text-2xl font-bold text-amber-600">
              {new Set(menus.map(m => m.category)).size}
            </p>
          </div>
        </div>

        {/* Filter Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg mb-8">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Category Filter */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Category
              </label>
              <div className="flex flex-wrap gap-2">
                {categories.map(cat => (
                  <motion.button
                    key={cat}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setSelectedCategory(cat);
                      setCurrentPage(1);
                    }}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                      selectedCategory === cat
                        ? "bg-linear-to-r from-amber-600 to-amber-700 text-white shadow-md"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {cat}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Search and Sort */}
            <div className="flex-1 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search Menu
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-400">🔍</span>
                  </div>
                  <input
                    type="text"
                    placeholder="Search menu items..."
                    value={search}
                    onChange={e => {
                      setSearch(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="text-gray-800 w-full pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all duration-300"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sort By
                </label>
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                  className="text-gray-700 w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all duration-300 "
                >
                  <option value=""className="text-gray-700">Default Order</option>
                  <option value="name-asc"className="text-gray-700">Name (A-Z)</option>
                  <option value="name-desc"className="text-gray-700">Name (Z-A)</option>
                  <option value="price-asc"className="text-gray-700">Price (Low to High)</option>
                  <option value="price-desc"className="text-gray-700">Price (High to Low)</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Menu Grid */}
        {paginatedMenus.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 bg-white/80 backdrop-blur-sm rounded-2xl border border-white/50 shadow-lg"
          >
            <div className="w-24 h-24 mx-auto mb-4 bg-amber-100 rounded-full flex items-center justify-center">
              <span className="text-3xl">📋</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No Menu Items Found</h3>
            <p className="text-gray-500 mb-6">
              {search ? "Try a different search term" : "Add your first menu item to get started"}
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => openModal()}
              className="px-6 py-3 bg-linear-to-r from-amber-600 to-amber-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Add New Menu Item
            </motion.button>
          </motion.div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8 ">
              {paginatedMenus.map((menu, index) => (
                <motion.div
                  key={menu.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="group"
                >
                  <div className="bg-linear-to-b from-white to-amber-50 rounded-xl overflow-hidden border border-amber-100 shadow-sm hover:shadow-xl transition-all duration-300 h-full ">
                    {/* Image Section */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={menu.image}
                        alt={menu.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-3 right-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          menu.status === "tersedia" 
                            ? "bg-green-100 text-green-800" 
                            : "bg-red-100 text-red-800"
                        }`}>
                          {menu.status === "tersedia" ? "Available" : "Out of Stock"}
                        </span>
                      </div>
                      <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    {/* Content Section */}
                    <div className="p-5 bg-white dark:bg-gray-100">
                      <div className="mb-3">
                        <h3 className="font-bold text-gray-800 text-lg truncate">{menu.name}</h3>
                        <div className="flex items-center mt-1">
                          <span className="px-2 py-1 bg-amber-100 text-amber-700 text-xs font-medium rounded">
                            {menu.category}
                          </span>
                        </div>
                      </div>

                      <div className="flex justify-between items-center mb-4">
                        <div>
                          <p className="text-sm text-gray-500">Price</p>
                          <p className="text-xl font-bold text-amber-700">
                            Rp {menu.price.toLocaleString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-500">ID</p>
                          <p className="text-sm font-mono text-gray-600">#{menu.id}</p>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => openModal(menu)}
                          className="flex-1 px-4 py-2.5 bg-linear-to-r from-amber-500 to-amber-600 text-white rounded-lg text-sm font-semibold hover:shadow-md transition-shadow duration-300"
                        >
                          Edit
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleDelete(menu.id)}
                          className="px-4 py-2.5 bg-linear-to-r from-red-500 to-red-600 text-white rounded-lg text-sm font-semibold hover:shadow-md transition-shadow duration-300"
                        >
                          Delete
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center space-x-2 mb-8">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="text-gray-700 px-4 py-2 bg-white border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                >
                  ← Previous
                </motion.button>

                <div className="flex space-x-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }

                    return (
                      <motion.button
                        key={pageNum}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                          currentPage === pageNum
                            ? "bg-linear-to-r from-amber-600 to-amber-700 text-white shadow-md"
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
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="text-gray-700 px-4 py-2 bg-white border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                >
                  Next →
                </motion.button>
              </div>
            )}
          </>
        )}

      </div>

      {/* Modal - Add/Edit Menu */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="sticky top-0 bg-linear-to-r from-amber-50 to-amber-100 px-6 py-4 rounded-t-2xl border-b border-amber-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-linear-to-r from-amber-600 to-amber-700 rounded-lg flex items-center justify-center">
                      <span className="text-white text-lg">
                        {isEdit ? "✏️" : "➕"}
                      </span>
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-800">
                        {isEdit ? "Edit Menu Item" : "Add New Menu Item"}
                      </h2>
                      <p className="text-sm text-gray-600">
                        {isEdit ? "Update menu details" : "Fill in the details below"}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {formError && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mx-6 mt-4 p-3 bg-red-50 border-l-4 border-red-500 rounded-r-lg"
                >
                  <div className="flex items-center space-x-2">
                    <span className="text-red-500">⚠️</span>
                    <p className="text-sm text-red-700 font-medium">{formError}</p>
                  </div>
                </motion.div>
              )}

              {/* Modal Form */}
              <div className="p-6">
                <form
                  onSubmit={e => {
                    e.preventDefault();
                    isEdit ? handleUpdate() : handleAdd();
                  }}
                  className="text-gray-800 space-y-4"
                >
                  {/* Image Preview */}
                  {formData?.image && (
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Image Preview
                      </label>
                      <div className="relative h-40 rounded-lg overflow-hidden border border-gray-300">
                        <img
                          src={formData.image}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Name */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Menu Name *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g., Cappuccino"
                        value={formData?.name || ""}
                        onChange={e =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all duration-300"
                        required
                      />
                    </div>

                    {/* Category */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g., Coffee, Dessert"
                        value={formData?.category || ""}
                        onChange={e =>
                          setFormData({ ...formData, category: e.target.value })
                        }
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all duration-300"
                        required
                      />
                    </div>

                    {/* Price */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Price (Rp) *
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-gray-500">Rp</span>
                        </div>
                        <input
                          type="number"
                          placeholder="25000"
                          value={formData?.price || ""}
                          onChange={e =>
                            setFormData({
                              ...formData,
                              price: Number(e.target.value),
                            })
                          }
                          className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all duration-300"
                          required
                          min="1"
                          max="10000000"
                        />
                      </div>
                    </div>

                    {/* Status */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Status *
                      </label>
                      <select
                        value={formData?.status || "tersedia"}
                        onChange={e =>
                          setFormData({ ...formData, status: e.target.value })
                        }
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all duration-300"
                      >
                        <option value="tersedia">Available</option>
                        <option value="habis">Out of Stock</option>
                      </select>
                    </div>
                  </div>

                  {/* Image URL */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Image URL
                    </label>
                    <input
                      type="text"
                      placeholder="https://example.com/image.jpg"
                      value={formData?.image || ""}
                      onChange={e =>
                        setFormData({ ...formData, image: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all duration-300"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Optional. Must start with http:// or https://
                    </p>
                  </div>

                  {/* Form Actions */}
                  <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setIsModalOpen(false);
                        setFormError("");
                      }}
                      className="px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors duration-300"
                    >
                      Cancel
                    </motion.button>
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-3 bg-linear-to-r from-amber-600 to-amber-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      {isEdit ? "Update Menu" : "Add Menu"}
                    </motion.button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default MenuList;
