const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');
const User = require('./User');

const UserProfile = sequelize.define('UserProfile', {
  bio: DataTypes.TEXT,
  foto_url: DataTypes.STRING,
  telefone: DataTypes.STRING,
  localizacao: DataTypes.STRING
}, {
  timestamps: false
});

UserProfile.belongsTo(User, { foreignKey: { name: 'user_id', unique: true }, onDelete: 'CASCADE' });
User.hasOne(UserProfile, { foreignKey: { name: 'user_id', unique: true } });

module.exports = UserProfile;
