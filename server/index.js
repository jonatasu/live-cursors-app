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
  // Send a single aggregated users map to every connected client.
  // This ensures the client receives an object shaped as { <uuid>: { username, state }, ... }
  const payload = JSON.stringify({ type: "users", users });

  Object.keys(connections).forEach((uuid) => {
    const connection = connections[uuid];
    try {
      connection.send(payload);
    } catch (err) {
      console.error("Failed to send users payload to", uuid, err);
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
  console.info(`Connection closed for ${users[uuid].username}`);
  delete connections[uuid];
  delete users[uuid];
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
  console.log(`Connections: ${Object.keys(connections).join(", ")}`);

  users[uuid] = {
    username: username || `USER-${uuid.slice(0, 4)}`,
    state: {},
  };

  // Send assigned uuid to the newly connected client so it can identify itself
  try {
    connection.send(JSON.stringify({ type: "welcome", uuid }));
  } catch (err) {
    console.warn("Failed to send welcome message to", uuid, err);
  }

  // Immediately broadcast the full users map so the new client gets the current snapshot
  broadcastUsers();

  connection.on("message", (message) => handleMessage(message, uuid));
  connection.on("close", () => handleClose(uuid));
});

server.listen(port, "0.0.0.0", () => {
  console.info(`Server running at ws://0.0.0.0:${port}/`);
});
