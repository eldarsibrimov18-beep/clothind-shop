import "./style/cardStyle.css";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { useState } from "react";

function ProductCard({ product }) {
  const navigate = useNavigate();
  const {
    addToCart,
    addToWishlist,
    isInWishlist,
    removeFromWishlist,
    isInCart,
  } = useAppContext();
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || "M");
  const [showSizeSelector, setShowSizeSelector] = useState(false);

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();

    if (product.sizes.length > 1 && !isInCart(product.id, selectedSize)) {
      // Если есть несколько размеров и товар с таким размером не в корзине
      setShowSizeSelector(true);
    } else {
      addToCart(product, selectedSize);
      setShowSizeSelector(false);
    }
  };

  const handleAddToWishlist = (e) => {
    e.stopPropagation();

    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
    addToCart(product, size);
    setShowSizeSelector(false);
  };

  return (
    <div
      className="product-card"
      onClick={handleCardClick}
      style={{ cursor: "pointer" }}
    >
      <div className="product-image-container">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="product-image"
        />
        <button
          className={`favorite-btn ${isInWishlist(product.id) ? "active" : ""}`}
          aria-label={
            isInWishlist(product.id)
              ? "Убрать из избранного"
              : "Добавить в избранное"
          }
          onClick={handleAddToWishlist}
        >
          {isInWishlist(product.id) ? "❤️" : "🤍"}
        </button>
      </div>

      <div className="product-header">
        <h3 className="product-title">{product.name}</h3>
        <div className="product-actions">
          <button
            className="cart-btn"
            aria-label={
              isInCart(product.id, selectedSize)
                ? "Уже в корзине"
                : "Добавить в корзину"
            }
            onClick={handleAddToCart}
          >
            {isInCart(product.id, selectedSize) ? "✓" : "🛒"}
          </button>
        </div>
      </div>

      {showSizeSelector && (
        <div
          className="size-selector-overlay"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="size-selector">
            <p>Выберите размер:</p>
            <div className="size-options">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  className={`size-option ${
                    selectedSize === size ? "selected" : ""
                  }`}
                  onClick={() => handleSizeSelect(size)}
                >
                  {size}
                </button>
              ))}
            </div>
            <button
              className="close-size-selector"
              onClick={(e) => {
                e.stopPropagation();
                setShowSizeSelector(false);
              }}
            >
              Отмена
            </button>
          </div>
        </div>
      )}

      <div className="product-colors">
        <span className="colors-label">Цвета: </span>
        {product.colors.map((color, index) => (
          <span key={index} className="color-chip">
            {color}
          </span>
        ))}
      </div>

      <p className="product-description">{product.description}</p>
      <p className="product-price">{product.price.toLocaleString()} руб.</p>
      <div className="product-sizes">
        <span className="sizes-label">Размеры: </span>
        {product.sizes.slice(0, 3).map((size, index) => (
          <span key={index} className="size-chip">
            {size}
          </span>
        ))}
        {product.sizes.length > 3 && (
          <span className="size-chip-more">+{product.sizes.length - 3}</span>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
