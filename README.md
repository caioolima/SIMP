# SIMP — Sistema Inteligente de Monitoramento de Postes [v8.6.1]
> **Enterprise Urban Infrastructure Command Center & Predictive Engine**

O **SIMP** é uma solução Full-Stack de monitoramento industrial para gestão georreferenciada de postes inteligentes. A plataforma integra telemetria em tempo real, inteligência artificial preditiva e uma interface de comando de alta densidade para modernização de infraestruturas urbanas.

---

## 🏗️ Project Architecture

O ecossistema SIMP é dividido em dois módulos principais, garantindo escalabilidade e separação de responsabilidades:

### 1. Frontend (Command Center UI)
Localizado na pasta `/frontend`, é o cérebro visual da operação.
- **Stack**: React 18, CSS Modules, React Router v6.
- **Design System**: *Elite White Glass* (Glassmorphism, desfoque e profundidade).
- **Typography**: Unified **Inter** (400-900 weights) para nitidez industrial.
- **Bento Grid 2.0**: Layout de grade de alta fidelidade para monitoramento multi-contexto (GIS, AI, Alertas, Stats).
- **Georeferencing**: Integração com Leaflet para mapeamento RTK (±2cm).

### 2. Backend (Alert Engine API)
Localizado na pasta `/backend`, processa a inteligência do sistema.
- **Stack**: Node.js, Express, MongoDB (Mongoose).
- **API Real-Time**: Fornece telemetria de ativos, sincronização de uptime e gestão de incidentes.
- **Service Integration**: 
  - **CORS**: Habilitado para comunicação cross-origin segura.
  - **Nodemailer**: Disparo de notificações de manutenção crítica.
  - **ViaCEP**: Módulo de geolocalização por endereço postal nas rotas de campo.

---

## 🚀 Key Features

- **📍 GIS Monitoring**: Precisão centimétrica via satélite de toda a malha de ativos.
- **🧠 AI Predictive Engine**: Algoritmos que detectam inclinações triaxiais (±0.1°) e fadiga estrutural com predição de falha em 72h.
- **📊 Real-Time Telemetry**: Dashboard com métricas de Uptime (99.9%) e contagem de ativos monitorados via API Render.
- **📱 Field Ops**: Módulo responsivo para operários relatarem incidências diretamente do campo com upload de evidências.

---

## 🛠️ Setup & Execution

### Requisitos
- Node.js (v18+)
- MongoDB (Instância ativa)

### Iniciar Backend
```bash
cd backend
npm install
node index.js
```

### Iniciar Frontend
```bash
cd frontend
npm install
npm start
```

---

## 🎨 Official Brand Palette
| Color | Tone | Variable | Hex |
| :--- | :--- | :--- | :--- |
| **Azure Royal** | Primary Action | `--primary` | `#2563eb` |
| **Deep Midnight** | Secondary UI | `--bg-dark` | `#0f172a` |
| **Emerald Glass** | Success/Optimized | `--success` | `#10b981` |
| **Porcelain** | Technical Background | `--bg-light` | `#f8fafc` |

---

## 📜 Metadata
- **Version**: 8.6.1 [Industrial Build]
- **Status**: Stable / Production Ready
- **Author**: devcaio & AI Pair Programming

© 2026 SIMP Enterprise. Todos os direitos reservados.
