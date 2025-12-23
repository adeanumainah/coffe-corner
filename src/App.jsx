import { Outlet } from "react-router-dom";
import { useContext, useEffect } from "react"; // ✅ Tambah useEffect
import { AuthContext } from "./context/AuthContext";
import { ThemeContext, ThemeProvider } from "./context/ThemeContext";
import Navbar from "./components/Navbar";
import UserNavbar from "./components/UserNavbar";
import Footer from "./components/Footer";

function AppContent() {
  const { currentUser } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);

  // ✅ Gunakan useEffect untuk manipulasi DOM di komponen React
  useEffect(() => {
    // Update HTML root class
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    
    // Update meta theme-color
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      const themeColor = theme === 'dark' ? '#0f172a' : '#fffbeb';
      metaThemeColor.setAttribute('content', themeColor);
    }
  }, [theme]); // ✅ Run ketika theme berubah

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      theme === 'dark' 
        ? 'bg-linear-to-br from-gray-950 via-gray-900 to-gray-950 text-gray-100' 
        : 'bg-linear-to-br from-amber-50 via-white to-amber-50/50 text-gray-800'
    }`}>
      {currentUser?.role === "admin" && <Navbar />}
      {currentUser?.role === "user" && <UserNavbar />}
      
      <main className="min-h-[calc(100vh-140px)]">
        <Outlet />
      </main>
      
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}