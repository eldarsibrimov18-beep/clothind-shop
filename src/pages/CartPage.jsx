import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const CartPage = () => {
  const navigate = useNavigate();
  const {
    cart,
    removeFromCart,
    updateCartItemQuantity,
    clearCart,
    getCartTotal,
    getCartItemsCount,
  } = useAppContext();

  const handleCheckout = () => {
    alert("Заказ оформлен! Спасибо за покупку!");
    clearCart();
  };

  const total = getCartTotal();
  const totalItems = getCartItemsCount();

  return (
    <div className="cart-page">
      <h1 className="page-title">Корзина</h1>

      {cart.length === 0 ? (
        <div className="empty-state">
          <h2>Ваша корзина пуста</h2>
          <p>Добавьте товары из каталога</p>
          <button className="btn btn-primary" onClick={() => navigate("/")}>
            Перейти к покупкам
          </button>
        </div>
      ) : (
        <>
          <div className="cart-header">
            <p>Всего товаров: {totalItems} шт.</p>
            <button className="btn btn-secondary" onClick={clearCart}>
              Очистить корзину
            </button>
          </div>

          <div className="cart-items">
            {cart.map((item) => (
              <div key={item.cartItemId} className="cart-item">
                <div className="cart-item-image">
                  <img src={item.imageUrl || item.image} alt={item.name} />
                </div>
                <div className="cart-item-details">
                  <h3>{item.name}</h3>
                  <p>Размер: {item.size}</p>
                  {item.color && <p>Цвет: {item.color}</p>}
                  <p className="item-price">
                    Цена: {item.price.toLocaleString()} ₽
                  </p>
                </div>
                <div className="cart-item-controls">
                  <div className="quantity-controls">
                    <button
                      className="btn btn-quantity"
                      onClick={() =>
                        updateCartItemQuantity(
                          item.cartItemId,
                          item.quantity - 1
                        )
                      }
                      disabled={item.quantity <= 1}
                    >
                      −
                    </button>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        updateCartItemQuantity(
                          item.cartItemId,
                          parseInt(e.target.value) || 1
                        )
                      }
                      className="quantity-input"
                    />
                    <button
                      className="btn btn-quantity"
                      onClick={() =>
                        updateCartItemQuantity(
                          item.cartItemId,
                          item.quantity + 1
                        )
                      }
                    >
                      +
                    </button>
                  </div>
                  <div className="cart-item-subtotal">
                    <p className="subtotal-price">
                      {(item.price * item.quantity).toLocaleString()} ₽
                    </p>
                  </div>
                  <button
                    className="remove-btn"
                    onClick={() => removeFromCart(item.cartItemId)}
                  >
                    Удалить
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <div className="cart-total">
              <div className="total-row">
                <span>Товары ({totalItems} шт.)</span>
                <span>{total.toLocaleString()} ₽</span>
              </div>
              <div className="total-row">
                <span>Доставка</span>
                <span>{total > 5000 ? "Бесплатно" : "500 ₽"}</span>
              </div>
              <div className="total-row total-amount">
                <span>Итого к оплате</span>
                <span className="final-price">
                  {(total > 5000 ? total : total + 500).toLocaleString()} ₽
                </span>
              </div>
            </div>

            <div className="cart-actions">
              <button
                className="btn btn-primary btn-large"
                onClick={handleCheckout}
              >
                Оформить заказ
              </button>
              <button className="btn btn-outline" onClick={() => navigate("/")}>
                Продолжить покупки
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
