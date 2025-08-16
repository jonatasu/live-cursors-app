const http = require("http");
const { WebSocketServer } = require("ws");

const url = require("url");
const uuidV4 = require("uuid").v4;

const server = http.createServer();
const wsServer = new WebSocketServer({ server });
const port = 8000;

const connections = {};
const users = {};

wsServer.on("connection", (connection, request) => {
  console.info("Client connected");

  const location = url.parse(request.url, true);
  console.info(`Request URL: ${location.pathname}`);

  const { username } = location.query;
  const uuid = uuidV4();
  if (username) {
    console.info(`Username: ${username}`);
  } else {
    console.warn("No username provided");
  }
  console.info(`UUID: ${uuid}`);

  connections[uuid] = connection;

  users[uuid] = {
    username: username || `USER-${uuid.slice(0, 8)}`,
    state: {
      cursor: { x: 0, y: 0 },
      typing: false,
      onlineStatus: "Logging in...",
    },
  };
});

server.listen(port, "0.0.0.0", () => {
  console.info(`Server running at ws://0.0.0.0:${port}/`);
});
