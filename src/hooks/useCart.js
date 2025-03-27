import { useEffect, useState } from "react";
import { db } from "../helpers/Db";

export const useCart = () => {
  const initialCart = () => {
    const localStorageCart = localStorage.getItem("cart");
    return localStorageCart ? JSON.parse(localStorageCart) : [];
  };
  const [data, setData] = useState(db);
  const [cart, setCart] = useState(initialCart);

  function addToCart(iteam) {
    const iteamExist = cart.findIndex((guitar) => guitar.id === iteam.id);
    if (iteamExist >= 0) {
      const updatedCart = [...cart];
      updatedCart[iteamExist].quantity++;
      setCart(updatedCart);
    } else {
      iteam.quantity = 1;
      setCart([...cart, iteam]);
    }
  }

  function removeToCart(id) {
    setCart((prevState) => prevState.filter((iteam) => iteam.id !== id));
  }

  function increaseQuantity(id) {
    const updatedCart = cart.map((iteam) => {
      if (iteam.id == id) {
        return {
          ...iteam,
          quantity: iteam.quantity + 1,
        };
      }
      return iteam;
    });
    setCart(updatedCart);
  }

  function decreseQuantity(id) {
    const updatedCart = cart.map((iteam) => {
      if (iteam.id == id && iteam.quantity > 1) {
        return {
          ...iteam,
          quantity: iteam.quantity - 1,
        };
      }
      return iteam;
    });
    setCart(updatedCart);
  }

  function cleanCart() {
    setCart([]);
  }

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const cartTotal = cart.reduce(
    (total, iteam) => total + iteam.quantity * iteam.price,
    0
  );

  return {
    data,
    cart,
    addToCart,
    removeToCart,
    increaseQuantity,
    decreseQuantity,
    cleanCart,
    cartTotal,
  };
};
