# 💬 Real-Time Chat App (Node.js + EJS)

A full-stack, server-rendered **real-time chat application** built with **Node.js**, **Express**, **MongoDB**, and **EJS templates**. Users can register, log in, and chat in real-time using WebSockets.

---

## 🔗 Live Demo

🌐 **App URL**: https://chat-app-dvw9.onrender.com  


---

## 🚀 Features

- 🔐 User Authentication (Login / Register with hashed passwords)
- 🧑‍🤝‍🧑 Real-Time One-to-One Messaging using WebSocket (or Socket.io)
- 📜 Chat History (stored in MongoDB)
- 👤 User List with Online/Offline Status
- 🧠 Session Management with Cookies
- ✨ EJS Templates for dynamic HTML rendering

---

## 🛠 Tech Stack

| Layer      | Technology                       |
|------------|----------------------------------|
| Server     | Node.js, Express.js              |
| Templating | EJS                              |
| Realtime   | WebSocket / Socket.io            |
| Database   | MongoDB + Mongoose               |
| Auth       | Express-Session, Bcrypt          |
| Deployment | Railway / Render / Vercel (Backend) |

---

## 📁 Project Structure
```bash
chat-app/
│
├── public/ # Static files (CSS, JS, icons)
├── views/ # EJS template files
│ ├── auth/ # Login & Register pages
│ ├── chat/ # Chat interface
│ └── partials/ # Header, footer, layout
│
├── routes/ # Express routes (auth, chat)
├── controllers/ # Business logic
├── models/ # Mongoose models
├── socket/ # Socket.io handlers
├── middleware/ # Auth middleware
├── app.js # Express setup
├── server.js # Entry point with socket
└── .env # Environment variables`
```



---

## 📦 Installation

```bash
git clone https://github.com/yourusername/chat-app.git
cd chat-app
npm install

PORT=5000
MONGO_URI=your_mongo_connection_string
SESSION_SECRET=your_session_secret
```
##🔐 .env Configuration
```
PORT=5000
MONGO_URI=your_mongo_connection_string
SESSION_SECRET=your_session_secret
```
##▶️ Running the App Locally
```bash
npm install
npm start
```

##🧪 Features Breakdown
Register/Login: Auth handled with hashed passwords and sessions

EJS Templates: Server-rendered UI with dynamic data

Chat System:

One-to-one real-time messaging

Socket room-based communication

Persisted chat history in MongoDB

User List: Shows all registered users and their online status

##📜 License
MIT © 2025 Anuj Kumar


