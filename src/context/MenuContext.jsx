import { createContext, useState, useEffect } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
  const [menus, setMenus] = useState(() => {
    const saved = localStorage.getItem("menus");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("menus", JSON.stringify(menus));
  }, [menus]);

  return (
    <MenuContext.Provider value={{ menus, setMenus }}>
      {children}
    </MenuContext.Provider>
  );
};



// import { createContext, useEffect, useState } from "react";

// export const MenuContext = createContext();

// function MenuProvider({ children }) {
//   const savedMenu = localStorage.getItem("menus");

//   const [menus, setMenus] = useState(
//     savedMenu ? JSON.parse(savedMenu) : []
//   );

//   useEffect(() => {
//     localStorage.setItem("menus", JSON.stringify(menus));
//   }, [menus]);

//   return (
//     <MenuContext.Provider value={{ menus, setMenus }}>
//       {children}
//     </MenuContext.Provider>
//   );
// }

// export default MenuProvider;
