const mongoose = require('mongoose');

// Definindo o Schema do Formulário
const formSchema = new mongoose.Schema({
  cep: {
    type: String,
    required: [true, 'O campo CEP é obrigatório'], // Verifique se está marcado como obrigatório
  },
  rua: String,
  bairro: String,
  cidade: String,
  estado: String,
  complemento: String,
  status: {
    type: String,
    enum: ['aguardando verificação', 'alerta.', 'crítico.'], // Garantindo que o status tenha valores limitados
    required: true,
  },
  imagemUrl: String,
}, {
  timestamps: true, // Para registrar a data de criação e atualização automaticamente
});

const Form = mongoose.model('Form', formSchema);

module.exports = Form;
