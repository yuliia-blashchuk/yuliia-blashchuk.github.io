import { useState, useEffect } from "react";

const API_URL = 'https://veselka-eqmv.onrender.com';

export function AuthButton() {
  const [user, setUser] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedEmail = localStorage.getItem('userEmail');
    if (token && savedEmail) {
      setUser({ email: savedEmail });
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
      const res = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error);
        return;
      }
      localStorage.setItem('token', data.token);
      localStorage.setItem('userEmail', data.user.email);
      setUser({ email: data.user.email });
      setShowForm(false);
      setEmail('');
      setPassword('');
    } catch (err) {
      setError('Помилка сервера');
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    setUser(null);
  };

  if (user) {
    return (
      <div className="auth-status">
        <span style={{ color: '#fff', fontSize: '0.85rem' }}>{user.email}</span>
        <button className="about-btn" onClick={handleSignOut}>Вийти</button>
      </div>
    );
  }

  return (
    <div style={{ position: 'relative' }}>
      <button className="about-btn" onClick={() => setShowForm(!showForm)}>
        Увійти
      </button>
      {showForm && (
        <div style={{
          position: 'absolute', right: 0, top: '110%',
          background: '#fff', padding: '1rem', borderRadius: '8px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.15)', zIndex: 100, minWidth: '260px'
        }}>
          <h4 style={{ margin: '0 0 0.5rem', color: '#222' }}>
            {isLogin ? 'Вхід' : 'Реєстрація'}
          </h4>
          {error && <p style={{ color: 'red', fontSize: '0.8rem', margin: '0 0 0.5rem' }}>{error}</p>}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <input
              type="email" placeholder="Email" value={email}
              onChange={(e) => setEmail(e.target.value)} required
              style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
            <input
              type="password" placeholder="Пароль" value={password}
              onChange={(e) => setPassword(e.target.value)} required
              style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
            <button type="submit" className="ing-btn">
              {isLogin ? 'Увійти' : 'Зареєструватись'}
            </button>
          </form>
          <button className="auth-switch-btn" onClick={() => { setIsLogin(!isLogin); setError(''); }}>
            {isLogin ? 'Немає акаунту? Зареєструватись' : 'Вже є акаунт? Увійти'}
          </button>
        </div>
      )}
    </div>
  );
}

export default function AuthForm() {
  return <AuthButton />;
}