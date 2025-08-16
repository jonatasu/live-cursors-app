const http = require("http");
const { WebSocketServer } = require("ws");

const url = require("url");
const uuidV4 = require("uuid").v4;

const server = http.createServer();
const wsServer = new WebSocketServer({ server });
const port = 8000;

const connections = {};
const users = {};

const broadcastUsers = () => {
  Object.keys(connections).forEach((uuid) => {
    const connection = connections[uuid];
    const user = users[uuid];

    if (user) {
      const message = JSON.stringify({
        type: "userState",
        uuid,
        username: user.username,
        state: user.state,
      });
      connection.send(message);
    }
  });
};

const handleMessage = (bytes, uuid) => {
  const message = JSON.parse(bytes.toString());
  const user = users[uuid];
  console.info(`Received message from ${user.username}:`, message);

  user.state = message;

  broadcastUsers();
};

const handleClose = (uuid) => {
  delete connections[uuid];
  delete users[uuid];
  console.info(`Connection closed for ${users[uuid].username}`);
  broadcastUsers();
  console.info("Current connections:", Object.keys(connections).length);
  console.info("Current users:", Object.keys(users).length);
  console.info(
    "Active users:",
    Object.values(users)
      .map((user) => user.username)
      .join(",")
  );
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
    state: {},
  };

  connection.on("message", (message) => handleMessage(message, uuid));
  connection.on("close", () => handleClose(uuid));
});

server.listen(port, "0.0.0.0", () => {
  console.info(`Server running at ws://0.0.0.0:${port}/`);
});
