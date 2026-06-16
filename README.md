# 💬 Zynk Chat App

A full-stack real-time chat application built with **Node.js, Express, MongoDB, and React**.  
Zynk enables users to connect instantly, send messages, and manage conversations with a clean and responsive UI.

---

## 🚀 Features
- 🔐 **Authentication & Authorization** (JWT-based login/signup)
- 💬 **Real-time Messaging** with WebSockets
- 👥 **User Management** (profiles, online/offline status)
- 📂 **Conversations** (one-to-one and group chats)
- 🎨 **Responsive UI** built with React + Tailwind
- ⚡ **Backend APIs** for chat, users, and sessions
- 🗄️ **MongoDB Database** integration

---

## 🛠️ Tech Stack
**Frontend**
- React
- Tailwind CSS
- Axios (API calls)

**Backend**
- Node.js
- Express.js
- MongoDB (Mongoose ORM)
- Socket.IO (real-time communication)

---

## 📂 Project Structure
Zynk-Chat-App/
│── backend/        # Express server, routes, controllers, models
│── frontend/       # React app, components, pages, hooks
│── package.json    # Dependencies and scripts


# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install


## Configure Environment variables

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

## Run the app
# Start backend
cd backend
npm run dev

# Start frontend
cd ../frontend
npm start




