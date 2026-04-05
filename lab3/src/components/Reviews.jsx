import React, { useState, useEffect } from 'react';

export default function Reviews() {
  // 1. Ініціалізуємо стан значенням з localStorage (якщо воно там є)
  const [reviews, setReviews] = useState(() => {
    const saved = localStorage.getItem('restaurant_reviews');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');

  // 2. Щоразу, коли масив reviews змінюється, зберігаємо його в localStorage
  useEffect(() => {
    localStorage.setItem('restaurant_reviews', JSON.stringify(reviews));
  }, [reviews]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() && comment.trim()) {
      setReviews([{ 
        name, 
        comment, 
        date: new Date().toLocaleDateString() 
      }, ...reviews]);
      setName('');
      setComment('');
    }
  };

  return (
    <section className="comments-section container">
      <h3>Залишити відгук</h3>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '400px' }}>
        <input 
          type="text" 
          placeholder="Ваше ім'я" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required 
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} 
        />
        <textarea 
          placeholder="Ваш відгук" 
          rows="4" 
          value={comment} 
          onChange={(e) => setComment(e.target.value)} 
          required 
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} 
        />
        <button type="submit" className="ing-btn">Надіслати відгук</button>
      </form>

      <div style={{ marginTop: '30px' }}>
        <h4>Відгуки відвідувачів ({reviews.length}):</h4>
        {reviews.length === 0 ? <p>Поки що немає відгуків.</p> : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {reviews.map((rev, index) => (
              <li key={index} style={{ marginBottom: '15px', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
                <strong style={{ color: 'var(--accent)' }}>{rev.name}</strong>
                <p style={{ margin: '5px 0' }}>{rev.comment}</p>
                <small style={{ color: '#888' }}>{rev.date}</small>
              </li>
            ))}
          </ul>
        )}
        {reviews.length > 0 && (
          <button 
            onClick={() => { if(window.confirm('Видалити всі відгуки?')) setReviews([]); }}
            style={{ fontSize: '12px', background: 'none', border: 'none', color: 'red', cursor: 'pointer', padding: 0 }}
          >
          </button>
        )}
      </div>
    </section>
  );
}