const UserProfile = require('../models/UserProfile');

// Criar perfil
exports.createUserProfile = async (req, res) => {
  try {
    const userProfile = await UserProfile.create(req.body);
    res.status(201).json(userProfile);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Buscar todos os perfis
exports.getAllUserProfiles = async (req, res) => {
  try {
    const profiles = await UserProfile.findAll();
    res.status(200).json(profiles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Buscar um perfil por ID
exports.getUserProfileById = async (req, res) => {
  try {
    const profile = await UserProfile.findByPk(req.params.id);
    if (!profile) {
      return res.status(404).json({ message: 'Perfil não encontrado' });
    }
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Atualizar perfil
exports.updateUserProfile = async (req, res) => {
  try {
    const [updated] = await UserProfile.update(req.body, {
      where: { id: req.params.id }
    });

    if (updated) {
      const updatedProfile = await UserProfile.findByPk(req.params.id);
      res.status(200).json(updatedProfile);
    } else {
      res.status(404).json({ message: 'Perfil não encontrado' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Deletar perfil
exports.deleteUserProfile = async (req, res) => {
  try {
    const deleted = await UserProfile.destroy({
      where: { id: req.params.id }
    });

    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Perfil não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
