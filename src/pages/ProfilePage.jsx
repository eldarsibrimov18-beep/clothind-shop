import React, { useState } from "react";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("personal");

  const userData = {
    name: "Иван Иванов",
    email: "ivan@example.com",
    phone: "+7 (999) 123-45-67",
    address: "г. Москва, ул. Примерная, д. 1",
  };

  const tabs = [
    { id: "personal", label: "Личные данные" },
    { id: "orders", label: "Мои заказы" },
    { id: "settings", label: "Настройки" },
  ];

  return (
    <div className="profile-page">
      <h1 className="page-title">Профиль</h1>

      <div className="profile-header">
        <div className="avatar-circle">
          <span>ИИ</span>
        </div>
        <h2>{userData.name}</h2>
        <p>{userData.email}</p>
      </div>

      <div
        className="profile-tabs"
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          marginBottom: "30px",
        }}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: "10px 20px",
              background: activeTab === tab.id ? "#333" : "transparent",
              color: activeTab === tab.id ? "white" : "#333",
              border: "1px solid #333",
              borderRadius: "5px",
              cursor: "pointer",
              fontWeight: "500",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="profile-form">
        {activeTab === "personal" && (
          <>
            <h3 style={{ textAlign: "center", marginBottom: "20px" }}>
              Личные данные
            </h3>
            <div className="form-group">
              <label>Имя и фамилия</label>
              <input type="text" defaultValue={userData.name} />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" defaultValue={userData.email} />
            </div>
            <div className="form-group">
              <label>Телефон</label>
              <input type="tel" defaultValue={userData.phone} />
            </div>
            <div className="form-group">
              <label>Адрес доставки</label>
              <textarea defaultValue={userData.address} rows="3" />
            </div>
            <div style={{ textAlign: "center" }}>
              <button type="submit" className="btn btn-primary">
                Сохранить изменения
              </button>
            </div>
          </>
        )}

        {activeTab === "orders" && (
          <div style={{ textAlign: "center" }}>
            <h3>История заказов</h3>
            <p className="empty-state">У вас пока нет заказов</p>
          </div>
        )}

        {activeTab === "settings" && (
          <div>
            <h3 style={{ textAlign: "center", marginBottom: "20px" }}>
              Настройки
            </h3>
            <div style={{ marginBottom: "20px" }}>
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span>Получать уведомления на email</span>
                <input type="checkbox" defaultChecked />
              </label>
            </div>
            <div style={{ textAlign: "center" }}>
              <button
                className="btn btn-outline"
                style={{ marginRight: "10px" }}
              >
                Сменить пароль
              </button>
              <button className="remove-btn">Удалить аккаунт</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
