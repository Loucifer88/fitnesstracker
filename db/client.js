const { Client } = require("pg");
const connectionString = "postgres://localhost:5432/fitnesstracker";
const client = new Client(connectionString);
module.exports = client;
