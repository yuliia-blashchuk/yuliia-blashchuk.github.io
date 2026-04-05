import { useState } from 'react';
import IngredientsBlock from './IngredientsBlock';

function MenuItem({ dish }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <article className="chef-card"> {/* Використовуємо ваш основний клас для карток */}
      <div className="dish-img-wrapper">
        <img 
          src={dish.img} 
          alt={dish.name} 
          style={{ width: '100%', height: '100%', objectFit: 'fill' }} 
        />
      </div>
      
      <div className="card-content">
        <h3>{dish.name}</h3>
        <p className="dish-desc">{dish.desc}</p>
        
        <button className="ing-btn" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? 'Приховати склад' : 'Склад страви'}
        </button>

        {isOpen && <IngredientsBlock ingredients={dish.ingredients} />}
      </div>

      <div className="card-footer">
        <span className="weight">{dish.weight}</span>
        <span className="price">{dish.price}</span>
      </div>
    </article>
  );
}

export default MenuItem;