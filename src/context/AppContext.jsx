import React, { createContext, useState, useContext, useEffect } from "react";

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  // Загружаем данные из localStorage при инициализации
  const getInitialCart = () => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  };

  const getInitialWishlist = () => {
    const savedWishlist = localStorage.getItem("wishlist");
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  };

  const [cart, setCart] = useState(getInitialCart);
  const [wishlist, setWishlist] = useState(getInitialWishlist);

  // Сохраняем в localStorage при изменении
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  // Функции для работы с корзиной
  const addToCart = (product, size = "M", quantity = 1) => {
    setCart((prevCart) => {
      // Проверяем, есть ли уже такой товар с таким размером в корзине
      const existingItemIndex = prevCart.findIndex(
        (item) => item.id === product.id && item.size === size
      );

      if (existingItemIndex >= 0) {
        // Если товар уже есть, увеличиваем количество
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex] = {
          ...updatedCart[existingItemIndex],
          quantity: updatedCart[existingItemIndex].quantity + quantity,
        };
        return updatedCart;
      } else {
        // Если товара нет, добавляем новый
        return [
          ...prevCart,
          {
            ...product,
            size,
            quantity,
            cartItemId: Date.now(), // Уникальный ID для элемента корзины
          },
        ];
      }
    });
  };

  const removeFromCart = (cartItemId) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.cartItemId !== cartItemId)
    );
  };

  const updateCartItemQuantity = (cartItemId, quantity) => {
    if (quantity < 1) {
      removeFromCart(cartItemId);
      return;
    }

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.cartItemId === cartItemId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  // Функции для работы с избранным
  const addToWishlist = (product) => {
    setWishlist((prevWishlist) => {
      // Проверяем, есть ли уже такой товар в избранном
      const isAlreadyInWishlist = prevWishlist.some(
        (item) => item.id === product.id
      );

      if (isAlreadyInWishlist) {
        // Если уже есть, возвращаем предыдущий список (или можно удалить)
        return prevWishlist;
      } else {
        // Если нет, добавляем
        return [...prevWishlist, { ...product }];
      }
    });
  };

  const removeFromWishlist = (productId) => {
    setWishlist((prevWishlist) =>
      prevWishlist.filter((item) => item.id !== productId)
    );
  };

  const clearWishlist = () => {
    setWishlist([]);
  };

  const isInWishlist = (productId) => {
    return wishlist.some((item) => item.id === productId);
  };

  const isInCart = (productId, size = null) => {
    if (size) {
      return cart.some((item) => item.id === productId && item.size === size);
    }
    return cart.some((item) => item.id === productId);
  };

  // Подсчеты
  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getCartItemsCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  const getWishlistCount = () => {
    return wishlist.length;
  };

  const value = {
    cart,
    wishlist,
    addToCart,
    removeFromCart,
    updateCartItemQuantity,
    clearCart,
    addToWishlist,
    removeFromWishlist,
    clearWishlist,
    isInWishlist,
    isInCart,
    getCartTotal,
    getCartItemsCount,
    getWishlistCount,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
