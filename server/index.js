const http = require("http");
const { WebSocketServer } = require("ws");

const url = require("url");
const uuidV4 = require("uuid").v4;

const server = http.createServer();
const wsServer = new WebSocketServer({ server });
const port = 8000;

const connections = {};
const users = {};

const handleMessage = (bytes, uuid) => {
  const message = JSON.parse(bytes.toString());
  const user = users[uuid];
  console.info(`Received message from ${user.username}:`, message);

  user.state = message;
};

const handleClose = (uuid) => {
  console.info(`Connection closed for ${users[uuid].username}`);
};

wsServer.on("connection", (connection, request) => {
  console.info("Client connected >>>>>");

  const location = url.parse(request.url, true);
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

  connection.on("message", (message) => handleMessage(message, uuid));
  connection.on("close", () => handleClose(uuid));
});

server.listen(port, "0.0.0.0", () => {
  console.info(`Server running at ws://0.0.0.0:${port}/`);
});
