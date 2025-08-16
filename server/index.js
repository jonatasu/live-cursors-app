const http = require("http");
const { WebSocketServer } = require("ws");

const url = require("url");

const server = http.createServer();
const wsServer = new WebSocketServer({ server });
const port = 8000;

wsServer.on("connection", (connection, request) => {
  console.info("Client connected");

  const location = url.parse(request.url, true);
  console.info(`Request URL: ${location.pathname}`);

  const { username } = location.query;
  if (username) {
    console.info(`Username: ${username}`);
  } else {
    console.warn("No username provided");
  }

  connection.on("message", (message) => {
    console.info(`Received: ${message}`);
  });

  connection.on("close", () => {
    console.info("Client disconnected");
  });
});

server.listen(port, "0.0.0.0", () => {
  console.info(`Server running at ws://0.0.0.0:${port}/`);
});
