const Service = require('../models/Service');
const User = require('../models/User');

const serviceController = {
  // Criar serviço
  create: async (req, res) => {
    try {
      const { user_id, titulo, descricao, categoria, preco, imagem_url } = req.body;

      if (!user_id || !titulo) {
        return res.status(400).json({ message: 'Campos obrigatórios: user_id, titulo.' });
      }

      const servico = await Service.create({
        user_id, titulo, descricao, categoria, preco, imagem_url
      });

      res.status(201).json(servico);
    } catch (err) {
      console.error('Erro ao criar serviço:', err);
      res.status(500).json({ message: 'Erro interno do servidor.' });
    }
  },

  // Listar todos os serviços
  getAll: async (req, res) => {
    try {
      const servicos = await Service.findAll({ include: User });
      res.status(200).json(servicos);
    } catch (err) {
      console.error('Erro ao listar serviços:', err);
      res.status(500).json({ message: 'Erro interno do servidor.' });
    }
  },

  // Buscar serviço por ID
  getById: async (req, res) => {
    const { id } = req.params;
    try {
      const servico = await Service.findByPk(id, { include: User });
      if (!servico) return res.status(404).json({ message: 'Serviço não encontrado.' });
      res.status(200).json(servico);
    } catch (err) {
      console.error('Erro ao buscar serviço:', err);
      res.status(500).json({ message: 'Erro interno do servidor.' });
    }
  },

  // Deletar serviço
  delete: async (req, res) => {
    const { id } = req.params;
    try {
      const deletado = await Service.destroy({ where: { id } });
      if (!deletado) return res.status(404).json({ message: 'Serviço não encontrado.' });
      res.status(204).send();
    } catch (err) {
      console.error('Erro ao deletar serviço:', err);
      res.status(500).json({ message: 'Erro interno do servidor.' });
    }
  }
};

module.exports = serviceController;
