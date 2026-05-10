const express = require('express');
const router = express.Router();
const Review = require('../models/Review');

const COMPETITORS = ['макдональдс', 'mcdonalds', 'кфс', 'kfc', 'бургер кінг', 'burger king', 'піца хат', 'pizza hut'];

// GET — отримати всі відгуки
router.get('/', async (req, res) => {
  const reviews = await Review.findAll({ order: [['createdAt', 'DESC']] });
  res.json(reviews);
});

// POST — додати відгук
router.post('/', async (req, res) => {
  const { name, comment } = req.body;
  if (!name || !comment) {
    return res.status(400).json({ error: 'Заповніть всі поля' });
  }
  const commentLower = comment.toLowerCase();
  const hasCompetitor = COMPETITORS.some(c => commentLower.includes(c));
  if (hasCompetitor) {
    return res.status(400).json({ error: 'Відгук містить назви конкурентів' });
  }
  const date = new Date().toISOString();
  const review = await Review.create({ name, comment, date });
  res.json(review);
});

module.exports = router;