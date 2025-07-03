import { useContext } from "react";
import Header from "../Header";
import CartListView from "../CartListView";
import EmptyCartView from "../EmptyCartView";
import CartSummary from "../CartSummary";
import { CartContext } from "../../context/CartContext";

import "./index.css";

const Cart = () => {
  const { cartList, removeAllCartItems } = useContext(CartContext);
  const isCartEmpty = cartList.length === 0;

  return (
    <>
      <Header />
      <div className="cart-container">
        {isCartEmpty ? (
          <EmptyCartView />
        ) : (
          <div className="cart-content-container">
            <h1 className="cart-heading">My Cart</h1>
            <div className="remove-all-btn-container">
              <button
                className="remove-all-button"
                type="button"
                onClick={removeAllCartItems}
              >
                Remove All
              </button>
            </div>
            <CartListView />
            <CartSummary />
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
