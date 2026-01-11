import "./style/footerStyle.css";
const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-info">
        <div className="footer-info-block1">
          <h2>Информация</h2>
          <a href="#">Политика конфиденциальности</a>
          <br />
          <p />
          <a href="#">Договор оферты</a>
        </div>
        <div className="footer-info-block2">
          <h2>Наши соцсети</h2>
          <div className="footer-icon">
            <img src="/src/assets/icon/telegram.png" alt="#" />
            <img src="/src/assets/icon/vk.png" alt="#" />
          </div>
        </div>
        <div className="footer-info-block3">
          <h2>Навигация</h2>
          <a href="/">Главная</a>
          <br />
          <p />
          <a href="/cart">Корзина</a>
          <br />
          <p />
          <a href="/wishlist">Избранные</a>
          <br />
          <p />
          <a href="/profile">Профиль</a>
        </div>
      </div>
      <hr />
      <p>@ 2026 Все права защищены</p>
    </div>
  );
};
export default Footer;
