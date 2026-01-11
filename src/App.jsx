import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Hreader";
import ProductCard from "./components/Card";
import DropdownFilter from "./components/DropdownFilter";
import Footer from "./components/footer";
import CartPage from "./pages/CartPage";
import WishlistPage from "./pages/WishlistPage";
import ProfilePage from "./pages/ProfilePage";
import ProductDetailPage from "./components/ProductDetailPage";

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const products = [
    {
      id: 1,
      name: "Кожаная куртка мужская",
      description: "Стильная кожаная куртка премиум качества.",
      imageUrl:
        "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=500&fit=crop",
      price: 15990,
      colors: ["Чёрный", "Коричневый"],
      sizes: ["M", "L", "XL", "XXL"],
      category: "men",
      brand: "Premium Leather",
    },
    {
      id: 2,
      name: "Классический пиджак",
      description: "Элегантный пиджак для деловых встреч.",
      imageUrl:
        "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&h=500&fit=crop",
      price: 8990,
      colors: ["Синий", "Серый", "Чёрный"],
      sizes: ["S", "M", "L", "XL"],
      category: "men",
      brand: "Classic Style",
    },
    {
      id: 3,
      name: "Мужская футболка Premium",
      description: "Хлопковая футболка премиум качества.",
      imageUrl:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop",
      price: 2990,
      colors: ["Чёрный", "Белый", "Серый", "Синий"],
      sizes: ["XS", "S", "M", "L", "XL"],
      category: "men",
      brand: "Premium Cotton",
    },
    {
      id: 4,
      name: "Вечернее платье",
      description: "Элегантное платье для особых случаев.",
      imageUrl:
        "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=400&h=500&fit=crop",
      price: 12990,
      colors: ["Чёрный", "Красный", "Золотой"],
      sizes: ["XS", "S", "M", "L"],
      category: "women",
      brand: "Elegance",
    },
    {
      id: 5,
      name: "Женские джинсы скинни",
      description: "Удобные джинсы с современным кроем.",
      imageUrl:
        "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=500&fit=crop",
      price: 4990,
      colors: ["Синий", "Чёрный", "Серый"],
      sizes: ["XS", "S", "M", "L", "XL"],
      category: "women",
      brand: "Denim Co",
    },
    {
      id: 6,
      name: "Женская блузка",
      description: "Лёгкая блузка из натурального шёлка.",
      imageUrl:
        "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=500&fit=crop",
      price: 3990,
      colors: ["Белый", "Голубой", "Розовый"],
      sizes: ["XS", "S", "M"],
      category: "women",
      brand: "Silk Touch",
    },
    {
      id: 7,
      name: "Детский зимний комбинезон",
      description: "Тёплый комбинезон для активных детей.",
      imageUrl:
        "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=500&fit=crop",
      price: 6990,
      colors: ["Синий", "Красный", "Розовый"],
      sizes: ["104", "110", "116", "122"],
      category: "kids",
      brand: "Kids Comfort",
    },
    {
      id: 8,
      name: "Детская футболка",
      description: "Мягкая футболка для детей из органического хлопка.",
      imageUrl:
        "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=400&h=500&fit=crop",
      price: 1990,
      colors: ["Жёлтый", "Зелёный", "Синий", "Белый"],
      sizes: ["92", "98", "104", "110"],
      category: "kids",
      brand: "Organic Kids",
    },
    {
      id: 9,
      name: "Кроссовки спортивные",
      description: "Спортивные кроссовки для повседневной носки.",
      imageUrl:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=500&fit=crop",
      price: 8990,
      colors: ["Чёрный", "Белый", "Серый", "Синий"],
      sizes: ["38", "39", "40", "41", "42", "43", "44"],
      category: "shoes",
      brand: "SportStyle",
    },
    {
      id: 10,
      name: "Классические туфли",
      description: "Кожаные туфли для официальных мероприятий.",
      imageUrl:
        "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=500&fit=crop",
      price: 11990,
      colors: ["Чёрный", "Коричневый"],
      sizes: ["39", "40", "41", "42", "43", "44"],
      category: "shoes",
      brand: "Classic Shoes",
    },
    {
      id: 11,
      name: "Бейсболка классическая",
      description: "Стильная бейсболка с регулируемым размером.",
      imageUrl:
        "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400&h=500&fit=crop",
      price: 1990,
      colors: ["Чёрный", "Белый", "Синий", "Красный"],
      sizes: ["Универсальный"],
      category: "accessories",
      brand: "Street Style",
    },
    {
      id: 12,
      name: "Кожаный ремень",
      description: "Качественный кожаный ремень с металлической пряжкой.",
      imageUrl:
        "https://images.unsplash.com/photo-1622560480654-d96214fdc887?w=400&h=500&fit=crop",
      price: 2990,
      colors: ["Коричневый", "Чёрный"],
      sizes: ["90", "95", "100", "105", "110"],
      category: "accessories",
      brand: "Leather Craft",
    },
  ];

  // Функция для фильтрации товаров
  const handleFilterChange = (category) => {
    setSelectedCategory(category);
  };

  // Фильтрация товаров по выбранной категории
  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  // Главная страница с товарами
  const HomePage = () => (
    <div className="app-container">
      <DropdownFilter products={products} onFilterChange={handleFilterChange} />
      <div className="products-grid">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );

  return (
    <Router>
      <div className="main">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route
              path="/product/:id"
              element={<ProductDetailPage products={products} />}
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
