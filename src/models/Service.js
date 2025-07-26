const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');
const User = require('./User');

const Service = sequelize.define('Service', {
  titulo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descricao: DataTypes.TEXT,
  categoria: DataTypes.STRING,
  preco: DataTypes.DECIMAL(10, 2),
  imagem_url: DataTypes.STRING
}, {
  timestamps: true,
  createdAt: 'criado_em',
  updatedAt: false
});

Service.belongsTo(User, { foreignKey: 'user_id', onDelete: 'CASCADE' });
User.hasMany(Service, { foreignKey: 'user_id' });

module.exports = Service;
