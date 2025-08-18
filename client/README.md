# Client (React + Vite) 🎨

This folder contains the frontend for the Live Cursors demo. It's a small React app built with Vite.

What it does
------------

- Connects to the WebSocket server and sends normalized cursor positions (rx/ry). 🛰️
- Receives the aggregated users snapshot and renders remote cursors with smoothing/animation. 🧭

Quick setup
-----------

From the repository root or from inside this folder:

```bash
cd client
npm install
npm run dev
```

This will start a local development server (Vite). Open the URL printed by Vite (usually http://localhost:5173) in multiple browser windows/tabs to see cursor sharing between clients.

Notes
-----

- The client depends on `react`, `react-dom`, `react-use-websocket`, `perfect-cursors`, and a few small utilities (see `package.json`). 📦
- Cursor coordinates are normalized on the client (rx/ry) and converted to pixels according to the browser viewport when rendering. 📐
- If you change the server host/port, update the `WS_URL` in `src/components/Home.jsx`. 🔧

Troubleshooting
---------------

- If cursors do not appear, ensure the server is running and reachable at `ws://localhost:8000` (default). 🔍
- Check the browser console for WebSocket connection messages and errors. 🐞

Security note
-------------

This demo is intentionally minimal and does not include authentication or rate-limiting. Do not run it in production without proper hardening. ⚠️
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
