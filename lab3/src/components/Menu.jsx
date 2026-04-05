import { useState } from "react";
import MenuItem from "./MenuItem";
import menuData from "../data/menu.json";

function Menu() {
  // 1. Стан для керування сортуванням
  // 'default' - за порядком у файлі, 'asc' - від дешевих, 'desc' - від дорогих
  const [sortOrder, setSortOrder] = useState('default');

  // 2. Функція сортування даних
  const getSortedData = (data) => {
    let sorted = [...data]; // копіюємо масив

    if (sortOrder === 'asc') {
      // Перетворюємо рядок "195 грн" у число 195 для порівняння
      return sorted.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    } else if (sortOrder === 'desc') {
      return sorted.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    }
    return sorted;
  };

  // 3. Функція рендерингу категорії з урахуванням сортування
  const renderCategory = (categoryName) => {
    const filtered = menuData.filter(item => item.category === categoryName);
    const sorted = getSortedData(filtered);
    
    return sorted.map((item, index) => (
      <MenuItem key={index} dish={item} />
    ));
  };

  return (
    <main className="container section-block">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', flexWrap: 'wrap', gap: '15px' }}>
        <h2>Наше Меню</h2>
        
        {/* Кнопки сортування (вимоги Лаби №3) */}
        <div className="sort-controls">
          <span style={{ marginRight: '10px', fontSize: '0.9rem' }}>Ціна:</span>
          <button className="ing-btn" onClick={() => setSortOrder('asc')}>Дешевші ↑</button>
          <button className="ing-btn" onClick={() => setSortOrder('desc')} style={{ marginLeft: '8px' }}>Дорожчі ↓</button>
          <button className="ing-btn" onClick={() => setSortOrder('default')} style={{ marginLeft: '8px', background: '#555' }}>Скинути</button>
        </div>
      </div>

      {/* Секція: ПЕРШІ СТРАВИ */}
      <section className="menu-section">
        <div className="table-wrapper">
          <table><thead><tr><th>ПЕРШІ СТРАВИ</th></tr></thead></table>
        </div>
        <div className="menu-cards">{renderCategory('first')}</div>
      </section>

      {/* Секція: САЛАТИ */}
      <section className="menu-section">
        <div className="table-wrapper">
          <table><thead><tr><th>САЛАТИ</th></tr></thead></table>
        </div>
        <div className="menu-cards">{renderCategory('salad')}</div>
      </section>

      {/* Секція: ДЕСЕРТИ (Додано) */}
      <section className="menu-section">
        <div className="table-wrapper">
          <table><thead><tr><th>ДЕСЕРТИ</th></tr></thead></table>
        </div>
        <div className="menu-cards">{renderCategory('dessert')}</div>
      </section>
    </main>
  );
}

export default Menu;