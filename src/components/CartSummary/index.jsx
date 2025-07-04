import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import "./index.css";

const CartSummary = () => {
  const { cartList } = useContext(CartContext);
  const cartLength = cartList.length;

  const getOrderTotal = () => {
    return cartList.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <div className="cart-summary">
      <div>
        <h1>
          Order Total: <span>Rs {getOrderTotal()}/-</span>
        </h1>
        <p>
          {cartLength} {cartLength > 1 ? "Items" : "Item"} in cart
        </p>
      </div>
      <button type="button">Checkout</button>
    </div>
  );
};

export default CartSummary;
