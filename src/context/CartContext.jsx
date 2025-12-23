import { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext);

  const storageKey = currentUser
    ? `cart_${currentUser.username}`
    : "cart_guest";

  const [cart, setCart] = useState([]);

  // load cart saat user berubah
  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    setCart(saved ? JSON.parse(saved) : []);
  }, [storageKey]);

  // simpan cart ke localStorage
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(storageKey, JSON.stringify(cart));
    }
  }, [cart, storageKey, currentUser]);

  const addToCart = (menu) => {
    setCart(prev => {
      const exist = prev.find(item => item.id === menu.id);
      if (exist) {
        return prev.map(item =>
          item.id === menu.id
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      }
      return [...prev, { ...menu, qty: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const increaseQty = (id) => {
  setCart(prev =>
    prev.map(item =>
      item.id === id
        ? { ...item, qty: item.qty + 1 }
        : item
    )
  );
};

const decreaseQty = (id) => {
  setCart(prev =>
    prev
      .map(item =>
        item.id === id
          ? { ...item, qty: item.qty - 1 }
          : item
      )
      .filter(item => item.qty > 0)
  );
};

const clearCart = () => {
  setCart([]);
};


  return (
    <CartContext.Provider
  value={{
    cart,
    addToCart,
    removeFromCart,
    increaseQty,
    decreaseQty,
    clearCart
  }}
>
  {children}
</CartContext.Provider>
  );
};

