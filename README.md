<p align="center">
   <img src="https://img.shields.io/badge/Javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" />
   <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />
   <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
   <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
   <img src="https://img.shields.io/badge/WebSockets-4aa3f7?style=for-the-badge&logo=websockets&logoColor=white" />
</p>

# 🖱️ Live Cursors App

This project is a real-time cursor sharing app inspired by the video “[Build a Real-Time Live Cursors App with Ably](https://www.youtube.com/watch?v=4Uwq0xB30JE&ab_channel=AblyRealtime)”. It allows multiple users to see each other's cursor movements in real time using the Ably Realtime platform.

## ✨ Features

- Real-time cursor position sharing between users
- Interactive web interface
- Node.js backend for connection management
- Uses Ably service for real-time communication

## 🛠️ Technologies Used

- Node.js
- Ably Realtime
- JavaScript/HTML/CSS (frontend)
- WebSockets

## ⚡ Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/jonatasu/live-cursors-app.git
   cd live-cursors-app
   ```
2. Install server dependencies:
   ```bash
   cd server
   npm install
   ```
3. Set your Ably API key in a `.env` file:
   ```
   ABLY_API_KEY=your-ably-api-key
   ```
4. Start the server:
   ```bash
   node index.js
   ```

## 🚀 How to Use

- Access the app's web interface (frontend instructions will be added as development progresses).
- Move your cursor and see other users' cursors in real time.

## 📚 References

- [YouTube Tutorial Video](https://www.youtube.com/watch?v=4Uwq0xB30JE&ab_channel=AblyRealtime)
- [Ably Realtime Documentation](https://ably.com/docs)
