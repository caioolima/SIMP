const nodemailer = require('nodemailer');
const path = require('path');
const Form = require('../models/formModel');

// Função para listar todos os formulários
const listarFormularios = async (req, res) => {
  try {
    // Obtendo todos os documentos do modelo 'Form'
    const formularios = await Form.find();

    // Enviando a resposta com todos os formulários
    res.status(200).json(formularios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao listar os formulários', error });
  }
};

// Função para criar um novo formulário
const criarFormulario = async (req, res) => {
  try {
    const { cep, rua, bairro, cidade, estado, complemento, imagemUrl } = req.body;

    // Define o status como "aguardando" independentemente do valor enviado
    const novoFormulario = new Form({
      cep,
      rua,
      bairro,
      cidade,
      estado,
      complemento,
      status: 'aguardando verificação', // Define valor fixo
      imagemUrl,
    });

    // Salva o novo formulário
    await novoFormulario.save();

    // Ajuste para adicionar "não enviado" caso não haja imagem ou complemento
    const imagem = imagemUrl || 'Não enviada';
    const complementoTexto = complemento || 'Não informado';

    // Enviar um e-mail quando o formulário for criado
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'SMTP_USER_REDACTED',
        pass: 'SMTP_PASS_REDACTED',
      },
    });

    const mailOptions = {
      from: 'SMTP_USER_REDACTED',
      to: 'SMTP_TO_REDACTED',
      subject: 'Novo formulário criado',
      html: `
        <html>
          <head>
            <style>
                body {
                    font-family: 'Arial', sans-serif;
                    background-color: #e9f7f6;
                    color: #333;
                    padding: 20px;
                }
                .header {
                    background-color: #2c3e50;
                    padding: 20px;
                    text-align: center;
                    color: white;
                    border-radius: 10px 10px 0 0;
                }
                .content p {
                    font-size: 18px;
                    line-height: 1.6;
                }
                .address {
                    font-weight: bold;
                    color: #e74c3c;
                }
            </style>
          </head>
          <body>
            <div class="header">
              <img src="cid:logo" alt="Logo" style="max-width: 150px;">
              <h1>Formulário Criado</h1>
            </div>
            <div class="content">
              <p><strong>CEP:</strong> ${cep}</p>
              <p><strong>Rua:</strong> ${rua}</p>
              <p><strong>Bairro:</strong> ${bairro}</p>
              <p><strong>Cidade:</strong> ${cidade}</p>
              <p><strong>Estado:</strong> ${estado}</p>
              <p><strong>Complemento:</strong> ${complementoTexto}</p>
              <p><strong>Imagem URL:</strong> ${imagem}</p>
              <p><strong>Status:</strong> aguardando verificação</p>
            </div>
          </body>
        </html>
      `,
      attachments: [
        {
          filename: 'logo.png',
          path: path.join(__dirname, 'logo.png'),
          cid: 'logo', // Identificador único para referenciar a imagem no corpo do e-mail
        },
      ],
    };

    // Envia o e-mail
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('Erro ao enviar o e-mail:', error);
      } else {
        console.log('E-mail enviado: ' + info.response);
      }
    });

    // Responde com o novo formulário
    res.status(201).json(novoFormulario);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao criar o formulário', error });
  }
};

module.exports = { listarFormularios, criarFormulario };
