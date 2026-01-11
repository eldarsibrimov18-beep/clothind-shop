import { useParams, useNavigate } from "react-router-dom";
import "../components/style/productDetailStyle.css";
const ProductDetailPage = ({ products }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Находим товар по ID
  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="product-detail-container">
        <div className="product-not-found">
          <h2>Товар не найден</h2>
          <button onClick={() => navigate("/")} className="back-btn">
            Вернуться на главную
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="product-detail-container">
      <button onClick={() => navigate(-1)} className="back-btn">
        ← Назад
      </button>

      <div className="product-detail">
        <div className="product-detail-images">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="main-image"
          />
        </div>

        <div className="product-detail-info">
          <div className="product-header">
            <h1 className="product-title">{product.name}</h1>
            <div className="product-actions">
              <button className="cart-btn" onClick={() => navigate("/cart")}>
                🛒
              </button>
            </div>
          </div>

          <div className="product-meta">
            <span className="product-category">{product.category}</span>
            <span className="product-id">ID: {product.id}</span>
          </div>

          <div className="product-price-section">
            <span className="price">{product.price.toLocaleString()} руб.</span>
            <button className="add-to-cart-btn">Добавить в корзину</button>
          </div>

          <div className="product-colors">
            <h3>Доступные цвета:</h3>
            <div className="colors-list">
              {product.colors.map((color, index) => (
                <div key={index} className="color-option">
                  <span
                    className="color-sample"
                    style={{ backgroundColor: getColorHex(color) }}
                  ></span>
                  <span className="color-name">{color}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="product-description-section">
            <h3>Описание</h3>
            <p className="description">{product.description}</p>
          </div>

          <div className="product-specs">
            <h3>Характеристики</h3>
            <div className="specs-grid">
              <div className="spec-item">
                <span className="spec-label">Категория:</span>
                <span className="spec-value">{product.category}</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Количество цветов:</span>
                <span className="spec-value">{product.colors.length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Вспомогательная функция для цветов
const getColorHex = (colorName) => {
  const colorMap = {
    Чёрный: "#000000",
    Чёрная: "#000000",
    Белый: "#FFFFFF",
    Белая: "#FFFFFF",
    Синий: "#0000FF",
    Синяя: "#0000FF",
    Красный: "#FF0000",
    Красная: "#FF0000",
    Серый: "#808080",
    Зелёный: "#008000",
    Коричневый: "#A52A2A",
  };
  return colorMap[colorName] || "#CCCCCC";
};

export default ProductDetailPage;
