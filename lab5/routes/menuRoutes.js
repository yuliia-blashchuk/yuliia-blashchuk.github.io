const express = require('express');
const router = express.Router();
const db = require('../database');
const { verifyToken } = require('../auth');

// Отримати всі страви
router.get('/', (req, res) => {
  const menu = db.prepare('SELECT * FROM menu').all();
  res.json(menu);
});

// Отримати відгуки
router.get('/reviews', (req, res) => {
  const reviews = db.prepare('SELECT * FROM reviews ORDER BY date DESC').all();
  res.json(reviews);
});

// Додати відгук (тільки для залогінених)
router.post('/reviews', verifyToken, (req, res) => {
  const { name, comment } = req.body;
  const date = new Date().toISOString();
  db.prepare('INSERT INTO reviews (user_email, name, comment, date) VALUES (?, ?, ?, ?)')
    .run(req.user.email, name, comment, date);
  res.json({ success: true });
});

module.exports = router;