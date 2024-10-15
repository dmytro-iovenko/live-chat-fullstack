## 🗨️ Live Chat App

A comprehensive real-time messaging solution designed to connect users with live representatives, ensuring immediate support and seamless communication.

This project is a capstone project for the MERN Software Engineering bootcamp at Per Scholas.

### 🚀 Current Status

- Created a Vite app with a fully implemented chat interface.
- Developed reusable React components for enhanced maintainability.
- Implemented basic chat functionality, including message sending and displaying chat history.
- Integrated user authentication using Firebase and JWT, with Firebase Admin SDK for managing users.
- Set up Node.js with Express and configured MongoDB with Mongoose for data storage.
- Implemented GitHub Actions for CI/CD, including automated code reviews and deployments.
- Successfully deployed frontend to Vercel and backend to Render.

### 📋 To-Do

- **Features**:
  - Implement a lightweight client app to chat with representatives.
  - Implement real-time messaging using Socket.io.
  - Create more advanced chat history functionality.
  - Display representative availability status.
  - Enable file sharing during chats.
  - Design an admin dashboard.

- **Backend Development**:
  - Integrate additional REST API endpoints for user management.

- **DevOps**:
  - Configure Docker for containerization.

### 📊 Project Management

- This project is managed using JIRA to track progress, tasks, and issues. You can view the JIRA project [here](https://iovenko.atlassian.net/browse/LCA).

### 💻 Getting Started

#### 📋 Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

#### ⚙️ Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/dmytro-iovenko/live-chat-app.git
   ```
2. Navigate to the backend directory:
   ```bash
   cd live-chat-app/backend
   ```
3. Install backend dependencies:
   ```bash
   npm install
   ```
4. Create a `.env` file in the `/backend` directory and add the following environment variables:
   ```
   # Server port
   PORT=...

   # MongoDB connection string
   ATLAS_URI=...

   # Firebase configuration
   FIREBASE_TYPE=...
   FIREBASE_PROJECT_ID=...
   FIREBASE_PRIVATE_KEY_ID=...
   FIREBASE_PRIVATE_KEY=...
   FIREBASE_CLIENT_EMAIL=...
   FIREBASE_CLIENT_ID=...
   FIREBASE_AUTH_URI=...
   FIREBASE_TOKEN_URI=...
   FIREBASE_AUTH_PROVIDER_X509_CERT_URL=...
   FIREBASE_CLIENT_X509_CERT_URL=...
   FIREBASE_UNIVERSE_DOMAIN=...

   # Render deployment token
   RENDER_TOKEN=...
   ```
5. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```
6. Install frontend dependencies:
   ```bash
   npm install
   ```
7. Create a `.env` file in the `/frontend` directory and add the following environment variables:
   ```
   # API URL for the Live Chat backend
   VITE_LIVECHAT_API_URL=...

   # Firebase configuration
   VITE_FIREBASE_API_KEY=...
   VITE_FIREBASE_AUTH_DOMAIN=...
   VITE_FIREBASE_PROJECT_ID=...
   VITE_FIREBASE_STORAGE_BUCKET=...
   VITE_FIREBASE_MESSAGING_SENDER_ID=...
   VITE_FIREBASE_APP_ID=...
   VITE_FIREBASE_MEASUREMENT_ID=...
   ```

#### 📦 Run the Application

To run the backend server:
```bash
cd backend
npm start
```

To run the frontend server:
```bash
cd frontend
npm run dev
```

Open your browser and navigate to `http://localhost:5173` to view the application.

### 📖 Documentation

- [Vite Documentation](https://vitejs.dev/)
- [Node.js Documentation](https://nodejs.org/en/docs/)
- [Express Documentation](https://expressjs.com/en/starter/installing.html)
- [Mongoose Documentation](https://mongoosejs.com/docs/)
- [Firebase Documentation](https://firebase.google.com/docs)

### 🎉 Acknowledgements

- Inspiration from various real-time chat applications.
- Special thanks to Per Scholas for providing the MERN Software Engineering bootcamp and resources that helped make this project possible. You can learn more about their programs [here](https://www.perscholas.org).
