const User = require('../models/User');
const UserProfile = require('../models/UserProfile');
const bcrypt = require('bcrypt');

const userController = {
  // Criar novo usuário
  create: async (req, res) => {
    try {
      let { nome, email, senha } = req.body;

      if (!nome || !email || !senha) {
        return res.status(400).json({ message: 'Campos obrigatórios: nome, email, senha.' });
      }

      const senhaHash = await bcrypt.hash(senha, 10);
      console.log(senhaHash);
      senha = senhaHash;
      
      const novoUsuario = await User.create({ nome, email, senha });
      res.status(201).json(novoUsuario);
    } catch (err) {
      console.error('Erro ao criar usuário:', err);
      res.status(500).json({ message: 'Erro interno do servidor.' });
    }
  },

  // Listar todos os usuários
  getAll: async (req, res) => {
    try {
      const users = await User.findAll({ include: UserProfile });
      res.status(200).json(users);
    } catch (err) {
      console.error('Erro ao buscar usuários:', err);
      res.status(500).json({ message: 'Erro interno do servidor.' });
    }
  },

  // Buscar usuário por ID
  getById: async (req, res) => {
    const { id } = req.params;
    try {
      const user = await User.findByPk(id, { include: UserProfile });
      if (!user) return res.status(404).json({ message: 'Usuário não encontrado.' });
      res.status(200).json(user);
    } catch (err) {
      console.error('Erro ao buscar usuário:', err);
      res.status(500).json({ message: 'Erro interno do servidor.' });
    }
  }
};

module.exports = userController;
