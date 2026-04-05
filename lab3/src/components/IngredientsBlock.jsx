import React from 'react';

function IngredientsBlock({ ingredients }) {
  return (
    <div className="ingredients-block">
      <p><strong>Склад:</strong></p>
      <ul>
        {ingredients.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default IngredientsBlock;