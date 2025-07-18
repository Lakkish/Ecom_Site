import { useContext } from "react";
import { Link } from "react-router-dom";
import { BsPlusSquare, BsDashSquare } from "react-icons/bs";
import { AiFillCloseCircle } from "react-icons/ai";

import { CartContext } from "../../context/CartContext";
import "./index.css";

const CartItem = ({ cartItemDetails }) => {
  const {
    removeCartItem,
    incrementCartItemQuantity,
    decrementCartItemQuantity,
  } = useContext(CartContext);

  const { id, title, brand, quantity, price, imageUrl } = cartItemDetails;

  const onRemoveCartItem = () => removeCartItem(id);
  const onClickIncreaseQuantity = (e) => {
    e.stopPropagation();
    e.preventDefault();
    incrementCartItemQuantity(id);
  };
  const onClickDecreaseQuantity = (e) => {
    e.stopPropagation();
    e.preventDefault();
    decrementCartItemQuantity(id);
  };
  return (
    <li className="cart-item">
      <Link to={`/products/${id}`} className="cart-item-link">
        <img className="cart-product-image" src={imageUrl} alt={title} />
        <div className="cart-item-details-container">
          <div className="cart-product-title-brand-container">
            <p className="cart-product-title">{title}</p>
            <p className="cart-product-brand">by {brand}</p>
          </div>
          <div className="cart-quantity-container">
            <button
              type="button"
              className="quantity-controller-button"
              onClick={onClickDecreaseQuantity}
              data-testid="minus"
            >
              <BsDashSquare color="#52606D" size={12} />
            </button>
            <p className="cart-quantity">{quantity}</p>
            <button
              type="button"
              className="quantity-controller-button"
              onClick={onClickIncreaseQuantity}
            >
              <BsPlusSquare color="#52606D" size={12} />
            </button>
          </div>
          <div className="total-price-remove-container">
            <p className="cart-total-price">Rs {price * quantity}/-</p>
            <button
              className="remove-button"
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                onRemoveCartItem();
              }}
            >
              Remove
            </button>
          </div>
        </div>
      </Link>
      <button
        className="delete-button"
        type="button"
        onClick={onRemoveCartItem}
        data-testid="remove"
      >
        <AiFillCloseCircle color="#616E7C" size={20} />
      </button>
    </li>
  );
};

export default CartItem;
