const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');

const User = sequelize.define('User', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: true,
  createdAt: 'criado_em',
  updatedAt: false
});

module.exports = User;
