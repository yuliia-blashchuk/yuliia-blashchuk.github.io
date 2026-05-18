const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Review = sequelize.define('Review', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  comment: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  date: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Review;