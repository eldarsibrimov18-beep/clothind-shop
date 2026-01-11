import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const navigate = useNavigate();

  // Используем состояние для хранения товаров в корзине
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Футболка черная",
      price: 2990,
      quantity: 1,
      size: "M",
      image: "/src/assets/img/aaaaa.jpg",
    },
    {
      id: 2,
      name: "Джинсы синие",
      price: 4990,
      quantity: 1,
      size: "L",
      image: "/src/assets/img/aaaaa.jpg",
    },
    {
      id: 3,
      name: "Кроссовки белые",
      price: 8990,
      quantity: 1,
      size: "42",
      image: "/src/assets/img/aaaaa.jpg",
    },
  ]);

  // Функция для удаления товара по ID
  const removeItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-page">
      <h1 className="page-title">Корзина</h1>

      {cartItems.length === 0 ? (
        <div className="empty-state">
          <h2>Ваша корзина пуста</h2>
          <p>Добавьте товары из каталога</p>
          <button className="btn btn-primary" onClick={() => navigate("/")}>
            Перейти к покупкам
          </button>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} />
                <div className="cart-item-details">
                  <h3>{item.name}</h3>
                  <p>Размер: {item.size}</p>
                  <div className="quantity-controls">
                    <button className="btn btn-outline">-</button>
                    <span style={{ margin: "0 10px" }}>{item.quantity}</span>
                    <button className="btn btn-outline">+</button>
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <p className="cart-item-price">{item.price} ₽</p>
                  {/* Добавляем обработчик удаления */}
                  <button
                    className="remove-btn"
                    onClick={() => removeItem(item.id)}
                  >
                    Удалить
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-total">
            <p>
              Итого: <strong>{total} ₽</strong>
            </p>
            <button className="btn btn-primary btn-large">
              Оформить заказ
            </button>
            <button
              className="btn btn-outline"
              onClick={() => navigate("/")}
              style={{ marginLeft: "10px" }}
            >
              Продолжить покупки
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
