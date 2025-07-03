import { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import Cookies from "js-cookie";
import { BsPlusSquare, BsDashSquare } from "react-icons/bs";
import { BounceLoader } from "react-spinners";

import { CartContext } from "../../context/CartContext";
import Header from "../Header";
import SimilarProductItem from "../SimilarProductItem";
import "./index.css";

const apiStatusConstants = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  inProgress: "IN_PROGRESS",
};

const formatProductData = (data) => ({
  id: data.id,
  title: data.title,
  brand: data.brand,
  imageUrl: data.image_url,
  rating: data.rating,
  price: data.price,
  description: data.description,
  availability: data.availability,
  totalReviews: data.total_reviews,
});

const ProductItemDetails = () => {
  const { id } = useParams();
  const [productData, setProductData] = useState({});
  const [similarProductsData, setSimilarProductsData] = useState([]);
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);
  const [quantity, setQuantity] = useState(1);

  const { addCartItem } = useContext(CartContext);

  useEffect(() => {
    const fetchProductData = async () => {
      setApiStatus(apiStatusConstants.inProgress);
      const jwtToken = Cookies.get("jwt_token");
      const apiUrl = `https://apis.ccbp.in/products/${id}`;
      const options = {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
        method: "GET",
      };

      const response = await fetch(apiUrl, options);
      if (response.ok) {
        const data = await response.json();
        const formattedProduct = formatProductData(data);
        const formattedSimilar = data.similar_products.map(formatProductData);
        setProductData(formattedProduct);
        setSimilarProductsData(formattedSimilar);
        setApiStatus(apiStatusConstants.success);
      } else if (response.status === 404) {
        setApiStatus(apiStatusConstants.failure);
      }
    };

    fetchProductData();
  }, [id]);

  const handleDecrement = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  const handleIncrement = () => setQuantity((prev) => prev + 1);

  const handleAddToCart = () => {
    addCartItem({ ...productData, quantity });
  };

  const renderLoadingView = () => (
    <div className="products-details-loader-container" data-testid="loader">
      <BounceLoader color="#0b69ff" size={50} />
    </div>
  );

  const renderFailureView = () => (
    <div className="product-details-error-view-container">
      <img
        alt="error view"
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
        className="error-view-image"
      />
      <h1 className="product-not-found-heading">Product Not Found</h1>
      <Link to="/products">
        <button type="button" className="button">
          Continue Shopping
        </button>
      </Link>
    </div>
  );

  const renderProductDetailsView = () => {
    const {
      title,
      brand,
      imageUrl,
      rating,
      price,
      description,
      availability,
      totalReviews,
    } = productData;

    return (
      <div className="product-details-success-view">
        <div className="product-details-container">
          <img src={imageUrl} alt={title} className="product-image" />
          <div className="product">
            <h1 className="product-name">{title}</h1>
            <p className="price-details">Rs {price}/-</p>
            <div className="rating-and-reviews-count">
              <div className="rating-container">
                <p className="rating">{rating}</p>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                  alt="star"
                  className="star"
                />
              </div>
              <p className="reviews-count">{totalReviews} Reviews</p>
            </div>
            <p className="product-description">{description}</p>
            <div className="label-value-container">
              <p className="label">Available:</p>
              <p className="value">{availability}</p>
            </div>
            <div className="label-value-container">
              <p className="label">Brand:</p>
              <p className="value">{brand}</p>
            </div>
            <hr className="horizontal-line" />
            <div className="quantity-container">
              <button
                type="button"
                className="quantity-controller-button"
                onClick={handleDecrement}
                data-testid="minus"
              >
                <BsDashSquare className="quantity-controller-icon" />
              </button>
              <p className="quantity">{quantity}</p>
              <button
                type="button"
                className="quantity-controller-button"
                onClick={handleIncrement}
                data-testid="plus"
              >
                <BsPlusSquare className="quantity-controller-icon" />
              </button>
            </div>
            <button
              type="button"
              className="button add-to-cart-btn"
              onClick={handleAddToCart}
            >
              ADD TO CART
            </button>
          </div>
        </div>
        <h1 className="similar-products-heading">Similar Products</h1>
        <ul className="similar-products-list">
          {similarProductsData.map((product) => (
            <SimilarProductItem key={product.id} productDetails={product} />
          ))}
        </ul>
      </div>
    );
  };

  const renderProductDetails = () => {
    switch (apiStatus) {
      case apiStatusConstants.success:
        return renderProductDetailsView();
      case apiStatusConstants.failure:
        return renderFailureView();
      case apiStatusConstants.inProgress:
        return renderLoadingView();
      default:
        return null;
    }
  };

  return (
    <>
      <Header />
      <div className="product-item-details-container">
        {renderProductDetails()}
      </div>
    </>
  );
};

export default ProductItemDetails;
// This code defines a React component for displaying product details, including fetching product data from an API, handling loading and error states, and allowing users to add products to their cart. It also includes functionality for incrementing and decrementing the quantity of the product before adding it to the cart.
