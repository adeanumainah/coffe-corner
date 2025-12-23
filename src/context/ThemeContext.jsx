import { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const getInitialTheme = () => {
    try {
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem('theme');
        if (stored === 'light' || stored === 'dark') return stored;
        
        // Check system preference
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        return systemPrefersDark ? 'dark' : 'light';
      }
    } catch (error) {
      console.error('Error accessing localStorage:', error);
    }
    return 'light';
  };

  const [theme, setTheme] = useState('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTheme(getInitialTheme());
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // ✅ Hanya update localStorage, tidak manipulasi DOM
    localStorage.setItem('theme', theme);
    
  }, [theme, mounted]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const value = {
    theme,
    toggleTheme,
    isDark: theme === 'dark',
    setTheme,
    mounted
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};


// import { createContext, useState, useEffect } from 'react';

// export const ThemeContext = createContext();

// export const ThemeProvider = ({ children }) => {
//   const getInitialTheme = () => {
//     try {
//       if (typeof window !== 'undefined') {
//         const stored = localStorage.getItem('theme');
//         if (stored === 'light' || stored === 'dark') return stored;
        
//         // Check system preference
//         const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
//         return systemPrefersDark ? 'dark' : 'light';
//       }
//     } catch (error) {
//       console.error('Error accessing localStorage:', error);
//     }
//     return 'light';
//   };

//   const [theme, setTheme] = useState('light');
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     setTheme(getInitialTheme());
//     setMounted(true);
//   }, []);

//   useEffect(() => {
//     if (!mounted) return;

//     const root = document.documentElement;
//     root.classList.remove('light', 'dark');
//     root.classList.add(theme);
    
//     // Update meta theme-color
//     const metaThemeColor = document.querySelector('meta[name="theme-color"]');
// if (metaThemeColor) {
//   const themeColor = theme === 'dark' ? '#0f172a' : '#fffbeb'; // gray-950
//   metaThemeColor.setAttribute('content', themeColor);
// }

//     localStorage.setItem('theme', theme);
//   }, [theme, mounted]);

//   const toggleTheme = () => {
//     setTheme(prev => prev === 'light' ? 'dark' : 'light');
//   };

//   const value = {
//     theme,
//     toggleTheme,
//     isDark: theme === 'dark',
//     setTheme,
//     mounted
//   };

//   return (
//     <ThemeContext.Provider value={value}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };

