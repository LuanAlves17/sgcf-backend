const apexClient = require("../config/apexClient");
const APEX_ENDPOINT = "caminhoes_por_unidade";

exports.monitorApex = async () => {
  try {
    const response = await apexClient.get(APEX_ENDPOINT);
    return JSON.stringify(response.data.items);
  } catch (err) {
    console.error("Erro ao buscar dados do Apex:", err.message);
    return null;
  }
};
