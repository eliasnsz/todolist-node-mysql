import mysql from 'mysql2/promise';
import dotenv from "dotenv";

dotenv.config();

const connection = mysql.createPool({
  host: process.env.DATABASE_HOST || "mysql_database",
  user: process.env.DATABASE_USER || "root",
  password: process.env.DATABASE_PASSWORD || "root",
  database: process.env.DATABASE_NAME || "todolist",
});

export default connection;