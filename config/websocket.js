const { WebSocketServer } = require("ws");

let wss = null;

function broadcast(data) {
  if (!wss) return;
  const json = JSON.stringify(data);

  wss.clients.forEach((client) => {
    if (client.readyState === 1) client.send(json);
  });
}

function startWSS(server) {
  wss = new WebSocketServer({ server });
  console.log("[WS] Servidor WebSocket inicializado");

  wss.on("connection", (ws) => {
    console.log("[WS] Cliente conectado");
  });
}

module.exports = { startWSS, broadcast };
