import React, { createContext, useState } from "react";

export const CartContext = createContext({
  cartList: [],
  removeAllCartItems: () => {},
  addCartItem: () => {},
  removeCartItem: () => {},
  incrementCartItemQuantity: () => {},
  decrementCartItemQuantity: () => {},
});

export const CartProvider = ({ children }) => {
  const [cartList, setCartList] = useState([]);

  const removeAllCartItems = () => setCartList([]);

  const removeCartItem = (id) =>
    setCartList((prev) => prev.filter((product) => product.id !== id));

  const addCartItem = (product) => {
    const { id } = product;
    const existingProduct = cartList.find((p) => p.id === id);
    if (!existingProduct) {
      setCartList([...cartList, product]);
    } else {
      setCartList(
        cartList.map((p) =>
          p.id === id ? { ...p, quantity: p.quantity + product.quantity } : p
        )
      );
    }
  };

  const incrementCartItemQuantity = (id) => {
    setCartList(
      cartList.map((p) =>
        p.id === id ? { ...p, quantity: p.quantity + 1 } : p
      )
    );
  };

  const decrementCartItemQuantity = (id) => {
    const product = cartList.find((p) => p.id === id);
    if (product.quantity > 1) {
      setCartList(
        cartList.map((p) =>
          p.id === id ? { ...p, quantity: p.quantity - 1 } : p
        )
      );
    } else {
      removeCartItem(id);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartList,
        removeAllCartItems,
        addCartItem,
        removeCartItem,
        incrementCartItemQuantity,
        decrementCartItemQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
