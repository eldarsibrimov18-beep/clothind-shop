import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

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
        ></input>
      </div>
      <div className="Header-button">
        <img
          src="/src/assets/icon/picnic-basket.png"
          alt="Корзина"
          onClick={() => navigate("/cart")}
          style={{ cursor: "pointer" }}
        />
        <img
          src="/src/assets/icon/hearth.png"
          alt="Избранное"
          onClick={() => navigate("/wishlist")}
          style={{ cursor: "pointer" }}
        />
        <img
          src="/src/assets/icon/profile.png"
          alt="Профиль"
          onClick={() => navigate("/profile")}
          style={{ cursor: "pointer" }}
        />
      </div>
    </div>
  );
};

export default Header;
