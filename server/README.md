# Server (WebSocket)

This folder contains a minimal Node.js WebSocket server used for the Live Cursors demo.

What it does
------------

- Listens for new WebSocket connections and assigns a UUID to each client.
- Maintains an in-memory `users` map and broadcasts an aggregated snapshot to all connected clients on any update.

Quick setup
-----------

From the repository root or from inside this folder:

```bash
cd server
npm install
npm run server
```

The server listens by default on port 8000 (ws://localhost:8000).

Notes
-----

- The server uses the `ws` library for WebSocket handling and `uuid` to assign client identifiers.
- This demo stores users in memory and is not intended for production use. There is no persistence, authentication, or reconnection logic beyond the basic WebSocket handlers.

Troubleshooting
---------------

- If the server fails to start, ensure no other process is using port 8000.
- Check the server console for connection logs and error messages.

Security note
-------------

This server is a small demo. For production, add authentication, input validation, rate limiting, and persistent storage.
