import React, { useState, useEffect } from "react";
import "../components/style/profilePage.css";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("personal");
  const [formData, setFormData] = useState({
    name: "Иван Иванов",
    email: "ivan@example.com",
    phone: "+7 (999) 123-45-67",
    address: "г. Москва, ул. Примерная, д. 1",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "",
  });

  const tabs = [
    { id: "personal", label: "Личные данные" },
    { id: "orders", label: "Мои заказы" },
    { id: "settings", label: "Настройки" },
  ];

  // Валидация формы
  const validateForm = () => {
    const newErrors = {};

    // Валидация имени
    if (!formData.name.trim()) {
      newErrors.name = "Имя обязательно для заполнения";
    } else if (formData.name.length < 2) {
      newErrors.name = "Имя должно содержать минимум 2 символа";
    }

    // Валидация email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email обязателен для заполнения";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Введите корректный email адрес";
    }

    // Валидация телефона
    const phoneRegex =
      /^(\+7|8)?[\s\-]?\(?\d{3}\)?[\s\-]?\d{3}[\s\-]?\d{2}[\s\-]?\d{2}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = "Телефон обязателен для заполнения";
    } else if (!phoneRegex.test(formData.phone.replace(/\s/g, ""))) {
      newErrors.phone = "Введите корректный номер телефона";
    }

    // Валидация адреса
    if (!formData.address.trim()) {
      newErrors.address = "Адрес обязателен для заполнения";
    } else if (formData.address.length < 10) {
      newErrors.address = "Адрес должен содержать минимум 10 символов";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Обработчик изменения полей формы
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Очищаем ошибку для этого поля при изменении
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // Обработчик отправки формы
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      showNotification("Пожалуйста, исправьте ошибки в форме", "error");
      return;
    }

    setIsSubmitting(true);

    try {
      // Имитация отправки данных на сервер
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log("Данные отправлены:", formData);
      showNotification("Данные успешно сохранены!", "success");

      // Здесь обычно был бы запрос к API
      // await api.updateProfile(formData);
    } catch (error) {
      console.error("Ошибка при сохранении:", error);
      showNotification("Произошла ошибка при сохранении", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Функция для показа уведомлений
  const showNotification = (message, type) => {
    setNotification({ show: true, message, type });

    // Автоматическое скрытие уведомления через 3 секунды
    setTimeout(() => {
      setNotification({ show: false, message: "", type: "" });
    }, 3000);
  };

  // Функция для смены пароля
  const handlePasswordChange = () => {
    showNotification("Ссылка для смены пароля отправлена на email", "info");
  };

  // Функция для удаления аккаунта
  const handleDeleteAccount = () => {
    if (
      window.confirm(
        "Вы уверены, что хотите удалить аккаунт? Это действие нельзя отменить."
      )
    ) {
      showNotification("Запрос на удаление аккаунта отправлен", "warning");
    }
  };

  // Обработчик для настроек
  const handleSettingsChange = (settingName, value) => {
    console.log(`${settingName} изменено на:`, value);
    showNotification(`Настройка "${settingName}" сохранена`, "info");
  };

  return (
    <div className="profile-page">
      <h1 className="page-title">Профиль</h1>

      {/* Уведомления */}
      {notification.show && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}

      <div className="profile-header">
        <div className="avatar-circle">
          <span>ИИ</span>
        </div>
        <h2>{formData.name}</h2>
        <p>{formData.email}</p>
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

      <form className="profile-form" onSubmit={handleSubmit}>
        {activeTab === "personal" && (
          <>
            <h3 style={{ textAlign: "center", marginBottom: "20px" }}>
              Личные данные
            </h3>

            <div className="form-group">
              <label>Имя и фамилия *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={errors.name ? "error" : ""}
              />
              {errors.name && (
                <span className="error-message">{errors.name}</span>
              )}
            </div>

            <div className="form-group">
              <label>Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={errors.email ? "error" : ""}
              />
              {errors.email && (
                <span className="error-message">{errors.email}</span>
              )}
            </div>

            <div className="form-group">
              <label>Телефон *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className={errors.phone ? "error" : ""}
              />
              {errors.phone && (
                <span className="error-message">{errors.phone}</span>
              )}
            </div>

            <div className="form-group">
              <label>Адрес доставки *</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                rows="3"
                className={errors.address ? "error" : ""}
              />
              {errors.address && (
                <span className="error-message">{errors.address}</span>
              )}
            </div>

            <div style={{ textAlign: "center" }}>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Сохранение..." : "Сохранить изменения"}
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
                <input
                  type="checkbox"
                  defaultChecked
                  onChange={(e) =>
                    handleSettingsChange("Email уведомления", e.target.checked)
                  }
                />
              </label>
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span>Получать SMS уведомления</span>
                <input
                  type="checkbox"
                  defaultChecked
                  onChange={(e) =>
                    handleSettingsChange("SMS уведомления", e.target.checked)
                  }
                />
              </label>
            </div>

            <div style={{ textAlign: "center" }}>
              <button
                type="button"
                className="btn btn-outline"
                style={{ marginRight: "10px" }}
                onClick={handlePasswordChange}
              >
                Сменить пароль
              </button>
              <button
                type="button"
                className="remove-btn"
                onClick={handleDeleteAccount}
              >
                Удалить аккаунт
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default ProfilePage;
