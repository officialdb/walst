# Wstrt Digital Assets Platform - Mobile App Prototype

A multi-role digital assets and rewards platform prototype built with React and Vite. This application serves four user roles: **Task Earner**, **Currency Swapper**, **Recurring Saver**, and **General User**.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Building for Production](#building-for-production)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

The Wstrt platform is a unified mobile application that combines:
- **Task-based earning** - Complete gift card purchase tasks to earn crypto rewards
- **Currency swapping** - Swap crypto-to-crypto and crypto-to-fiat seamlessly
- **Recurring savings** - Automate monthly/quarterly crypto purchases with compounding visuals
- **Real-time dashboards** - Live balance updates and growth tracking via WebSocket

## ✨ Features

### Core Features
- 🔐 Role-based authentication (JWT) with dynamic UI rendering
- 📊 Real-time dashboard with live balance updates
- 💳 Transaction history with filtering and export capabilities
- 🔔 Push notifications and in-app notification center
- 🌙 Dark mode and light mode support

### Role-Specific Modules
- **Task Earner**: Task marketplace, completion tracker, earnings dashboard
- **Currency Swapper**: TradingView terminal integration, swap execution, price alerts
- **Recurring Saver**: Automated DCA, compounding visualization, savings goals

## 🛠️ Tech Stack

- **Frontend Framework**: React 19+
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **State Management**: React Context API
- **Real-time Communication**: WebSocket (Socket.io client)

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher (comes with Node.js)

Check your versions:
```bash
node --version
npm --version
```

## 🚀 Installation

1. **Clone the repository** (if not already done):
   ```bash
   git clone <repository-url>
   cd wstrt-mobile-app
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Verify installation**:
   Ensure all dependencies are installed correctly by checking the `node_modules` folder.

## ▶️ Running the Application

### Development Mode

Start the development server with hot module replacement:

```bash
npm run dev
```

The application will be available at:
- **Local**: `http://localhost:5173`
- **Network**: `http://<your-ip>:5173`

The server will automatically reload when you make changes to the code.

### Preview Production Build

To preview the production build locally:

```bash
# First, build the application
npm run build

# Then preview it
npm run preview
```

## 🏗️ Building for Production

Create an optimized production build:

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

### Build Output
- Minified JavaScript and CSS bundles
- Optimized assets
- Source maps (if configured)

## 📁 Project Structure

```
wstrt-mobile-app/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── common/          # Shared components (buttons, inputs, etc.)
│   │   ├── dashboard/       # Dashboard-specific components
│   │   ├── tasks/           # Task earner components
│   │   ├── swapper/         # Currency swapper components
│   │   └── saver/           # Recurring saver components
│   ├── context/             # React Context providers
│   │   ├── AuthContext.jsx  # Authentication state management
│   │   └── RoleContext.jsx  # Role-based access control
│   ├── hooks/               # Custom React hooks
│   ├── pages/               # Page components
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Tasks.jsx
│   │   ├── Swapper.jsx
│   │   └── Saver.jsx
│   ├── utils/               # Utility functions
│   ├── App.jsx              # Main application component
│   ├── main.jsx             # Application entry point
│   └── index.css            # Global styles
├── public/                  # Static assets
├── index.html               # HTML template
├── package.json             # Dependencies and scripts
├── vite.config.js           # Vite configuration
├── tailwind.config.js       # Tailwind CSS configuration
└── postcss.config.js        # PostCSS configuration
```

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with HMR |
| `npm run build` | Create production build |
| `npm run preview` | Preview production build locally |

## ⚙️ Environment Variables

Create a `.env` file in the root directory for environment-specific configurations:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:3000/api
VITE_WS_URL=ws://localhost:3000

# Feature Flags
VITE_ENABLE_KYC=true
VITE_ENABLE_TASKS=true
VITE_ENABLE_SWAPPER=true
VITE_ENABLE_SAVER=true

# Third-party Services
VITE_FIREBASE_API_KEY=your_firebase_key
VITE_SENDGRID_API_KEY=your_sendgrid_key
```

## 🧪 Testing

*(Testing framework to be added in Phase 7 - Hardening & Launch Prep)*

## 📝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is proprietary and confidential. All rights reserved.

---

## 🆘 Troubleshooting

### Common Issues

**Port already in use:**
```bash
# Kill the process on port 5173
lsof -ti:5173 | xargs kill -9
```

**Dependencies not installing:**
```bash
# Clear npm cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

**Build fails:**
```bash
# Check Node.js version (requires v18+)
node --version

# Update npm
npm install -g npm@latest
```

## 📞 Support

For issues and questions, please contact the development team.

---

**Version**: 1.0.0  
**Last Updated**: July 2025  
**Status**: Prototype - Draft for Client Review
