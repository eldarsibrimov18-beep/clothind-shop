import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const WishlistPage = () => {
  const navigate = useNavigate();
  const { wishlist, removeFromWishlist, clearWishlist, addToCart, isInCart } =
    useAppContext();

  const handleAddToCart = (item) => {
    addToCart(item, item.sizes?.[0] || "M");
    alert(`Товар "${item.name}" добавлен в корзину!`);
  };

  return (
    <div className="wishlist-page">
      <h1 className="page-title">Избранное</h1>

      {wishlist.length === 0 ? (
        <div className="empty-state">
          <h2>В избранном пока ничего нет</h2>
          <p>Добавляйте товары, нажимая на ♡</p>
          <button className="btn btn-primary" onClick={() => navigate("/")}>
            Перейти к покупкам
          </button>
        </div>
      ) : (
        <>
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <p>Товаров в избранном: {wishlist.length}</p>
            <button
              className="btn btn-secondary"
              onClick={clearWishlist}
              style={{ marginTop: "10px" }}
            >
              Очистить всё избранное
            </button>
          </div>

          <div className="wishlist-grid">
            {wishlist.map((item) => (
              <div key={item.id} className="wishlist-item">
                <img src={item.imageUrl || item.image} alt={item.name} />
                <h3>{item.name}</h3>
                <p>Размеры: {item.sizes?.join(", ") || "M"}</p>
                <p>Цвета: {item.colors?.join(", ") || "Разные"}</p>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: "15px",
                  }}
                >
                  <p className="cart-item-price">
                    {item.price.toLocaleString()} ₽
                  </p>
                  <div>
                    <button
                      className="btn btn-primary"
                      style={{ marginRight: "10px" }}
                      onClick={() => handleAddToCart(item)}
                      disabled={isInCart(item.id)}
                    >
                      {isInCart(item.id) ? "В корзине" : "В корзину"}
                    </button>
                    <button
                      className="remove-btn"
                      onClick={() => removeFromWishlist(item.id)}
                      style={{
                        background: "none",
                        border: "1px solid #ff4444",
                        color: "#ff4444",
                        padding: "8px 15px",
                        borderRadius: "4px",
                        cursor: "pointer",
                      }}
                    >
                      Удалить
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: "30px" }}>
            <button className="btn btn-outline" onClick={() => navigate("/")}>
              ← Вернуться в магазин
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default WishlistPage;
