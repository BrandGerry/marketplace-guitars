import { useEffect, useState } from "react";
import Guitar from "./components/Guitar";
import Header from "./components/Header";
import { db } from "./helpers/Db";

function App() {
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

  return (
    <>
      <Header
        cart={cart}
        removeToCart={removeToCart}
        increaseQuantity={increaseQuantity}
        decreseQuantity={decreseQuantity}
        cleanCart={cleanCart}
      />
      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map((guitar) => (
            <Guitar guitar={guitar} key={guitar.id} addToCart={addToCart} />
          ))}
        </div>
      </main>

      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">
            GuitarLA - Todos los derechos Reservados
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;
