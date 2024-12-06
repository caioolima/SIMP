const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const alertaRoutes = require('./routes/alertaRoutes'); // Importando as rotas
const formRoutes = require('./routes/formRoutes');
require('dotenv').config(); // Para carregar as variáveis de ambiente

// Inicializa o Express
const app = express();

// Middleware
// Lista de origens permitidas (ou '*' para permitir qualquer origem)
const allowedOrigins = ['http://localhost:3000', 'https://simp-poa.vercel.app'];

// Configuração do CORS
const corsOptions = {
  origin: function (origin, callback) {
    // Verifica se a origem da requisição está na lista de origens permitidas
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'DELETE', 'OPTIONS', 'PUT'], // Métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization'], // Cabeçalhos permitidos (adicionando 'Authorization')
};
app.use(cors(corsOptions));
app.use(bodyParser.json()); // Configuração para interpretar JSON

// Conectar-se ao MongoDB
const uri = process.env.MONGO_URI;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Conexão com o MongoDB estabelecida com sucesso!');
  })
  .catch((error) => {
    console.error('Erro ao conectar-se ao MongoDB:', error);
    process.exit(1); // Finaliza o processo se não conseguir conectar ao banco
  });

// Usar as rotas
app.use('/api/alertas', alertaRoutes);
app.use('/api/form', formRoutes);
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date() });
});

// Inicializar o servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
