<p align="center">
   <img src="https://img.shields.io/badge/Javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" />
   <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />
   <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
   <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
   <img src="https://img.shields.io/badge/WebSockets-4aa3f7?style=for-the-badge&logo=websockets&logoColor=white" />
</p>

# Live Cursors App

This repository contains a small real-time demo that shares cursor positions between connected users. It's a compact, self-contained project with a Node.js WebSocket server and a React + Vite frontend.

High-level summary:

- The `server/` folder runs a simple WebSocket server that tracks connected users and broadcasts a users snapshot.
- The `client/` folder contains a React + Vite app that connects to the server and renders other users' cursors.

Quick start (non-technical):

1. Clone this repository:

```bash
git clone https://github.com/jonatasu/live-cursors-app.git
cd live-cursors-app
```

2. Start the server and the client in separate terminals (each README inside `server/` and `client/` contains specific run steps):

- Open a terminal, go to `server/` and follow the steps in `server/README.md`.
- Open a second terminal, go to `client/` and follow the steps in `client/README.md`.

Note: technical details and dependency instructions are kept in the `server/README.md` and `client/README.md` files.

Reference and differences vs the Ably tutorial repo
-------------------------------------------------

This project was inspired by the Ably tutorial: https://github.com/ably-labs/react-websockets-tutorial/tree/master

High-level differences (summary):

- The Ably tutorial uses Ably's managed realtime service and SDK for pub/sub; this repository uses a minimal, self-hosted WebSocket server (`ws`) to keep dependencies and infra simple.
- The client in this repository uses `perfect-cursors` and a small set of utilities (throttling, smoothing) and targets a Vite + React setup; the tutorial code focuses on Ably SDK usage and may differ in integration points and data shapes.
- This repo is a compact demo that emphasizes a small open WebSocket server and local normalization/aggregation logic rather than a managed realtime platform.

If you'd like, I can add a longer comparison table and point to exact files that map to the tutorial's pieces.

---

See `client/README.md` and `server/README.md` for detailed setup and run instructions.
