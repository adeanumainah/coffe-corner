import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

function Footer() {
  const { theme } = useContext(ThemeContext);

  const whatsappNumber = "6282320216812";
  const whatsappMessage = "Halo Coffee Corner! Saya ingin bertanya..."; 
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <footer className={`mt-auto py-6 transition-colors duration-300 ${
      theme === "dark" 
        ? "bg-gray-800 border-t border-gray-700 text-gray-300" 
        : "bg-amber-50 border-t border-amber-200 text-gray-700"
    }`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-3 mb-4 md:mb-0">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              theme === "dark" 
                ? "bg-linear-to-br from-amber-500 to-amber-700" 
                : "bg-linear-to-br from-amber-600 to-amber-800"
            }`}>
              <span className="text-white">☕</span>
            </div>
            <div>
              <h3 className="font-bold text-lg">Coffee Corner</h3>
              <p className={`text-xs ${
                theme === "dark" ? "text-gray-400" : "text-amber-600"
              }`}>
                Brewing happiness since 2024
              </p>
            </div>
          </div>
          
          <div className={`text-sm ${
            theme === "dark" ? "text-gray-400" : "text-gray-600"
          }`}>
            <p>© {new Date().getFullYear()} Coffee Corner. All rights reserved.</p>
            <p className="text-xs mt-1">Made with ❤️ for coffee lovers everywhere</p>
          </div>
          
          <div className="flex space-x-6 mt-4 md:mt-0 text-sm">
            <a 
              href="#" 
              className={`hover:text-amber-600 dark:hover:text-amber-400 transition-colors ${
                theme === "dark" ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Terms
            </a>
            <a 
              href="#" 
              className={`hover:text-amber-600 dark:hover:text-amber-400 transition-colors ${
                theme === "dark" ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Privacy
            </a>
            <a 
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className={`hover:text-amber-600 dark:hover:text-amber-400 transition-colors ${
                theme === "dark" ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;