import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAppContext } from "../context/AppContext";

const Header = ({ onSearch }) => {
  const navigate = useNavigate();
  const { getCartItemsCount, getWishlistCount } = useAppContext();
  const [searchValue, setSearchValue] = useState("");

  const cartItemsCount = getCartItemsCount();
  const wishlistCount = getWishlistCount();

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    onSearch(value);
  };

  const handleSearchSubmit = (e) => {
    if (e.key === "Enter") {
      console.log("Search submitted:", searchValue);
    }
  };

  return (
    <div className="Header">
      <div className="logo">
        <p>Clothing</p>
      </div>
      <div className="Search-bar">
        <input
          className="Search"
          type="text"
          placeholder="Поиск товаров..."
          value={searchValue}
          onChange={handleSearchChange}
          onKeyPress={handleSearchSubmit}
        />
      </div>
      <div className="Header-button">
        <div className="cart-icon-container" onClick={() => navigate("/cart")}>
          <img
            src="/src/assets/icon/picnic-basket.png"
            alt="Корзина"
            style={{ cursor: "pointer" }}
          />
          {cartItemsCount > 0 && (
            <span className="cart-badge">{cartItemsCount}</span>
          )}
        </div>
        <div
          className="wishlist-icon-container"
          onClick={() => navigate("/wishlist")}
        >
          <img
            src="/src/assets/icon/hearth.png"
            alt="Избранное"
            style={{ cursor: "pointer" }}
          />
          {wishlistCount > 0 && (
            <span className="wishlist-badge">{wishlistCount}</span>
          )}
        </div>
        <img
          src="/src/assets/icon/profile.png"
          alt="Профиль"
          onClick={() => navigate("/profile")}
          style={{ cursor: "pointer" }}
        />
      </div>

      <style jsx>{`
        .Header-button {
          display: flex;
          align-items: center;
          gap: 20px;
          position: relative;
        }

        .cart-icon-container,
        .wishlist-icon-container {
          position: relative;
          cursor: pointer;
        }

        .cart-badge,
        .wishlist-badge {
          position: absolute;
          top: -8px;
          right: -8px;
          background-color: #ff4444;
          color: white;
          border-radius: 50%;
          width: 20px;
          height: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
};

export default Header;
