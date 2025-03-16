import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();
import "./../utils/setEnv.js";

const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_HOST = process.env.DB_HOST;
const DB_MAIN_PORT = process.env.DB_MAIN_PORT;
const DB_NAME = process.env.DB_NAME;

const dbConnect = mysql.createPool({
  connectionLimit: 10,
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  port: DB_MAIN_PORT,
  timezone: "Z",
});

export default dbConnect;
