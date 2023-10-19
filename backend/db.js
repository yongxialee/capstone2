//connect the app to database
/**  */

const { Client } = require("pg");
const {DB_URI}=require('./config')



let client = new Client({
  connectionString: DB_URI,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
});

client.connect();

module.exports = client;