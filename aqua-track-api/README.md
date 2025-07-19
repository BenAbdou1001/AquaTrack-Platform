# 💧 AquaTrack Backend

## 📌 Overview

**AquaTrack Backend** is a powerful web platform built with **NestJS**, designed for **real-time monitoring** of water quality across multiple tanks. It utilizes **WebSockets** for live sensor data streaming and integrates advanced **AI analytics** for:

* Smart alerts
* Predictive anomaly detection
* Fish behavior & death detection
* Water clarity assessment
* Smart suggestions
* Review generation

---

## 🚀 Key Features

### 📡 Real-Time Monitoring

* WebSocket-based sensor data streaming (compatible with FastAPI).
* Tracks key parameters:

  * Oxygen
  * Water Level (1–5m)
  * pH
  * Salinity
  * Suspended Solids
  * Temperature
  * Bacteria
  * Nitrite
  * Nitrate
  * Ammonia

### 🧠 AI Capabilities

* **Smart Alerts**: Detects anomalies in real-time.
* **Predictive Detection**: Anticipates issues and generates text alerts.
* **Fish Behavior Analysis**: Monitors and flags unusual activity.
* **Fish Death Detection**: Sends alerts upon detecting fish mortality.
* **Water Clarity Assessment**: Includes alerts with visual evidence.
* **Smart Suggestions**: Actionable advice stored in the `suggestions` table.
* **Review Generator**: Periodic summaries saved to the `suggestions` table.

### 🔌 API Endpoints

A RESTful API for:

* User & auth management
* Tank & sensor management
* Alerts & suggestions
* Forecasting & reviews
* Notifications & configuration

---

## 🧱 Prerequisites

* **Node.js** v14.x or higher
* **npm** v6.x or higher
* **PostgreSQL**
* **Docker** (optional for containers)

---

## ⚙️ Installation

```bash
git clone https://github.com/your-repo/aquatrack-backend.git
cd aquatrack-backend
npm install
```

1. Create `.env` from `.env.example`
2. Update with your DB URL, JWT secret, etc.

Start development server:

```bash
npm run start:dev
```

> 📘 API docs: [http://localhost:3000/api/docs](http://localhost:3000/api/docs)

---

## 🏭 Running in Production

Build & start:

```bash
npm run build
npm run start:prod
```

---

## 📖 API Documentation

Access via Swagger at:
**[http://localhost:3000/api/docs](http://localhost:3000/api/docs)**

### 🔧 Route Overview:

| Endpoint            | Description                |
| ------------------- | -------------------------- |
| `/api/auth`         | Auth (login/signup/verify) |
| `/api/users`        | User CRUD                  |
| `/api/tanks`        | Tank CRUD                  |
| `/api/sensor-data`  | Sensor readings & control  |
| `/api/alerts`       | Alerts CRUD                |
| `/api/suggestions`  | Suggestions CRUD           |
| `/api/forecasting`  | Forecast management        |
| `/api/reviews`      | Review CRUD                |
| `/api/notification` | Notifications              |
| `/api/sensors`      | Sensor CRUD                |

---

## 🔌 WebSocket Integration

* Connect to real-time streams via `/ws`.
* Handles KPI updates from all tanks.
* Implemented in `socket.service.ts`.

---

## 🧠 AI System Integration

* Sensor data processed with AI modules.
* Alert & suggestion outputs stored in DB.
* Water clarity alerts may include AI-generated images.
* AI model configuration in the `ai` directory.

---

## 🤝 Contributing

```bash
# 1. Fork the repo
# 2. Create a new feature branch
git checkout -b feature/awesome-feature

# 3. Commit your changes
git commit -m "Add awesome feature"

# 4. Push and create PR
git push origin feature/awesome-feature
```

---


