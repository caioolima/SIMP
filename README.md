# SIMP

Sistema Inteligente de Monitoramento de Postes: uma plataforma full-stack para acompanhamento de ativos urbanos, gestão de alertas e abertura de chamados de campo em uma interface operacional com mapa, telemetria e visão analítica.

## Destaque

- case principal do portfólio do autor
- projeto reconhecido com premiação, segundo o autor
- foco em produto aplicado a infraestrutura urbana e operação em campo

## Visão Geral

O SIMP foi pensado como um centro de comando para monitoramento de postes e ocorrências de infraestrutura urbana.

O projeto combina:

- painel operacional com mapa e telemetria
- listagem de alertas críticos e ocorrências em campo
- formulário para registro de incidentes
- backend com API REST e persistência em MongoDB
- envio de notificações por e-mail para novos chamados

## Principais Funcionalidades

- dashboard com visão operacional dos ativos monitorados
- mapa interativo com marcadores e navegação por alertas
- consulta de detalhes de cada poste por rota dedicada
- classificação de alertas por grau de inclinação
- criação e atualização de alertas via API
- registro de formulários de campo com status de verificação
- integração com Firebase Storage para upload de imagem
- endpoint de health check para monitoramento básico do backend

## Stack

### Frontend

- React 18
- React Router
- CSS Modules
- Leaflet / React Leaflet
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

- visualiza o centro de comando com métricas e mapa
- acompanha alertas ativos
- abre a análise detalhada de um poste específico

### Campo

- registra uma ocorrência pelo formulário
- envia dados de endereço e evidências
- gera um item com status inicial de verificação

### Backend

- recebe alertas de poste
- classifica o status com base na inclinação
- persiste dados no MongoDB
- expõe rotas REST consumidas pelo frontend

## Como Executar

### Requisitos

- Node.js 18+
- MongoDB ativo

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

Instale as dependências e suba a API:

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

Aplicações:

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

## Melhorias Aplicadas Nesta Revisão

- remoção de arquivos sensíveis do controle de versão
- remoção de `node_modules` do repositório
- extração de credenciais de e-mail para variáveis de ambiente
- adição de `.env.example`
- correção da rota de detalhes do poste no frontend
- documentação reescrita com foco em arquitetura e produto

## Próximos Passos Recomendados

- adicionar screenshots do dashboard, mapa e formulário
- criar um pequeno seed para demo local
- adicionar testes básicos de API
- incluir deploy documentado do frontend e backend
- padronizar variáveis do Firebase via ambiente

## Licença

Projeto de uso privado do autor para fins de portfólio e demonstração técnica.
