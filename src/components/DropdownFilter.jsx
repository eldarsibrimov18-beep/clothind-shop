import "./style/dropdownFilter.css";

const DropdownFilter = ({ onFilterChange }) => {
  const categories = [
    { id: "all", name: "Все категории" },
    { id: "men", name: "Мужская одежда" },
    { id: "women", name: "Женская одежда" },
    { id: "kids", name: "Детская одежда" },
    { id: "shirts", name: "Футболки и рубашки" },
    { id: "pants", name: "Брюки и джинсы" },
    { id: "jackets", name: "Куртки и пальто" },
    { id: "shoes", name: "Обувь" },
    { id: "accessories", name: "Аксессуары" },
    { id: "electronics", name: "Электроника" },
  ];

  // Функция для обработки выбора категории
  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    console.log("Выбрана категория:", selectedCategory);

    if (onFilterChange) {
      onFilterChange(selectedCategory);
    }
  };

  return (
    <div className="dropdown-filter-container">
      <label htmlFor="category-filter" className="filter-label">
        Выберете категорию:
      </label>
      <div className="select-wrapper">
        <select
          id="category-filter"
          className="category-select"
          defaultValue="all"
          onChange={handleCategoryChange}
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <div className="select-arrow">▼</div>
      </div>
    </div>
  );
};

export default DropdownFilter;
