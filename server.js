require("dotenv").config();
const http = require("http");
const app = require("./app");
const { initWebSocket } = require("./config/websocket");

const PORT = process.env.PORT || 4000;
const server = http.createServer(app);

initWebSocket(server);

server.listen(PORT, () => {
  console.log(`[SERVER] API REST: http://localhost:${PORT}`);
  console.log(`[SERVER] WebSocket: ws://localhost:${PORT}`);
});
