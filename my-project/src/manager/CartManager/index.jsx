import { CartContext, CartProvider} from "./context/CartContext";
import CartDetails from "./components/CartDetails"

import { useContext } from "react";

const CartManager = () => {
  const { cartItems } = useContext(CartContext);

  return (
    <>
      <CartDetails/>
    </>
  );
};

// Wrap in scoped provider
const CartManagerWrapper = () => (
  <CartProvider>
    <CartManager />
  </CartProvider>
);

export default CartManagerWrapper;