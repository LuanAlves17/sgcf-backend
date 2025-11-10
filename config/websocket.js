const { WebSocketServer } = require("ws");
const { monitorApex } = require("../services/apex.service");

let wss;
let lastData = "";

function broadcast(data) {
  wss.clients.forEach((client) => {
    if (client.readyState === 1) client.send(data);
  });
}

async function startMonitor() {
  setInterval(async () => {
    const newData = await monitorApex();
    if (newData && newData !== lastData) {
      lastData = newData;
      broadcast(JSON.stringify({ type: "sync", romaneios: JSON.parse(newData) }));
    }
  }, 1000);
}

function initWebSocket(server) {
  wss = new WebSocketServer({ server });

  wss.on("connection", (ws) => {
    console.log("[WS] Nova conexão recebida");

    if (lastData) {
      ws.send(JSON.stringify({ type: "sync", romaneios: JSON.parse(lastData) }));
    }
  });

  startMonitor();
}

function sendToAll(payload) {
  if (!wss) return;
  wss.clients.forEach((client) => {
    if (client.readyState === 1) {
      client.send(JSON.stringify(payload));
    }
  });
}

module.exports = { initWebSocket, sendToAll };
