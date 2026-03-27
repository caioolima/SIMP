# SIMP

Plataforma full-stack para monitoramento de postes e gestão de ocorrências em infraestrutura urbana. O projeto centraliza mapa operacional, telemetria, alertas, consulta por ativo e registro de incidentes de campo em uma única interface.

## Visão Geral

O SIMP foi estruturado para apoiar rotinas de acompanhamento operacional de ativos urbanos, com foco em visibilidade, resposta a ocorrências e organização do fluxo entre operação e campo.

Na prática, a aplicação reúne:

- dashboard com visão consolidada dos ativos monitorados
- mapa interativo para navegação espacial e leitura de contexto
- consulta detalhada de cada poste por rota dedicada
- abertura de ocorrências com endereço, complemento e evidências
- backend REST com persistência em MongoDB
- notificação por e-mail para novos registros de campo

## Principais Funcionalidades

- acompanhamento de alertas operacionais
- classificação de ocorrências por inclinação e criticidade
- navegação por mapa com marcadores e detalhes do ativo
- consulta de poste por nome e visualização individual
- criação e atualização de alertas via API
- registro de formulários de campo com status inicial de verificação
- upload de imagens com Firebase Storage
- endpoint de health check para validação básica da API

## Stack

### Frontend

- React 18
- React Router
- CSS Modules
- Leaflet
- React Leaflet
- Lucide React
- Firebase Storage

### Backend

- Node.js
- Express
- MongoDB
- Mongoose
- Nodemailer
- CORS

## Arquitetura

O repositório está dividido em duas aplicações principais:

- `frontend`: interface web com dashboard, mapa, consulta de ativos e formulário
- `backend`: API responsável por alertas, formulários, persistência e notificações

```text
.
├── backend
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── package.json
│   └── server.js
├── frontend
│   ├── public
│   ├── src
│   │   ├── Pages
│   │   ├── components
│   │   ├── firebase
│   │   └── App.js
│   └── package.json
└── README.md
```

## Fluxos Principais

### Operação

- acompanha o painel com métricas e alertas ativos
- navega pelo mapa para localizar ativos e anomalias
- consulta o detalhe de um poste específico

### Campo

- registra uma nova ocorrência
- envia endereço, complemento e imagem
- gera um item com status inicial de verificação

### Backend

- recebe requisições de alertas e formulários
- classifica o status do ativo com base na inclinação
- persiste os dados no MongoDB
- envia notificação por e-mail quando um novo formulário é criado

## Como Executar

### Requisitos

- Node.js 18+
- MongoDB em execução

### Backend

Crie um arquivo `backend/.env` com base em `backend/.env.example`.

```env
MONGO_URI=mongodb://localhost:27017/simp
PORT=5000
ALLOWED_ORIGINS=http://localhost:3000,https://simp-poa.vercel.app
SMTP_SERVICE=gmail
SMTP_USER=
SMTP_PASS=
SMTP_FROM=
SMTP_TO=
```

Instalação e execução:

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm start
```

Endereços locais:

- frontend: `http://localhost:3000`
- backend: `http://localhost:5000`
- health check: `http://localhost:5000/health`

## Endpoints Principais

- `GET /api/alertas`
- `POST /api/alertas`
- `GET /api/alertas/nome/:nomePoste`
- `GET /api/form`
- `POST /api/form`
- `GET /health`

## Roadmap Técnico

- adicionar screenshots do dashboard, mapa e fluxo de ocorrência
- incluir seed para demonstração local
- adicionar testes básicos para a API
- documentar estratégia de deploy do frontend e backend
- mover variáveis do Firebase para ambiente

## Licença

Projeto disponibilizado para demonstração técnica.
