# Portfolio Website - Sean

A full-stack portfolio website built with **Angular**, **Node.js/Express**, and **MongoDB**.

## 🏗️ Project Structure

```
Website-Portfolio-Sean/
├── frontend/          # Angular 19 application
│   ├── src/
│   │   ├── app/
│   │   │   ├── services/    # API services
│   │   │   ├── app.ts       # Root component
│   │   │   ├── app.config.ts
│   │   │   └── app.routes.ts
│   │   ├── environments/    # Environment configs
│   │   └── styles.scss      # Global styles
│   └── package.json
│
├── backend/           # Node.js/Express API
│   ├── src/
│   │   ├── config/         # Database configuration
│   │   ├── controllers/    # Route controllers
│   │   ├── models/         # MongoDB models
│   │   ├── routes/         # API routes
│   │   └── server.js       # Entry point
│   ├── .env               # Environment variables
│   └── package.json
│
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18+ (LTS recommended)
- **MongoDB** (local installation or MongoDB Atlas)
- **Angular CLI** (optional, for ng commands)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd Website-Portfolio-Sean
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Configure environment variables**
   
   Edit `backend/.env` with your settings:
   ```env
   PORT=3000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/portfolio
   FRONTEND_URL=http://localhost:4200
   ```

### Running the Application

#### Start MongoDB
Make sure MongoDB is running locally or update the connection string for MongoDB Atlas.

#### Start Backend (API)
```bash
cd backend
npm run dev    # Development with hot-reload
# or
npm start      # Production
```
The API will be available at `http://localhost:3000`

#### Start Frontend (Angular)
```bash
cd frontend
npm start      # or: ng serve
```
The app will be available at `http://localhost:4200`

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Health check |
| GET | `/api` | API info |
| GET | `/api/projects` | Get all projects |
| GET | `/api/projects/:id` | Get project by ID |
| POST | `/api/projects` | Create new project |
| PUT | `/api/projects/:id` | Update project |
| DELETE | `/api/projects/:id` | Delete project |

## 🛠️ Tech Stack

### Frontend
- **Angular 19** - Modern web framework
- **TypeScript** - Type-safe JavaScript
- **SCSS** - CSS preprocessor
- **RxJS** - Reactive programming

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM

## 📝 Development Commands

### Frontend
```bash
ng serve              # Start dev server
ng build              # Build for production
ng test               # Run unit tests
ng generate component # Generate new component
```

### Backend
```bash
npm run dev           # Start with nodemon (hot-reload)
npm start             # Start production server
```

## 🔧 Configuration

### Frontend Environment
- `frontend/src/environments/environment.ts` - Development
- `frontend/src/environments/environment.prod.ts` - Production

### Backend Environment
- `backend/.env` - Environment variables (not committed)
- `backend/.env.example` - Template for environment variables

## 📄 License

MIT License - feel free to use this project as a template for your own portfolio!
