import "./style/cardStyle.css";
import { useNavigate } from "react-router-dom";

function ProductCard({ product }) {
  const navigate = useNavigate();

  // Функция для перехода к детальной странице
  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
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
          className="favorite-btn"
          aria-label="Добавить в избранное"
          onClick={(e) => {
            e.stopPropagation(); // Останавливаем всплытие
            navigate("/wishlist");
          }}
        >
          ♥️
        </button>
      </div>

      <div className="product-header">
        <h3 className="product-title">{product.name}</h3>
        <div className="product-actions">
          <button
            className="cart-btn"
            aria-label="Добавить в корзину"
            onClick={(e) => {
              e.stopPropagation(); // Останавливаем всплытие
              navigate("/cart");
            }}
          >
            🛒
          </button>
        </div>
      </div>

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
    </div>
  );
}

export default ProductCard;
