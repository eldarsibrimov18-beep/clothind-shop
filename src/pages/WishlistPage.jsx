import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const WishlistPage = () => {
  const navigate = useNavigate();

  // Начальные данные для избранного
  const initialWishlistItems = [
    {
      id: 1,
      name: "Кожаная куртка мужская",
      price: 15990,
      size: "M",
      image: "/src/assets/img/aaaaa.jpg",
      inStock: true,
    },
    {
      id: 2,
      name: "Женское платье",
      price: 5990,
      size: "S",
      image: "/src/assets/img/aaaaa.jpg",
      inStock: true,
    },
    {
      id: 3,
      name: "Кроссовки спортивные",
      price: 8990,
      size: "42",
      image: "/src/assets/img/aaaaa.jpg",
      inStock: true,
    },
  ];

  // Состояние для хранения избранных товаров
  const [wishlistItems, setWishlistItems] = useState(initialWishlistItems);

  // Функция для удаления товара из избранного
  const handleRemoveItem = (id) => {
    setWishlistItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // Функция для очистки всего избранного
  const handleClearWishlist = () => {
    setWishlistItems([]);
  };

  // Функция для добавления товара в корзину (заглушка)
  const handleAddToCart = (item) => {
    alert(`Товар "${item.name}" добавлен в корзину!`);
    // Здесь можно добавить логику добавления в корзину
  };

  return (
    <div className="wishlist-page">
      <h1 className="page-title">Избранное</h1>

      {wishlistItems.length === 0 ? (
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
            <p>Товаров в избранном: {wishlistItems.length}</p>
            <button
              className="btn btn-secondary"
              onClick={handleClearWishlist}
              style={{ marginTop: "10px" }}
            >
              Очистить всё избранное
            </button>
          </div>

          <div className="wishlist-grid">
            {wishlistItems.map((item) => (
              <div key={item.id} className="wishlist-item">
                <img src={item.image} alt={item.name} />
                <h3>{item.name}</h3>
                <p>Размер: {item.size}</p>
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
                    >
                      В корзину
                    </button>
                    <button
                      className="remove-btn"
                      onClick={() => handleRemoveItem(item.id)}
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
