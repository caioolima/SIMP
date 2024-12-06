const mongoose = require('mongoose');

// Definir o modelo do Alerta 
const AlertaSchema = new mongoose.Schema({
  nome: String,
  endereco: String,
  grau_inclinacao: Number,
  data_hora: Date,
  status: { type: String }
});

const Alerta = mongoose.model('Alerta', AlertaSchema);

module.exports = Alerta;
