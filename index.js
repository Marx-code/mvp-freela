require('dotenv').config();
const express = require('express');
const app = express();
const sequelize = require('./src/config/dbConfig');

// Importa modelos (para relacionamentos e sync)
require('./src/models/User');
require('./src/models/UserProfile');
require('./src/models/Service');

// Middlewares
app.use(express.json());

// Importa rotas
const userRoutes = require('./src/routes/userRoutes');
const serviceRoutes = require('./src/routes/serviceRoutes');
const userProfileRoutes = require('./src/routes/userProfileRoutes'); // 👈 NOVO

// Usa as rotas
app.use('/api/users', userRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/profiles', userProfileRoutes); // 👈 NOVO

// Teste
app.get('/', (req, res) => {
  res.send('API de Serviços Online!');
});

// Inicia app
async function start() {
  try {
    await sequelize.authenticate();
    console.log('Conectado ao MySQL!');

    await sequelize.sync({ alter: true });
    console.log('Tabelas sincronizadas.');

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
  } catch (err) {
    console.error('Erro ao iniciar:', err);
  }
}

start();
