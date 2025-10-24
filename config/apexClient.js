const axios= require('axios');

require("dotenv").config();

const apexClient = axios.create({
    baseURL: process.env.APEX_API_URL,
    timeout: 12500
});


module.exports = apexClient;