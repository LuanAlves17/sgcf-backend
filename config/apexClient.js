const axios = require("axios");
require("dotenv").config();

const apexClient = axios.create({
  baseURL: process.env.APEX_API_URL,
  timeout: 10000,
});

apexClient.interceptors.response.use(
  (res) => res,
  (err) => {
    console.error("[APEX] Erro na requisição:", err.message);
    return Promise.reject(err);
  }
);

module.exports = apexClient;
